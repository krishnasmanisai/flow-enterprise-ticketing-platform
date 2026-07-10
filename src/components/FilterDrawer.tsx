import { useState } from 'react';
import { X, Search, Save } from 'lucide-react';
import { DateRangeDropdown } from './ui/DateRangeDropdown';
import { MultiSelectDropdown } from './ui/MultiSelectDropdown';
import { Button } from './ui/Button';

interface FilterDrawerProps {
  onClose: () => void;
  onApply: (filters: any) => void;
  onSaveAndSearch: (filters: any) => void;
}

export function FilterDrawer({ onClose, onApply, onSaveAndSearch }: FilterDrawerProps) {
  const [ticketId, setTicketId] = useState('');
  const [ticketTitle, setTicketTitle] = useState('');
  const [creationDate, setCreationDate] = useState('Last 7 Days');
  const [lastUpdatedDate, setLastUpdatedDate] = useState('Any Time');
  const [status, setStatus] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [project, setProject] = useState<string[]>([]);
  const [requestType, setRequestType] = useState<string[]>([]);
  const [serviceType, setServiceType] = useState<string[]>([]);
  const [slaOverdue, setSlaOverdue] = useState<string[]>([]);
  const [aboutToBreach, setAboutToBreach] = useState<string[]>([]);
  
  // Multi-select state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const brands = ['Acme Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella Corp'];
  const projects = ['Support', 'IT', 'Billing', 'Operations', 'Development'];
  const requestTypes = ['Incident', 'Service Request', 'Question', 'Enhancement', 'Bug'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['New', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const serviceTypes = ['Hardware', 'Software', 'Network', 'Access', 'Consulting'];
  const slaOverdueOptions = ['SLA overdue by 1', 'SLA overdue by 2', 'SLA overdue by 3', 'SLA overdue by 4', 'SLA overdue by 5', 'SLA overdue by 6', 'SLA overdue by 7', 'Custom'];
  const aboutToBreachOptions = ['Breaching today', 'Breaching tomorrow', 'Breaching the day after tomorrow'];

  const handleApply = () => {
    onApply({ ticketId, ticketTitle, creationDate, lastUpdatedDate, status, priority, project, requestType, serviceType, brands: selectedBrands, slaOverdue, aboutToBreach });
    onClose();
  };

  const handleSaveAndSearch = () => {
    onSaveAndSearch({ ticketId, ticketTitle, creationDate, lastUpdatedDate, status, priority, project, requestType, serviceType, brands: selectedBrands, slaOverdue, aboutToBreach });
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
        <div className="px-6 py-5 border-b border-border-default flex items-center justify-between bg-bg-surface">
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-bg-page custom-scrollbar">
          
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

        {/* Footer */}
        <div className="p-6 border-t border-border-default bg-bg-surface flex flex-col gap-3">
          <div className="flex items-center gap-3 w-full">
            <Button variant="outline" className="flex-1" onClick={handleClear}>
              Clear All
            </Button>
            <Button variant="primary" className="flex-1" icon={Search} onClick={handleApply}>
              Apply Filter
            </Button>
          </div>
          <Button variant="secondary" className="w-full" icon={Save} onClick={handleSaveAndSearch}>
            Save and Search
          </Button>
        </div>
      </div>
    </>
  );
}
