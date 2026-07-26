import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MoreVertical, Network, Copy, X, Edit2, Check, ChevronRight, ChevronDown, Eye } from 'lucide-react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';

export default function ConfigRelationships({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [selectedRelationship, setSelectedRelationship] = useState<any | null>(null);
  
  const relationships = [
    { id: '1', name: 'Request Hierarchy', description: 'Request Type -> Sub Request Type -> Service Type', usage: 3, lastUpdated: 'Oct 10, 2023', nodes: [
      { name: 'Campaign', children: [{ name: 'New Campaign', children: [{ name: 'Execution' }] }, { name: 'DND', children: [{ name: 'Approval' }] }] },
      { name: 'Support', children: [{ name: 'POS', children: [{ name: 'Hardware' }] }, { name: 'API', children: [{ name: 'OAuth' }] }] }
    ]},
    { id: '2', name: 'Location Hierarchy', description: 'Country -> Region -> City', usage: 12, lastUpdated: 'Oct 23, 2023', nodes: [
      { name: 'USA', children: [{ name: 'West', children: [{ name: 'San Francisco' }] }] },
      { name: 'India', children: [{ name: 'South', children: [{ name: 'Bangalore' }] }] }
    ]}
  ];

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const toggleNode = (nodeName: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeName]: !prev[nodeName] }));
  };

  const handleAddRootNode = () => {
    if (!selectedRelationship) return;
    const newRel = { ...selectedRelationship, nodes: [...(selectedRelationship.nodes || []), { name: 'New Node', children: [] }] };
    setSelectedRelationship(newRel);
  };

  const handleAddChildNode = (e: React.MouseEvent, nodePath: string) => {
    e.stopPropagation();
    if (!selectedRelationship) return;
    const newRel = JSON.parse(JSON.stringify(selectedRelationship));
    
    const indices = nodePath.match(/\d+/g)?.map(Number) || [];
    
    let current = newRel.nodes;
    for (let i = 0; i < indices.length - 1; i++) {
      current = current[indices[i]].children;
    }
    const lastIndex = indices[indices.length - 1];
    
    if (!current[lastIndex].children) {
      current[lastIndex].children = [];
    }
    current[lastIndex].children.push({ name: 'New Child', children: [] });
    
    setSelectedRelationship(newRel);
    setExpandedNodes(prev => ({ ...prev, [nodePath]: true }));
  };

  const handleRemoveNode = (e: React.MouseEvent, nodePath: string) => {
    e.stopPropagation();
    if (!selectedRelationship) return;
    const newRel = JSON.parse(JSON.stringify(selectedRelationship));
    
    const indices = nodePath.match(/\d+/g)?.map(Number) || [];
    if (indices.length === 0) return;
    
    let current = newRel.nodes;
    for (let i = 0; i < indices.length - 1; i++) {
      current = current[indices[i]].children;
    }
    const lastIndex = indices[indices.length - 1];
    
    current.splice(lastIndex, 1);
    
    setSelectedRelationship(newRel);
  };

  const handleAddHierarchyLevel = () => {
    if (!selectedRelationship) return;
    const parts = selectedRelationship.description.split('->').map((p: string) => p.trim());
    parts.push(`Level ${parts.length + 1}`);
    setSelectedRelationship({ ...selectedRelationship, description: parts.join(' -> ') });
  };

  const handleNodeNameChange = (nodePath: string, newName: string) => {
    if (!selectedRelationship) return;
    const newRel = JSON.parse(JSON.stringify(selectedRelationship));
    
    const indices = nodePath.match(/\d+/g)?.map(Number) || [];
    if (indices.length === 0) return;
    
    let current = newRel.nodes;
    for (let i = 0; i < indices.length - 1; i++) {
      current = current[indices[i]].children;
    }
    const lastIndex = indices[indices.length - 1];
    
    current[lastIndex].name = newName;
    
    setSelectedRelationship(newRel);
  };

  const renderTree = (nodes: any[], level = 0, parentPath = '') => {
    return nodes.map((node, index) => {
      const nodePath = `${parentPath}-${node.name}-${index}`;
      const isExpanded = expandedNodes[nodePath];
      
      return (
        <div key={nodePath} className="w-full">
          <div 
            className="flex items-center gap-2 py-2 px-3 hover:bg-bg-page rounded-md cursor-pointer group"
            style={{ paddingLeft: `${(level * 24) + 12}px` }}
            onClick={() => toggleNode(nodePath)}
          >
            {node.children && node.children.length > 0 ? (
              isExpanded ? <ChevronDown size={14} className="text-text-muted shrink-0" /> : <ChevronRight size={14} className="text-text-muted shrink-0" />
            ) : (
              <span className="w-[14px] shrink-0" />
            )}
            <input 
              type="text" 
              value={node.name}
              onChange={(e) => handleNodeNameChange(nodePath, e.target.value)}
              className="input-base text-sm py-1 px-2 h-7 bg-transparent border-transparent hover:border-border-default focus:bg-bg-surface focus:border-brand-500 flex-1" 
              onClick={(e) => e.stopPropagation()}
            />
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
              <button onClick={(e) => handleAddChildNode(e, nodePath)} className="p-1 text-text-muted hover:text-brand-600 rounded" title="Add Child Node">
                <Plus size={14} />
              </button>
              <button onClick={(e) => handleRemoveNode(e, nodePath)} className="p-1 text-text-muted hover:text-error-text rounded" title="Remove Node">
                <X size={14} />
              </button>
            </div>
          </div>
          {isExpanded && node.children && (
            <div className="w-full">
              {renderTree(node.children, level + 1, nodePath)}
            </div>
          )}
        </div>
      );
    });
  };

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
              <Network size={16} className="text-text-muted" />
              <h1 className="text-lg font-bold text-text-primary tracking-tight">Relationships</h1>
            </div>
            <p className="text-sm text-text-secondary mt-0.5">Manage dependent dropdowns and visual mapping hierarchies</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search relationships..." 
              className="input-base text-sm pl-9 w-64"
            />
          </div>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setSelectedRelationship({ id: 'new', name: 'New Relationship', description: 'Level 1 -> Level 2', usage: 0, lastUpdated: 'Just now', nodes: [] })}>New Relationship</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-bg-surface border border-border-default rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-default bg-bg-page/50">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Relationship Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Hierarchy Structure</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Usage</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest">Last Updated</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-widest w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {relationships.map(r => (
                <tr key={r.id} className="hover:bg-bg-page transition-colors cursor-pointer group" onClick={() => setSelectedRelationship(r)}>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-sm text-text-primary group-hover:text-brand-600 transition-colors">{r.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      {r.description.split('->').map((part, i, arr) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="bg-bg-page border border-border-default px-2 py-0.5 rounded text-xs font-medium">{part.trim()}</span>
                          {i < arr.length - 1 && <ChevronRight size={14} className="text-border-strong" />}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                      Used in {r.usage} forms
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{r.lastUpdated}</td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-text-muted hover:text-brand-600 rounded-md hover:bg-bg-surface-hover transition-colors" title="Duplicate">
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Drawer for Editing */}
      {selectedRelationship && (
        <>
          <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedRelationship(null)} />
          <div className="absolute top-0 right-0 h-full w-[600px] bg-bg-surface border-l border-border-strong shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-border-default flex items-center justify-between bg-bg-surface shrink-0">
              <div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">{selectedRelationship.name}</h2>
                <p className="text-xs text-text-secondary mt-1">Configure hierarchical options visually</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" icon={Eye}>Preview</Button>
                <button onClick={() => setSelectedRelationship(null)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-bg-page text-text-muted transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-bg-page custom-scrollbar">
              <div className="p-6 space-y-6">
                
                {/* Visual Mapping Hierarchy Structure Header */}
                <div className="bg-bg-surface border border-border-default rounded-lg p-4">
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3 block">Hierarchy Levels</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedRelationship.description.split('->').map((part: string, i: number, arr: any[]) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="text" defaultValue={part.trim()} className="input-base text-sm py-1.5 px-3 w-32 font-medium" />
                        {i < arr.length - 1 && <ChevronRight size={16} className="text-border-strong mx-1" />}
                      </div>
                    ))}
                    <button onClick={handleAddHierarchyLevel} className="w-8 h-8 rounded border border-dashed border-border-strong flex items-center justify-center text-text-muted hover:text-brand-600 hover:border-brand-500 hover:bg-brand-50 transition-colors ml-2">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="bg-bg-surface rounded-lg border border-border-default overflow-hidden flex flex-col min-h-[400px]">
                  <div className="p-3 border-b border-border-default bg-bg-page/50 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-text-primary">Visual Hierarchy Builder</h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input type="text" placeholder="Search nodes..." className="input-base text-xs py-1 h-7 pl-8 w-40" />
                      </div>
                      <Button variant="secondary" size="sm" className="h-7 text-xs px-3" icon={Plus} onClick={handleAddRootNode}>Add Root Node</Button>
                    </div>
                  </div>
                  <div className="flex-1 p-2 bg-bg-surface overflow-x-auto">
                    <div className="min-w-[400px]">
                      {renderTree(selectedRelationship.nodes)}
                    </div>
                  </div>
                </div>
                
                <div className="bg-bg-surface rounded-lg border border-border-default p-5">
                   <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">Usage & Context</h3>
                   <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                     <span className="font-medium text-text-primary">Linked Forms:</span> Campaign Form v2, Standard Support Request, HR Ticket
                   </div>
                   <div className="flex items-center gap-2 text-sm text-text-secondary">
                     <span className="font-medium text-text-primary">Linked Request Types:</span> New Campaign, General Support
                   </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border-default bg-bg-surface flex items-center justify-end gap-3 shrink-0">
              <Button variant="outline" onClick={() => setSelectedRelationship(null)}>Cancel</Button>
              <Button variant="primary" icon={Check} onClick={() => setSelectedRelationship(null)}>Save Hierarchy</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
