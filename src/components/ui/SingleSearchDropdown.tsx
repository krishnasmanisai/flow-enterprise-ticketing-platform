import React from "react";
import { useState, useRef, useEffect } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';

interface SingleSearchDropdownProps {
  label?: string;
  icon?: React.ElementType;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SingleSearchDropdown({ label, icon: Icon, options, value, onChange, placeholder = "Search...", className = "px-3 py-1.5 bg-bg-surface border border-border-default rounded-md font-medium text-text-primary shadow-sm hover:bg-bg-surface-hover hover:border-border-strong" }: SingleSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all duration-150 ${className}`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-4 h-4 text-text-muted shrink-0" />}
          <div className="flex flex-col items-start text-left leading-tight truncate">
            {label && <span className="text-[11px] font-semibold text-text-secondary truncate">{label}</span>}
            <span className="text-sm text-text-primary truncate font-medium">
              {value || 'Select...'}
            </span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-56 bg-bg-surface border border-border-default rounded-lg shadow-md z-50 flex flex-col max-h-80 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-2 border-b border-border-subtle bg-bg-page">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="w-full h-8 pl-7 pr-2 bg-bg-surface border border-border-default rounded-md text-xs focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus transition-all"
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-1 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-text-muted">No results found.</div>
            ) : (
              filteredOptions.map(opt => {
                const isSelected = value === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => { onChange(opt); setIsOpen(false); }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md transition-colors text-left ${isSelected ? 'bg-bg-surface-active text-text-primary font-medium' : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'}`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
