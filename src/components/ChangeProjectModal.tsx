import { useState } from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { Button } from './ui/Button';
import { SingleSearchDropdown } from './ui/SingleSearchDropdown';

interface ChangeProjectModalProps {
  onClose: () => void;
  currentProject: string;
}

export function ChangeProjectModal({ onClose, currentProject }: ChangeProjectModalProps) {
  const [selectedProject, setSelectedProject] = useState(currentProject);
  
  const projects = [
    'Customer Support', 'IT Infrastructure', 'HR Requests', 'Facilities', 'Billing & Finance'
  ];

  return (
    <>
      <div className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="change-project-title" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-bg-page shadow-2xl z-50 rounded-xl flex flex-col animate-in zoom-in-95 duration-200 border border-border-strong">
        
        <div className="px-5 py-4 border-b border-border-default flex items-center justify-between bg-bg-surface rounded-t-xl">
          <div className="flex items-center gap-2 text-base font-semibold text-text-primary tracking-tight">
            <ArrowRightLeft className="w-5 h-5 text-text-muted" />
            Change Project
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            Moving this ticket to a new project may change its associated workflows, SLA rules, and access permissions.
          </p>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Current Project</label>
              <div className="w-full h-10 px-3 bg-bg-surface border border-border-default rounded-md text-sm flex items-center text-text-muted font-medium">
                {currentProject}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">New Project</label>
              <SingleSearchDropdown 
                options={projects}
                value={selectedProject}
                onChange={setSelectedProject}
                placeholder="Search projects..."
              />
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border-default bg-bg-surface flex justify-end gap-3 rounded-b-xl">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={selectedProject === currentProject} onClick={onClose}>Confirm Move</Button>
        </div>
      </div>
    </>
  );
}
