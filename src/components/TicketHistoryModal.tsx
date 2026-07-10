import { X, Clock } from 'lucide-react';
import { Button } from './ui/Button';

interface TicketHistoryModalProps {
  onClose: () => void;
}

export function TicketHistoryModal({ onClose }: TicketHistoryModalProps) {
  const historyEvents = [
    { id: 1, title: 'Ticket Resolved', user: 'Himanshu', time: 'Today, 14:32', description: 'Status changed from In Progress to Resolved.' },
    { id: 2, title: 'Priority Escalated', user: 'Sarah Jenkins', time: 'Today, 10:15', description: 'Priority changed from Medium to High.' },
    { id: 3, title: 'Assignee Changed', user: 'System', time: 'Yesterday, 16:45', description: 'Ticket was reassigned to Himanshu.' },
    { id: 4, title: 'Ticket Created', user: 'Ankit Verma', time: 'Yesterday, 08:40', description: 'Ticket created via Web Chat.' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="history-modal-title" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-bg-page shadow-2xl z-50 rounded-xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden max-h-[85vh] border border-border-strong">
        
        <div className="px-5 py-4 border-b border-border-default flex items-center justify-between bg-bg-surface">
          <div className="flex items-center gap-2 text-base font-semibold text-text-primary tracking-tight">
            <Clock className="w-5 h-5 text-text-muted" />
            Ticket History
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-bg-page">
          <div className="relative border-l border-border-strong ml-3.5 space-y-8 pb-4">
            {historyEvents.map((event, index) => (
              <div key={event.id} className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border-strong ring-4 ring-bg-app"></div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-text-primary">{event.title}</span>
                    <span className="text-xs font-mono text-text-muted">{event.time}</span>
                  </div>
                  <span className="text-xs font-medium text-text-secondary">by {event.user}</span>
                  <p className="text-sm text-text-primary mt-1 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border-default bg-bg-surface flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </>
  );
}
