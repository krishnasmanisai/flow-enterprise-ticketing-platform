import { useState } from 'react';
import { ArrowLeft, ChevronDown, Check, Settings, Briefcase, Plus, Save, Clock, AlertTriangle, ChevronRight, Search } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { SearchableSelect } from '../components/ui/SearchableSelect';

export default function ClientDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState<'config' | 'sla'>('config');
  const [activeProject, setActiveProject] = useState('Project Alpha');
  const [activeRequestType, setActiveRequestType] = useState('Incidents');
  
  const requestTypes = [
    'Incidents', 'Service Requests', 'Access Requests', 'Bug Reports', 'Feature Requests'
  ];

  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma'];

  return (
    <div className="flex flex-col h-full w-full bg-bg-page">
      {/* Top Header */}
      <header className="bg-bg-surface border-b border-border-default px-6 py-4 flex items-center gap-4 shrink-0 shadow-sm sticky top-0 z-20">
        <button onClick={() => onNavigate('client_configuration')} className="text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center p-1.5 -ml-1.5 rounded-md hover:bg-bg-page">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight leading-none mb-1">Global Tech Solutions</h1>
          <p className="text-xs text-text-secondary">Client ID: #CL-8924 • Enterprise Plan</p>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Left Project Sidebar */}
        <div className="w-[280px] bg-bg-surface border-r border-border-default flex flex-col shrink-0 z-10">
          <div className="p-4 border-b border-border-default">
            <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-3">Projects</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full pl-9 pr-3 py-2 bg-bg-page border border-border-default rounded-md text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {projects.map((project) => (
              <button
                key={project}
                onClick={() => setActiveProject(project)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                  activeProject === project 
                    ? 'bg-brand-50 text-brand-700' 
                    : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${activeProject === project ? 'bg-brand-500' : 'bg-border-strong'}`} />
                {project}
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-border-default">
            <Button variant="outline" className="w-full justify-center" icon={Plus}>
              New Project
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-w-0 bg-bg-page overflow-y-auto">
          {/* Tabs */}
          <div className="px-8 pt-8 pb-4 border-b border-border-default bg-bg-surface sticky top-0 z-10">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-bold text-text-primary tracking-tight">{activeProject}</h2>
                  <p className="text-sm text-text-secondary mt-1">Manage configuration and SLA settings for this project</p>
               </div>
            </div>
            
            <div className="flex gap-6 mt-6">
              <button
                onClick={() => setActiveTab('config')}
                className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'config' ? 'border-brand-500 text-brand-600' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Configuration Overview
              </button>
              <button
                onClick={() => setActiveTab('sla')}
                className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'sla' ? 'border-brand-500 text-brand-600' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                SLA Settings
              </button>
            </div>
          </div>
          
          <div className="p-8 max-w-[1200px]">
            {activeTab === 'config' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Status Card */}
                <div className="card-base border-border-default overflow-hidden bg-bg-surface">
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-text-primary mb-1">Project Status</h3>
                      <p className="text-sm text-text-secondary">Project is currently active and processing tickets.</p>
                    </div>
                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-default after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-text"></div>
                      <span className="ml-3 text-sm font-semibold text-text-primary">Active</span>
                    </label>
                  </div>
                </div>

                {/* Configuration Summary */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary tracking-tight">Configuration Summary</h3>
                      <p className="text-xs text-text-secondary mt-1">Review the configured modules for this project. Last updated: Jul 2, 2026</p>
                    </div>
                    <Button variant="primary" size="sm" icon={Settings} onClick={() => onNavigate('project_configuration')}>
                      Edit Configuration
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card-base p-6 border-border-default bg-bg-surface flex flex-col justify-between hover:border-brand-300 transition-colors">
                      <div>
                        <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">Business Units</h4>
                        <div className="text-4xl font-bold text-text-primary tracking-tight mb-2">2</div>
                      </div>
                      <div className="pt-4 border-t border-border-default mt-4 flex items-center justify-between">
                         <span className="text-[11px] font-medium text-text-muted bg-bg-page px-2 py-1 border border-border-default rounded shadow-sm">Technology</span>
                         <span className="text-[11px] font-medium text-text-muted bg-bg-page px-2 py-1 border border-border-default rounded shadow-sm">Operations</span>
                      </div>
                    </div>
                    
                    <div className="card-base p-6 border-border-default bg-bg-surface flex flex-col justify-between hover:border-brand-300 transition-colors">
                      <div>
                        <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">Channels</h4>
                        <div className="text-4xl font-bold text-text-primary tracking-tight mb-2">3</div>
                      </div>
                      <div className="pt-4 border-t border-border-default mt-4 flex items-center gap-2 overflow-hidden">
                         <span className="text-[11px] font-medium text-text-muted bg-bg-page px-2 py-1 border border-border-default rounded shadow-sm whitespace-nowrap">Email</span>
                         <span className="text-[11px] font-medium text-text-muted bg-bg-page px-2 py-1 border border-border-default rounded shadow-sm whitespace-nowrap">Chat</span>
                         <span className="text-[11px] font-medium text-text-muted bg-bg-page px-2 py-1 border border-border-default rounded shadow-sm whitespace-nowrap">Portal</span>
                      </div>
                    </div>

                    <div className="card-base p-6 border-border-default bg-bg-surface flex flex-col justify-between hover:border-brand-300 transition-colors">
                      <div>
                        <h4 className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-4">Role Assignments</h4>
                        <div className="text-4xl font-bold text-text-primary tracking-tight mb-2">6</div>
                      </div>
                      <div className="pt-4 border-t border-border-default mt-4 flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                               <div key={i} className="w-6 h-6 rounded-full bg-brand-100 border-2 border-bg-surface flex items-center justify-center text-[9px] font-bold text-brand-700">U{i}</div>
                            ))}
                         </div>
                         <span className="text-xs font-semibold text-brand-600 cursor-pointer hover:text-brand-800 transition-colors">View All</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sla' && (
              <div className="h-full flex flex-col animate-in fade-in duration-300">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary tracking-tight">SLA Targets</h3>
                  <p className="text-sm text-text-secondary mt-1">Configure response and resolution time targets by request type.</p>
                </div>
                
                <div className="card-base flex flex-col md:flex-row overflow-hidden border-border-default bg-bg-surface min-h-[500px]">
                  {/* SLA Left Pane */}
                  <div className="w-full md:w-[260px] border-b md:border-b-0 md:border-r border-border-default shrink-0 flex flex-col bg-bg-page">
                    <div className="p-4 border-b border-border-default">
                      <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-widest">Request Type</h4>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-1">
                      {requestTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setActiveRequestType(type)}
                          className={`w-full text-left px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors flex items-center justify-between group ${
                            activeRequestType === type
                              ? 'bg-bg-surface text-text-primary shadow-sm border border-border-default'
                              : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'
                          }`}
                        >
                          {type}
                          {activeRequestType === type && <ChevronRight className="w-4 h-4 text-text-muted" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* SLA Right Pane */}
                  <div className="flex-1 p-8 flex flex-col bg-bg-surface">
                    <div className="flex justify-between items-start mb-8 pb-6 border-b border-border-default">
                      <div>
                        <h4 className="text-lg font-bold text-text-primary">{activeRequestType}</h4>
                        <p className="text-xs text-text-secondary mt-1">Define SLA targets specifically for {activeRequestType.toLowerCase()}.</p>
                      </div>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-default after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-text"></div>
                        <span className="ml-3 text-sm font-semibold text-text-primary">Enabled</span>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-3xl">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                             <Clock className="w-4 h-4 text-brand-600" />
                          </div>
                          <h5 className="text-sm font-semibold text-text-primary uppercase tracking-wider">First Response Time</h5>
                        </div>
                        <p className="text-xs text-text-secondary pl-10 -mt-2">Target time to send the first reply to the customer.</p>
                        
                        <div className="flex gap-3 pl-10 pt-2">
                          <input type="number" defaultValue={3} className="input-base w-24 text-center font-mono text-lg" />
                          <div className="flex-1">
                            <SearchableSelect 
                              value="Hours"
                              onChange={() => {}}
                              options={[
                                { label: 'Minutes', value: 'Minutes' },
                                { label: 'Hours', value: 'Hours' },
                                { label: 'Days', value: 'Days' }
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                             <AlertTriangle className="w-4 h-4 text-brand-600" />
                          </div>
                          <h5 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Resolution Time</h5>
                        </div>
                        <p className="text-xs text-text-secondary pl-10 -mt-2">Target time to fully resolve and close the ticket.</p>
                        
                        <div className="flex gap-3 pl-10 pt-2">
                          <input type="number" defaultValue={24} className="input-base w-24 text-center font-mono text-lg" />
                          <div className="flex-1">
                            <SearchableSelect 
                              value="Hours"
                              onChange={() => {}}
                              options={[
                                { label: 'Minutes', value: 'Minutes' },
                                { label: 'Hours', value: 'Hours' },
                                { label: 'Days', value: 'Days' }
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-8 flex justify-end border-t border-border-default">
                      <Button variant="primary" icon={Save}>
                        Save {activeRequestType} SLA
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
