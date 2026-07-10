import { useState } from 'react';
import { X, Link as LinkIcon, Search } from 'lucide-react';
import { Button } from './ui/Button';

interface LinkTicketModalProps {
  onClose: () => void;
}

export function LinkTicketModal({ onClose }: LinkTicketModalProps) {
  const [search, setSearch] = useState('');
  
  // Mock search results
  const results = [
    { id: 'ER-1155', title: 'Authentication gateway failure in APAC region', status: 'Open' },
    { id: 'ER-1092', title: 'Users reporting timeouts during login', status: 'Resolved' },
    { id: 'ER-1120', title: 'API returning 504 on heavy load', status: 'In Progress' }
  ].filter(t => t.id.toLowerCase().includes(search.toLowerCase()) || t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="link-ticket-title" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-bg-page shadow-2xl z-50 rounded-xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden max-h-[85vh] border border-border-strong">
        
        <div className="px-5 py-4 border-b border-border-default flex items-center justify-between bg-bg-surface">
          <div className="flex items-center gap-2 text-base font-semibold text-text-primary tracking-tight">
            <LinkIcon className="w-5 h-5 text-text-muted" />
            Link Ticket
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-bg-page flex flex-col gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Search Tickets</label>
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by ID or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base w-full pl-9 h-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-widest border-b border-border-default pb-1">Suggested Results</div>
            {results.length > 0 ? (
              results.map(ticket => (
                <div key={ticket.id} className="bg-bg-surface border border-border-default rounded-md p-3 flex items-center justify-between shadow-sm group">
                  <div className="flex flex-col min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-medium text-sm text-text-primary">{ticket.id}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-bg-page border border-border-default text-text-secondary px-1.5 py-0.5 rounded">{ticket.status}</span>
                    </div>
                    <span className="text-sm text-text-secondary truncate">{ticket.title}</span>
                  </div>
                  <Button variant="outline" className="h-8 shrink-0" onClick={onClose}>Link</Button>
                </div>
              ))
            ) : (
              <div className="text-sm text-text-muted text-center py-6 bg-bg-surface rounded-md border border-dashed border-border-default">
                No tickets found matching your search.
              </div>
            )}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border-default bg-bg-surface flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </>
  );
}
