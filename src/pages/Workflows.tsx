import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Activity, ArrowLeft } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function Workflows({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState('All');

  const workflows = [
    { name: '72 Hours Auto closure', status: 'Active', description: 'Ticket will be Auto closed post 72 hours of no response from Customer', executions: 26, createdOn: '26 May 2026' },
    { name: 'GMB flow', status: 'Active', description: 'GMB flow integration setup', executions: 1, createdOn: '30 Jan 2026' },
    { name: 'SLA WFA', status: 'Active', description: 'SLA automated warning generation', executions: 3, createdOn: '15 May 2026' },
    { name: 'Auto-update Status', status: 'Active', description: 'Automatically changes ticket status from New to Pending when a ticket from VIP is received.', executions: 4, createdOn: '12 May 2026' },
    { name: 'Copy_of_Leadhub', status: 'Draft', description: 'Leadhub clone', executions: 0, createdOn: '10 May 2026' },
    { name: 'Status change when reply', status: 'Inactive', description: 'Status change when customer response received', executions: 12, createdOn: '05 May 2026' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success-text';
      case 'Inactive': return 'bg-error-text';
      case 'Draft': return 'bg-text-muted';
      default: return 'bg-border-strong';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge variant="success" className="uppercase tracking-widest text-[9px] font-bold">Active</Badge>;
      case 'Inactive': return <Badge variant="error" className="uppercase tracking-widest text-[9px] font-bold">Inactive</Badge>;
      case 'Draft': return <Badge variant="neutral" className="uppercase tracking-widest text-[9px] font-bold">Draft</Badge>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col w-full">
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
            <p className="text-sm text-text-secondary pl-6">Set up intelligent ticket routing, automated responses, and SLA triggers.</p>
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {workflows.map((wf, idx) => (
            <div key={idx} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('edit_workflow'); } }} className="card-base flex flex-col relative overflow-hidden group hover:border-border-strong transition-all h-[240px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" onClick={() => onNavigate('edit_workflow')}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(wf.status)}`}></div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-semibold text-text-primary text-[15px] truncate group-hover:text-brand-500 transition-colors">{wf.name}</h3>
                  {getStatusBadge(wf.status)}
                </div>
                
                <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-4">
                  {wf.description}
                </p>
                
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Executions</div>
                    <div className="text-2xl font-bold text-text-primary font-mono tracking-tight">{wf.executions.toLocaleString()}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-bg-page border border-border-default flex items-center justify-center text-text-muted shadow-sm group-hover:bg-bg-surface-active group-hover:text-text-primary transition-colors">
                    <Activity size={14} />
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-border-default bg-bg-page flex justify-between items-center text-xs">
                <span className="text-text-secondary font-medium">
                  Created: <span className="text-text-primary font-mono">{wf.createdOn}</span>
                </span>
                <button className="text-text-muted hover:text-text-primary transition-colors focus:outline-none" onClick={(e) => { e.stopPropagation(); }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
