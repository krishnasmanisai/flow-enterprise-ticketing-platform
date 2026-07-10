import { useState } from 'react';
import { 
  ArrowLeft, Check, ChevronDown, MessageSquare, AlertTriangle, 
  RefreshCw, Bold, Italic, Underline, Strikethrough, Link, Code, 
  Plus, Edit3, Trash2
} from 'lucide-react';
import { Page } from '../types';
import { RichTextEditor } from '../components/ui/RichTextEditor';
import { Button } from '../components/ui/Button';
import { SearchableSelect } from '../components/ui/SearchableSelect';

export default function EditWorkflow({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <div className="flex flex-col w-full bg-bg-page">
      {/* Header */}
      <div className="bg-bg-surface border-b border-border-default sticky top-0 z-20 px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('workflows')} className="text-text-secondary hover:text-text-primary transition-colors p-1.5 -ml-1.5 rounded hover:bg-bg-surface-hover">
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-5 bg-border-default hidden sm:block"></div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono font-semibold text-success-text uppercase tracking-widest bg-success-bg px-2 py-0.5 rounded border border-success-text/20">Active</span>
            </div>
            <h1 className="text-lg font-semibold text-text-primary">Auto-update Status when reply received</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="md">Cancel</Button>
          <Button variant="primary" size="md" icon={Check}>Save Workflow</Button>
        </div>
      </div>

      <div className="flex">
        {/* Left Progress Rail */}
        <div className="w-64 border-r border-border-default bg-bg-surface p-6 hidden md:block">
          <h3 className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-6">Workflow Steps</h3>
          
          <div className="relative before:content-[''] before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-px before:bg-border-default">
            
            <div className="flex items-start gap-3 mb-8 relative">
              <div className="w-7 h-7 rounded-full bg-bg-surface border-2 border-brand-500 text-brand-500 flex items-center justify-center shrink-0 z-10 font-bold text-xs bg-bg-surface shadow-sm">
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="pt-1.5">
                <div className="font-semibold text-sm text-text-primary mb-1">Workflow Details</div>
                <div className="text-xs text-text-secondary">Name & Description</div>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-8 relative">
              <div className="w-7 h-7 rounded-full bg-bg-surface border-2 border-brand-500 text-brand-500 flex items-center justify-center shrink-0 z-10 font-bold text-xs bg-bg-surface shadow-sm">
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="pt-1.5">
                <div className="font-semibold text-sm text-text-primary mb-1">Trigger Details</div>
                <div className="text-xs text-text-secondary">When to execute</div>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-8 relative">
              <div className="w-7 h-7 rounded-full bg-brand-500 border-2 border-brand-500 text-bg-surface flex items-center justify-center shrink-0 z-10 font-bold text-xs shadow-sm">
                3
              </div>
              <div className="pt-1.5">
                <div className="font-semibold text-sm text-text-primary mb-1">Actions</div>
                <div className="text-xs text-text-secondary">What to do</div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
            
            {/* Action Configuration Panel */}
            <div className="flex-1 card-base flex flex-col border-border-default">
              <div className="flex border-b border-border-default bg-bg-page overflow-x-auto custom-scrollbar">
                <button className="px-5 py-3 border-b-2 border-brand-500 text-text-primary text-sm font-semibold whitespace-nowrap bg-bg-surface flex items-center gap-2">
                  <MessageSquare size={16} /> Communication
                </button>
                <button className="px-5 py-3 border-b-2 border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2">
                  <AlertTriangle size={16} /> Notification
                </button>
                <button className="px-5 py-3 border-b-2 border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2">
                  <RefreshCw size={16} /> Update Ticket
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[13px] font-semibold text-text-primary mb-1.5">
                    Send To <span className="text-error-text">*</span>
                  </label>
                  <SearchableSelect 
                    value="Customer Email"
                    onChange={() => {}}
                    placeholder="Select Send To"
                    options={[
                      { label: 'Select Send To', value: '' },
                      { label: 'Customer Email', value: 'Customer Email' }
                    ]}
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-semibold text-text-primary mb-1.5">
                    Email Subject <span className="text-error-text">*</span>
                  </label>
                  <input type="text" defaultValue="{{TicketId}}" className="input-base w-full h-10 font-mono text-sm" />
                  <p className="text-xs text-text-secondary mt-2 flex items-start gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-warning-text shrink-0 mt-0.5" /> 
                    <span>Include your own words in the subject, not only <span className="bg-bg-page border border-border-default px-1.5 py-0.5 rounded font-mono">{"{{TicketId}}"}</span>.</span>
                  </p>
                </div>
                
                <div>
                  <label className="block text-[13px] font-semibold text-text-primary mb-1.5">
                    Body <span className="text-error-text">*</span>
                  </label>
                  <RichTextEditor content="" onChange={() => {}} placeholder="Type your message..." minHeight="min-h-[192px]" />
                </div>
              </div>
            </div>

            {/* Right Action Sequence Panel */}
            <div className="w-full lg:w-[320px] shrink-0 card-base p-6 h-fit bg-bg-surface">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest">Action Sequence</h3>
                <span className="bg-bg-page border border-border-default text-text-primary px-2 py-0.5 rounded text-[10px] font-bold font-mono">2 STEPS</span>
              </div>
              
              <div className="space-y-4 relative before:content-[''] before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-px before:bg-border-default before:-z-10">
                {/* Step 1 */}
                <div className="flex gap-4 items-center">
                  <div className="w-7 h-7 rounded-full bg-bg-page border border-border-default text-text-secondary font-bold text-xs flex items-center justify-center shrink-0 shadow-sm z-10">1</div>
                  <div className="flex-1 bg-bg-surface border border-border-default rounded-md px-3 py-2.5 flex items-center gap-2 shadow-sm">
                    <Code size={14} className="text-text-muted" />
                    <span className="font-semibold text-sm text-text-primary">Apicall</span>
                  </div>
                </div>
                
                {/* Step 2 (Active) */}
                <div className="flex gap-4 items-center">
                  <div className="w-7 h-7 rounded-full bg-brand-500 text-bg-surface font-bold text-xs flex items-center justify-center shrink-0 shadow-sm z-10">2</div>
                  <div className="flex-1 bg-bg-surface border border-brand-500 rounded-md p-2.5 flex justify-between items-center shadow-sm relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-l-sm"></div>
                    <div className="flex gap-2.5 items-center pl-1">
                      <RefreshCw size={14} className="text-brand-500" />
                      <div>
                        <div className="font-semibold text-sm text-text-primary">Update...</div>
                        <div className="text-[11px] text-text-secondary mt-0.5">Status: <span className="font-medium text-text-primary">Resolved</span></div>
                      </div>
                    </div>
                    <div className="flex gap-1 text-text-muted">
                      <button className="hover:text-brand-500 p-1 rounded hover:bg-bg-surface-hover"><Edit3 size={14} /></button>
                      <button className="hover:text-error-text p-1 rounded hover:bg-error-bg"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>

                {/* Add Action Button */}
                <div className="flex gap-4 items-center pt-2">
                  <div className="w-7 h-7 rounded-full bg-bg-surface border-2 border-dashed border-border-strong text-text-muted flex items-center justify-center shrink-0 z-10">
                    <Plus size={14} />
                  </div>
                  <button className="flex-1 bg-bg-surface border-2 border-dashed border-border-default hover:border-border-strong rounded-md py-2.5 text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2">
                    <Plus size={14} /> Add Action Here
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
