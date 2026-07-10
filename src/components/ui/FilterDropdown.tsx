import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Check, X } from 'lucide-react';
import { Button } from './Button';

const STATUSES = ['New', 'Open', 'In Progress', 'Resolved', 'Closed'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

export function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const togglePriority = (priority: string) => {
    setSelectedPriorities(prev => 
      prev.includes(priority) ? prev.filter(p => p !== priority) : [...prev, priority]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
  };

  const activeFilterCount = selectedStatuses.length + selectedPriorities.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant={activeFilterCount > 0 ? "primary" : "outline"} 
        size="sm" 
        icon={SlidersHorizontal}
        onClick={() => setIsOpen(!isOpen)}
      >
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2">
          
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-outline-variant">
            <span className="font-semibold text-sm text-on-surface">Filter Tickets</span>
            {activeFilterCount > 0 && (
              <button 
                onClick={clearFilters}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="p-2 max-h-80 overflow-y-auto flex flex-col gap-4">
            
            {/* Status Section */}
            <div>
              <div className="px-2 py-1.5 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</div>
              <div className="flex flex-col">
                {STATUSES.map(status => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-surface-container-low transition-colors text-left"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      selectedStatuses.includes(status) 
                        ? 'bg-primary border-primary text-on-primary' 
                        : 'border-outline-variant bg-surface'
                    }`}>
                      {selectedStatuses.includes(status) && <Check className="w-3 h-3" strokeWidth={3} />}
                    </div>
                    <span className="text-sm text-on-surface">{status}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Section */}
            <div>
              <div className="px-2 py-1.5 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Priority</div>
              <div className="flex flex-col">
                {PRIORITIES.map(priority => (
                  <button
                    key={priority}
                    onClick={() => togglePriority(priority)}
                    className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-surface-container-low transition-colors text-left"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      selectedPriorities.includes(priority) 
                        ? 'bg-primary border-primary text-on-primary' 
                        : 'border-outline-variant bg-surface'
                    }`}>
                      {selectedPriorities.includes(priority) && <Check className="w-3 h-3" strokeWidth={3} />}
                    </div>
                    <span className="text-sm text-on-surface">{priority}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
          
        </div>
      )}
    </div>
  );
}
