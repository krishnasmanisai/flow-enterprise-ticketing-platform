import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DateRangeDropdown({ value, onChange, className = "" }: DateRangeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [showCustom, setShowCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const presets = [
    'Last 7 Days',
    'Last 15 Days',
    'Last 30 Days',
    'This Year',
    'Last 1 Year',
    'Custom Range'
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (preset: string) => {
    if (preset === 'Custom Range') {
      setShowCustom(true);
    } else {
      onChange(preset);
      setShowCustom(false);
      setIsOpen(false);
    }
  };

  const handleApplyCustom = () => {
    if (customRange.start && customRange.end) {
      onChange(`${customRange.start} to ${customRange.end}`);
      setIsOpen(false);
    }
  };

  // Minimal Calendar Grid mock for visual "proper calendar view"
  const renderCalendar = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);
    
    return (
      <div className="p-4 border-l border-border-default w-64 bg-bg-surface hidden sm:block">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-bg-surface-hover rounded text-text-muted"><ChevronLeft size={16} /></button>
          <span className="text-sm font-medium text-text-primary">July 2026</span>
          <button className="p-1 hover:bg-bg-surface-hover rounded text-text-muted"><ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {days.map(d => <div key={d} className="text-[10px] font-semibold text-text-muted">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* offset */}
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          {dates.map(d => (
            <div 
              key={d} 
              className={`p-1.5 text-xs rounded-full cursor-pointer hover:bg-bg-surface-hover flex items-center justify-center ${d === 15 ? 'bg-brand-500 text-bg-surface hover:bg-brand-600' : 'text-text-primary'}`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="input-base w-full min-h-[36px] flex items-center gap-2 cursor-pointer bg-bg-surface px-3 py-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="w-4 h-4 text-text-muted shrink-0" />
        <span className="text-sm truncate text-text-primary flex-1">{value || 'Last 7 Days'}</span>
        <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full right-0 sm:left-0 mt-1 bg-bg-surface border border-border-default rounded-md shadow-xl z-[100] flex flex-col sm:flex-row overflow-hidden min-w-[200px]">
          <div className="w-52 flex flex-col p-1.5 shrink-0 bg-bg-page">
            {presets.map(preset => (
              <button
                key={preset}
                className={`text-left px-3 py-2.5 text-sm rounded-md transition-colors ${
                  (value === preset && !showCustom) || (preset === 'Custom Range' && showCustom)
                    ? 'bg-brand-50 text-brand-600 font-medium' 
                    : 'text-text-primary hover:bg-bg-surface-hover'
                }`}
                onClick={() => handleSelect(preset)}
              >
                {preset}
              </button>
            ))}
            
            {showCustom && (
              <div className="mt-2 p-3 border-t border-border-default space-y-3 bg-bg-surface rounded-md shadow-sm border">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-text-muted tracking-wider">Start Date</label>
                  <input 
                    type="date" 
                    className="input-base w-full text-xs h-8"
                    value={customRange.start}
                    onChange={(e) => setCustomRange({...customRange, start: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-text-muted tracking-wider">End Date</label>
                  <input 
                    type="date" 
                    className="input-base w-full text-xs h-8"
                    value={customRange.end}
                    onChange={(e) => setCustomRange({...customRange, end: e.target.value})}
                  />
                </div>
                <button 
                  className="w-full bg-brand-500 text-bg-surface text-xs font-medium py-2 rounded hover:bg-brand-600 transition-colors mt-2"
                  onClick={handleApplyCustom}
                >
                  Apply Custom Range
                </button>
              </div>
            )}
          </div>
          
          {showCustom && renderCalendar()}
        </div>
      )}
    </div>
  );
}
