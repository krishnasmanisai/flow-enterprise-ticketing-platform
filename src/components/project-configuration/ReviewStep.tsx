import { Edit3, CheckCircle2, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function ReviewStep({ onEditStep }: { onEditStep: (step: number) => void }) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-text-primary tracking-tight mb-2">Review & Confirm</h3>
        <p className="text-sm text-text-secondary">Please review your project configuration. You can go back and edit any section before saving.</p>
      </div>
      
      <div className="space-y-8">
        {/* BU Mapping Review */}
        <section className="bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-border-default bg-bg-page">
             <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success-text" />
                <h4 className="text-base font-bold text-text-primary">Business Unit Mapping</h4>
             </div>
             <button onClick={() => onEditStep(1)} className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors bg-brand-50 px-3 py-1.5 rounded-md">
               Edit <Edit3 size={14} />
             </button>
          </div>
          <div className="p-6">
             <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1 space-y-2">
                   <h5 className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-3">Selected Business Units</h5>
                   <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-text-primary bg-bg-page border border-border-default px-3 py-1.5 rounded shadow-sm">Operations</span>
                      <ChevronRight className="w-4 h-4 text-text-muted" />
                      <div className="flex gap-2">
                         <span className="text-sm font-medium text-text-secondary bg-bg-page border border-border-default px-3 py-1.5 rounded shadow-sm">Client Ops</span>
                         <span className="text-sm font-medium text-text-secondary bg-bg-page border border-border-default px-3 py-1.5 rounded shadow-sm">Operation & Customer Support</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Channels Review */}
        <section className="bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-border-default bg-bg-page">
             <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success-text" />
                <h4 className="text-base font-bold text-text-primary">Communication Channels</h4>
             </div>
             <button onClick={() => onEditStep(2)} className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors bg-brand-50 px-3 py-1.5 rounded-md">
               Edit <Edit3 size={14} />
             </button>
          </div>
          <div className="p-6">
             <h5 className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-4">Active Channels</h5>
             <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold rounded-lg shadow-sm">
                   Customer Portal
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-bg-page border border-border-default text-text-muted text-sm font-medium rounded-lg line-through opacity-50">
                   Email Support
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-bg-page border border-border-default text-text-muted text-sm font-medium rounded-lg line-through opacity-50">
                   Live Chat
                </span>
             </div>
          </div>
        </section>

        {/* Roles Review */}
        <section className="bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-border-default bg-bg-page">
             <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success-text" />
                <h4 className="text-base font-bold text-text-primary">Role Assignment</h4>
             </div>
             <button onClick={() => onEditStep(3)} className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors bg-brand-50 px-3 py-1.5 rounded-md">
               Edit <Edit3 size={14} />
             </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <h5 className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-4">Project Owner</h5>
               <div className="flex items-center gap-3 p-3 bg-bg-page border border-border-default rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold shrink-0 text-xs">
                    NK
                  </div>
                  <div className="flex flex-col">
                     <span className="font-semibold text-sm text-text-primary">Navneet Kumar</span>
                     <span className="text-xs text-text-secondary">Navneet.Kumar@Easyrewardz.Com</span>
                  </div>
               </div>
             </div>
             
             <div>
               <h5 className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-4">Editors (9)</h5>
               <div className="flex flex-wrap gap-2">
                 <span className="inline-flex items-center px-2.5 py-1 bg-bg-page text-text-secondary border border-border-default text-xs font-medium rounded-md shadow-sm">Sankar Das</span>
                 <span className="inline-flex items-center px-2.5 py-1 bg-bg-page text-text-secondary border border-border-default text-xs font-medium rounded-md shadow-sm">Himanshu Shekhar</span>
                 <span className="inline-flex items-center px-2.5 py-1 bg-bg-page text-text-secondary border border-border-default text-xs font-medium rounded-md shadow-sm">Navneet Kumar</span>
                 <span className="inline-flex items-center px-2.5 py-1 bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold rounded-md shadow-sm">+6 More</span>
               </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
