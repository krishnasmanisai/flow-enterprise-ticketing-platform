import { useState } from 'react';
import { X, ArrowRight, Check, ChevronDown, Settings as SettingsIcon, Edit3, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { SearchableSelect } from './ui/SearchableSelect';

interface EditConfigurationModalProps {
  onClose: () => void;
}

export function EditConfigurationModal({ onClose }: EditConfigurationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: 'Business Units' },
    { id: 2, title: 'Channels' },
    { id: 3, title: 'Roles' },
    { id: 4, title: 'Review' }
  ];

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="edit-config-title" className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
      <div className="bg-bg-page w-[900px] h-[700px] max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-border-strong animate-in zoom-in-95 duration-200 relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-default flex items-center justify-between bg-bg-surface shrink-0">
          <div className="flex items-center gap-2 text-base font-semibold text-text-primary tracking-tight">
            <SettingsIcon className="w-5 h-5 text-text-muted" />
            Edit Project Configuration
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden bg-bg-page">
          {/* Sidebar Navigation */}
          <div className="w-[240px] bg-bg-surface border-r border-border-default p-6 hidden md:block shrink-0">
            <div className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border-default">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isPast = currentStep > step.id;
                
                return (
                  <div key={step.id} className="relative flex items-center gap-4 group">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold z-10 transition-colors shadow-sm
                      ${isPast ? 'bg-brand-500 text-bg-surface border-brand-500' : 
                        isActive ? 'bg-bg-page border-2 border-brand-500 text-brand-500' : 
                        'bg-bg-surface border border-border-default text-text-muted'}
                    `}>
                      {isPast ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step.id}
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-text-primary' : isPast ? 'text-text-primary' : 'text-text-muted group-hover:text-text-secondary'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-8 relative">
            
            {currentStep === 1 && (
              <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary tracking-tight mb-2">Business Units & Products</h2>
                  <p className="text-sm text-text-secondary">Configure the fundamental business structure for this project.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Products</label>
                    <SearchableSelect 
                      value="Leadzhub"
                      onChange={() => {}}
                      options={[{ label: 'Leadzhub', value: 'Leadzhub' }]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Tenant Business Units</label>
                    <SearchableSelect 
                      value="IT & Technology"
                      onChange={() => {}}
                      options={[{ label: 'IT & Technology', value: 'IT & Technology' }]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Business Units</label>
                    <div className="mb-3">
                      <SearchableSelect 
                        value=""
                        onChange={() => {}}
                        placeholder="Select Business Units"
                        options={[{ label: 'Select Business Units', value: '' }]}
                      />
                    </div>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-3 py-1 bg-bg-surface border border-border-default text-text-primary text-xs font-semibold rounded-md shadow-sm">
                        Technology <button className="ml-2 text-text-muted hover:text-text-primary"><X size={12}/></button>
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-bg-surface border border-border-default text-text-primary text-xs font-semibold rounded-md shadow-sm">
                        Operations <button className="ml-2 text-text-muted hover:text-text-primary"><X size={12}/></button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary tracking-tight mb-2">Review Configuration</h2>
                  <p className="text-sm text-text-secondary">Review all settings before saving.</p>
                </div>

                <div className="space-y-4">
                  <div className="card-base border-border-default overflow-hidden">
                    <div className="bg-bg-surface px-5 py-3.5 flex justify-between items-center border-b border-border-default">
                      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                        <Lock className="w-4 h-4 text-text-muted" />
                        Business Units & Products
                      </div>
                      <button onClick={() => setCurrentStep(1)} className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors">
                        <Edit3 size={14} /> Edit
                      </button>
                    </div>
                    <div className="p-5 bg-bg-page space-y-4">
                      <div>
                        <h4 className="text-[11px] font-mono text-text-muted mb-1.5 font-medium">Products</h4>
                        <span className="inline-block px-2.5 py-1 bg-bg-surface border border-border-default text-text-primary text-xs font-semibold rounded-md shadow-sm">Leadzhub</span>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-mono text-text-muted mb-1.5 font-medium">Tenant Business Units</h4>
                        <span className="inline-block px-2.5 py-1 bg-bg-surface border border-border-default text-text-primary text-xs font-semibold rounded-md shadow-sm">IT & Technology</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional review cards would go here for Channels and Roles */}
                  <div className="card-base border-border-default overflow-hidden">
                    <div className="bg-bg-surface px-5 py-3.5 flex justify-between items-center border-b border-border-default opacity-50">
                      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                        <Lock className="w-4 h-4 text-text-muted" />
                        Additional Steps
                      </div>
                    </div>
                    <div className="p-5 bg-bg-page text-sm text-text-muted italic opacity-50">
                      (Channels and Roles omitted for brevity)
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Fallback for steps 2 and 3 */}
            {(currentStep === 2 || currentStep === 3) && (
              <div className="max-w-2xl mx-auto flex items-center justify-center h-full text-text-muted text-sm italic">
                Step {currentStep} placeholder
              </div>
            )}
            
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-border-default bg-bg-surface flex items-center justify-between shrink-0">
          <Button 
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              if (currentStep === 4) onClose();
              else setCurrentStep(prev => Math.min(4, prev + 1));
            }}
          >
            {currentStep === 4 ? 'Save Configuration' : <>Next <ArrowRight size={16} className="ml-1" /></>}
          </Button>
        </div>
      </div>
    </div>
  );
}
