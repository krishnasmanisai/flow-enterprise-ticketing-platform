import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface SearchableSelectProps {
  options: { label: string; value: string }[] | string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchableSelect({ options, value, onChange, placeholder = "Select...", className = "", disabled = false }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formattedOptions = useMemo(() => {
    return options.map(opt => {
      if (typeof opt === 'string') return { label: opt, value: opt };
      return opt;
    });
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return formattedOptions;
    return formattedOptions.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [formattedOptions, searchQuery]);

  const selectedOption = formattedOptions.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className={`input-base w-full min-h-[36px] flex items-center justify-between cursor-pointer bg-bg-surface px-3 py-1.5 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="text-sm truncate text-text-primary flex-1 text-left">{selectedOption ? selectedOption.label : placeholder}</span>
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
              filteredOptions.map(option => (
                <div 
                  key={option.value}
                  className="flex items-center justify-between px-3 py-2 text-sm text-text-primary hover:bg-bg-surface-hover cursor-pointer border-b border-border-subtle last:border-0"
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 text-brand-600 shrink-0 ml-2" />}
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-text-muted text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
