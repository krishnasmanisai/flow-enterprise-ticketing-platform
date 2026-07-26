const fs = require('fs');

const content = `import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreVertical, Library, Folder, AlignLeft, List, Calendar, Hash, X, Edit2, Copy, Eye, Clock } from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

export default function ConfigFieldLibrary({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [selectedField, setSelectedField] = useState<any | null>(null);

  const fields = [
    { id: '1', name: 'Priority', type: 'Dropdown', typeIcon: List, category: 'General', usedIn: ['Campaign Form v2', 'API Issue', 'General Support'], key: 'priority_lvl' },
    { id: '2', name: 'Business Justification', type: 'Long Text', typeIcon: AlignLeft, category: 'Finance', usedIn: ['Hardware Request', 'Budget Approval'], key: 'bus_justification' },
    { id: '3', name: 'Target Date', type: 'Date', typeIcon: Calendar, category: 'General', usedIn: ['Campaign Form v2', 'DND Request'], key: 'tgt_date' },
    { id: '4', name: 'Budget Amount', type: 'Number', typeIcon: Hash, category: 'Finance', usedIn: ['Campaign Form v2', 'Budget Approval'], key: 'budget_amt' },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-page relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('settings' as Page)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-surface-hover text-text-muted transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Library size={16} className="text-text-muted" />
              <h1 className="text-lg font-bold text-text-primary tracking-tight">Field Library</h1>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">Manage reusable global form fields and properties</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search fields..." 
              className="input-base text-sm pl-9 w-64"
            />
          </div>
          <Button variant="outline" size="sm" icon={Filter}>Filters</Button>
          <Button variant="primary" size="sm" icon={Plus}>New Field</Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Folders */}
        <div className="w-[240px] bg-bg-surface border-r border-border-default p-4 shrink-0 overflow-y-auto">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Categories</h3>
          <div className="space-y-1">
            {['All Fields', 'General', 'Campaign', 'Finance', 'Support', 'Marketing'].map((cat, i) => (
              <button 
                key={i} 
                className={\`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors \${i === 0 ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-text-secondary hover:bg-bg-page hover:text-text-primary'}\`}
              >
                <div className="flex items-center gap-2">
                  <Folder size={16} className={i === 0 ? 'text-brand-500' : 'text-text-muted'} />
                  {cat}
                </div>
                <span className="text-[10px] font-semibold bg-bg-page border border-border-default px-1.5 py-0.5 rounded text-text-muted">{i === 0 ? '124' : Math.floor(Math.random() * 30)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-bg-page">
          <div className="bg-bg-surface border border-border-default rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-default bg-bg-page/50">
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Field Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Type</th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Category</th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Usage</th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {fields.map(f => (
                  <tr key={f.id} className="hover:bg-bg-page transition-colors cursor-pointer group" onClick={() => setSelectedField(f)}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-text-primary group-hover:text-brand-600 transition-colors">{f.name}</span>
                        <span className="text-[10px] text-text-muted font-mono mt-0.5">{f.key}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <f.typeIcon size={14} className="text-text-muted" />
                        <span className="text-sm text-text-secondary">{f.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-bg-page text-text-secondary border border-border-default">
                        {f.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-primary">{f.usedIn.length} forms</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-bg-surface-hover transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedField(f); }}>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      {selectedField && (
        <>
          <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedField(null)} />
          <div className="absolute top-0 right-0 h-full w-[400px] bg-bg-surface border-l border-border-strong shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">{selectedField.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary font-mono">
                  <span>{selectedField.key}</span>
                  <span className="w-1 h-1 rounded-full bg-border-strong" />
                  <span className="flex items-center gap-1"><selectedField.typeIcon size={12}/> {selectedField.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-page text-text-muted transition-colors border border-transparent hover:border-border-default">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => setSelectedField(null)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-page text-text-muted transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-bg-page">
              <div className="bg-bg-surface rounded-lg border border-border-default p-5">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">Field Definition</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1 block">Default Label</label>
                    <p className="text-sm font-medium text-text-primary">{selectedField.name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1 block">Data Type</label>
                    <p className="text-sm font-medium text-text-primary">{selectedField.type}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-1 block">Category</label>
                    <p className="text-sm font-medium text-text-primary">{selectedField.category}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FileUp size={14}/> Used In {selectedField.usedIn.length} Forms
                </h3>
                <div className="space-y-2">
                  {selectedField.usedIn.map((form: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-bg-surface border border-border-default rounded-md hover:border-brand-500 cursor-pointer transition-colors group">
                      <span className="text-sm font-semibold text-text-primary group-hover:text-brand-600 transition-colors">{form}</span>
                      <ArrowLeft size={14} className="text-text-muted rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
`
fs.writeFileSync('src/pages/config/ConfigFieldLibrary.tsx', content);
console.log('patched field library');
