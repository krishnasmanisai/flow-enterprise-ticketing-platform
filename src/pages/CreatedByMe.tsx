import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Mail, MessageSquare, Phone, Globe, Eye, ChevronDown, Monitor, ArrowUpDown } from 'lucide-react';
import { Page } from '../types';
import Pagination from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FilterDrawer } from '../components/FilterDrawer';
import { CopyId } from '../components/ui/CopyId';

export default function CreatedByMe({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null });

  const tickets = [
    { src: 'mail', id: 'TKT-2001', status: 'Open', subject: 'Requesting access to production DB', brand: 'Internal', project: 'Internal IT', priority: 'High', sla: '12m remaining', assignee: 'Jane Smith', requestor: 'Alice B.', created: 'Oct 24, 09:30' },
    { src: 'track', id: 'TKT-1988', status: 'Resolved', subject: 'Laptop replacement request', brand: 'Internal', project: 'Internal IT', priority: 'Medium', sla: 'Resolved', assignee: 'IT Support', requestor: 'Alice B.', created: 'Oct 20, 14:15' },
    { src: 'desk', id: 'TKT-1945', status: 'In Progress', subject: 'Need new staging environment for Q4 project', brand: 'Internal', project: 'DevOps', priority: 'Medium', sla: '2d remaining', assignee: 'Alex DevOps', requestor: 'Alice B.', created: 'Oct 15, 11:00' },
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return <Badge variant="warning">{priority}</Badge>;
      case 'Medium': return <Badge variant="brand">{priority}</Badge>;
      case 'Low': return <Badge variant="neutral">{priority}</Badge>;
      default: return <Badge variant="neutral">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return <Badge variant="warning">{status}</Badge>;
      case 'In Progress': return <Badge variant="info">{status}</Badge>;
      case 'Resolved': return <Badge variant="success">{status}</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col w-full bg-bg-page">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-text-primary tracking-tight">Created By Me</h1>
            <p className="text-sm text-text-secondary mt-1">Track internal requests and tickets you have raised.</p>
          </div>
        </div>

        <div className="card-base flex flex-col min-h-[400px]">
          {/* Toolbar */}
          <div className="p-4 border-b border-border-default bg-bg-surface flex flex-wrap gap-4 justify-between items-center z-10">
            <div className="relative w-full xl:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search your tickets..." 
                className="input-base w-full pl-9 h-9" 
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
              <Button variant="outline" size="sm" icon={Filter} className="gap-1.5 bg-bg-page" onClick={() => setIsFilterDrawerOpen(true)}>
                Filters
              </Button>
              <div className="h-5 w-px bg-border-default mx-1 hidden sm:block"></div>
              {['Status', 'Project', 'Date Range'].map(filter => (
                <Button key={filter} variant="ghost" size="sm" className="gap-1.5 bg-bg-page border border-border-default h-8 text-text-secondary font-medium" onClick={() => setIsFilterDrawerOpen(true)}>
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
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group" onClick={() => handleSort('assignee')}>
                    <div className="flex items-center gap-1">ASSIGNEE <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'assignee' ? 'opacity-100 text-brand-500' : ''}`} /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group text-right" onClick={() => handleSort('created')}>
                    <div className="flex items-center justify-end gap-1">CREATED ON <ArrowUpDown size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig.key === 'created' ? 'opacity-100 text-brand-500' : ''}`} /></div>
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
                      {getStatusBadge(t.status)}
                    </td>
                    <td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px]" title={t.subject}>{t.subject}</div></td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{t.brand}</td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{t.project}</td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{t.requestor}</td>
                    <td className="px-3 py-3">
                      {getPriorityBadge(t.priority)}
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

              <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
                {sortedTickets.map((t, i) => (
                  <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3 cursor-pointer" onClick={() => onNavigate(`/ticket_details?id=${t.id}`)}>
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
                      <span className="text-[11px] text-text-secondary">{t.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>

          </div>
          
          {isFilterDrawerOpen && <FilterDrawer onClose={() => setIsFilterDrawerOpen(false)} onApply={() => setIsFilterDrawerOpen(false)} onSaveAndSearch={() => setIsFilterDrawerOpen(false)} />}

          <Pagination 
            totalItems={15} 
            itemsPerPage={pageSize} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}
