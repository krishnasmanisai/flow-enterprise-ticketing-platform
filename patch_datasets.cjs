const fs = require('fs');

const content = `import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreVertical, Database, Download, Upload, X, Edit2, Check } from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

export default function ConfigDatasets({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [selectedDataset, setSelectedDataset] = useState<any | null>(null);

  const datasets = [
    { id: '1', name: 'Countries List', description: 'Standard ISO country list', records: 195, lastUpdated: 'Oct 10, 2023', syncStatus: 'Manual', options: ['United States', 'India', 'Singapore', 'United Kingdom', 'Australia'] },
    { id: '2', name: 'Cost Centers', description: 'Global cost center codes mapped to business units', records: 450, lastUpdated: 'Oct 23, 2023', syncStatus: 'Auto-sync (Daily)', options: ['CC-1001 (Marketing)', 'CC-1002 (Sales)', 'CC-2001 (Engineering)'] },
    { id: '3', name: 'Brand Portfolio', description: 'Active brands and sub-brands', records: 42, lastUpdated: 'Sep 15, 2023', syncStatus: 'Manual', options: ['Acme Corp', 'Globex', 'Soylent'] },
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
              <Database size={16} className="text-text-muted" />
              <h1 className="text-lg font-bold text-text-primary tracking-tight">Datasets</h1>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">Manage reusable data lists for dropdowns and cascading fields</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search datasets..." 
              className="input-base text-sm pl-9 w-64"
            />
          </div>
          <Button variant="outline" size="sm" icon={Upload}>Import CSV</Button>
          <Button variant="primary" size="sm" icon={Plus}>New Dataset</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-bg-surface border border-border-default rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-default bg-bg-page/50">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Dataset Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Description</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Records</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Sync Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Last Updated</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {datasets.map(d => (
                <tr key={d.id} className="hover:bg-bg-page transition-colors cursor-pointer group" onClick={() => setSelectedDataset(d)}>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-sm text-text-primary group-hover:text-brand-600 transition-colors">{d.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{d.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-bg-page text-text-secondary border border-border-default">
                      {d.records.toLocaleString()} rows
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={\`text-sm \${d.syncStatus.includes('Auto') ? 'text-success-text font-medium' : 'text-text-secondary'}\`}>
                      {d.syncStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{d.lastUpdated}</td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button className="p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-bg-surface-hover transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Drawer for Editing */}
      {selectedDataset && (
        <>
          <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedDataset(null)} />
          <div className="absolute top-0 right-0 h-full w-[450px] bg-bg-surface border-l border-border-strong shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">{selectedDataset.name}</h2>
                <p className="text-xs text-text-secondary mt-1">{selectedDataset.records} records • {selectedDataset.syncStatus}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedDataset(null)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-page text-text-muted transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg-page custom-scrollbar">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex-1" icon={Upload}>Import CSV</Button>
                <Button variant="outline" size="sm" className="flex-1" icon={Download}>Export CSV</Button>
              </div>

              <div className="bg-bg-surface rounded-lg border border-border-default overflow-hidden flex flex-col h-[400px]">
                <div className="p-3 border-b border-border-default bg-bg-page/50 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-text-primary">Data Rows</h3>
                  <Button variant="secondary" size="sm" className="h-7 text-xs px-2">+ Add Row</Button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {selectedDataset.options.map((opt: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-2 hover:bg-bg-page rounded-md group">
                      <div className="flex-1">
                        <input type="text" defaultValue={opt} className="input-base text-sm w-full py-1.5 px-2 bg-transparent border-transparent hover:border-border-default focus:bg-bg-surface focus:border-brand-500" />
                      </div>
                      <button className="p-1.5 text-text-muted hover:text-error-text rounded transition-colors opacity-0 group-hover:opacity-100">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {/* Fake more rows to show scrolling capability */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i+100} className="flex items-center gap-2 p-2 hover:bg-bg-page rounded-md group">
                      <div className="flex-1">
                        <input type="text" defaultValue={\`Item \${i+4}\`} className="input-base text-sm w-full py-1.5 px-2 bg-transparent border-transparent hover:border-border-default focus:bg-bg-surface focus:border-brand-500" />
                      </div>
                      <button className="p-1.5 text-text-muted hover:text-error-text rounded transition-colors opacity-0 group-hover:opacity-100">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-bg-surface rounded-lg border border-border-default p-5">
                 <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">Advanced Settings</h3>
                 <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border-default text-brand-600 focus:ring-brand-500" />
                    <span className="text-sm font-medium text-text-primary">Enable Cascading Parent</span>
                  </label>
                  <p className="text-xs text-text-muted mt-1 ml-7">Link this dataset to a parent dataset to filter options dynamically.</p>
              </div>
            </div>

            <div className="p-6 border-t border-border-default bg-bg-surface flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedDataset(null)}>Cancel</Button>
              <Button variant="primary" icon={Check} onClick={() => setSelectedDataset(null)}>Save Changes</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
`
fs.writeFileSync('src/pages/config/ConfigDatasets.tsx', content);
console.log('patched datasets');
