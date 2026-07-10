import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Button } from './ui/Button';
import { RichTextEditor } from './ui/RichTextEditor';
import { SingleSearchDropdown } from './ui/SingleSearchDropdown';

interface ReassignModalProps {
  onClose: () => void;
  currentAssignee: string;
}

export function ReassignModal({ onClose, currentAssignee }: ReassignModalProps) {
  const [selectedAgent, setSelectedAgent] = useState(currentAssignee);
  const [note, setNote] = useState('');
  
  const agents = [
    'Himanshu', 'Jane Smith', 'John Doe', 'Alice', 'Bob', 'Charlie',
    'David', 'Emma', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia'
  ];

  return (
    <>
      <div className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="reassign-title" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-bg-page shadow-2xl z-50 rounded-xl flex flex-col animate-in zoom-in-95 duration-200 border border-border-strong">
        
        <div className="px-5 py-4 border-b border-border-default flex items-center justify-between bg-bg-surface rounded-t-xl">
          <div className="flex items-center gap-2 text-base font-semibold text-text-primary tracking-tight">
            <UserPlus className="w-5 h-5 text-text-muted" />
            Reassign Ticket
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">New Assignee</label>
            <SingleSearchDropdown 
              options={agents}
              value={selectedAgent}
              onChange={setSelectedAgent}
              placeholder="Search agents..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Reassignment Note (Optional)</label>
            <RichTextEditor content={note} onChange={setNote} placeholder="Explain why this ticket is being reassigned..." minHeight="min-h-[96px]" />
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border-default bg-bg-surface flex justify-end gap-3 rounded-b-xl">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={selectedAgent === currentAssignee} onClick={onClose}>Confirm Reassignment</Button>
        </div>
      </div>
    </>
  );
}
