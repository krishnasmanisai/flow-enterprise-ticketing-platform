import { useState } from 'react';
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
  ArrowUpDown, Monitor
} from 'lucide-react';
import { Page } from '../types';
import Pagination from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FilterDrawer } from '../components/FilterDrawer';
import { CopyId } from '../components/ui/CopyId';

export default function MyTickets({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null });

  const tickets = [
    { src: 'mail', id: 'TKT-1088', status: 'Open', subject: 'Server down in eu-west-1', brand: 'Acme Corp', project: 'Internal IT', priority: 'Critical', pColor: 'red', sla: '12m remaining', assignee: 'John Doe', requestor: 'Alice B.', created: 'Oct 24, 09:30' },
    { src: 'desk', id: 'TKT-1085', status: 'In Progress', subject: 'Login API returning 500', brand: 'Globex', project: 'DevOps', priority: 'High', pColor: 'amber', sla: '2h remaining', assignee: 'System', requestor: 'Bob S.', created: 'Oct 24, 08:15' },
    { src: 'track', id: 'TKT-1081', status: 'Waiting for Customer', subject: 'How to update billing?', brand: 'Soylent', project: 'Billing', priority: 'Medium', pColor: 'blue', sla: 'Paused', assignee: 'Jane Smith', requestor: 'Charlie D.', created: 'Oct 23, 16:45' },
    { src: 'phone', id: 'TKT-1077', status: 'Resolved', subject: 'Password reset request', brand: 'Initech', project: 'Support', priority: 'Low', pColor: 'slate', sla: 'Resolved', assignee: 'John Doe', requestor: 'David E.', created: 'Oct 23, 11:20' },
    { src: 'mail', id: 'TKT-1070', status: 'Open', subject: 'Database backup failed', brand: 'Acme Corp', project: 'Operations', priority: 'High', pColor: 'amber', sla: '45m remaining', assignee: 'Unassigned', requestor: 'Eve F.', created: 'Oct 23, 09:10' },
  ];

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (!sortConfig.direction || !sortConfig.key) return 0;
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-text-primary tracking-tight">My Tickets</h1>
          <p className="text-sm text-text-secondary mt-1">Manage and track tickets assigned to you or your groups.</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        <button className="px-3 py-1.5 rounded-md bg-brand-500 text-bg-surface font-medium text-sm transition-colors flex items-center gap-2 shadow-sm border border-transparent whitespace-nowrap">
          All <span className="bg-bg-surface/20 text-bg-surface text-[11px] px-1.5 py-0.5 rounded-sm">124</span>
        </button>
        {['Open 42', 'In Progress 28', 'Waiting for Customer 15', 'Waiting for Support 9', 'On Hold 4', 'Reopened 2', 'Resolved 18'].map((status) => {
          const [label, count] = status.split(/(?=\s\d+$)/);
          return (
            <button key={label} className="px-3 py-1.5 rounded-md bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover hover:border-border-strong font-medium text-sm transition-colors flex items-center gap-2 border border-border-default shadow-sm whitespace-nowrap">
              {label} <span className="bg-bg-page text-text-muted border border-border-default text-[11px] px-1.5 py-0.5 rounded-sm">{count.trim()}</span>
            </button>
          );
        })}
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
              className="input-base w-full pl-9 h-9" 
            />
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
                    <Badge variant={t.status === 'Resolved' ? 'success' : t.status === 'In Progress' ? 'warning' : t.status === 'Open' ? 'info' : 'neutral'}>
                      {t.status}
                    </Badge>
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
                    <span className={`font-mono text-xs font-medium ${t.sla.includes('Remaining') ? 'text-text-primary' : t.sla.includes('Paused') || t.sla === 'Resolved' ? 'text-text-muted' : 'text-error-text'}`}>
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
        </div>

        <div className="md:hidden flex flex-col gap-3 p-4">
          {sortedTickets.map((t, i) => (
            <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3" onClick={() => onNavigate(`/ticket_details?id=${t.id}`)}>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px]"><CopyId id={t.id} type="ticket" /></span>
                  <div className="font-medium text-text-primary">{t.subject}</div>
                </div>
                <Badge variant={t.status === 'Resolved' ? 'success' : t.status === 'In Progress' ? 'warning' : t.status === 'Open' ? 'info' : 'neutral'}>
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
          totalItems={124} 
          itemsPerPage={pageSize} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}
