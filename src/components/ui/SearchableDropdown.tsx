import React from "react";
import { useState, useRef, useEffect } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';

interface SearchableDropdownProps {
  label: string;
  icon: React.ElementType;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function SearchableDropdown({ label, icon: Icon, options, value, onChange, placeholder = "Search..." }: SearchableDropdownProps) {
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

  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  const getLabelText = () => {
    if (value.length === 0) return `All ${label.toLowerCase()}s`;
    if (value.length === 1) return value[0];
    return `${value.length} selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 px-3 py-1.5 bg-bg-surface border border-border-default rounded-md shadow-sm w-48 text-sm font-medium text-text-primary hover:bg-bg-surface-hover hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all duration-150"
      >
        <div className="flex items-center gap-2 truncate">
          <Icon className="w-4 h-4 text-text-muted shrink-0" />
          <div className="flex flex-col items-start text-left leading-tight truncate">
            <span className="text-xs font-semibold truncate text-text-secondary">{label}</span>
            <span className="text-xs text-text-primary truncate">
              {getLabelText()}
            </span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-56 bg-bg-surface border border-border-default rounded-lg shadow-md z-50 flex flex-col max-h-80 overflow-hidden animate-in fade-in slide-in-from-top-2">
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
            <button
              onClick={() => { onChange([]); setIsOpen(false); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md transition-colors ${value.length === 0 ? 'bg-bg-surface-active text-text-primary font-medium' : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'}`}
            >
              <span>All {label.toLowerCase()}s</span>
              {value.length === 0 && <Check className="w-3.5 h-3.5" />}
            </button>
            
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-text-muted">No results found.</div>
            ) : (
              filteredOptions.map(opt => {
                const isSelected = value.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleOption(opt)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md transition-colors ${isSelected ? 'bg-bg-surface-active text-text-primary font-medium' : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'}`}
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
