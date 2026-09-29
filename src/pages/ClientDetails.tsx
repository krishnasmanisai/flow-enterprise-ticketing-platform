import { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  Check, 
  Settings, 
  Briefcase, 
  Plus, 
  Save, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Search, 
  AlertCircle,
  Terminal,
  Copy,
  Eye,
  EyeOff,
  Code2,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { SearchableSelect } from '../components/ui/SearchableSelect';

export default function ClientDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState<'config' | 'sla' | 'lifecycle' | 'sandbox'>('config');
  const [activeProject, setActiveProject] = useState('Project Alpha');
  const [activeRequestType, setActiveRequestType] = useState('Incidents');

  // Sandbox state
  const [showSandboxPassword, setShowSandboxPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isTestingSandbox, setIsTestingSandbox] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestSandbox = () => {
    setIsTestingSandbox(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTestingSandbox(false);
      setTestResult('Handshake 200 OK: Connected to https://lpaaswebapi.easyrewardz.com/api/');
      setTimeout(() => setTestResult(null), 4000);
    }, 800);
  };

  // Ticket Lifecycle state per project
  const [projectLifecycleConfigs, setProjectLifecycleConfigs] = useState<Record<string, { enabled: boolean; days: number; unit: string }>>({
    'Project Alpha': { enabled: true, days: 2, unit: 'Days' },
    'Project Beta': { enabled: false, days: 3, unit: 'Days' },
    'Project Gamma': { enabled: true, days: 7, unit: 'Days' },
  });

  const [isAutoCloseEnabled, setIsAutoCloseEnabled] = useState(true);
  const [daysInput, setDaysInput] = useState('2');
  const [unit, setUnit] = useState('Days');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState('');
  
  const requestTypes = [
    'Incidents', 'Service Requests', 'Access Requests', 'Bug Reports', 'Feature Requests'
  ];

  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma'];

  const validateDays = (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Please enter a number of days.';
    }
    const num = Number(value);
    if (isNaN(num)) {
      return 'Please enter a valid number.';
    }
    if (!Number.isInteger(num)) {
      return 'Duration must be a whole number of days.';
    }
    if (num <= 0) {
      return 'Days must be a positive number greater than 0.';
    }
    return null;
  };

  const handleDaysChange = (val: string) => {
    setDaysInput(val);
    if (isAutoCloseEnabled) {
      setValidationError(validateDays(val));
    }
  };

  const handleToggleAutoClose = (checked: boolean) => {
    setIsAutoCloseEnabled(checked);
    if (!checked) {
      setValidationError(null);
    } else {
      setValidationError(validateDays(daysInput));
    }
  };

  const handleSelectProject = (project: string) => {
    setActiveProject(project);
    const saved = projectLifecycleConfigs[project] || { enabled: true, days: 2, unit: 'Days' };
    setIsAutoCloseEnabled(saved.enabled);
    setDaysInput(saved.days.toString());
    setUnit(saved.unit);
    setValidationError(null);
  };

  const activeSavedConfig = projectLifecycleConfigs[activeProject] || { enabled: true, days: 2, unit: 'Days' };
  const isDirty = 
    isAutoCloseEnabled !== activeSavedConfig.enabled ||
    (isAutoCloseEnabled && (daysInput !== activeSavedConfig.days.toString() || unit !== activeSavedConfig.unit));

  const handleSaveLifecycle = () => {
    if (isAutoCloseEnabled) {
      const err = validateDays(daysInput);
      if (err) {
        setValidationError(err);
        return;
      }
    }

    setIsSaving(true);
    setTimeout(() => {
      const numDays = Math.max(1, parseInt(daysInput, 10) || 2);
      setProjectLifecycleConfigs(prev => ({
        ...prev,
        [activeProject]: {
          enabled: isAutoCloseEnabled,
          days: numDays,
          unit: unit || 'Days',
        }
      }));
      setIsSaving(false);
      setToast(`Ticket lifecycle configuration saved for ${activeProject}`);
      setTimeout(() => setToast(''), 3000);
    }, 400);
  };

  const handleDiscardLifecycle = () => {
    const saved = projectLifecycleConfigs[activeProject] || { enabled: true, days: 2, unit: 'Days' };
    setIsAutoCloseEnabled(saved.enabled);
    setDaysInput(saved.days.toString());
    setUnit(saved.unit);
    setValidationError(null);
  };

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
                onClick={() => handleSelectProject(project)}
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
              <button
                onClick={() => setActiveTab('lifecycle')}
                className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'lifecycle' ? 'border-brand-500 text-brand-600' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Ticket Lifecycle
              </button>
              <button
                onClick={() => setActiveTab('sandbox')}
                className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'sandbox' ? 'border-brand-500 text-brand-600' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Terminal size={14} />
                <span>Sandbox API</span>
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

            {/* Ticket Lifecycle Tab */}
            {activeTab === 'lifecycle' && (
              <div className="h-full flex flex-col animate-in fade-in duration-300">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary tracking-tight">Ticket Lifecycle</h3>
                  <p className="text-sm text-text-secondary mt-1">Configure automated lifecycle transitions and auto-closure rules for tickets.</p>
                </div>

                <div className="card-base border-border-default bg-bg-surface p-8 max-w-3xl shadow-sm">
                  {/* Card Header: Title, Description, and ON/OFF Toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border-default">
                    <div className="space-y-1 max-w-xl">
                      <h4 className="text-base font-bold text-text-primary">Auto-Close Resolved Tickets</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Automatically move resolved tickets to Closed after the configured duration.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-1 sm:mt-0">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isAutoCloseEnabled}
                        onChange={(e) => handleToggleAutoClose(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-default after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-text"></div>
                      <span className={`ml-3 text-sm font-semibold transition-colors min-w-[28px] ${isAutoCloseEnabled ? 'text-text-primary' : 'text-text-muted'}`}>
                        {isAutoCloseEnabled ? 'ON' : 'OFF'}
                      </span>
                    </label>
                  </div>

                  {/* Auto-close after Configuration Section */}
                  <div className={`py-6 space-y-5 transition-all duration-200 ${!isAutoCloseEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Auto-close after
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input 
                            type="number"
                            min="1"
                            step="1"
                            disabled={!isAutoCloseEnabled}
                            value={daysInput}
                            onChange={(e) => handleDaysChange(e.target.value)}
                            className={`input-base w-24 text-center font-mono text-base ${
                              validationError && isAutoCloseEnabled 
                                ? 'border-error-text focus:border-error-text focus:ring-error-text' 
                                : ''
                            }`}
                            placeholder="2"
                          />
                        </div>

                        <div className="w-44">
                          <SearchableSelect 
                            value={unit}
                            disabled={!isAutoCloseEnabled}
                            onChange={(val) => setUnit(val)}
                            options={[
                              { label: 'Days', value: 'Days' },
                              { label: 'Business Days', value: 'Business Days' },
                              { label: 'Hours', value: 'Hours' }
                            ]}
                          />
                        </div>
                      </div>

                      {/* Validation Error Message */}
                      {validationError && isAutoCloseEnabled && (
                        <p className="text-xs text-error-text mt-2 flex items-center gap-1.5 font-medium animate-in fade-in duration-150">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{validationError}</span>
                        </p>
                      )}
                    </div>

                    {/* Quick Duration Presets */}
                    <div className="pt-1">
                      <span className="text-xs text-text-muted block mb-2 font-medium">Common duration presets:</span>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 7, 14, 30].map((preset) => {
                          const isSelected = daysInput === preset.toString() && unit === 'Days' && isAutoCloseEnabled;
                          return (
                            <button
                              key={preset}
                              type="button"
                              disabled={!isAutoCloseEnabled}
                              onClick={() => {
                                handleDaysChange(preset.toString());
                                setUnit('Days');
                              }}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                                isSelected
                                  ? 'bg-brand-50 border-brand-500 text-brand-700 font-semibold shadow-2xs'
                                  : 'bg-bg-page border-border-default text-text-secondary hover:bg-bg-surface hover:text-text-primary hover:border-border-strong disabled:cursor-not-allowed'
                              }`}
                            >
                              {preset} {preset === 1 ? 'day' : 'days'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer with Unsaved Changes indicator & Save Changes button */}
                  <div className="pt-6 border-t border-border-default flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isDirty ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          Unsaved changes
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">
                          All changes saved for {activeProject}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {isDirty && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDiscardLifecycle}
                          disabled={isSaving}
                          className="text-text-secondary hover:text-text-primary"
                        >
                          Discard
                        </Button>
                      )}
                      <Button
                        variant="primary"
                        onClick={handleSaveLifecycle}
                        disabled={!isDirty || isSaving || (isAutoCloseEnabled && Boolean(validationError))}
                        icon={isSaving ? undefined : Save}
                      >
                        {isSaving ? 'Saving Changes...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sandbox' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary tracking-tight">EasyRewardz LPaaS Sandbox Environment</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Consume the active sandbox API endpoints and credentials for testing integrations.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleTestSandbox}
                      disabled={isTestingSandbox}
                      className="gap-1.5"
                    >
                      <RefreshCw size={13} className={isTestingSandbox ? 'animate-spin' : ''} />
                      <span>{isTestingSandbox ? 'Connecting...' : 'Test API Handshake'}</span>
                    </Button>
                  </div>
                </div>

                {testResult && (
                  <div className="p-3 bg-success-bg border border-success-text/30 text-success-text rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <ShieldCheck size={16} />
                    <span>{testResult}</span>
                  </div>
                )}

                {/* Sandbox Details Grid */}
                <div className="card-base p-6 border-border-default bg-bg-surface space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-border-default">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-brand-600" />
                      <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Client Sandbox Configuration
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const payload = JSON.stringify({
                          BaseUrl: 'https://lpaaswebapi.easyrewardz.com/api/',
                          ProgramCode: 'ADCOOP_SBX',
                          UserName: 'adcoop_sbx_user',
                          UserPassword: 'Adcoop@Sandbox2026#',
                          DevId: 'DEV-ADC-9921',
                          AppId: 'APP-ADC-4402',
                          SecurityUser: 'adcoop_api_sec',
                          StoreCode: 'STR-AUH-01'
                        }, null, 2);
                        copyToClipboard(payload, 'full_json');
                      }}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1.5"
                    >
                      {copiedKey === 'full_json' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                      <span>{copiedKey === 'full_json' ? 'Copied JSON!' : 'Copy Full Config (JSON)'}</span>
                    </button>
                  </div>

                  {/* 1. Base API URL */}
                  <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Base API URL</span>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard('https://lpaaswebapi.easyrewardz.com/api/', 'base_url')}
                        className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface transition-colors"
                        title="Copy"
                      >
                        {copiedKey === 'base_url' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                      </button>
                    </div>
                    <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                      https://lpaaswebapi.easyrewardz.com/api/
                    </div>
                  </div>

                  {/* ProgramCode & UserName */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">ProgramCode</span>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('ADCOOP_SBX', 'prog_code')}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                        >
                          {copiedKey === 'prog_code' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                        ADCOOP_SBX
                      </div>
                    </div>

                    <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">UserName</span>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('adcoop_sbx_user', 'user_name')}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                        >
                          {copiedKey === 'user_name' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                        adcoop_sbx_user
                      </div>
                    </div>
                  </div>

                  {/* UserPassword */}
                  <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">UserPassword</span>
                      <div className="flex items-center gap-1">
                        <button 
                          type="button"
                          onClick={() => setShowSandboxPassword(!showSandboxPassword)}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                          title={showSandboxPassword ? 'Hide password' : 'Show password'}
                        >
                          {showSandboxPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('Adcoop@Sandbox2026#', 'user_pass')}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                        >
                          {copiedKey === 'user_pass' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                      {showSandboxPassword ? 'Adcoop@Sandbox2026#' : '••••••••••••••••'}
                    </div>
                  </div>

                  {/* DevId & AppId */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">DevId</span>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('DEV-ADC-9921', 'dev_id')}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                        >
                          {copiedKey === 'dev_id' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                        DEV-ADC-9921
                      </div>
                    </div>

                    <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">AppId</span>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('APP-ADC-4402', 'app_id')}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                        >
                          {copiedKey === 'app_id' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                        APP-ADC-4402
                      </div>
                    </div>
                  </div>

                  {/* UserName (Security) & StoreCode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">UserName (Secondary/Security)</span>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('adcoop_api_sec', 'sec_usr')}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                        >
                          {copiedKey === 'sec_usr' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle">
                        adcoop_api_sec
                      </div>
                    </div>

                    <div className="p-3.5 bg-bg-page border border-border-default rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">StoreCode</span>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('STR-AUH-01', 'str_code')}
                          className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-surface"
                        >
                          {copiedKey === 'str_code' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-text-primary select-all font-semibold bg-bg-surface p-2 rounded border border-border-subtle uppercase">
                        STR-AUH-01
                      </div>
                    </div>
                  </div>

                  {/* Sample cURL */}
                  <div className="p-4 bg-bg-page border border-border-default rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                        <Code2 size={14} className="text-brand-600" />
                        <span>Ready-to-Use cURL Example</span>
                      </span>
                      <button 
                        type="button"
                        onClick={() => {
                          const curl = `curl -X POST "https://lpaaswebapi.easyrewardz.com/api/member/details" \\
  -H "Content-Type: application/json" \\
  -H "ProgramCode: ADCOOP_SBX" \\
  -H "DevId: DEV-ADC-9921" \\
  -H "AppId: APP-ADC-4402" \\
  -d '{
    "UserName": "adcoop_sbx_user",
    "UserPassword": "${showSandboxPassword ? 'Adcoop@Sandbox2026#' : '••••••••••••'}",
    "StoreCode": "STR-AUH-01"
  }'`;
                          copyToClipboard(curl, 'curl_tab');
                        }}
                        className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                      >
                        {copiedKey === 'curl_tab' ? <Check size={13} className="text-success-text" /> : <Copy size={13} />}
                        <span>{copiedKey === 'curl_tab' ? 'Copied cURL!' : 'Copy cURL'}</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-neutral-900 text-neutral-100 rounded-md text-[11px] font-mono overflow-x-auto leading-relaxed">
{`curl -X POST "https://lpaaswebapi.easyrewardz.com/api/member/details" \\
  -H "Content-Type: application/json" \\
  -H "ProgramCode: ADCOOP_SBX" \\
  -H "DevId: DEV-ADC-9921" \\
  -H "AppId: APP-ADC-4402" \\
  -d '{
    "UserName": "adcoop_sbx_user",
    "UserPassword": "${showSandboxPassword ? 'Adcoop@Sandbox2026#' : '••••••••••••'}",
    "StoreCode": "STR-AUH-01"
  }'`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-text-primary text-bg-page px-4 py-3 rounded-lg shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 rounded-full bg-success-text/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
