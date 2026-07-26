const fs = require('fs');

const content = `import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreVertical, FolderGit2, Calendar, User, CheckCircle2 } from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

export default function ConfigProjects({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const projects = [
    { id: '1', name: 'Campaigns', description: 'Marketing campaign requests and execution', status: 'Active', createdBy: 'Admin User', updatedOn: 'Oct 24, 2023', requestTypes: 12 },
    { id: '2', name: 'Support', description: 'IT and customer support issues', status: 'Active', createdBy: 'System', updatedOn: 'Oct 23, 2023', requestTypes: 45 },
    { id: '3', name: 'Finance', description: 'Billing and invoice queries', status: 'Draft', createdBy: 'Admin User', updatedOn: 'Oct 20, 2023', requestTypes: 8 },
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
                <FolderGit2 size={16} className="text-brand-600" />
              </div>
              <h1 className="text-xl font-bold text-text-primary tracking-tight">Projects</h1>
            </div>
            <p className="text-sm text-text-secondary mt-1">Manage top-level organizational projects and their configurations</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="input-base text-sm pl-9 w-64 h-10"
            />
          </div>
          <Button variant="primary" icon={Plus}>New Project</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div 
              key={p.id}
              onClick={() => onNavigate('config_request_types' as Page)}
              className="bg-bg-surface border border-border-default rounded-xl p-6 cursor-pointer group transition-all hover:border-brand-500 hover:shadow-md flex flex-col relative"
            >
              <div className="absolute top-6 right-6">
                <button className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-bg-page transition-colors opacity-0 group-hover:opacity-100" onClick={e => e.stopPropagation()}>
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="w-12 h-12 rounded-lg bg-bg-page border border-border-default flex items-center justify-center mb-4 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                <FolderGit2 size={24} className="text-text-secondary group-hover:text-brand-600 transition-colors" />
              </div>
              
              <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-brand-600 transition-colors">{p.name}</h3>
              <p className="text-sm text-text-secondary mb-6 min-h-[40px] line-clamp-2">{p.description}</p>
              
              <div className="mt-auto pt-5 border-t border-border-default grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">Status</span>
                  <span className={\`inline-flex items-center gap-1.5 text-sm font-semibold \${p.status === 'Active' ? 'text-success-text' : 'text-text-secondary'}\`}>
                    {p.status === 'Active' && <CheckCircle2 size={14} />}
                    {p.status}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">Request Types</span>
                  <span className="text-sm font-semibold text-text-primary">{p.requestTypes} forms</span>
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
            <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-brand-600 transition-colors">Create New Project</h3>
            <p className="text-sm text-text-secondary max-w-[200px]">Set up a new organizational bucket for request types.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/pages/config/ConfigProjects.tsx', content);
console.log('patched projects');
