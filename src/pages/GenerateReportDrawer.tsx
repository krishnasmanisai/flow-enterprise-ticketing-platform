import { X, SlidersHorizontal, Calendar, Mail, FileText, Download, Trash2, CheckCircle2, ChevronDown, ChevronRight, Play } from 'lucide-react';
import { SearchableSelect } from '../components/ui/SearchableSelect';

export function GenerateReportDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="absolute inset-0 bg-text-primary/20 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="generate-report-title" className="absolute top-2 right-2 bottom-2 w-full max-w-md bg-bg-surface rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle shrink-0">
          <div>
            <h2 id="generate-report-title" className="text-[18px] font-bold text-text-primary flex items-center gap-2">
              Generate New Report
              <svg className="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            </h2>
            <p className="text-[13px] text-text-secondary mt-0.5">Configure parameters for your export</p>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-surface-alt rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Report Configuration Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-lg bg-bg-surface-alt flex items-center justify-center shrink-0">
                <SlidersHorizontal className="w-4 h-4 text-text-secondary" />
              </div>
              <h3 className="text-[14px] font-bold text-text-primary">Report Configuration</h3>
            </div>
            
            <div className="space-y-5 pl-10">
              <div>
                <label className="block text-[12px] font-medium text-text-primary mb-1.5">
                  Report Name <span className="text-error-text">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input type="text" placeholder="e.g. Q3 Access Audit" className="w-full h-10 pl-9 pr-3 border border-border-default rounded-lg text-sm focus:outline-none focus:border-border-strong focus:ring-1 focus:ring-slate-300" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-text-primary mb-1.5">
                  Report Type
                </label>
                <SearchableSelect 
                  value=""
                  onChange={() => {}}
                  placeholder="Select report type..."
                  options={[
                    { label: 'Access Audit', value: 'access' },
                    { label: 'SLA Performance', value: 'sla' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-text-primary mb-1.5">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="h-12 border-2 border-brand-500 bg-brand-50 rounded-lg flex flex-col items-center justify-center gap-0.5 relative">
                    <svg className="w-4 h-4 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>
                    <span className="text-[11px] font-bold text-brand-600">CSV</span>
                  </button>
                  <button className="h-12 border border-border-default rounded-lg flex flex-col items-center justify-center gap-0.5 text-text-secondary hover:border-border-strong">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>
                    <span className="text-[11px] font-medium">Excel</span>
                  </button>
                  <button className="h-12 border border-border-default rounded-lg flex flex-col items-center justify-center gap-0.5 text-text-secondary hover:border-border-strong">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>
                    <span className="text-[11px] font-medium">PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Scope Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-lg bg-bg-surface-alt flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-text-secondary" />
              </div>
              <h3 className="text-[14px] font-bold text-text-primary">Data Scope</h3>
            </div>
            
            <div className="space-y-4 pl-10">
              <div>
                <label className="block text-[12px] font-medium text-text-primary mb-2">
                  Date Range
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <div className="absolute -top-2 left-2 bg-bg-surface px-1 text-[10px] font-medium text-text-secondary z-10">Start</div>
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full h-10 px-3 border border-border-default rounded-lg text-sm text-text-secondary focus:outline-none focus:border-border-strong" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute -top-2 left-2 bg-bg-surface px-1 text-[10px] font-medium text-text-secondary z-10">End</div>
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full h-10 px-3 border border-border-default rounded-lg text-sm text-text-secondary focus:outline-none focus:border-border-strong" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-info-bg text-info-text rounded-full text-[11px] font-medium border border-info-text/20">Last 7 Days</button>
                <button className="px-3 py-1 bg-bg-surface-alt text-text-secondary rounded-full text-[11px] font-medium hover:bg-border-subtle transition-colors">Last 30 Days</button>
                <button className="px-3 py-1 bg-info-bg text-info-text rounded-full text-[11px] font-medium border border-info-text/20">This Quarter</button>
              </div>
            </div>
          </div>

          {/* Delivery Settings Section */}
          <div>
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-bg-surface-alt flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-text-secondary" />
                </div>
                <h3 className="text-[14px] font-bold text-text-primary">Delivery Settings</h3>
              </div>
              <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors" />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border-subtle flex items-center justify-end gap-3 shrink-0 bg-bg-page">
          <button onClick={onClose} className="px-4 h-10 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-5 h-10 bg-text-primary hover:bg-brand-600 text-bg-surface text-[13px] font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <Play className="w-3.5 h-3.5 fill-current" />
            Run Report
          </button>
        </div>
      </div>
    </>
  );
}
