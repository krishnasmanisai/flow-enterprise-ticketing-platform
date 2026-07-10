import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, Lock, Download, Columns, ArrowUpDown } from 'lucide-react';
import { Page } from '../types';
import Pagination from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MultiSelectDropdown } from '../components/ui/MultiSelectDropdown';
import { CopyId } from '../components/ui/CopyId';

export default function TicketExplorer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedReporters, setSelectedReporters] = useState<string[]>([]);

  return (
    <div className="flex flex-col w-full bg-bg-page">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6 flex flex-col">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold text-text-primary tracking-tight">Jira Migration Archive</h1>
              <Badge variant="neutral" className="uppercase tracking-widest text-[9px] font-bold py-0.5">Archive</Badge>
            </div>
            <p className="text-sm text-text-secondary">
              Search, filter, and investigate migrated Jira ticket history.
            </p>
          </div>
        </div>

        <div className="card-base flex flex-col min-h-[400px]">
          {/* Search and Filters Area */}
          <div className="p-4 border-b border-border-default bg-bg-surface space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by Ticket ID and Ticket Summary" 
                  className="w-full h-11 pl-11 pr-4 bg-bg-page border border-border-default rounded-md text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm"
                />
              </div>
              <Button variant="primary" className="h-11 px-8">Search</Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-text-primary font-medium text-sm">
                <Filter className="w-4 h-4 text-text-muted" />
                Advanced Filters
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Project Key</label>
                  <MultiSelectDropdown options={['SIA', 'SEC', 'CORE']} selected={selectedProjects} onChange={setSelectedProjects} placeholder="Select Project" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Status</label>
                  <MultiSelectDropdown options={['Open', 'In Progress', 'Resolved']} selected={selectedStatuses} onChange={setSelectedStatuses} placeholder="Ticket Status" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Priority</label>
                  <MultiSelectDropdown options={['Critical', 'High', 'Medium', 'Low']} selected={selectedPriorities} onChange={setSelectedPriorities} placeholder="Ticket Priority" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Assignee</label>
                  <MultiSelectDropdown options={['John Doe', 'Jane Smith', 'SYS', 'AK']} selected={selectedAssignees} onChange={setSelectedAssignees} placeholder="Select Assigned To" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Reporter</label>
                  <MultiSelectDropdown options={['Alice', 'Bob']} selected={selectedReporters} onChange={setSelectedReporters} placeholder="Select Reporter" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Created From</label>
                  <div className="relative">
                    <input type="date" className="input-base w-full h-[36px] px-3 text-sm" placeholder="Creation Date" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Created To</label>
                  <div className="relative">
                    <input type="date" className="input-base w-full h-[36px] px-3 text-sm" placeholder="Creation Date" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Updated From</label>
                  <div className="relative">
                    <input type="date" className="input-base w-full h-[36px] px-3 text-sm" placeholder="Last Updated Date" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary tracking-wide">Updated To</label>
                  <div className="relative">
                    <input type="date" className="input-base w-full h-[36px] px-3 text-sm" placeholder="Last Updated Date" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" className="px-6">Reset Filters</Button>
                <Button variant="primary" className="px-6">Apply</Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-bg-surface">
            <table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">
              <thead>
              <tr className="border-b border-border-default bg-bg-page">
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group">
                    <div className="flex items-center gap-1">PROJECT <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group">
                    <div className="flex items-center gap-1">JIRA ID <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group">
                    <div className="flex items-center gap-1">SUMMARY <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group">
                    <div className="flex items-center gap-1">STATUS <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group">
                    <div className="flex items-center gap-1">PRIORITY <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group">
                    <div className="flex items-center gap-1">REPORTER <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group">
                    <div className="flex items-center gap-1">ASSIGNEE <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group text-center">
                    <div className="flex items-center justify-center gap-1">COMMENTS <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group text-right">
                    <div className="flex items-center justify-end gap-1">CREATED ON <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                  <th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] cursor-pointer hover:text-text-primary group text-right">
                    <div className="flex items-center justify-end gap-1">UPDATED ON <ArrowUpDown size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-bg-surface">
                <tr className="hover:bg-bg-surface-hover transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-bg-surface-hover" tabIndex={0} role="button" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('ticket_history'); } }} onClick={() => onNavigate('ticket_history')}>
                  <td className="px-3 py-3 font-mono text-xs text-text-secondary">SIA</td>
                  <td className="px-3 py-3"><span className="text-[11px]"><CopyId id="SIA-4092" type="jira" /></span></td>
                  <td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px]">Authentication gateway timeout during peak load times</div></td>
                  <td className="px-3 py-3">
                    <Badge variant="info">Open</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant="warning">High</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-text-secondary font-medium">John Doe</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-text-secondary font-medium">Alice Smith</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm text-text-secondary font-medium">3</span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-text-muted">Oct 24, 09:30</td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-text-muted">Oct 24, 10:15</td>
                </tr>
                <tr className="hover:bg-bg-surface-hover transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-bg-surface-hover" tabIndex={0} role="button" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('ticket_history'); } }} onClick={() => onNavigate('ticket_history')}>
                  <td className="px-3 py-3 font-mono text-xs text-text-secondary">SIA</td>
                  <td className="px-3 py-3"><span className="text-[11px]"><CopyId id="SIA-4088" type="jira" /></span></td>
                  <td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px]">Update dependency for internal cryptography module</div></td>
                  <td className="px-3 py-3">
                    <Badge variant="warning">In Progress</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant="brand">Medium</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-text-secondary font-medium">Alice Kumar</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-text-secondary font-medium">Bob Jones</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm text-text-secondary font-medium">1</span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-text-muted">Oct 23, 14:15</td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-text-muted">Oct 24, 09:00</td>
                </tr>
                <tr className="hover:bg-bg-surface-hover transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-bg-surface-hover" tabIndex={0} role="button" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('ticket_history'); } }} onClick={() => onNavigate('ticket_history')}>
                  <td className="px-3 py-3 font-mono text-xs text-text-secondary">SEC</td>
                  <td className="px-3 py-3"><span className="text-[11px]"><CopyId id="SEC-1102" type="jira" /></span></td>
                  <td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px] flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                    Review audit logs for anomalous cross-region data transfers</div>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant="success">Resolved</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant="error" className="bg-error-text text-bg-surface">Critical</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-text-secondary font-medium">System</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-text-secondary font-medium">Security Team</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm text-text-secondary font-medium">8</span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-text-muted">Oct 22, 11:00</td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-text-muted">Oct 23, 15:30</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination 
            totalItems={126} 
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
