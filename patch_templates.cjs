const fs = require('fs');

const content = `import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreVertical, Files, Copy, LayoutTemplate, Star, Eye } from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

export default function ConfigFormTemplates({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const templates = [
    { id: '1', name: 'Standard Software Request', category: 'IT Support', usage: 14, fields: 8, rating: 4.8 },
    { id: '2', name: 'New Hire Onboarding', category: 'HR', usage: 8, fields: 15, rating: 4.9 },
    { id: '3', name: 'Vendor Approval', category: 'Finance', usage: 3, fields: 12, rating: 4.5 },
    { id: '4', name: 'Bug Report', category: 'Engineering', usage: 22, fields: 6, rating: 4.2 },
    { id: '5', name: 'Marketing Asset Request', category: 'Marketing', usage: 11, fields: 9, rating: 4.7 },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-page">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border-default bg-bg-surface shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('settings' as Page)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg-surface-hover text-text-muted transition-colors border border-transparent hover:border-border-default shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-brand-50 flex items-center justify-center">
                <Files size={16} className="text-brand-600" />
              </div>
              <h1 className="text-xl font-bold text-text-primary tracking-tight">Form Templates</h1>
            </div>
            <p className="text-sm text-text-secondary mt-1">Manage reusable form structures to jumpstart new request types</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="input-base text-sm pl-9 w-64 h-10"
            />
          </div>
          <Button variant="primary" icon={Plus}>New Template</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map(t => (
            <div 
              key={t.id} 
              className="bg-bg-surface border border-border-default hover:border-brand-500 rounded-xl overflow-hidden cursor-pointer group transition-all hover:shadow-md flex flex-col"
            >
              <div className="h-32 bg-bg-page border-b border-border-default p-4 flex items-center justify-center relative overflow-hidden group-hover:bg-brand-50/30 transition-colors">
                <LayoutTemplate size={48} strokeWidth={1} className="text-border-strong group-hover:text-brand-300 transition-colors" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button variant="primary" size="sm" icon={Copy} onClick={(e) => { e.stopPropagation(); onNavigate('config_form_builder' as Page); }}>Use</Button>
                  <Button variant="secondary" size="sm" icon={Eye}>Preview</Button>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-bg-page text-text-secondary border border-border-default">
                    {t.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-warning-text">
                    <Star size={12} fill="currentColor" /> {t.rating}
                  </div>
                </div>
                
                <h3 className="font-bold text-base text-text-primary group-hover:text-brand-600 transition-colors line-clamp-1">{t.name}</h3>
                
                <div className="mt-4 flex items-center justify-between text-xs font-medium text-text-secondary">
                  <span>{t.fields} Fields</span>
                  <span>Used {t.usage} times</span>
                </div>
              </div>
            </div>
          ))}
          
          <div 
            className="border-2 border-dashed border-border-default rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/10 transition-colors group min-h-[250px]"
          >
            <div className="w-14 h-14 rounded-full bg-bg-surface border border-border-default flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-text-muted group-hover:text-brand-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-brand-600 transition-colors">Create Template</h3>
            <p className="text-sm text-text-secondary max-w-[180px]">Build a new template from scratch.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/pages/config/ConfigFormTemplates.tsx', content);
console.log('patched templates');
