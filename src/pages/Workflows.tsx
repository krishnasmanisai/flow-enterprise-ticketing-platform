import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Activity, ArrowLeft, Copy, Download, Trash2, Edit } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function Workflows({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState('All');

  const workflows = [
    { name: 'Flat Accrual Automation', status: 'Active', trigger: 'New Ticket Created', executions: 1254, createdOn: '26 May 2026', createdBy: 'Jane Doe', lastModified: '15 Aug 2026' },
    { name: '72 Hours Auto closure', status: 'Active', trigger: 'Time-Based (Cron)', executions: 4200, createdOn: '26 May 2026', createdBy: 'System', lastModified: '10 Aug 2026' },
    { name: 'SLA WFA', status: 'Active', trigger: 'SLA Breach', executions: 342, createdOn: '15 May 2026', createdBy: 'Alice Smith', lastModified: '12 Jul 2026' },
    { name: 'Auto-update VIP Status', status: 'Active', trigger: 'New Ticket Created', executions: 89, createdOn: '12 May 2026', createdBy: 'Bob Jones', lastModified: '01 Jun 2026' },
    { name: 'Copy_of_Leadhub', status: 'Draft', trigger: 'Ticket Updated', executions: 0, createdOn: '10 May 2026', createdBy: 'Jane Doe', lastModified: '10 May 2026' },
    { name: 'Status change when reply', status: 'Inactive', trigger: 'Customer Reply Received', executions: 840, createdOn: '05 May 2026', createdBy: 'Jane Doe', lastModified: '08 May 2026' },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => onNavigate('settings')} className="text-text-muted hover:text-text-primary transition-colors">
                <ArrowLeft size={16} />
              </button>
              <h1 className="text-xl font-semibold text-text-primary tracking-tight">Workflow Automation</h1>
            </div>
            <p className="text-sm text-text-secondary pl-6">Set up intelligent ticket routing, automated responses, and SLA triggers visually.</p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => onNavigate('edit_workflow')}>
            New Workflow
          </Button>
        </div>

        {/* Toolbar & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-default pb-4">
          <div className="flex items-center gap-1">
            {['All', 'Active', 'Inactive', 'Draft'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-bg-surface border border-border-default shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search workflows..." 
                className="input-base w-full pl-8 h-9 bg-bg-surface" 
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 bg-bg-surface" title="Filter">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        {/* List View */}
        <div className="bg-bg-surface border border-border-default rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm min-w-[900px]">
            <thead>
              <tr className="bg-bg-page border-b border-border-default">
                <th className="py-3 px-4 font-bold text-text-muted text-xs uppercase tracking-wider">Workflow Name</th>
                <th className="py-3 px-4 font-bold text-text-muted text-xs uppercase tracking-wider w-24">Status</th>
                <th className="py-3 px-4 font-bold text-text-muted text-xs uppercase tracking-wider">Trigger</th>
                <th className="py-3 px-4 font-bold text-text-muted text-xs uppercase tracking-wider text-right">Executions</th>
                <th className="py-3 px-4 font-bold text-text-muted text-xs uppercase tracking-wider">Created</th>
                <th className="py-3 px-4 font-bold text-text-muted text-xs uppercase tracking-wider">Last Modified</th>
                <th className="py-3 px-4 font-bold text-text-muted text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((wf, idx) => (
                <tr key={idx} className="border-b border-border-subtle hover:bg-bg-page transition-colors group">
                  <td className="py-3 px-4">
                    <button onClick={() => onNavigate('edit_workflow')} className="font-semibold text-text-primary hover:text-brand-600 transition-colors">
                      {wf.name}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={wf.status === 'Active'} readOnly />
                      <div className="w-9 h-5 bg-border-strong rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-default after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success-text"></div>
                    </label>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{wf.trigger}</td>
                  <td className="py-3 px-4 text-right font-mono text-text-primary font-medium">{wf.executions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-text-secondary text-xs">
                    <div>{wf.createdOn}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">by {wf.createdBy}</div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary text-xs">{wf.lastModified}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onNavigate('edit_workflow')} className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-surface-hover rounded" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-surface-hover rounded" title="Clone">
                        <Copy size={16} />
                      </button>
                      <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-surface-hover rounded" title="Export Reports">
                        <Download size={16} />
                      </button>
                      <button className="p-1.5 text-text-muted hover:text-error-text hover:bg-error-bg rounded" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {workflows.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-bg-page rounded-full flex items-center justify-center text-text-muted mb-4 border border-border-default">
                <Activity size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">No workflows yet</h3>
              <p className="text-text-secondary text-sm mb-6 max-w-sm">Automate your support process by building rules to resolve common issues automatically.</p>
              <Button variant="primary" icon={Plus} onClick={() => onNavigate('edit_workflow')}>Create New Workflow</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
