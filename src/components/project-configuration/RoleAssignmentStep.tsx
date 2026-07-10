import { SearchableSelect } from '../ui/SearchableSelect';
import { Search, X, User } from 'lucide-react';

export function RoleAssignmentStep() {
  const editRights = [
    'Sankar Das', 'Himanshu Shekhar', 'Navneet Kumar', 'Prateek Chawla', 
    'Saif Ali Sharafat', 'Vinod Kumar', 'Arpit Sharma', 'Suniti Chauhan', 'Avika'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary tracking-tight mb-2">Role Assignment</h3>
        <p className="text-sm text-text-secondary">Define permissions and access rights for users managing this project.</p>
      </div>
      
      <div className="space-y-8">
        {/* Project Owner */}
        <div className="bg-bg-surface border border-border-default rounded-xl p-8 shadow-sm flex flex-col gap-6">
           <div className="border-b border-border-default pb-4">
             <h4 className="text-base font-bold text-text-primary mb-1">Project Owner <span className="text-error-text">*</span></h4>
             <p className="text-xs text-text-secondary">The primary administrator responsible for the project's overall configuration and billing.</p>
           </div>
           
           <div className="max-w-md">
             <SearchableSelect 
               value="Navneet Kumar"
               onChange={() => {}}
               options={[{label: 'Navneet Kumar', value: 'Navneet Kumar'}]}
             />
           </div>
           
           <div className="flex items-center justify-between border border-border-default rounded-lg p-4 bg-bg-page max-w-md">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold shrink-0">
                  NK
                </div>
                <div className="flex flex-col gap-0.5">
                   <span className="font-semibold text-sm text-text-primary">Navneet Kumar</span>
                   <span className="text-xs text-text-secondary">Navneet.Kumar@Easyrewardz.Com</span>
                   <span className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-wider bg-bg-surface self-start px-2 py-0.5 rounded border border-border-default">Client Ops</span>
                </div>
             </div>
             <button className="text-xs font-semibold text-error-text hover:underline transition-colors px-2 py-1">
               Remove
             </button>
           </div>
        </div>

        {/* Edit Rights */}
        <div className="bg-bg-surface border border-border-default rounded-xl p-8 shadow-sm flex flex-col gap-6">
           <div className="border-b border-border-default pb-4">
             <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-text-primary mb-1">Editors</h4>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider bg-bg-page px-2 py-0.5 rounded border border-border-default">Optional</span>
             </div>
             <p className="text-xs text-text-secondary">Users who can edit tickets, update configurations, and manage workflows within this project.</p>
           </div>
           
           <div className="border border-border-default rounded-lg bg-bg-page focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all p-3 min-h-[120px] flex flex-col cursor-text">
             <div className="flex items-center gap-2 mb-3 border-b border-border-default pb-3">
                <Search className="w-4 h-4 text-text-muted shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search for users to add as editors..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-text-primary placeholder:text-text-muted outline-none"
                />
             </div>
             <div className="flex flex-wrap gap-2 items-center">
               {editRights.map((user, idx) => (
                 <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-surface text-text-primary border border-border-default text-xs font-semibold rounded-md shadow-sm hover:border-border-strong transition-colors group">
                   <User className="w-3.5 h-3.5 text-text-muted" />
                   {user}
                   <button className="text-text-muted hover:text-error-text transition-colors opacity-50 group-hover:opacity-100">
                     <X size={14} />
                   </button>
                 </span>
               ))}
             </div>
           </div>
           <div className="flex justify-between items-center text-xs text-text-secondary">
              <span>9 users selected</span>
              <button className="font-semibold text-brand-600 hover:text-brand-800">Clear All</button>
           </div>
        </div>

        {/* Observers */}
        <div className="bg-bg-surface border border-border-default rounded-xl p-8 shadow-sm flex flex-col gap-6">
           <div className="border-b border-border-default pb-4">
             <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-text-primary mb-1">Observers</h4>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider bg-bg-page px-2 py-0.5 rounded border border-border-default">Optional</span>
             </div>
             <p className="text-xs text-text-secondary">Users who have read-only access to view tickets and configurations.</p>
           </div>
           
           <div className="max-w-md">
             <SearchableSelect 
               value=""
               onChange={() => {}}
               placeholder="Search and select Observers..."
               options={[]}
             />
           </div>
           
           <div className="py-8 border-2 border-dashed border-border-default rounded-lg text-center bg-bg-page flex flex-col items-center justify-center text-text-muted">
              <User className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm font-medium">No observers added yet</p>
              <p className="text-xs mt-1">Search for users above to add them as observers.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
