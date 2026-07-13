import { useState, useEffect } from 'react';
import { X, Link as LinkIcon, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { SearchableSelect } from './ui/SearchableSelect';

interface LinkTicketModalProps {
  onClose: () => void;
}

export function LinkTicketModal({ onClose }: LinkTicketModalProps) {
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Mock search results
  const results = [
    { id: 'ER-1155', title: 'Authentication gateway failure in APAC region', status: 'Open', project: 'Core Infrastructure' },
    { id: 'ER-1092', title: 'Users reporting timeouts during login', status: 'Resolved', project: 'Customer Support' },
    { id: 'ER-1120', title: 'API returning 504 on heavy load', status: 'In Progress', project: 'Billing Services' }
  ].filter(t => t.id.toLowerCase().includes(debouncedSearch.toLowerCase()) || t.title.toLowerCase().includes(debouncedSearch.toLowerCase()));

  const handleLink = () => {
    if (!client) {
      setError('Client is required');
      return;
    }
    if (!project) {
      setError('Project is required');
      return;
    }
    onClose();
  };

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

        <div className="flex-1 overflow-y-auto p-5 bg-bg-page flex flex-col gap-5">
          {error && (
            <div className="bg-error-bg text-error-text text-sm p-3 rounded-md border border-error-text/20">
              {error}
            </div>
          )}
          
          <div>
            <label className="text-sm font-semibold text-text-primary mb-1.5 block">
              Client <span className="text-error-text">*</span>
            </label>
            <SearchableSelect
              value={client}
              onChange={(val) => { setClient(val); setError(''); setProject(''); }}
              options={['Acme Corp', 'Globex', 'Soylent Corp', 'Initech']}
              className="!bg-bg-surface-hover hover:!bg-border-subtle focus-within:!bg-bg-surface"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-text-primary mb-1.5 block">
              Project <span className="text-error-text">*</span>
            </label>
            <SearchableSelect
              value={project}
              onChange={(val) => { setProject(val); setError(''); }}
              options={client ? ['Core Infrastructure', 'Customer Support', 'Billing Services'] : []}
              className="!bg-bg-surface-hover hover:!bg-border-subtle focus-within:!bg-bg-surface"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-text-primary mb-1.5 block">
              Search Tickets <span className="text-error-text">*</span>
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search By Ticket ID or Subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full min-h-[40px] pl-9 pr-3 py-2 bg-bg-surface-hover border border-transparent rounded hover:bg-border-subtle focus:bg-bg-surface focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors text-sm outline-none"
              />
            </div>
          </div>

          {search && (
            <div className="flex flex-col gap-3 mt-2">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-widest border-b border-border-default pb-1">Suggested Results</div>
              {loading ? (
                <div className="flex justify-center items-center py-6 text-text-muted">
                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-500"></div>
                   <span className="ml-3 text-sm">Searching tickets...</span>
                </div>
              ) : results.length > 0 ? (
                results.map(ticket => (
                  <div key={ticket.id} className="bg-bg-surface border border-border-default rounded-md p-3 flex flex-col shadow-sm group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-sm text-text-primary">{ticket.id}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide bg-bg-page border border-border-default text-text-secondary px-1.5 py-0.5 rounded">{ticket.status}</span>
                      </div>
                      <Button variant="outline" className="h-7 text-xs font-semibold" onClick={handleLink}>Link</Button>
                    </div>
                    <span className="text-sm text-text-primary font-medium truncate mb-1">{ticket.title}</span>
                    <span className="text-xs text-text-secondary">{ticket.project}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-text-muted text-center py-6 bg-bg-surface rounded-md border border-dashed border-border-default">
                  No tickets found matching your search.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-border-default bg-bg-surface flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleLink}>Submit</Button>
        </div>
      </div>
    </>
  );
}