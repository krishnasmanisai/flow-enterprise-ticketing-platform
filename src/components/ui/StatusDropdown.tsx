import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, X, Search, Filter } from 'lucide-react';

export interface StatusItem {
  id: string;
  name: string;
  count: number;
  color: 'slate' | 'blue' | 'amber' | 'purple' | 'emerald' | 'rose';
}

export const ALL_STATUS_OPTIONS: StatusItem[] = [
  { id: 'open', name: 'Open', count: 42, color: 'slate' },
  { id: 'in_progress', name: 'In Progress', count: 28, color: 'blue' },
  { id: 'waiting_for_customer', name: 'Waiting for Customer', count: 15, color: 'amber' },
  { id: 'resolved', name: 'Resolved', count: 18, color: 'emerald' },
  { id: 'closed', name: 'Closed', count: 64, color: 'slate' },
  { id: 'escalated', name: 'Escalated', count: 4, color: 'rose' },
  { id: 'under_investigation', name: 'Under Investigation', count: 9, color: 'blue' },
  { id: 'blocked', name: 'Blocked', count: 3, color: 'rose' },
  { id: 'reopened', name: 'Reopened', count: 2, color: 'rose' },
  { id: 'waiting_for_approval', name: 'Waiting for Approval', count: 6, color: 'amber' },
  { id: 'in_qa_testing', name: 'In QA Testing', count: 7, color: 'purple' },
  { id: 'new', name: 'New', count: 12, color: 'slate' },
  { id: 'assigned', name: 'Assigned', count: 16, color: 'slate' },
  { id: 'triage', name: 'Triage', count: 8, color: 'slate' },
  { id: 'needs_review', name: 'Needs Review', count: 5, color: 'amber' },
  { id: 'work_in_progress', name: 'Work in Progress', count: 14, color: 'blue' },
  { id: 'pending_development', name: 'Pending Development', count: 11, color: 'blue' },
  { id: 'pending_vendor', name: 'Pending Vendor', count: 6, color: 'blue' },
  { id: 'code_review', name: 'Code Review', count: 3, color: 'purple' },
  { id: 'in_uat', name: 'In UAT', count: 4, color: 'purple' },
  { id: 'waiting_for_support', name: 'Waiting for Support', count: 9, color: 'amber' },
  { id: 'waiting_for_3rd_party', name: 'Waiting for 3rd Party', count: 5, color: 'amber' },
  { id: 'waiting_for_info', name: 'Waiting for Info', count: 8, color: 'amber' },
  { id: 'pending_change_board', name: 'Pending Change Board', count: 3, color: 'amber' },
  { id: 'on_hold', name: 'On Hold', count: 4, color: 'amber' },
  { id: 'paused_sla', name: 'Paused SLA', count: 7, color: 'amber' },
  { id: 'scheduled', name: 'Scheduled', count: 5, color: 'purple' },
  { id: 'pending_release', name: 'Pending Release', count: 4, color: 'purple' },
  { id: 'staged_deployment', name: 'Staged for Deployment', count: 3, color: 'purple' },
  { id: 'pending_verification', name: 'Pending Verification', count: 6, color: 'purple' },
  { id: 'awaiting_hardware', name: 'Awaiting Hardware', count: 2, color: 'amber' },
  { id: 'dispatch_scheduled', name: 'Dispatch Scheduled', count: 3, color: 'purple' },
  { id: 'workaround_provided', name: 'Workaround Provided', count: 5, color: 'emerald' },
  { id: 'auto_closed', name: 'Auto-Closed', count: 12, color: 'slate' },
  { id: 'canceled', name: 'Canceled', count: 5, color: 'slate' },
  { id: 'duplicate', name: 'Duplicate', count: 4, color: 'slate' },
  { id: 'cannot_reproduce', name: 'Cannot Reproduce', count: 3, color: 'slate' },
  { id: 'declined', name: 'Declined', count: 2, color: 'slate' },
  { id: 'merged', name: 'Merged', count: 3, color: 'slate' },
  { id: 'archived', name: 'Archived', count: 15, color: 'slate' }
];

interface StatusDropdownProps {
  selectedStatuses: string[];
  onChange: (statuses: string[]) => void;
  className?: string;
  id?: string;
}

export function StatusDropdown({
  selectedStatuses = [],
  onChange,
  className = '',
  id = 'status-dropdown'
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Total count across all statuses
  const totalCount = useMemo(() => {
    return ALL_STATUS_OPTIONS.reduce((acc, s) => acc + s.count, 0);
  }, []);

  // Filtered flat status list (NO GROUPING BY STATUS)
  const filteredStatuses = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return ALL_STATUS_OPTIONS;
    return ALL_STATUS_OPTIONS.filter(s => s.name.toLowerCase().includes(q));
  }, [search]);

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

  const toggleStatus = (statusName: string) => {
    if (selectedStatuses.includes(statusName)) {
      onChange(selectedStatuses.filter(s => s !== statusName));
    } else {
      onChange([...selectedStatuses, statusName]);
    }
  };

  const selectAllFiltered = () => {
    const newSelected = Array.from(new Set([...selectedStatuses, ...filteredStatuses.map(s => s.name)]));
    onChange(newSelected);
  };

  const clearFiltered = () => {
    const filteredNames = new Set(filteredStatuses.map(s => s.name));
    onChange(selectedStatuses.filter(name => !filteredNames.has(name)));
  };

  const clearAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChange([]);
  };

  const isAll = selectedStatuses.length === 0;

  // Compute selected count total
  const selectedTicketsCount = useMemo(() => {
    if (isAll) return totalCount;
    return ALL_STATUS_OPTIONS
      .filter(s => selectedStatuses.includes(s.name))
      .reduce((acc, s) => acc + s.count, 0);
  }, [selectedStatuses, isAll, totalCount]);

  // Display text in button
  const getButtonText = () => {
    if (isAll) {
      return (
        <span>Status: <strong className="text-text-primary font-semibold">All Statuses</strong></span>
      );
    }
    if (selectedStatuses.length === 1) {
      return (
        <span>Status: <strong className="text-brand-700 font-semibold">{selectedStatuses[0]}</strong></span>
      );
    }
    if (selectedStatuses.length === 2) {
      return (
        <span>Status: <strong className="text-brand-700 font-semibold">{selectedStatuses[0]}, {selectedStatuses[1]}</strong></span>
      );
    }
    return (
      <span>Status: <strong className="text-brand-700 font-semibold">{selectedStatuses.length} Selected</strong></span>
    );
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef} id={id}>
      {/* Dropdown Trigger Button */}
      <button
        id={`${id}-trigger`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`h-9 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between gap-2.5 transition-all shadow-xs cursor-pointer ${
          !isAll
            ? 'bg-brand-50/90 border-brand-300 text-brand-900 ring-1 ring-brand-500/20 hover:bg-brand-100/80'
            : 'bg-bg-surface border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong hover:bg-bg-surface-hover'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <Filter size={13} className={!isAll ? 'text-brand-600 shrink-0' : 'text-text-muted shrink-0'} />
          <span className="truncate max-w-[200px] sm:max-w-[280px]">
            {getButtonText()}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
            !isAll
              ? 'bg-brand-600 text-white'
              : 'bg-bg-page border border-border-default text-text-muted'
          }`}>
            {selectedTicketsCount}
          </span>
          {!isAll && (
            <span
              id={`${id}-clear`}
              onClick={clearAll}
              className="p-0.5 hover:bg-brand-200/70 rounded text-brand-700 cursor-pointer transition-colors"
              title="Reset to All Statuses"
            >
              <X size={12} />
            </span>
          )}
          <ChevronDown size={14} className={`text-text-muted transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Multi-Select Dropdown Panel (NO GROUPING BY STATUS) */}
      {isOpen && (
        <div
          id={`${id}-menu`}
          role="listbox"
          aria-multiselectable="true"
          className="absolute top-full left-0 mt-1.5 w-76 sm:w-84 bg-bg-surface border border-border-default rounded-xl shadow-2xl z-[100] flex flex-col max-h-[420px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Search Header */}
          <div className="p-2.5 border-b border-border-default bg-bg-page shrink-0 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                id={`${id}-search`}
                type="text"
                placeholder="Search statuses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-bg-surface border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-2xs font-medium"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center justify-between text-[11px] text-text-muted px-0.5">
              <span>
                {isAll ? (
                  <strong className="text-text-primary">All ({ALL_STATUS_OPTIONS.length})</strong>
                ) : (
                  <span>
                    <strong className="text-brand-700">{selectedStatuses.length}</strong> of {ALL_STATUS_OPTIONS.length} selected
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2 font-medium">
                <button
                  id={`${id}-select-all-filtered`}
                  type="button"
                  onClick={selectAllFiltered}
                  className="text-brand-600 hover:text-brand-800 hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span>•</span>
                <button
                  id={`${id}-clear-all`}
                  type="button"
                  onClick={() => clearAll()}
                  className="text-text-secondary hover:text-text-primary hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Flat Options List (NO CATEGORIES, NO GROUPS) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-1.5 space-y-0.5">
            {/* "All Statuses" Reset Option */}
            {!search && (
              <button
                id={`${id}-option-all`}
                type="button"
                onClick={() => clearAll()}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                  isAll
                    ? 'bg-brand-50 text-brand-900 font-semibold'
                    : 'hover:bg-bg-surface-hover text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                    isAll ? 'bg-brand-600 border-brand-600 text-white' : 'border-border-strong bg-bg-surface'
                  }`}>
                    {isAll && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="truncate">All Statuses</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] text-text-muted">{totalCount}</span>
                </div>
              </button>
            )}

            {filteredStatuses.length === 0 ? (
              <div className="py-8 text-center text-text-muted text-xs">
                No statuses match "{search}"
              </div>
            ) : (
              filteredStatuses.map(status => {
                const isChecked = selectedStatuses.includes(status.name);
                return (
                  <button
                    key={status.id}
                    id={`${id}-option-${status.id}`}
                    type="button"
                    onClick={() => toggleStatus(status.name)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                      isChecked
                        ? 'bg-brand-50/90 text-brand-900 font-semibold'
                        : 'hover:bg-bg-surface-hover text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-brand-600 border-brand-600 text-white' : 'border-border-strong bg-bg-surface'
                      }`}>
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </span>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${getColorDot(status.color)}`} />
                      <span className="truncate">{status.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[11px] text-text-muted">{status.count}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Bottom Bar with Done Button */}
          <div className="p-2 border-t border-border-default bg-bg-page flex items-center justify-between shrink-0">
            <span className="text-[11px] text-text-muted font-mono">
              {!isAll ? `${selectedStatuses.length} selected` : 'Showing all'}
            </span>
            <button
              id={`${id}-done-btn`}
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
