import { useState } from 'react';
import { X, Search, Save, Bookmark, Trash2, Clock, Edit2, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import { DateRangeDropdown } from './ui/DateRangeDropdown';
import { MultiSelectDropdown } from './ui/MultiSelectDropdown';
import { Button } from './ui/Button';

interface FilterDrawerProps {
  onClose: () => void;
  onApply: (filters: any) => void;
  onSaveAndSearch: (filters: any) => void;
}

export function FilterDrawer({ onClose, onApply, onSaveAndSearch }: FilterDrawerProps) {
  
  const [activeTab, setActiveTab] = useState<'filters' | 'saved'>('filters');
  const [savedFilters, setSavedFilters] = useState<any[]>([]);
  const [filterName, setFilterName] = useState('');
  const [editingFilterId, setEditingFilterId] = useState<string | null>(null);
  const [editFilterName, setEditFilterName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('flow_saved_filters');
    if (saved) {
      try { setSavedFilters(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveCurrentFilter = () => {
    if (!filterName.trim()) return;
    const newFilter = {
      id: Date.now().toString(),
      name: filterName.trim(),
      filters: { ticketId, ticketTitle, creationDate, lastUpdatedDate, status, priority, project, requestType, subRequestType, contactInfo, serviceType, brands: selectedBrands, slaOverdue, aboutToBreach }
    };
    const updated = [...savedFilters, newFilter];
    setSavedFilters(updated);
    localStorage.setItem('flow_saved_filters', JSON.stringify(updated));
    setFilterName('');
    setIsSaving(false);
    setActiveTab('saved');
  };

  const applySavedFilter = (f: any) => {
    const filters = f.filters;
    setTicketId(filters.ticketId || '');
    setTicketTitle(filters.ticketTitle || '');
    setCreationDate(filters.creationDate || 'Last 7 Days');
    setLastUpdatedDate(filters.lastUpdatedDate || 'Any Time');
    setStatus(filters.status || []);
    setPriority(filters.priority || []);
    setProject(filters.project || []);
    setRequestType(filters.requestType || []);
    setSubRequestType(filters.subRequestType || []);
    setContactInfo(filters.contactInfo || '');
    setServiceType(filters.serviceType || []);
    setSelectedBrands(filters.brands || []);
    setSlaOverdue(filters.slaOverdue || []);
    setAboutToBreach(filters.aboutToBreach || []);
    setActiveTab('filters');
  };

  const deleteSavedFilter = (id: string) => {
    const updated = savedFilters.filter(f => f.id !== id);
    setSavedFilters(updated);
    localStorage.setItem('flow_saved_filters', JSON.stringify(updated));
  };

  const startEditing = (sf: any) => {
    setEditingFilterId(sf.id);
    setEditFilterName(sf.name);
  };

  const saveEdit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!editFilterName.trim() || !editingFilterId) return;
    const updated = savedFilters.map(f => f.id === editingFilterId ? { ...f, name: editFilterName.trim() } : f);
    setSavedFilters(updated);
    localStorage.setItem('flow_saved_filters', JSON.stringify(updated));
    setEditingFilterId(null);
  };

  const updateFilterValues = (id: string) => {
    const updated = savedFilters.map(f => f.id === id ? { ...f, filters: { ticketId, ticketTitle, creationDate, lastUpdatedDate, status, priority, project, requestType, subRequestType, contactInfo, serviceType, brands: selectedBrands, slaOverdue, aboutToBreach } } : f);
    setSavedFilters(updated);
    localStorage.setItem('flow_saved_filters', JSON.stringify(updated));
  };

  const [ticketId, setTicketId] = useState('');
  const [ticketTitle, setTicketTitle] = useState('');
  const [creationDate, setCreationDate] = useState('Last 7 Days');
  const [lastUpdatedDate, setLastUpdatedDate] = useState('Any Time');
  const [status, setStatus] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [project, setProject] = useState<string[]>([]);
  const [requestType, setRequestType] = useState<string[]>([]);
  const [subRequestType, setSubRequestType] = useState<string[]>([]);
  const [contactInfo, setContactInfo] = useState('');
  const [serviceType, setServiceType] = useState<string[]>([]);
  const [slaOverdue, setSlaOverdue] = useState<string[]>([]);
  const [aboutToBreach, setAboutToBreach] = useState<string[]>([]);
  
  // Multi-select state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const brands = ['Acme Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella Corp'];
  const projects = ['Support', 'IT', 'Billing', 'Operations', 'Development'];
  const requestTypes = ['Incident', 'Service Request', 'Question', 'Enhancement', 'Bug'];
  const subRequestTypes = ['Login Issue', 'Payment Failure', 'Feature Request', 'General Inquiry'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['New', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const serviceTypes = ['Hardware', 'Software', 'Network', 'Access', 'Consulting'];
  const slaOverdueOptions = ['SLA overdue by 1', 'SLA overdue by 2', 'SLA overdue by 3', 'SLA overdue by 4', 'SLA overdue by 5', 'SLA overdue by 6', 'SLA overdue by 7', 'Custom'];
  const aboutToBreachOptions = ['Breaching today', 'Breaching tomorrow', 'Breaching the day after tomorrow'];

  const handleApply = () => {
    onApply({ ticketId, ticketTitle, creationDate, lastUpdatedDate, status, priority, project, requestType, subRequestType, contactInfo, serviceType, brands: selectedBrands, slaOverdue, aboutToBreach });
    onClose();
  };

  const handleSaveAndSearch = () => {
    onSaveAndSearch({ ticketId, ticketTitle, creationDate, lastUpdatedDate, status, priority, project, requestType, subRequestType, contactInfo, serviceType, brands: selectedBrands, slaOverdue, aboutToBreach });
    onClose();
  };

  const handleClear = () => {
    setTicketId('');
    setTicketTitle('');
    setCreationDate('');
    setLastUpdatedDate('');
    setStatus([]);
    setPriority([]);
    setProject([]);
    setRequestType([]);
    setSubRequestType([]);
    setContactInfo('');
    setServiceType([]);
    setSlaOverdue([]);
    setAboutToBreach([]);
    setSelectedBrands([]);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      <div role="dialog" aria-modal="true" aria-labelledby="filter-drawer-title" className="fixed inset-y-0 right-0 w-[400px] bg-bg-page shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-border-strong">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-border-default flex flex-col gap-4 bg-bg-surface">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="filter-drawer-title" className="text-base font-semibold text-text-primary tracking-tight">Advanced Filters</h2>
              <p className="text-xs text-text-secondary mt-1">Filter tickets by specific criteria</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex bg-bg-page p-1 rounded-md border border-border-default">
            <button 
              onClick={() => setActiveTab('filters')}
              className={`flex-1 text-xs font-semibold py-1.5 rounded transition-colors ${activeTab === 'filters' ? 'bg-bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Active Filters
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`flex-1 text-xs font-semibold py-1.5 rounded transition-colors ${activeTab === 'saved' ? 'bg-bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Saved Filters
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-bg-page custom-scrollbar">
          {activeTab === 'filters' ? (
            <div className="space-y-8">
              <div className="space-y-5">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest border-b border-border-default pb-2">Ticket Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Ticket ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. TICK-1234"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                      className="input-base w-full"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Title/Description</label>
                    <input 
                      type="text" 
                      placeholder="Search text..."
                      value={ticketTitle}
                      onChange={(e) => setTicketTitle(e.target.value)}
                      className="input-base w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Email / Mobile Number</label>
                    <input 
                      type="text" 
                      placeholder="Search by contact info..."
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="input-base w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Creation Date</label>
                    <DateRangeDropdown 
                      value={creationDate}
                      onChange={setCreationDate}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Last Updated Date</label>
                    <DateRangeDropdown 
                      value={lastUpdatedDate}
                      onChange={setLastUpdatedDate}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Brand</label>
                    <MultiSelectDropdown 
                      options={brands} 
                      selected={selectedBrands} 
                      onChange={setSelectedBrands} 
                      placeholder="Select brands..." 
                      selectedSuffix="brands"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Project</label>
                    <MultiSelectDropdown 
                      selected={project}
                      onChange={setProject}
                      placeholder="All Projects"
                      options={projects}
                      selectedSuffix="projects"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Request Type</label>
                    <MultiSelectDropdown 
                      selected={requestType}
                      onChange={setRequestType}
                      placeholder="All Types"
                      options={requestTypes}
                      selectedSuffix="types"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Sub Request Type</label>
                    <MultiSelectDropdown 
                      selected={subRequestType}
                      onChange={setSubRequestType}
                      placeholder="All Sub Types"
                      options={subRequestTypes}
                      selectedSuffix="sub types"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Service Type</label>
                    <MultiSelectDropdown 
                      selected={serviceType}
                      onChange={setServiceType}
                      placeholder="All Services"
                      options={serviceTypes}
                      selectedSuffix="services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Status</label>
                    <MultiSelectDropdown 
                      selected={status}
                      onChange={setStatus}
                      placeholder="All Statuses"
                      options={statuses}
                      selectedSuffix="statuses"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">Priority</label>
                    <MultiSelectDropdown 
                      selected={priority}
                      onChange={setPriority}
                      placeholder="All Priorities"
                      options={priorities}
                      selectedSuffix="priorities"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">SLA Overdue</label>
                    <MultiSelectDropdown 
                      selected={slaOverdue}
                      onChange={setSlaOverdue}
                      placeholder="Select..."
                      options={slaOverdueOptions}
                      selectedSuffix="options"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-text-primary">About to Breach</label>
                    <MultiSelectDropdown 
                      selected={aboutToBreach}
                      onChange={setAboutToBreach}
                      placeholder="Select..."
                      options={aboutToBreachOptions}
                      selectedSuffix="options"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              
              {savedFilters.length > 0 && (
                <div className="mb-4">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                      type="text" 
                      placeholder="Search saved filters..." 
                      className="input-base text-sm w-full pl-9"
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase();
                        document.querySelectorAll('.saved-filter-item').forEach(el => {
                          const name = el.getAttribute('data-name')?.toLowerCase() || '';
                          if (name.includes(val)) el.classList.remove('hidden');
                          else el.classList.add('hidden');
                        });
                      }}
                    />
                  </div>
                </div>
              )}
              {savedFilters.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <Bookmark size={32} className="text-text-muted mb-3 opacity-50" />
                  <p className="text-sm font-medium text-text-primary">No saved filters yet</p>
                  <p className="text-xs text-text-secondary mt-1">Save your frequently used filters for quick access.</p>
                </div>
              ) : (
                savedFilters.map(sf => (
                  <div key={sf.id} data-name={sf.name} className="saved-filter-item p-4 rounded-md border border-border-default bg-bg-surface hover:border-brand-500 transition-colors group cursor-pointer" onClick={() => applySavedFilter(sf)}>
                    {editingFilterId === sf.id ? (
                      <div className="flex flex-col gap-2" onClick={e => e.stopPropagation()}>
                        <input 
                          type="text" 
                          value={editFilterName}
                          onChange={e => setEditFilterName(e.target.value)}
                          className="input-base text-sm w-full"
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') setEditingFilterId(null);
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <Button variant="secondary" size="sm" className="flex-1" onClick={() => setEditingFilterId(null)}>Cancel</Button>
                          <Button variant="primary" size="sm" className="flex-1" onClick={saveEdit}>Save</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm text-text-primary flex items-center gap-2">
                          <Bookmark size={14} className="text-brand-500" />
                          {sf.name}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateFilterValues(sf.id); }}
                            className="text-text-muted hover:text-brand-500 transition-colors p-1"
                            title="Update with current filters"
                          >
                            <RefreshCw size={14} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); startEditing(sf); }}
                            className="text-text-muted hover:text-text-primary transition-colors p-1"
                            title="Rename saved filter"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteSavedFilter(sf.id); }}
                            className="text-text-muted hover:text-error-text transition-colors p-1"
                            title="Delete saved filter"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {activeTab === 'filters' && (
          <div className="p-6 border-t border-border-default bg-bg-surface flex flex-col gap-3">
            {isSaving ? (
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Filter Name (e.g., My Open Incidents)" 
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="input-base text-sm w-full"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <Button variant="secondary" className="flex-1" onClick={() => setIsSaving(false)}>Cancel</Button>
                  <Button variant="primary" className="flex-1" onClick={saveCurrentFilter} disabled={!filterName.trim()}>Save</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 w-full">
                  <Button variant="outline" className="flex-1" onClick={handleClear}>
                    Clear All
                  </Button>
                  <Button variant="primary" className="flex-1" icon={Search} onClick={handleApply}>
                    Apply Filter
                  </Button>
                </div>
                <Button variant="secondary" className="w-full" icon={Bookmark} onClick={() => setIsSaving(true)}>
                  Save Current Filter
                </Button>
              </>
            )}
          </div>
        )}
        {activeTab === 'saved' && (
          <div className="p-6 border-t border-border-default bg-bg-surface">
            <Button variant="outline" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
