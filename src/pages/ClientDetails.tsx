import { useState } from 'react';
import { ArrowLeft, ChevronDown, Check, Settings, Briefcase, Plus, Save, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { SearchableSelect } from '../components/ui/SearchableSelect';

// Mock EditConfigurationModal
import { EditConfigurationModal } from '../components/EditConfigurationModal';

export default function ClientDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState<'config' | 'sla'>('config');
  const [activeProject, setActiveProject] = useState('Project Alpha');
  const [activeRequestType, setActiveRequestType] = useState('Incidents');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const requestTypes = [
    'Incidents', 'Service Requests', 'Access Requests', 'Bug Reports', 'Feature Requests'
  ];

  return (
    <div className="flex flex-col h-full w-full bg-bg-page">
      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Left Project Sidebar */}
        <div className="w-[280px] bg-bg-surface border-r border-border-default flex flex-col shrink-0">
          <div className="p-4 border-b border-border-default">
            <button onClick={() => onNavigate('client_configuration')} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Clients
            </button>
          </div>
          
          <div className="p-5 pb-3">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest flex items-center justify-between">
              Projects
              <button className="p-1 hover:bg-bg-page rounded text-text-muted hover:text-text-primary transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto px-3 space-y-1">
            {['Project Alpha', 'Project Beta (Legacy)', 'Internal IT Ops'].map(proj => (
              <button
                key={proj}
                onClick={() => setActiveProject(proj)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors flex items-center justify-between group ${
                  activeProject === proj
                    ? 'bg-bg-page text-text-primary shadow-sm border border-border-default'
                    : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Briefcase className={`w-4 h-4 shrink-0 ${activeProject === proj ? 'text-brand-500' : 'text-text-muted group-hover:text-text-primary'}`} />
                  <span className="truncate">{proj}</span>
                </div>
                {activeProject === proj && (
                  <Check className="w-4 h-4 text-brand-500 shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-bg-page">
          {/* Header Tabs */}
          <div className="bg-bg-surface border-b border-border-default px-8 pt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-bg-page border border-border-default flex items-center justify-center shrink-0 shadow-sm">
                <Briefcase className="w-5 h-5 text-text-muted" />
              </div>
              <h1 className="text-xl font-semibold text-text-primary tracking-tight">{activeProject}</h1>
            </div>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('config')}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'config' 
                    ? 'border-brand-500 text-text-primary' 
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Configuration
              </button>
              <button
                onClick={() => setActiveTab('sla')}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'sla' 
                    ? 'border-brand-500 text-text-primary' 
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                SLA Settings
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'config' && (
              <div className="max-w-4xl space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-1 tracking-tight">Configuration - {activeProject}</h2>
                  <p className="text-sm text-text-secondary mb-6">Manage global settings for this specific project</p>
                  
                  <div className="card-base p-5 flex items-center justify-between border-border-default bg-bg-surface">
                    <div>
                      <h3 className="font-semibold text-sm text-text-primary mb-0.5">Project Status</h3>
                      <p className="text-xs text-text-secondary">Project is currently inactive and not processing tickets</p>
                    </div>
                    {/* Fake toggle switch */}
                    <div className="w-11 h-6 bg-bg-surface-alt border border-border-default rounded-full relative cursor-pointer opacity-80">
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-bg-surface rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Configuration Summary */}
                <div>
                  <div className="flex items-center justify-between mb-4 mt-8">
                    <div>
                      <h2 className="text-lg font-semibold text-text-primary tracking-tight">Configuration Summary</h2>
                      <p className="text-xs text-text-secondary mt-0.5">Last updated: Jul 2, 2026</p>
                    </div>
                    <Button variant="outline" size="sm" icon={Settings} onClick={() => setIsEditModalOpen(true)}>
                      Edit Configuration
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card-base p-6 border-border-default bg-bg-surface">
                      <h4 className="text-xs font-medium text-text-secondary mb-4 uppercase tracking-wider">Business Units</h4>
                      <div className="text-4xl font-semibold text-text-primary tracking-tight mb-2">2</div>
                      <p className="text-[11px] font-mono text-text-muted">Units configured</p>
                    </div>
                    
                    <div className="card-base p-6 border-border-default bg-bg-surface">
                      <h4 className="text-xs font-medium text-text-secondary mb-4 uppercase tracking-wider">Channels</h4>
                      <div className="text-4xl font-semibold text-text-primary tracking-tight mb-2">3</div>
                      <p className="text-[11px] font-mono text-text-muted truncate" title="email support, live chat, customer portal">email support, live chat...</p>
                    </div>

                    <div className="card-base p-6 border-border-default bg-bg-surface">
                      <h4 className="text-xs font-medium text-text-secondary mb-4 uppercase tracking-wider">Role Assignments</h4>
                      <div className="text-4xl font-semibold text-text-primary tracking-tight mb-2">6</div>
                      <p className="text-[11px] font-mono text-text-muted">Active assignments</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sla' && (
              <div className="max-w-5xl h-full flex flex-col">
                <h2 className="text-lg font-semibold text-text-primary mb-1 tracking-tight">SLA Settings - {activeProject}</h2>
                <p className="text-sm text-text-secondary mb-6">Configure response and resolution time targets by priority</p>
                
                <div className="card-base flex-1 flex overflow-hidden border-border-default bg-bg-surface min-h-[500px]">
                  {/* SLA Left Pane */}
                  <div className="w-[240px] border-r border-border-default shrink-0 flex flex-col bg-bg-page">
                    <div className="p-4 border-b border-border-default">
                      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Request Type</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
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
                  <div className="flex-1 p-8 flex flex-col relative">
                    <div className="flex justify-between items-start mb-8">
                      <div className="px-3 py-1 bg-bg-page border border-border-default rounded-md text-[11px] font-mono font-medium text-text-secondary shadow-sm">
                        {activeRequestType}
                      </div>
                      {/* Fake active toggle */}
                      <div className="w-11 h-6 bg-success-bg border border-success-text/20 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-success-text rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-8">
                      <Clock className="w-5 h-5 text-text-muted" />
                      <h2 className="text-lg font-semibold text-text-primary tracking-tight">SLA Targets</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 max-w-2xl">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-text-muted" /> FIRST RESPONSE TIME
                        </label>
                        <div className="flex gap-2">
                          <input type="text" defaultValue="3" className="input-base w-20 text-center font-mono" />
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
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-2">
                          <Clock className="w-3.5 h-3.5 text-text-muted" /> RESOLUTION TIME
                        </label>
                        <div className="flex gap-2">
                          <input type="text" defaultValue="24" className="input-base w-20 text-center font-mono" />
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
                    
                    <div className="absolute bottom-8 right-8">
                      <Button variant="primary" icon={Save}>
                        Save SLA Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
            
      {isEditModalOpen && (
        <EditConfigurationModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
