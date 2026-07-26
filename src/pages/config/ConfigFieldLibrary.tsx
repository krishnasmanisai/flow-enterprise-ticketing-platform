import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreVertical, Library, Folder, AlignLeft, List, Calendar, Hash, X, Edit2, Copy, Eye, Clock, FileUp, Check, Type, ToggleLeft, Link, Image, Globe, ChevronRight } from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

export default function ConfigFieldLibrary({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [selectedField, setSelectedField] = useState<any | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newFieldType, setNewFieldType] = useState('Short Text');

  const fields = [
    { id: '1', name: 'Priority', type: 'Dropdown', typeIcon: List, category: 'General', usage: 12, description: 'Ticket urgency level', key: 'priority_lvl' },
    { id: '2', name: 'Business Justification', type: 'Long Text', typeIcon: AlignLeft, category: 'Finance', usage: 4, description: 'Reason for request', key: 'bus_justification' },
    { id: '3', name: 'Target Date', type: 'Date', typeIcon: Calendar, category: 'General', usage: 8, description: 'Expected completion date', key: 'tgt_date' },
    { id: '4', name: 'Budget Amount', type: 'Currency', typeIcon: Hash, category: 'Finance', usage: 5, description: 'Estimated budget', key: 'budget_amt' },
  ];

  const fieldTypes = [
    { name: 'Short Text', icon: Type, group: 'Text' },
    { name: 'Long Text', icon: AlignLeft, group: 'Text' },
    { name: 'Number', icon: Hash, group: 'Numeric' },
    { name: 'Currency', icon: Hash, group: 'Numeric' },
    { name: 'Dropdown', icon: List, group: 'Selection' },
    { name: 'Multi Select Dropdown', icon: List, group: 'Selection' },
    { name: 'Radio Buttons', icon: Check, group: 'Selection' },
    { name: 'Checkboxes', icon: Check, group: 'Selection' },
    { name: 'Toggle', icon: ToggleLeft, group: 'Selection' },
    { name: 'Date', icon: Calendar, group: 'Date & Time' },
    { name: 'File Upload', icon: FileUp, group: 'Media' },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-page relative">
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
          <Button variant="primary" size="sm" icon={Plus} onClick={() => { setShowWizard(true); setWizardStep(1); }}>New Field</Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Folders */}
        <div className="w-64 border-r border-border-default bg-bg-surface flex flex-col hidden md:flex">
          <div className="p-4 border-b border-border-default">
            <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Categories</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {['All Fields', 'General', 'IT & Systems', 'HR & People', 'Finance', 'Marketing', 'Legal'].map((folder, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${i === 0 ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-bg-page text-text-secondary hover:text-text-primary'}`}>
                <Folder size={16} className={i === 0 ? 'text-brand-600' : 'text-text-muted'} />
                <span className="text-sm truncate">{folder}</span>
                {i === 0 && <span className="ml-auto text-xs bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded-full font-bold">142</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Fields Table */}
        <div className="flex-1 overflow-y-auto bg-bg-page p-6">
          <div className="bg-bg-surface border border-border-default rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-default bg-bg-page/50">
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Field Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Internal Key</th>
                  <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Type</th>
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
                        <span className="text-xs text-text-secondary">{f.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-text-muted bg-bg-page px-1.5 py-0.5 rounded border border-border-default">{f.key}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <f.typeIcon size={14} className="text-text-muted" />
                        <span className="text-sm text-text-secondary">{f.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                        Used in {f.usage} forms
                      </span>
                    </td>
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
      </div>

      {/* Side Drawer for Creating/Editing Field */}
      {(showWizard || selectedField) && (
        <>
          <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => { setShowWizard(false); setSelectedField(null); }} />
          <div className="absolute top-0 right-0 h-full w-[500px] bg-bg-surface border-l border-border-strong shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="px-6 py-5 border-b border-border-default flex items-center justify-between bg-bg-surface shrink-0">
              <div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">{selectedField ? selectedField.name : 'Create New Field'}</h2>
                {showWizard && <p className="text-xs text-text-secondary mt-1">Step {wizardStep} of 3</p>}
                {selectedField && <p className="text-xs text-text-secondary mt-1">Manage field configuration</p>}
              </div>
              <button onClick={() => { setShowWizard(false); setSelectedField(null); }} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-page text-text-muted transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-bg-page custom-scrollbar p-6">
              
              {/* WIZARD STEP 1: General Info */}
              {showWizard && wizardStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Field Name</label>
                      <input type="text" className="input-base w-full" placeholder="e.g. Employee ID" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Internal Key</label>
                      <input type="text" className="input-base w-full font-mono text-sm" placeholder="e.g. employee_id" />
                      <p className="text-xs text-text-muted">Unique identifier used for API and integrations.</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Category</label>
                      <select className="input-base w-full">
                        <option>General</option>
                        <option>HR & People</option>
                        <option>Finance</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Description (Optional)</label>
                      <textarea className="input-base w-full min-h-[80px]" placeholder="Brief explanation of this field's purpose..." />
                    </div>
                  </div>
                </div>
              )}

              {/* WIZARD STEP 2: Choose Type */}
              {showWizard && wizardStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <label className="text-sm font-semibold text-text-primary block mb-3">Select Field Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {fieldTypes.map(t => (
                      <div 
                        key={t.name}
                        onClick={() => setNewFieldType(t.name)}
                        className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-colors ${newFieldType === t.name ? 'border-brand-500 bg-brand-50/30 ring-1 ring-brand-500' : 'border-border-default bg-bg-surface hover:border-brand-300'}`}
                      >
                        <t.icon size={16} className={newFieldType === t.name ? 'text-brand-600' : 'text-text-muted'} />
                        <span className={`text-sm font-medium ${newFieldType === t.name ? 'text-brand-700' : 'text-text-primary'}`}>{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WIZARD STEP 3 or SELECTED FIELD: Configure Type */}
              {((showWizard && wizardStep === 3) || selectedField) && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  
                  {/* Common Display settings */}
                  <div className="bg-bg-surface rounded-lg border border-border-default p-5 space-y-4">
                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Display Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-primary">Placeholder Text</label>
                      <input type="text" className="input-base w-full" placeholder="Enter placeholder..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-primary">Help Text / Tooltip</label>
                      <input type="text" className="input-base w-full" placeholder="Appears below the field..." />
                    </div>
                  </div>

                  {/* Type-Specific Settings */}
                  {((showWizard && newFieldType === 'Short Text') || (selectedField && selectedField.type === 'Long Text')) && (
                    <div className="bg-bg-surface rounded-lg border border-border-default p-5 space-y-4">
                      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Text Validation</h3>
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-medium text-text-primary">Min Length</label>
                          <input type="number" className="input-base w-full" placeholder="0" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-medium text-text-primary">Max Length</label>
                          <input type="number" className="input-base w-full" placeholder="255" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Regex Validation</label>
                        <input type="text" className="input-base w-full font-mono text-sm" placeholder="^([a-zA-Z0-9]+)$" />
                      </div>
                    </div>
                  )}

                  {((showWizard && newFieldType === 'Dropdown') || (selectedField && selectedField.type === 'Dropdown')) && (
                    <div className="bg-bg-surface rounded-lg border border-border-default p-5 space-y-4">
                      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Options Source</h3>
                      <select className="input-base w-full">
                        <option>Manual Options</option>
                        <option>Data Source</option>
                        <option>Relationship Hierarchy</option>
                        <option>External API</option>
                      </select>
                      
                      <div className="pt-2 border-t border-border-default">
                        <label className="text-sm font-medium text-text-primary mb-2 block">Select Data Source</label>
                        <select className="input-base w-full">
                          <option>Countries List</option>
                          <option>Cost Centers</option>
                          <option>Brand Portfolio</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {((showWizard && newFieldType === 'File Upload') || (selectedField && selectedField.type === 'File Upload')) && (
                    <div className="bg-bg-surface rounded-lg border border-border-default p-5 space-y-4">
                      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Attachment Rules</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Allowed Extensions</label>
                        <input type="text" className="input-base w-full" placeholder="e.g. .pdf, .jpg, .png" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-medium text-text-primary">Max Files</label>
                          <input type="number" className="input-base w-full" placeholder="5" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-medium text-text-primary">Max Size (MB)</label>
                          <input type="number" className="input-base w-full" placeholder="10" />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedField && (
                    <div className="bg-bg-surface rounded-lg border border-border-default p-5 space-y-3">
                      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Usage Context</h3>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="font-medium text-text-primary">Forms:</span> {selectedField.usedIn.join(', ')}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="font-medium text-text-primary">Total Usage:</span> {selectedField.usage} instances
                      </div>
                    </div>
                  )}

                </div>
              )}
              
            </div>
            
            <div className="p-6 border-t border-border-default bg-bg-surface flex items-center justify-between shrink-0">
              <div>
                {showWizard && wizardStep > 1 && (
                  <Button variant="outline" onClick={() => setWizardStep(wizardStep - 1)}>Back</Button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => { setShowWizard(false); setSelectedField(null); }}>Cancel</Button>
                {showWizard && wizardStep < 3 ? (
                  <Button variant="primary" onClick={() => setWizardStep(wizardStep + 1)}>Next Step</Button>
                ) : (
                  <Button variant="primary" icon={Check} onClick={() => { setShowWizard(false); setSelectedField(null); }}>{selectedField ? 'Save Changes' : 'Create Field'}</Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
