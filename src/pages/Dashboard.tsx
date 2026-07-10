import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ticket, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Download, 
  SlidersHorizontal,
  ArrowDownUp,
  MessageSquare,
  HelpCircle,
  MoreHorizontal, X, Users,
  ArrowUpDown, Mail, Phone, Monitor, Globe
} from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { DateRangeDropdown } from '../components/ui/DateRangeDropdown';
import { MultiSelectDropdown } from '../components/ui/MultiSelectDropdown';
import { SearchableSelect } from '../components/ui/SearchableSelect';
import { Badge } from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import { FilterDrawer } from '../components/FilterDrawer';
import { CopyId } from '../components/ui/CopyId';
import { RichTextEditor } from '../components/ui/RichTextEditor';

export default function Dashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [isBulkAssignOpen, setIsBulkAssignOpen] = useState(false);
  const [bulkAssignAgent, setBulkAssignAgent] = useState('');
  const [bulkAssignComment, setBulkAssignComment] = useState('');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null });

  const recentTickets = [
    { id: 'TKT-1088', title: 'Cannot access production database', priority: 'High', status: 'Open', assignee: 'John Doe', brand: 'Acme Corp', project: 'Internal IT', tasks: 3, breach: true, src: 'mail', requestor: 'Alice B.', created: 'Oct 24, 09:30' },
    { id: 'TKT-1089', title: 'API returning 500 errors', priority: 'Critical', status: 'In Progress', assignee: 'Jane Smith', brand: 'Globex', project: 'DevOps', tasks: 1, breach: false, src: 'phone', requestor: 'Bob S.', created: 'Oct 23, 14:15' },
    { id: 'TKT-1090', title: 'Update billing information', priority: 'Medium', status: 'Resolved', assignee: 'System', brand: 'Initech', project: 'Billing', tasks: 0, breach: false, src: 'desk', requestor: 'Charlie D.', created: 'Oct 22, 11:00' },
    { id: 'TKT-1091', title: 'Feature request: Export to PDF', priority: 'Low', status: 'Open', assignee: 'Unassigned', brand: 'Soylent', project: 'Product', tasks: 0, breach: false, src: 'track', requestor: 'David E.', created: 'Oct 21, 10:30' },
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

  const sortedTickets = [...recentTickets].sort((a, b) => {
    if (!sortConfig.direction || !sortConfig.key) return 0;
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const stats = [
    { label: 'All Tickets', value: '1,248', borderColor: 'border-brand-500', valueColor: 'text-text-primary' },
    { label: 'Open', value: '452', borderColor: 'border-info-text', valueColor: 'text-text-primary' },
    { label: 'Due Today', value: '86', borderColor: 'border-warning-text', valueColor: 'text-text-primary' },
    { label: 'Overdue', value: '24', borderColor: 'border-error-text', valueColor: 'text-error-text' },
    { label: 'Re-opened', value: '12', borderColor: 'border-text-muted', valueColor: 'text-text-primary' },
    { label: 'Unassigned', value: '45', borderColor: 'border-success-text', valueColor: 'text-text-primary' },
  ];

  const toggleTicket = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTickets(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedTickets.length === recentTickets.length) setSelectedTickets([]);
    else setSelectedTickets(recentTickets.map(t => t.id));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return <Badge variant="error" showDot>Critical</Badge>;
      case 'High': return <Badge variant="warning" showDot>High</Badge>;
      case 'Medium': return <Badge variant="brand" showDot>Medium</Badge>;
      case 'Low': return <Badge variant="neutral" showDot>Low</Badge>;
      default: return <Badge variant="neutral">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return <Badge variant="info">Open</Badge>;
      case 'In Progress': return <Badge variant="warning">In Progress</Badge>;
      case 'Resolved': return <Badge variant="success">Resolved</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-text-primary tracking-tight">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">Overview of your support operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-40 z-50">
            <MultiSelectDropdown 
              options={['Acme Corp', 'Globex', 'Soylent', 'Initech']} 
              selected={selectedBrands} 
              onChange={setSelectedBrands} 
              placeholder="All Brands"
              selectedSuffix="brands selected"
            />
          </div>
          <div className="w-40 z-50">
            <DateRangeDropdown 
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-bg-surface rounded-xl border-l-[3px] ${stat.borderColor} shadow-sm px-4 py-3 hover:shadow-md transition-colors cursor-pointer hover:bg-bg-surface-hover`} onClick={() =>  void ('Filtered by KPI:', stat.label)}>
            <div className={`text-xl font-semibold ${stat.valueColor}`}>{stat.value}</div>
            <div className="text-[11px] text-text-tertiary uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts placeholder (simplified for styling structure) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-bg-surface rounded-xl shadow-sm p-4">
          <div className="text-xs font-medium text-text-primary mb-3">Status distribution</div>
          <div className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-bg-surface-hover p-1 rounded transition-colors" onClick={() =>  void ("Filtered by status")}>
            <div className="text-[10px] text-text-tertiary w-9">New</div>
            <div className="flex-1 h-2 rounded-full bg-brand-50"><div className="w-4/5 h-full rounded-full bg-brand-500"></div></div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-bg-surface-hover p-1 rounded transition-colors" onClick={() =>  void ("Filtered by status")}>
            <div className="text-[10px] text-text-tertiary w-9">Open</div>
            <div className="flex-1 h-2 rounded-full bg-brand-50"><div className="w-[35%] h-full rounded-full bg-brand-300"></div></div>
          </div>
        </div>
        
        <div className="bg-bg-surface rounded-xl shadow-sm p-4">
          <div className="text-xs font-medium text-text-primary mb-3">Ticket source</div>
          <div className="flex items-end gap-3 h-16">
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-12 rounded-sm bg-teal-500"></div>
              <div className="text-[10px] text-text-muted">Calls</div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-5 rounded-sm bg-teal-100"></div>
              <div className="text-[10px] text-text-muted">Chat</div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface rounded-xl shadow-sm p-4 flex flex-col items-center">
          <div className="text-xs font-medium text-text-primary self-start mb-3">Priority</div>
          <div className="w-[76px] h-[76px] rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(var(--color-brand-500) 0% 65%, var(--color-amber-500) 65% 100%)' }}>
            <div className="w-11 h-11 rounded-full bg-bg-surface"></div>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1 text-[10px] text-text-tertiary"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>Medium</div>
            <div className="flex items-center gap-1 text-[10px] text-text-tertiary"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Auto</div>
          </div>
        </div>
      </div>

      
      {/* Bulk Action Banner */}
      {selectedTickets.length > 0 && (
        <div className="bg-bg-surface border border-brand-500/30 shadow-md rounded-lg p-3 flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 relative z-10 -mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-brand-50 text-brand-600 text-xs font-bold px-2 py-1 rounded">
              {selectedTickets.length} Selected
            </div>
            <span className="text-sm font-medium text-text-primary">tickets selected</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedTickets([])}>Cancel</Button>
            <Button variant="primary" size="sm" icon={Users}
 onClick={() => setIsBulkAssignOpen(true)}>
              Bulk Assign
            </Button>
          </div>
        </div>
      )}

      {/* Temp */}
      <div className="card-base flex flex-col">
        <div className="p-4 border-b border-border-default flex flex-wrap items-center justify-between gap-4 bg-bg-surface">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search tickets by ID or Title..." 
              className="input-base w-full pl-9"
            />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-bg-surface-hover p-1 rounded transition-colors" onClick={() =>  void ("Filtered by status")}>
            <Button variant="outline" size="sm" icon={SlidersHorizontal} onClick={() => setIsFilterDrawerOpen(true)}>
              Filters
            </Button>
            <Button variant="outline" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
            
            <thead>
              <tr className="border-b border-border-default bg-bg-page">
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] text-center w-12" onClick={() => handleSort('src')}>
                  SRC
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-1">ID <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'id' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('title')}>
                  <div className="flex items-center gap-1">Title <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'title' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('requestor')}>
                  <div className="flex items-center gap-1">Requestor <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'requestor' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('priority')}>
                  <div className="flex items-center gap-1">Priority <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'priority' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">Status <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'status' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('assignee')}>
                  <div className="flex items-center gap-1">Assignee <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'assignee' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('brand')}>
                  <div className="flex items-center gap-1">Brand <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'brand' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('project')}>
                  <div className="flex items-center gap-1">Project <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'project' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
                <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('created')}>
                  <div className="flex items-center gap-1">Created On <ArrowUpDown size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'created' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {sortedTickets.map((ticket, index) => (
                
                <tr key={ticket.id} tabIndex={0} role="button" aria-label={`View ticket ${ticket.id}`} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onNavigate(`/ticket_details?id=${ticket.id}`) }} className={`hover:bg-bg-surface-hover focus-visible:outline-none focus-visible:bg-bg-surface-hover transition-colors group cursor-pointer ${index % 2 !== 0 ? 'bg-bg-surface-alt' : ''} ${selectedTickets.includes(ticket.id) ? 'bg-brand-50/50' : ''}`} onClick={() => onNavigate(`/ticket_details?id=${ticket.id}`)}>
                  <td className="px-3 py-2 text-center text-text-muted group/src relative">
                    {ticket.src === 'mail' && <Mail size={14} className="mx-auto" />}
                    {ticket.src === 'phone' && <Phone size={14} className="mx-auto" />}
                    {ticket.src === 'desk' && <Monitor size={14} className="mx-auto" />}
                    {ticket.src === 'track' && <Globe size={14} className="mx-auto" />}
                    
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 bg-text-primary text-bg-surface text-[10px] rounded opacity-0 group-hover/src:opacity-100 pointer-events-none whitespace-nowrap z-20">
                      {ticket.src === 'mail' && 'Email'}
                      {ticket.src === 'phone' && 'Call'}
                      {ticket.src === 'desk' && 'Customer Portal (Desk)'}
                      {ticket.src === 'track' && 'Track Portal'}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[11px]"><CopyId id={ticket.id} type="ticket" /></span>
                  </td>
                  <td className="px-3 py-3 max-w-[240px]">
                    <div className="text-xs font-medium text-text-primary truncate" title={ticket.title}>{ticket.title}</div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[11.5px] text-text-secondary">{ticket.requestor}</span>
                  </td>
                  <td className="px-3 py-3">{getPriorityBadge(ticket.priority)}</td>
                  <td className="px-3 py-3">{getStatusBadge(ticket.status)}</td>
                  <td className="px-3 py-3">
                    <span className="text-[11.5px] text-text-secondary">{ticket.assignee}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[11.5px] text-text-secondary">{ticket.brand}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[11.5px] text-text-secondary">{ticket.project}</span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className="text-[11.5px] text-text-muted font-mono">{ticket.created}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
          {sortedTickets.map((ticket, i) => (
            <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3 cursor-pointer" onClick={() =>  void ('Open ticket', ticket.id)}>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px]"><CopyId id={ticket.id} type="ticket" /></span>
                  <div className="font-medium text-text-primary text-sm">{ticket.title}</div>
                </div>
                {getStatusBadge(ticket.status)}
              </div>
              <div className="flex justify-between items-center text-xs text-text-secondary">
                <span>{ticket.requestor} • {ticket.brand}</span>
                <span className="font-mono text-text-muted">{ticket.created}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border-subtle">
                {getPriorityBadge(ticket.priority)}
                <span className="text-xs text-text-secondary">{ticket.assignee}</span>
              </div>
            </div>
          ))}
        </div>

        
        <Pagination 
          totalItems={48} 
          itemsPerPage={pageSize} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {isFilterDrawerOpen && (
        <FilterDrawer 
          onClose={() => setIsFilterDrawerOpen(false)}
          onApply={(filters) =>  void ('Applied filters:', filters)}
          onSaveAndSearch={(filters) =>  void ('Saved and searched filters:', filters)}
        />
      )}

      {isBulkAssignOpen && (
        <>
          <div className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-[60] transition-opacity animate-in fade-in duration-200" onClick={() => setIsBulkAssignOpen(false)} />
          <div role="dialog" aria-modal="true" aria-labelledby="bulk-assign-title" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-bg-page shadow-2xl z-[70] rounded-xl flex flex-col animate-in zoom-in-95 duration-200 border border-border-strong">
            <div className="px-5 py-4 border-b border-border-default flex items-center justify-between bg-bg-surface rounded-t-xl">
              <div>
                <h2 id="bulk-assign-title" className="text-base font-semibold text-text-primary tracking-tight">Bulk Assign Tickets</h2>
                <p className="text-xs text-text-secondary mt-0.5">Assign {selectedTickets.length} tickets to an agent</p>
              </div>
              <button onClick={() => setIsBulkAssignOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary">Assign To Agent</label>
                <SearchableSelect 
                  value={bulkAssignAgent}
                  onChange={setBulkAssignAgent}
                  placeholder="Select an agent..."
                  options={[
                    { label: 'Select an agent...', value: '' },
                    { label: 'John Doe (Support)', value: 'john' },
                    { label: 'Jane Smith (IT)', value: 'jane' },
                    { label: 'System Queue', value: 'system' }
                  ]}
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary">Add Comment (Optional)</label>
                <RichTextEditor content={bulkAssignComment} onChange={setBulkAssignComment} placeholder="E.g. Reassigned as part of the daily triage." minHeight="min-h-[100px]" />
              </div>
            </div>

            <div className="p-4 border-t border-border-default bg-bg-surface rounded-b-xl flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsBulkAssignOpen(false)}>Cancel</Button>
              <Button variant="primary" disabled={!bulkAssignAgent} onClick={() => {
                 void ('Bulk assigned to:', bulkAssignAgent, 'Comment:', bulkAssignComment, 'Tickets:', selectedTickets);
                setIsBulkAssignOpen(false);
                setSelectedTickets([]);
                setBulkAssignAgent('');
                setBulkAssignComment('');
              }}>
                Confirm Assignment
              </Button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
