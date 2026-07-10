import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function BUMappingStep() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Operations': true,
  });
  
  const [selected, setSelected] = useState<Record<string, boolean>>({
    'Operations': true,
    'Client Ops': true,
    'Operation & Customer Support': true
  });

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  
  const toggleSelect = (id: string) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const units = [
    { 
      id: 'Operations', name: 'Operations', 
      subUnits: [
        { id: 'Client Ops', name: 'Client Ops' },
        { id: 'Operation & Customer Support', name: 'Operation & Customer Support' },
        { id: 'Field Services', name: 'Field Services' },
        { id: 'Logistics', name: 'Logistics' }
      ] 
    },
    { id: 'Leadership', name: 'Leadership', subUnits: [{ id: 'Exec', name: 'Executive Team' }] },
    { id: 'Technology', name: 'Technology', subUnits: [{ id: 'IT', name: 'IT Support' }, { id: 'Engineering', name: 'Engineering' }] },
    { id: 'Analytics', name: 'Analytics', subUnits: [] },
    { id: 'Corporate', name: 'Corporate', subUnits: [{ id: 'HR', name: 'Human Resources' }, { id: 'Finance', name: 'Finance' }] },
    { id: 'Business Development', name: 'Business Development', subUnits: [] },
    { id: 'Customer Success', name: 'Customer Success', subUnits: [] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary tracking-tight mb-2">Business Unit Mapping</h3>
        <p className="text-sm text-text-secondary">Map organizational business units and their sub-units to this project.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left panel */}
        <div className="lg:col-span-2 flex flex-col h-[600px] border border-border-default rounded-xl bg-bg-surface overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border-default bg-bg-surface sticky top-0 z-10 flex items-center gap-3">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
               <input 
                 type="text" 
                 placeholder="Search business units..." 
                 className="w-full pl-9 pr-3 py-2.5 bg-bg-page border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
               />
             </div>
             <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap px-2">Expand All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="flex flex-col gap-1">
              {units.map(unit => (
                <div key={unit.id} className="rounded-lg overflow-hidden">
                  <div className={`flex items-center p-3 rounded-lg transition-colors ${expanded[unit.id] ? 'bg-brand-50/50' : 'hover:bg-bg-page'}`}>
                    <button 
                      onClick={() => toggleExpand(unit.id)}
                      className={`mr-2 p-1 rounded hover:bg-border-default transition-colors ${unit.subUnits.length === 0 ? 'invisible' : ''} ${expanded[unit.id] ? 'text-brand-600' : 'text-text-muted'}`}
                    >
                      {expanded[unit.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input 
                        type="checkbox" 
                        checked={!!selected[unit.id]}
                        onChange={() => toggleSelect(unit.id)}
                        className="w-4 h-4 text-brand-500 border-border-strong rounded focus:ring-brand-500"
                      />
                      <span className="font-semibold text-sm text-text-primary select-none">{unit.name}</span>
                    </label>
                    <span className="text-[11px] font-medium text-text-muted bg-bg-page px-2 py-0.5 rounded border border-border-default">{unit.subUnits.length} sub-units</span>
                  </div>
                  
                  {expanded[unit.id] && unit.subUnits.length > 0 && (
                    <div className="ml-7 pl-6 py-2 border-l border-border-default space-y-1">
                      {unit.subUnits.map(sub => (
                        <label key={sub.id} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-bg-page transition-colors">
                           <input 
                             type="checkbox" 
                             checked={!!selected[sub.id]}
                             onChange={() => toggleSelect(sub.id)}
                             className="w-4 h-4 text-brand-500 border-border-strong rounded focus:ring-brand-500" 
                           />
                           <span className="text-sm font-medium text-text-secondary select-none">{sub.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right summary panel */}
        <div className="lg:col-span-1 h-[600px] border border-border-default rounded-xl bg-bg-surface overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 border-b border-border-default bg-bg-surface">
             <h3 className="text-sm font-bold text-text-primary">Selected Units</h3>
             <p className="text-xs text-text-secondary mt-1">1 Parent, 2 Sub-units</p>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-bg-page">
             <div className="flex flex-col gap-3">
                <div className="bg-bg-surface border border-border-default p-3 rounded-lg shadow-sm">
                   <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-sm text-text-primary">Operations</span>
                      <button className="text-[10px] font-bold text-error-text uppercase tracking-wider hover:underline">Remove</button>
                   </div>
                   <div className="flex flex-col gap-2 pl-3 border-l-2 border-brand-200">
                      <span className="text-xs font-medium text-text-secondary flex items-center justify-between">
                        Client Ops
                        <button className="text-text-muted hover:text-error-text transition-colors">×</button>
                      </span>
                      <span className="text-xs font-medium text-text-secondary flex items-center justify-between">
                        Operation & Customer Support
                        <button className="text-text-muted hover:text-error-text transition-colors">×</button>
                      </span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
