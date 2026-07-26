const fs = require('fs');

const content = `import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreVertical, FileBox, Copy, Archive, Edit2, Play, Settings2 } from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

export default function ConfigRequestTypes({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const requestTypes = [
    { id: '1', name: 'New Campaign', description: 'Request to launch a new marketing campaign across multiple channels', form: 'Campaign Form v2', status: 'Active', updatedOn: 'Oct 24, 2023', workflow: 'Standard Approval' },
    { id: '2', name: 'DND Request', description: 'Do not disturb list updates and compliance checks', form: 'Simple Request Form', status: 'Active', updatedOn: 'Oct 23, 2023', workflow: 'Auto-Approve' },
    { id: '3', name: 'Bulk Upload', description: 'Upload bulk contacts for campaigns via CSV/Excel', form: 'File Upload Form', status: 'Draft', updatedOn: 'Oct 20, 2023', workflow: 'None' },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-page">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border-default bg-bg-surface shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('config_projects' as Page)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg-surface-hover text-text-muted transition-colors border border-transparent hover:border-border-default shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-bg-page px-2 py-0.5 rounded-sm border border-border-default">Project: Campaigns</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-text-primary tracking-tight">Request Types</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search request types..." 
              className="input-base text-sm pl-9 w-64 h-10"
            />
          </div>
          <Button variant="primary" icon={Plus}>New Request Type</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requestTypes.map(rt => (
            <div 
              key={rt.id} 
              className="bg-bg-surface border border-border-default hover:border-brand-500 rounded-xl p-6 cursor-pointer group transition-all hover:shadow-md flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                  <FileBox size={20} className="text-brand-600" />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-page border border-border-default rounded-md p-1 shadow-sm" onClick={e => e.stopPropagation()}>
                  <button className="p-1.5 text-text-muted hover:text-brand-600 rounded transition-colors" title="Edit Properties">
                    <Settings2 size={14} />
                  </button>
                  <button className="p-1.5 text-text-muted hover:text-brand-600 rounded transition-colors" title="Duplicate">
                    <Copy size={14} />
                  </button>
                  <button className="p-1.5 text-text-muted hover:text-error-text rounded transition-colors" title="Archive">
                    <Archive size={14} />
                  </button>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-text-primary group-hover:text-brand-600 transition-colors mb-2">{rt.name}</h3>
              <p className="text-sm text-text-secondary mb-6 line-clamp-2 min-h-[40px]">{rt.description}</p>
              
              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm p-2 bg-bg-page rounded-md border border-border-default">
                  <span className="text-text-secondary font-medium">Form</span>
                  <span className="text-text-primary font-semibold text-right truncate pl-2">{rt.form}</span>
                </div>
                <div className="flex items-center justify-between text-sm p-2 bg-bg-page rounded-md border border-border-default">
                  <span className="text-text-secondary font-medium">Workflow</span>
                  <span className="text-text-primary font-semibold text-right truncate pl-2">{rt.workflow}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border-default">
                <Button variant="primary" size="sm" className="flex-1" icon={Edit2} onClick={() => onNavigate('config_form_builder' as Page)}>Edit Form</Button>
                <Button variant="outline" size="sm" className="flex-1" icon={Play}>Preview</Button>
              </div>
            </div>
          ))}
          
          <div 
            className="border-2 border-dashed border-border-default rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/10 transition-colors group min-h-[350px]"
          >
            <div className="w-14 h-14 rounded-full bg-bg-surface border border-border-default flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-text-muted group-hover:text-brand-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-brand-600 transition-colors">Create Request Type</h3>
            <p className="text-sm text-text-secondary max-w-[200px]">Define a new category of tickets and build its intake form.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/pages/config/ConfigRequestTypes.tsx', content);
console.log('patched request types');
