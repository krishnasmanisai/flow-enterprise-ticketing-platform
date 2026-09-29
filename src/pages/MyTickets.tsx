import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Mail, 
  MessageSquare, 
  Phone, 
  Globe, 
  Eye, 
  UserPlus, 
  FileText,
  AlertCircle,
  ArrowUpDown, 
  Monitor,
  X,
  RotateCcw
} from 'lucide-react';
import { Page } from '../types';
import Pagination from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FilterDrawer } from '../components/FilterDrawer';
import { CopyId } from '../components/ui/CopyId';
import { StatusDropdown } from '../components/ui/StatusDropdown';

export default function MyTickets({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const tickets = [
    { src: 'phone', id: '10-07', type: 'External', status: 'Open', subject: 'Inbound Customer Call - Sarah Connor', brand: 'Acme Corp', project: 'Retail', priority: 'High', pColor: 'amber', sla: '1h 30m remaining', assignee: 'John Doe', requestor: 'Sarah C.', created: 'Aug 16, 10:31' },
    { src: 'mail', id: 'TKT-1088', type: 'Internal', status: 'Open', subject: 'Server down in eu-west-1', brand: 'Acme Corp', project: 'Internal IT', priority: 'Critical', pColor: 'red', sla: '12m remaining', assignee: 'John Doe', requestor: 'Alice B.', created: 'Oct 24, 09:30' },
    { src: 'desk', id: 'TKT-1085', type: 'External', status: 'In Progress', subject: 'Login API returning 500', brand: 'Globex', project: 'DevOps', priority: 'High', pColor: 'amber', sla: '2h remaining', assignee: 'System', requestor: 'Bob S.', created: 'Oct 24, 08:15' },
    { src: 'track', id: 'TKT-1081', type: 'External', status: 'Waiting for Customer', subject: 'How to update billing?', brand: 'Soylent', project: 'Billing', priority: 'Medium', pColor: 'blue', sla: 'Paused', assignee: 'Jane Smith', requestor: 'Charlie D.', created: 'Oct 23, 16:45' },
    { src: 'phone', id: 'TKT-1077', type: 'External', status: 'Resolved', subject: 'Password reset request', brand: 'Initech', project: 'Support', priority: 'Low', pColor: 'slate', sla: 'Resolved', assignee: 'John Doe', requestor: 'David E.', created: 'Oct 23, 11:20' },
    { src: 'mail', id: 'TKT-1070', type: 'Internal', status: 'Open', subject: 'Database backup failed', brand: 'Acme Corp', project: 'Operations', priority: 'High', pColor: 'amber', sla: '45m remaining', assignee: 'Unassigned', requestor: 'Eve F.', created: 'Oct 23, 09:10' },
    { src: 'desk', id: 'TKT-1065', type: 'External', status: 'Escalated', subject: 'Payment webhook signature mismatch', brand: 'Soylent', project: 'Billing', priority: 'Critical', pColor: 'red', sla: '25m remaining', assignee: 'Alex Morgan', requestor: 'Finance Team', created: 'Oct 23, 08:00' },
    { src: 'track', id: 'TKT-1062', type: 'External', status: 'Under Investigation', subject: 'Loyalty points not syncing with POS', brand: 'Acme Corp', project: 'Retail', priority: 'High', pColor: 'amber', sla: '3h remaining', assignee: 'DevOps Lead', requestor: 'Store #104', created: 'Oct 22, 18:20' },
    { src: 'mail', id: 'TKT-1058', type: 'Internal', status: 'Waiting for Approval', subject: 'Production config schema migration request', brand: 'Globex', project: 'Internal IT', priority: 'Medium', pColor: 'blue', sla: 'Paused', assignee: 'Change Board', requestor: 'Lead Architect', created: 'Oct 22, 14:15' },
    { src: 'desk', id: 'TKT-1055', type: 'External', status: 'In QA Testing', subject: 'Barcode scanning bugfix verification', brand: 'Initech', project: 'Support', priority: 'Low', pColor: 'slate', sla: '4h remaining', assignee: 'QA Tester', requestor: 'Operations', created: 'Oct 22, 11:30' },
    { src: 'phone', id: 'TKT-1051', type: 'Internal', status: 'Closed', subject: 'New staff badge provisioning completed', brand: 'Acme Corp', project: 'Internal IT', priority: 'Low', pColor: 'slate', sla: 'Closed', assignee: 'Admin Support', requestor: 'HR Dept', created: 'Oct 21, 15:40' },
    { src: 'track', id: 'TKT-1048', type: 'External', status: 'Blocked', subject: 'Third-party SMS gateway down', brand: 'Globex', project: 'DevOps', priority: 'High', pColor: 'amber', sla: 'Blocked', assignee: 'Telecom Team', requestor: 'Security Ops', created: 'Oct 21, 09:05' },
    { src: 'mail', id: 'TKT-1044', type: 'External', status: 'Reopened', subject: 'Customer report: points balance reset unexpectedly', brand: 'Acme Corp', project: 'Retail', priority: 'Critical', pColor: 'red', sla: '35m remaining', assignee: 'Senior Analyst', requestor: 'VIP Support', created: 'Oct 20, 16:50' }
  ];

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand' => {
    if (['Resolved', 'Closed', 'Workaround Provided'].includes(status)) return 'success';
    if (['In Progress', 'Under Investigation', 'Work in Progress', 'Pending Development', 'Code Review'].includes(status)) return 'info';
    if (['Waiting for Customer', 'Waiting for Support', 'Waiting for Approval', 'Waiting for Info', 'On Hold', 'Needs Review'].includes(status)) return 'warning';
    if (['Escalated', 'Blocked', 'Reopened', 'Critical'].includes(status)) return 'error';
    return 'neutral';
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(t.status)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          t.id.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.requestor.toLowerCase().includes(q) ||
          t.brand.toLowerCase().includes(q) ||
          t.assignee.toLowerCase().includes(q) ||
          t.status.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [tickets, selectedStatuses, searchQuery]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => {
      if (!sortConfig.direction || !sortConfig.key) return 0;
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTickets, sortConfig]);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-text-primary tracking-tight">My Tickets</h1>
          <p className="text-sm text-text-secondary mt-1">Manage and track tickets assigned to you or your groups.</p>
        </div>
      </div>

      {/* Single Multi-Select Status Filter Dropdown (No grouping by status) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-bg-surface px-3.5 py-2.5 rounded-xl border border-border-default shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-text-secondary">Filter by Status:</span>
          <StatusDropdown 
            id="ticket-status-dropdown"
            selectedStatuses={selectedStatuses} 
            onChange={setSelectedStatuses} 
          />
          {selectedStatuses.length > 0 && (
            <button
              id="clear-status-filter-btn"
              type="button"
              onClick={() => setSelectedStatuses([])}
              className="text-xs font-semibold text-brand-600 hover:text-brand-800 underline transition-colors cursor-pointer"
            >
              Reset to All
            </button>
          )}
        </div>

        <div className="text-xs text-text-muted">
          {selectedStatuses.length === 0 ? (
            <span>Showing all <strong>{sortedTickets.length}</strong> tickets</span>
          ) : selectedStatuses.length === 1 ? (
            <span>
              Filtered by <strong className="text-text-primary">{selectedStatuses[0]}</strong> (<strong>{sortedTickets.length}</strong> {sortedTickets.length === 1 ? 'ticket' : 'tickets'} matching)
            </span>
          ) : (
            <span>
              Filtered by <strong className="text-text-primary">{selectedStatuses.length} statuses</strong> (<strong>{sortedTickets.length}</strong> {sortedTickets.length === 1 ? 'ticket' : 'tickets'} matching)
            </span>
          )}
        </div>
      </div>

      {/* Data Table Container */}
      <div className="card-base flex flex-col min-h-[400px]">
        {/* Toolbar */}
        <div className="p-3 border-b border-border-default bg-bg-surface flex flex-wrap gap-3 justify-between items-center z-10">
          <div className="relative w-full xl:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by ID, subject, or customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base w-full pl-9 pr-8 h-9" 
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5"
              >
                <X size={13} />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto custom-scrollbar">
            <Button variant="outline" size="sm" icon={Filter} className="gap-1.5" onClick={() => setIsFilterDrawerOpen(true)}>
              Filters
              <span className="bg-text-primary text-bg-surface text-[10px] font-bold px-1.5 py-0.5 rounded-sm ml-0.5">2</span>
            </Button>
            <div className="h-5 w-px bg-border-default mx-1 hidden sm:block"></div>
            {['Brand', 'Project', 'Priority', 'Request Type', 'Date Range'].map(filter => (
              <Button key={filter} variant="ghost" size="sm" className="gap-1.5 bg-bg-page border border-border-default hover:border-border-strong font-medium text-text-secondary text-xs shadow-sm h-8" onClick={() => setIsFilterDrawerOpen(true)}>
                {filter} <ChevronDown size={14} className="text-text-muted" />
              </Button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto bg-bg-surface">
          {sortedTickets.length === 0 ? (
            <div className="py-16 px-4 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                <Filter size={22} />
              </div>
              <h3 className="text-sm font-bold text-text-primary">No tickets found for selected filters</h3>
              <p className="text-xs text-text-secondary max-w-sm">
                No tickets match your active status selections or search query. Try clearing filters or searching with different terms.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSelectedStatuses([]);
                    setSearchQuery('');
                  }}
                  icon={RotateCcw}
                >
                  Reset Status & Search
                </Button>
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
              <thead>
                <tr className="border-b border-border-default bg-bg-page">
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] w-12 text-center" onClick={() => handleSort('src')}>SRC</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('id')}>
                    <div className="flex items-center gap-1">TICKET ID <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'id' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-1">STATUS <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'status' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('type')}>
                    <div className="flex items-center gap-1">TYPE <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'type' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('subject')}>
                    <div className="flex items-center gap-1">SUBJECT <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'subject' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('brand')}>
                    <div className="flex items-center gap-1">BRAND <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'brand' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('project')}>
                    <div className="flex items-center gap-1">PROJECT <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'project' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('requestor')}>
                    <div className="flex items-center gap-1">REQUESTOR <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'requestor' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('priority')}>
                    <div className="flex items-center gap-1">PRIORITY <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'priority' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('sla')}>
                    <div className="flex items-center gap-1">SLA / DUE <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'sla' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('assignee')}>
                    <div className="flex items-center gap-1">ASSIGNEE <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'assignee' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('created')}>
                    <div className="flex items-center gap-1">CREATED ON <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'created' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {sortedTickets.map((t, i) => (
                  <tr key={i} className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${i % 2 !== 0 ? 'bg-bg-surface-alt' : ''}`} tabIndex={0} role="button" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(`/ticket_details?id=${t.id}`); } }} onClick={() => onNavigate(`/ticket_details?id=${t.id}`)}>
                    <td className="px-3 py-3 text-center text-text-muted group/src relative">
                      {t.src === 'mail' && <Mail size={14} className="mx-auto" />}
                      {t.src === 'phone' && <Phone size={14} className="mx-auto" />}
                      {t.src === 'desk' && <Monitor size={14} className="mx-auto" />}
                      {t.src === 'track' && <Globe size={14} className="mx-auto" />}
                      
                      {/* Tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 bg-text-primary text-bg-surface text-[10px] rounded opacity-0 group-hover/src:opacity-100 pointer-events-none whitespace-nowrap z-20">
                        {t.src === 'mail' && 'Email'}
                        {t.src === 'phone' && 'Call'}
                        {t.src === 'desk' && 'Customer Portal (Desk)'}
                        {t.src === 'track' && 'Track Portal'}
                      </div>
                    </td>
                    <td className="px-3 py-3"><span className="text-[11px]"><CopyId id={t.id} type="ticket" /></span></td>
                    <td className="px-3 py-3">
                      <Badge variant={getStatusBadgeVariant(t.status)} showDot>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold tracking-wide border shadow-2xs ${
                        t.type === 'Internal'
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${t.type === 'Internal' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        {t.type}
                      </span>
                    </td>
                    <td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px]" title={t.subject}>{t.subject}</div></td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{t.brand}</td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{t.project}</td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{t.requestor}</td>
                    <td className="px-3 py-3">
                      <Badge variant={t.priority === 'Critical' ? 'error' : t.priority === 'High' ? 'warning' : t.priority === 'Medium' ? 'brand' : 'neutral'}>
                        {t.priority}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`font-mono text-xs font-medium ${t.sla.includes('remaining') ? 'text-text-primary' : t.sla.includes('Paused') || t.sla === 'Resolved' || t.sla === 'Closed' ? 'text-text-muted' : 'text-error-text'}`}>
                        {t.sla}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <div className="w-6 h-6 rounded border border-border-default bg-bg-page flex items-center justify-center text-[10px] font-bold text-text-primary">
                          {t.assignee.charAt(0)}
                        </div>
                        <span className="text-[11.5px] text-text-secondary">{t.assignee}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right text-text-muted text-xs font-mono">{t.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="md:hidden flex flex-col gap-3 p-4">
          {sortedTickets.map((t, i) => (
            <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3" onClick={() => onNavigate(`/ticket_details?id=${t.id}`)}>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px]"><CopyId id={t.id} type="ticket" /></span>
                  <div className="font-medium text-text-primary">{t.subject}</div>
                </div>
                <Badge variant={getStatusBadgeVariant(t.status)} showDot>
                  {t.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-xs text-text-secondary">
                <span>{t.requestor}</span>
                <span className="font-mono text-text-muted">{t.created}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border-subtle">
                <Badge variant={t.priority === 'Critical' ? 'error' : t.priority === 'High' ? 'warning' : t.priority === 'Medium' ? 'brand' : 'neutral'}>
                  {t.priority}
                </Badge>
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded border border-border-default bg-bg-page flex items-center justify-center text-[9px] font-bold text-text-primary">
                     {t.assignee.charAt(0)}
                   </div>
                   <span className="text-[11px]">{t.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        {isFilterDrawerOpen && <FilterDrawer onClose={() => setIsFilterDrawerOpen(false)} onApply={() => setIsFilterDrawerOpen(false)} onSaveAndSearch={() => setIsFilterDrawerOpen(false)} />}
        <Pagination 
          totalItems={sortedTickets.length} 
          itemsPerPage={pageSize} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}

