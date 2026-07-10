import { useState } from 'react';
import { 
  Building, Folder, Users, Search, Filter, Plus, FileText, Download, UserPlus, 
  Settings as SettingsIcon, Check, MoreHorizontal, LayoutGrid, List, ArrowLeft
} from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';

export default function TeamManagement({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');

  return (
    <div className="flex flex-col w-full bg-bg-page">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => onNavigate('settings')} className="text-text-secondary hover:text-text-primary transition-colors">
                <ArrowLeft size={16} />
              </button>
              <h1 className="text-xl font-semibold text-text-primary tracking-tight">Team Explorer</h1>
            </div>
            <p className="text-sm text-text-secondary pl-6">Manage organizational hierarchy, roles, and user access across all tenants.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" icon={Download}>Export CSV</Button>
            <Button variant="primary" icon={UserPlus}>Invite User</Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-surface border border-border-default rounded-md p-2 shadow-sm">
          <div className="flex items-center gap-1 bg-bg-page p-1 rounded border border-border-default">
            <button 
              onClick={() => setViewMode('tree')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'tree' ? 'bg-bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              title="Tree View"
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border-r border-border-default pr-3">
              <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mr-1">View By:</span>
              <button className="px-3 py-1.5 bg-bg-surface-hover border border-border-default rounded text-xs font-semibold text-text-primary">Tenant</button>
              <button className="px-3 py-1.5 text-text-secondary hover:bg-bg-surface-hover rounded text-xs font-medium transition-colors">Project</button>
              <button className="px-3 py-1.5 text-text-secondary hover:bg-bg-surface-hover rounded text-xs font-medium transition-colors">User</button>
            </div>
            
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search organizations or users..." 
                className="input-base w-full pl-8 h-8 text-xs bg-bg-surface" 
              />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-bg-surface text-text-secondary" title="Filter">
              <Filter size={14} />
            </Button>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="bg-bg-page border border-border-default rounded-lg relative overflow-hidden flex flex-col items-center justify-start pt-16 pb-24 custom-scrollbar shadow-inner bg-[radial-gradient(var(--color-border-default)_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* Root Node */}
          <div className="flex flex-col items-center">
            <div className="bg-brand-500 text-bg-surface p-4 rounded-xl shadow-lg border border-brand-500 w-64 flex items-center gap-3 z-10 relative">
              <div className="w-10 h-10 rounded bg-bg-surface/10 flex items-center justify-center shrink-0"><Building size={20} /></div>
              <div>
                <p className="font-semibold text-sm leading-tight mb-1">Organization Root</p>
                <p className="text-[11px] font-mono opacity-80">2 Tenants • 156 Users</p>
              </div>
            </div>
            <div className="w-px h-8 bg-border-strong"></div>
          </div>

          {/* Tenants Row */}
          <div className="flex items-start">
            
            {/* Tenant 1 Branch */}
            <div className="flex flex-col items-center relative">
              <div className="absolute top-0 right-1/2 w-1/2 h-px bg-border-strong hidden"></div>
              <div className="absolute top-0 left-1/2 w-[220px] h-px bg-border-strong"></div>
              <div className="w-px h-8 bg-border-strong"></div>
              
              <div className="bg-bg-surface p-4 rounded-xl shadow-sm border border-border-default w-56 flex flex-col gap-3 relative z-10 hover:border-border-strong transition-colors cursor-pointer group">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-bg-page flex items-center justify-center border border-border-default"><Building size={16} className="text-text-secondary" /></div>
                  <p className="font-semibold text-sm text-text-primary group-hover:text-brand-500 transition-colors">EasyRewardz Demo</p>
                  <div className="w-2 h-2 rounded-full bg-success-text ml-auto"></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-text-secondary pt-2 border-t border-border-subtle">
                  <span className="flex items-center gap-1"><Folder size={12}/> 2 Projects</span>
                  <span className="flex items-center gap-1"><Users size={12}/> 45 Users</span>
                </div>
              </div>

              {/* Projects under Tenant 1 */}
              <div className="w-px h-8 bg-border-strong"></div>
              <div className="flex items-start">
                <div className="flex flex-col items-center relative">
                  <div className="absolute top-0 left-1/2 w-[180px] h-px bg-border-strong"></div>
                  <div className="w-px h-8 bg-border-strong"></div>
                  <div className="bg-bg-surface p-4 rounded-xl shadow-sm border border-border-default w-48 flex flex-col gap-2 relative z-10 hover:border-border-strong transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-bg-page flex items-center justify-center border border-border-default"><Folder size={14} className="text-text-secondary group-hover:text-brand-500" /></div>
                      <p className="font-semibold text-[13px] text-text-primary group-hover:text-brand-500 transition-colors">Core Platform</p>
                    </div>
                    <p className="text-[11px] font-mono text-text-muted pl-8">12 Active Users</p>
                  </div>
                  
                  {/* Users under Project 1 */}
                  <div className="w-px h-8 bg-border-strong"></div>
                  <div className="flex items-start relative">
                    <div className="absolute top-0 left-[80px] w-[160px] h-px bg-border-strong"></div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-px h-8 bg-border-strong"></div>
                      <div className="bg-bg-surface px-4 py-3 rounded-lg shadow-sm border-2 border-brand-500 w-40 flex items-center gap-3 relative z-10">
                        <div className="absolute -top-2.5 right-2 bg-brand-500 text-bg-surface text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Owner</div>
                        <div className="w-8 h-8 rounded-full bg-accent-blue text-bg-surface flex items-center justify-center font-bold text-xs shrink-0">RM</div>
                        <div>
                          <p className="font-semibold text-[13px] text-text-primary leading-tight">Rachit M.</p>
                          <p className="text-[10px] text-success-text flex items-center gap-1 font-medium"><Check size={8}/> Active</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center ml-10">
                      <div className="w-px h-8 bg-border-strong"></div>
                      <div className="bg-bg-surface px-4 py-3 rounded-lg shadow-sm border border-border-default w-40 flex items-center gap-3 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-bg-page text-text-secondary flex items-center justify-center font-bold text-xs shrink-0 border border-border-default">SJ</div>
                        <div>
                          <p className="font-semibold text-[13px] text-text-primary leading-tight">Sarah J.</p>
                          <p className="text-[10px] text-text-secondary">Manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center relative ml-12">
                  <div className="absolute top-0 right-1/2 w-[180px] h-px bg-border-strong"></div>
                  <div className="w-px h-8 bg-border-strong"></div>
                  <div className="bg-bg-surface p-4 rounded-xl shadow-sm border border-border-default w-48 flex flex-col gap-2 relative z-10 hover:border-border-strong transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-bg-page flex items-center justify-center border border-border-default"><Folder size={14} className="text-text-secondary group-hover:text-brand-500" /></div>
                      <p className="font-semibold text-[13px] text-text-primary group-hover:text-brand-500 transition-colors">Marketing Site</p>
                    </div>
                    <p className="text-[11px] font-mono text-text-muted pl-8">8 Active Users</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tenant 2 Branch */}
            <div className="flex flex-col items-center relative ml-24">
              <div className="absolute top-0 right-1/2 w-[220px] h-px bg-border-strong"></div>
              <div className="w-px h-8 bg-border-strong"></div>
              <div className="bg-bg-surface p-4 rounded-xl shadow-sm border border-border-default w-56 flex flex-col gap-3 relative z-10 hover:border-border-strong transition-colors cursor-pointer group">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-bg-page flex items-center justify-center border border-border-default"><Building size={16} className="text-text-secondary" /></div>
                  <p className="font-semibold text-sm text-text-primary group-hover:text-brand-500 transition-colors">Global Enterprise</p>
                  <div className="w-2 h-2 rounded-full bg-success-text ml-auto"></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-text-secondary pt-2 border-t border-border-subtle">
                  <span className="flex items-center gap-1"><Folder size={12}/> 5 Projects</span>
                  <span className="flex items-center gap-1"><Users size={12}/> 111 Users</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-10 left-10 flex flex-col bg-bg-surface border border-border-default rounded-md shadow-sm overflow-hidden z-20">
          <button className="p-2 text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary border-b border-border-default transition-colors"><Plus size={16} /></button>
          <button className="p-2 text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary border-b border-border-default transition-colors"><div className="w-3.5 h-0.5 bg-current mx-auto"></div></button>
          <button className="p-2 text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-colors"><SettingsIcon size={16} /></button>
        </div>

      </div>
    </div>
  );
}
