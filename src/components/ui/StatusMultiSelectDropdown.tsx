import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  Check, 
  X, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

export interface StatusItem {
  id: string;
  name: string;
  category: 'New & Triage' | 'In Progress' | 'Waiting & Blocked' | 'Staged & QA' | 'Resolved & Closed';
  count: number;
  color: 'slate' | 'blue' | 'amber' | 'purple' | 'emerald' | 'rose';
}

export const ALL_40_STATUSES: StatusItem[] = [
  // 1. New & Triage (7)
  { id: 'new', name: 'New', category: 'New & Triage', count: 12, color: 'slate' },
  { id: 'open', name: 'Open', category: 'New & Triage', count: 42, color: 'slate' },
  { id: 'assigned', name: 'Assigned', category: 'New & Triage', count: 16, color: 'slate' },
  { id: 'reopened', name: 'Reopened', category: 'New & Triage', count: 2, color: 'rose' },
  { id: 'triage', name: 'Triage', category: 'New & Triage', count: 8, color: 'slate' },
  { id: 'needs_review', name: 'Needs Review', category: 'New & Triage', count: 5, color: 'amber' },
  { id: 'escalated', name: 'Escalated', category: 'New & Triage', count: 4, color: 'rose' },

  // 2. In Progress (8)
  { id: 'in_progress', name: 'In Progress', category: 'In Progress', count: 28, color: 'blue' },
  { id: 'under_investigation', name: 'Under Investigation', category: 'In Progress', count: 9, color: 'blue' },
  { id: 'work_in_progress', name: 'Work in Progress', category: 'In Progress', count: 14, color: 'blue' },
  { id: 'pending_development', name: 'Pending Development', category: 'In Progress', count: 11, color: 'blue' },
  { id: 'pending_vendor', name: 'Pending Vendor', category: 'In Progress', count: 6, color: 'blue' },
  { id: 'code_review', name: 'Code Review', category: 'In Progress', count: 3, color: 'purple' },
  { id: 'in_qa_testing', name: 'In QA Testing', category: 'In Progress', count: 7, color: 'purple' },
  { id: 'in_uat', name: 'In UAT', category: 'In Progress', count: 4, color: 'purple' },

  // 3. Waiting & Blocked (9)
  { id: 'waiting_for_customer', name: 'Waiting for Customer', category: 'Waiting & Blocked', count: 15, color: 'amber' },
  { id: 'waiting_for_support', name: 'Waiting for Support', category: 'Waiting & Blocked', count: 9, color: 'amber' },
  { id: 'waiting_for_3rd_party', name: 'Waiting for 3rd Party', category: 'Waiting & Blocked', count: 5, color: 'amber' },
  { id: 'waiting_for_approval', name: 'Waiting for Approval', category: 'Waiting & Blocked', count: 6, color: 'amber' },
  { id: 'waiting_for_info', name: 'Waiting for Info', category: 'Waiting & Blocked', count: 8, color: 'amber' },
  { id: 'pending_change_board', name: 'Pending Change Board', category: 'Waiting & Blocked', count: 3, color: 'amber' },
  { id: 'on_hold', name: 'On Hold', category: 'Waiting & Blocked', count: 4, color: 'amber' },
  { id: 'blocked', name: 'Blocked', category: 'Waiting & Blocked', count: 3, color: 'rose' },
  { id: 'paused_sla', name: 'Paused SLA', category: 'Waiting & Blocked', count: 7, color: 'amber' },

  // 4. Staged & QA (6)
  { id: 'scheduled', name: 'Scheduled', category: 'Staged & QA', count: 5, color: 'purple' },
  { id: 'pending_release', name: 'Pending Release', category: 'Staged & QA', count: 4, color: 'purple' },
  { id: 'staged_deployment', name: 'Staged for Deployment', category: 'Staged & QA', count: 3, color: 'purple' },
  { id: 'pending_verification', name: 'Pending Verification', category: 'Staged & QA', count: 6, color: 'purple' },
  { id: 'awaiting_hardware', name: 'Awaiting Hardware', category: 'Staged & QA', count: 2, color: 'amber' },
  { id: 'dispatch_scheduled', name: 'Dispatch Scheduled', category: 'Staged & QA', count: 3, color: 'purple' },

  // 5. Resolved & Closed (10)
  { id: 'resolved', name: 'Resolved', category: 'Resolved & Closed', count: 18, color: 'emerald' },
  { id: 'closed', name: 'Closed', category: 'Resolved & Closed', count: 64, color: 'slate' },
  { id: 'canceled', name: 'Canceled', category: 'Resolved & Closed', count: 5, color: 'slate' },
  { id: 'duplicate', name: 'Duplicate', category: 'Resolved & Closed', count: 4, color: 'slate' },
  { id: 'auto_closed', name: 'Auto-Closed', category: 'Resolved & Closed', count: 12, color: 'slate' },
  { id: 'cannot_reproduce', name: 'Cannot Reproduce', category: 'Resolved & Closed', count: 3, color: 'slate' },
  { id: 'workaround_provided', name: 'Workaround Provided', category: 'Resolved & Closed', count: 5, color: 'emerald' },
  { id: 'declined', name: 'Declined', category: 'Resolved & Closed', count: 2, color: 'slate' },
  { id: 'merged', name: 'Merged', category: 'Resolved & Closed', count: 3, color: 'slate' },
  { id: 'archived', name: 'Archived', category: 'Resolved & Closed', count: 15, color: 'slate' }
];

export const CATEGORIES: Array<StatusItem['category']> = [
  'New & Triage',
  'In Progress',
  'Waiting & Blocked',
  'Staged & QA',
  'Resolved & Closed'
];

interface StatusMultiSelectDropdownProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function StatusMultiSelectDropdown({
  selected,
  onChange,
  className = ''
}: StatusMultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Filtered statuses
  const filteredStatuses = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL_40_STATUSES.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
      const matchesCategory = activeCategoryFilter === 'All' || s.category === activeCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategoryFilter]);

  // Grouped for display
  const groupedStatuses = useMemo(() => {
    const map = new Map<StatusItem['category'], StatusItem[]>();
    CATEGORIES.forEach(cat => map.set(cat, []));

    filteredStatuses.forEach(s => {
      if (map.has(s.category)) {
        map.get(s.category)!.push(s);
      }
    });

    return Array.from(map.entries()).filter(([_, items]) => items.length > 0);
  }, [filteredStatuses]);

  const toggleStatus = (statusName: string) => {
    if (selected.includes(statusName)) {
      onChange(selected.filter(s => s !== statusName));
    } else {
      onChange([...selected, statusName]);
    }
  };

  const handleSelectAllFiltered = () => {
    const filteredNames = filteredStatuses.map(s => s.name);
    const combined = Array.from(new Set([...selected, ...filteredNames]));
    onChange(combined);
  };

  const handleDeselectFiltered = () => {
    const filteredNames = new Set(filteredStatuses.map(s => s.name));
    onChange(selected.filter(s => !filteredNames.has(s)));
  };

  const handleSelectCategory = (cat: StatusItem['category']) => {
    const catStatuses = ALL_40_STATUSES.filter(s => s.category === cat).map(s => s.name);
    const allSelected = catStatuses.every(s => selected.includes(s));
    
    if (allSelected) {
      // Unselect category
      onChange(selected.filter(s => !catStatuses.includes(s)));
    } else {
      // Select category
      onChange(Array.from(new Set([...selected, ...catStatuses])));
    }
  };

  // Quick preset shortcuts
  const selectPreset = (preset: 'active' | 'waiting' | 'resolved' | 'all' | 'clear') => {
    if (preset === 'clear') {
      onChange([]);
    } else if (preset === 'all') {
      onChange(ALL_40_STATUSES.map(s => s.name));
    } else if (preset === 'active') {
      const activeNames = ALL_40_STATUSES
        .filter(s => s.category === 'New & Triage' || s.category === 'In Progress')
        .map(s => s.name);
      onChange(activeNames);
    } else if (preset === 'waiting') {
      const waitingNames = ALL_40_STATUSES
        .filter(s => s.category === 'Waiting & Blocked')
        .map(s => s.name);
      onChange(waitingNames);
    } else if (preset === 'resolved') {
      const resolvedNames = ALL_40_STATUSES
        .filter(s => s.category === 'Resolved & Closed')
        .map(s => s.name);
      onChange(resolvedNames);
    }
  };

  const totalTicketsInSelection = useMemo(() => {
    if (selected.length === 0) {
      return ALL_40_STATUSES.reduce((acc, s) => acc + s.count, 0);
    }
    return ALL_40_STATUSES
      .filter(s => selected.includes(s.name))
      .reduce((acc, s) => acc + s.count, 0);
  }, [selected]);

  const getColorDot = (color: StatusItem['color']) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500';
      case 'blue': return 'bg-blue-500';
      case 'amber': return 'bg-amber-500';
      case 'rose': return 'bg-rose-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-9 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between gap-2.5 transition-all shadow-xs ${
          selected.length > 0 
            ? 'bg-brand-50/70 border-brand-300 text-brand-900 ring-1 ring-brand-500/20' 
            : 'bg-bg-surface border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <SlidersHorizontal size={13} className={selected.length > 0 ? 'text-brand-600' : 'text-text-muted'} />
          <span className="truncate">
            {selected.length === 0 ? (
              <span>Status: <strong className="text-text-primary font-semibold">All 40 Statuses</strong></span>
            ) : selected.length === 1 ? (
              <span>Status: <strong className="text-brand-700 font-semibold">{selected[0]}</strong></span>
            ) : (
              <span>
                Status: <strong className="text-brand-700 font-semibold">{selected.length} Selected</strong>
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
            selected.length > 0 
              ? 'bg-brand-600 text-white' 
              : 'bg-bg-page border border-border-default text-text-muted'
          }`}>
            {selected.length === 0 ? '124' : totalTicketsInSelection}
          </span>
          {selected.length > 0 && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange([]);
              }}
              className="p-0.5 hover:bg-brand-200/60 rounded text-brand-700"
              title="Reset to All"
            >
              <X size={12} />
            </span>
          )}
          <ChevronDown size={14} className={`text-text-muted transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-[380px] sm:w-[440px] bg-bg-surface border border-border-default rounded-xl shadow-2xl z-[100] flex flex-col max-h-[520px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Search Header */}
          <div className="p-3 border-b border-border-default bg-bg-page space-y-2.5 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search across all 40 statuses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-bg-surface border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-2xs font-medium"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border-subtle text-text-muted">
              <span className="font-medium">
                {filteredStatuses.length} of 40 statuses shown
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllFiltered}
                  className="text-brand-600 hover:text-brand-800 font-semibold hover:underline"
                >
                  Select All
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleDeselectFiltered}
                  className="text-text-secondary hover:text-text-primary font-medium hover:underline"
                >
                  Clear Filtered
                </button>
              </div>
            </div>
          </div>

          {/* Status List - Flat without Grouping */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-0.5">
            {filteredStatuses.length === 0 ? (
              <div className="py-10 text-center text-text-muted text-xs">
                No statuses match "{search}"
              </div>
            ) : (
              filteredStatuses.map(status => {
                const isChecked = selected.includes(status.name);
                return (
                  <label
                    key={status.id}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                      isChecked 
                        ? 'bg-brand-50/80 text-brand-900 font-medium' 
                        : 'hover:bg-bg-surface-hover text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleStatus(status.name)}
                        className="w-3.5 h-3.5 rounded border-border-strong text-brand-600 focus:ring-brand-500 cursor-pointer"
                      />
                      <span className={`w-2 h-2 rounded-full shrink-0 ${getColorDot(status.color)}`} />
                      <span className="truncate">{status.name}</span>
                    </div>

                    <span className="font-mono text-[11px] text-text-muted ml-2 shrink-0">
                      {status.count}
                    </span>
                  </label>
                );
              })
            )}
          </div>

          {/* Sticky Footer */}
          <div className="p-3 border-t border-border-default bg-bg-page flex items-center justify-between text-xs shrink-0">
            <div className="text-text-secondary text-[11.5px]">
              {selected.length === 0 ? (
                <span>Showing all tickets (no filter applied)</span>
              ) : (
                <span>
                  <strong className="text-text-primary">{selected.length}</strong> statuses selected ({totalTicketsInSelection} tickets)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="px-2.5 py-1 text-text-secondary hover:text-text-primary font-medium hover:underline text-[11.5px]"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md shadow-2xs text-[11.5px] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
