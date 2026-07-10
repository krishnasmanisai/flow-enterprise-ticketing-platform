import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

interface MultiSelectDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  selectedSuffix?: string;
  className?: string;
}

export function MultiSelectDropdown({ options, selected, onChange, placeholder = "Select...", className = "", selectedSuffix = "selected" }: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [options, searchQuery]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const toggleAll = () => {
    if (selected.length === options.length && options.length > 0) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) return selected[0];
    return `${selected.length} ${selectedSuffix}`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="input-base w-full min-h-[36px] flex items-center justify-between cursor-pointer bg-bg-surface px-3 py-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm truncate text-text-primary flex-1 text-left">{getDisplayText()}</span>
        <ChevronDown className="w-4 h-4 text-text-muted shrink-0 ml-2 pointer-events-none" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-bg-surface border border-border-default rounded-md shadow-lg z-[100] flex flex-col overflow-hidden max-h-80 min-w-[200px]">
          <div className="p-2 border-b border-border-default sticky top-0 bg-bg-surface z-10">
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-bg-page border border-border-default rounded focus:outline-none focus:border-brand-500"
                autoFocus
              />
            </div>
          </div>
          
          <div className="overflow-y-auto custom-scrollbar">
            {filteredOptions.length > 0 ? (
              <>
                {!searchQuery && (
                  <label className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-bg-surface-hover cursor-pointer border-b border-border-default">
                    <input 
                      type="checkbox"
                      className="rounded border-border-strong text-brand-600 focus:ring-brand-500 cursor-pointer w-4 h-4"
                      checked={selected.length === options.length && options.length > 0}
                      onChange={toggleAll}
                    />
                    <span className="flex-1 select-none">Select All</span>
                  </label>
                )}
                
                {filteredOptions.map(option => {
                  const isSelected = selected.includes(option);
                  return (
                    <label 
                      key={option}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-text-primary hover:bg-bg-surface-hover cursor-pointer border-b border-border-subtle last:border-0"
                    >
                      <input 
                        type="checkbox"
                        className="rounded border-border-strong text-brand-600 focus:ring-brand-500 cursor-pointer w-4 h-4"
                        checked={isSelected}
                        onChange={() => toggleOption(option)}
                      />
                      <span className="flex-1 truncate select-none">{option}</span>
                    </label>
                  );
                })}
              </>
            ) : (
              <div className="p-3 text-sm text-text-muted text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
