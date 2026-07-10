import { useState } from 'react';
import { Search, Plus, Filter, FileText, Download, Mail, Trash2, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import { Page } from '../types';
import Pagination from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

import { GenerateReportDrawer } from './GenerateReportDrawer';

export default function Reports({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const reports = [
    { name: 'DefaultReport11', type: 'CSV', dateRange: 'Jul 01, 2026 -\nJul 03, 2026', requestedBy: 'Anoop', createdDate: 'Jul 3, 2026,\n08:09 PM', status: 'Ready' },
    { name: 'TotalCreateTicket', type: 'CSV', dateRange: 'Jun 01, 2026 -\nJun 30, 2026', requestedBy: 'Anoop', createdDate: 'Jul 3, 2026,\n05:30 PM', status: 'Processing' },
    { name: 'report', type: 'Excel', dateRange: 'Jun 21, 2026 -\nJun 30, 2026', requestedBy: 'System', createdDate: 'Jun 30, 2026,\n04:58 PM', status: 'Ready' },
    { name: 'SLA_Breach_Q2', type: 'PDF', dateRange: 'Apr 01, 2026 -\nJun 30, 2026', requestedBy: 'Jane Smith', createdDate: 'Jul 1, 2026,\n09:00 AM', status: 'Ready' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ready': 
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-success-bg text-success-text border border-success-text/20">
            <Check className="w-3 h-3" strokeWidth={3} /> Ready
          </span>
        );
      case 'Processing': 
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-info-bg text-info-text border border-info-text/20">
            <RefreshCw className="w-3 h-3 animate-spin" strokeWidth={3} /> Processing
          </span>
        );
      default: 
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col w-full bg-bg-page">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => onNavigate('settings')} className="text-text-secondary hover:text-text-primary transition-colors">
                <ArrowLeft size={16} />
              </button>
              <h1 className="text-xl font-semibold text-text-primary tracking-tight">Reports & Dashboards</h1>
            </div>
            <p className="text-sm text-text-secondary pl-6">Generate and manage data exports for your organization.</p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setIsGenerateOpen(true)}>
            Generate New Report
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-default pb-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="input-base w-full pl-9 h-9 bg-bg-surface" 
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 bg-bg-surface text-text-secondary" title="Filter">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <div className="card-base flex flex-col min-h-[400px]">
          <div className="overflow-x-auto bg-bg-surface">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-bg-page text-xs font-semibold text-text-secondary tracking-wider sticky top-0 border-b border-border-default z-10">
                <tr>
                  <th className="px-5 py-4">REPORT NAME</th>
                  <th className="px-5 py-4">TYPE</th>
                  <th className="px-5 py-4">DATE RANGE</th>
                  <th className="px-5 py-4">REQUESTED BY</th>
                  <th className="px-5 py-4">CREATED DATE</th>
                  <th className="px-5 py-4">STATUS</th>
                  <th className="px-5 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                {reports.map((report, i) => (
                  <tr key={i} className="hover:bg-bg-surface-hover transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-bg-page border border-border-default flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-text-muted" />
                        </div>
                        <span className="font-semibold text-text-primary">{report.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold font-mono bg-bg-page text-text-secondary border border-border-default uppercase tracking-wider">{report.type}</span>
                    </td>
                    <td className="px-5 py-4 text-xs font-mono text-text-secondary leading-relaxed whitespace-pre-wrap">
                      {report.dateRange}
                    </td>
                    <td className="px-5 py-4 font-medium text-text-secondary">{report.requestedBy}</td>
                    <td className="px-5 py-4 text-xs font-mono text-text-secondary leading-relaxed whitespace-pre-wrap">
                      {report.createdDate}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-text-muted hover:text-text-primary" disabled={report.status !== 'Ready'}>
                          <Download size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-text-muted hover:text-text-primary" disabled={report.status !== 'Ready'}>
                          <Mail size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-text-muted hover:text-error-text">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination 
            totalItems={20} 
            itemsPerPage={pageSize} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
      {isGenerateOpen && <GenerateReportDrawer onClose={() => setIsGenerateOpen(false)} />}
    </div>
  );
}
