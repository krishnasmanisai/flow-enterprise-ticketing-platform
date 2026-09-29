import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, ChevronDown, Download, MessageSquare, Lock, ArrowUpRight, Calendar
} from 'lucide-react';
import { Page } from '../types';
import Pagination from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TaskFilterDrawer } from '../components/TaskFilterDrawer';
import { CopyId } from '../components/ui/CopyId';
import { DateRangeDropdown } from '../components/ui/DateRangeDropdown';

export default function Tasks({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [activeTab, setActiveTab] = useState('Assigned to Me');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Last 7 Days');

  const allTasks = [
    { id: 'TSK-597', source: 'Jira', client: 'Easyrewardz', linked: 'UNKN-26985', status: 'Closed', title: 'test Jira task', project: 'ELT', createdDate: 'Sep 15, 00:28', createdBy: 'Ankita Verma', assignee: 'Vanaparthy Mani Sai Guptha', priority: 'Urgent', icon: 'message' },
    { id: '25', source: 'Jira', client: 'Easyrewardz', linked: '-', status: 'Not Started', title: 'test from flow', project: '-', createdDate: 'Jul 09, 10:30', createdBy: 'Ankita Verma', assignee: 'Ankita Verma', priority: 'Medium', icon: 'message' },
    { id: '23', source: 'Jira', client: 'Easyrewardz', linked: '-', status: 'Canceled', title: 'Test data', project: '-', createdDate: 'Jul 06, 14:15', createdBy: 'Ankita Verma', assignee: 'Ankita Verma', priority: 'High', icon: 'message' },
    { id: '20', source: 'Jira', client: 'Easyrewardz', linked: '-', status: 'Waiting for support', title: 'test', project: '-', createdDate: 'Jul 02, 11:00', createdBy: 'Ankita Verma', assignee: 'Megha Kumari', priority: 'Low', icon: 'lock' },
    { id: 'TSK-8493', source: 'Jira', client: 'Global Enterprise', linked: 'TKT-1090', status: 'To Do', title: 'Fix broken links in documentation', project: 'Core Platform', createdDate: 'Jul 01, 09:30', createdBy: 'Bob S.', assignee: 'Me', priority: 'Medium', icon: 'message' },
    { id: 'TSK-8494', source: 'Internal', client: 'Easyrewardz', linked: '-', status: 'In Progress', title: 'Review Q4 Marketing Plan', project: 'Marketing', createdDate: 'Jun 30, 16:45', createdBy: 'Charlie D.', assignee: 'Me', priority: 'High', icon: 'message' },
    { id: 'TSK-8495', source: 'Internal', client: 'Acme Corp', linked: 'TKT-1100', status: 'Done', title: 'Set up new employee workstation', project: '-', createdDate: 'Jun 25, 13:20', createdBy: 'Me', assignee: 'David E.', priority: 'Medium', icon: 'message' },
  ];

  const tasks = allTasks.filter(task => {
      if (activeTab === 'Raised by Me') return task.createdBy === 'Me';
      if (activeTab === 'Assigned to Me') return task.assignee === 'Me';
      return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'To Do':
      case 'Not Started': return <Badge variant="info">{status}</Badge>;
      case 'In Progress': return <Badge variant="brand">{status}</Badge>;
      case 'Waiting for support': return <Badge variant="warning">{status}</Badge>;
      case 'Done': return <Badge variant="success">{status}</Badge>;
      case 'Canceled': return <Badge variant="error">{status}</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col w-full bg-bg-page">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6 flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-text-primary tracking-tight">Tasks</h1>
            <p className="text-sm text-text-secondary mt-1">Track follow-ups, internal work, and ticket-related actions.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 z-40">
              <DateRangeDropdown value={dateRange} onChange={setDateRange} />
            </div>
            <Button variant="primary" icon={Plus}>Add Task</Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="card-base flex flex-col min-h-[400px]">
          {/* Tabs */}
          <div className="flex border-b border-border-default bg-bg-surface overflow-x-auto custom-scrollbar">
            {['Raised by Me', 'Assigned to Me', 'All Tasks'].map((tab, i) => {
              const isActive = tab === activeTab;
              return (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                    isActive 
                      ? 'border-brand-500 text-text-primary' 
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                  }`}
                >
                  {tab}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-sm font-mono border ${
                    isActive ? 'bg-bg-page border-border-strong text-text-primary' : 'bg-bg-page border-border-default text-text-muted'
                  }`}>
                    {allTasks.filter(task => tab === 'Raised by Me' ? task.createdBy === 'Me' : tab === 'Assigned to Me' ? task.assignee === 'Me' : true).length}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Toolbar */}
          <div className="p-3 border-b border-border-default bg-bg-surface flex flex-wrap items-center gap-3 justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search task name, ID..." 
                className="input-base w-full pl-9 h-9" 
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
              <Button variant="outline" size="sm" icon={Filter} className="gap-1.5 bg-bg-page" onClick={() => setIsFilterDrawerOpen(true)}>
                Filters
              </Button>
              <div className="h-5 w-px bg-border-default mx-1 hidden sm:block"></div>
              {['Client Name', 'Project', 'Task Status', 'Assign To', 'Task Priority', 'Date Range'].map(filter => (
                <Button key={filter} variant="ghost" size="sm" className="gap-1.5 bg-bg-page border border-border-default h-8 text-text-secondary font-medium" onClick={() => setIsFilterDrawerOpen(true)}>
                  {filter} <ChevronDown size={14} className="text-text-muted" />
                </Button>
              ))}
              <div className="h-5 w-px bg-border-default mx-1 hidden sm:block"></div>
              <Button variant="ghost" size="sm" icon={Download} className="bg-bg-page border border-border-default shadow-sm h-8 font-medium">Export</Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-bg-surface">
            <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
              <thead>
              <tr className="border-b border-border-default bg-bg-page">
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">TASK ID</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">SOURCE</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">CLIENT</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">TICKET ID</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] text-center">TASK STATUS</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">TASK TITLE</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">PROJECT</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">CREATED DATE</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">CREATED BY</th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]">ASSIGNEE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {tasks.map((task, i) => (
                  <tr 
                    key={i} 
                    className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${i % 2 !== 0 ? 'bg-bg-surface-alt' : ''}`} tabIndex={0} role="button" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(`/task_details?id=${task.id}`); } }} onClick={() => onNavigate(`/task_details?id=${task.id}`)}
                  >
                    <td className="px-3 py-3"><span className="text-[11px]"><CopyId id={task.id} type="task" /></span></td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{task.source}</td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{task.client}</td>
                    <td className="px-3 py-3" onClick={(e) => {
                        if (task.linked !== '-') {
                            e.stopPropagation();
                            onNavigate(`/ticket_details?id=${task.linked}`);
                        }
                    }}>
                      {task.linked !== '-' ? (
                        <span className="text-[11px] text-brand-500"><CopyId id={task.linked} type="ticket" className="text-brand-500" /></span>
                      ) : (
                        <span className="text-text-muted pl-2">-</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs font-medium text-text-primary truncate max-w-[240px]" title={task.title}>{task.title}</div>
                    </td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{task.project}</td>
                    <td className="px-3 py-3"><span className="text-[11.5px] text-text-muted font-mono">{task.createdDate}</span></td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{task.createdBy}</td>
                    <td className="px-3 py-3 text-[11.5px] text-text-secondary">{task.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>

              <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
                {tasks.map((t, i) => (
                  <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3 cursor-pointer" onClick={() => onNavigate(`/task_details?id=${t.id}`)}>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px]"><CopyId id={t.id} type="task" /></span>
                        <div className="font-medium text-text-primary">{t.title}</div>
                      </div>
                      <Badge variant={t.status === 'Completed' ? 'success' : t.status === 'In Progress' ? 'warning' : 'neutral'}>
                        {t.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-secondary mt-1">
                      <span>{t.client}</span>
                      <span className="font-mono text-text-muted">{t.createdDate}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border-subtle text-[11px] text-text-secondary">
                      <span>Ticket: {t.linked}</span>
                      <span>•</span>
                      <span>{t.source}</span>
                    </div>
                  </div>
                ))}
              </div>

          </div>
          
          {isFilterDrawerOpen && <TaskFilterDrawer onClose={() => setIsFilterDrawerOpen(false)} onApply={() => setIsFilterDrawerOpen(false)} onSaveAndSearch={() => setIsFilterDrawerOpen(false)} />}

          <Pagination 
            totalItems={48} 
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
