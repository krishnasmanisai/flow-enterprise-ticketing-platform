import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { RichTextEditor } from '../ui/RichTextEditor';
import { fieldRegistry } from '../../lib/workflow/registry';

export function ConfigPanel({ node, updateNode, onClose, contextVariables }: any) {
  // Re-initialize state when a new node is selected
  const [config, setConfig] = useState(node.data.config || {});

  useEffect(() => {
    setConfig(node.data.config || {});
  }, [node.id, node.data.config]);

  const handleChange = (newConfig: any) => {
    setConfig(newConfig);
    updateNode(node.id, newConfig);
  };

  const updateField = (key: string, value: any) => {
    handleChange({ ...config, [key]: value });
  };

  const renderVariableInsert = (fieldKey: string, currentValue: string) => (
    <div className="relative mt-1">
      <select 
        className="text-[10px] bg-bg-page border border-border-default rounded px-1.5 py-0.5 text-text-secondary outline-none w-full"
        value=""
        onChange={(e) => {
          if (e.target.value) {
            updateField(fieldKey, currentValue + `{{${e.target.value}}}`);
          }
        }}
      >
        <option value="">+ Insert Variable</option>
        {contextVariables.map((v: string) => <option key={v} value={v}>{v}</option>)}
      </select>
    </div>
  );

  return (
    <div className="w-80 border-l border-border-default bg-bg-surface flex flex-col shrink-0 z-10 h-full overflow-y-auto">
      <div className="p-4 border-b border-border-default flex justify-between items-center sticky top-0 bg-bg-surface z-10">
        <div className="font-semibold text-sm">Configure Node</div>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xs">Close</button>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-xs font-semibold text-text-secondary mb-1">Node Title</label>
          <input 
            type="text" 
            value={node.data.label} 
            onChange={(e) => updateNode(node.id, undefined, e.target.value)}
            className="input-base w-full h-8 text-sm" 
          />
        </div>
        
        {/* API CALL */}
        {node.type === 'api_call' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Method & URL</label>
              <div className="flex gap-2">
                <select 
                  className="input-base h-8 text-sm w-24"
                  value={config.method || 'GET'}
                  onChange={(e) => updateField('method', e.target.value)}
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>PATCH</option>
                  <option>DELETE</option>
                </select>
                <input 
                  type="text" 
                  placeholder="https://api.example.com/v1" 
                  className="input-base h-8 text-sm flex-1" 
                  value={config.url || ''}
                  onChange={(e) => updateField('url', e.target.value)}
                />
              </div>
              {renderVariableInsert('url', config.url || '')}
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Auth Type</label>
              <select 
                className="input-base h-8 text-sm w-full"
                value={config.authType || 'None'}
                onChange={(e) => updateField('authType', e.target.value)}
              >
                <option>None</option>
                <option>API Key</option>
                <option>Bearer Token</option>
                <option>Basic Auth</option>
              </select>
            </div>

            {(config.authType === 'Bearer Token' || config.authType === 'API Key') && (
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Token / Key</label>
                <input type="password" placeholder="Enter token..." className="input-base h-8 text-sm w-full" />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1 flex justify-between">
                <span>Headers</span>
                <button 
                  onClick={() => updateField('headers', [...(config.headers || []), {key: '', value: ''}])}
                  className="text-brand-500 hover:text-brand-600"
                ><Plus size={14}/></button>
              </label>
              {(config.headers || [{key: 'Authorization', value: ''}]).map((h: any, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" placeholder="Key" className="input-base h-8 text-sm w-1/3" value={h.key} 
                    onChange={(e) => {
                      const newH = [...(config.headers || [])];
                      newH[i] = { ...h, key: e.target.value };
                      updateField('headers', newH);
                    }} 
                  />
                  <div className="flex-1 flex flex-col">
                    <input type="text" placeholder="Value" className="input-base h-8 text-sm w-full" value={h.value}
                      onChange={(e) => {
                        const newH = [...(config.headers || [])];
                        newH[i] = { ...h, value: e.target.value };
                        updateField('headers', newH);
                      }} 
                    />
                  </div>
                  <button onClick={() => {
                    const newH = [...(config.headers || [])];
                    newH.splice(i, 1);
                    updateField('headers', newH);
                  }} className="text-error-text mt-2"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Request Body (JSON)</label>
              <textarea 
                className="input-base w-full h-24 text-sm font-mono custom-scrollbar p-2" 
                placeholder="{}"
                value={config.body || ''}
                onChange={(e) => updateField('body', e.target.value)}
              />
              {renderVariableInsert('body', config.body || '')}
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1 flex justify-between">
                <span>Response Mapping</span>
                <button 
                  onClick={() => updateField('responseMapping', [...(config.responseMapping || []), {path: '', varName: ''}])}
                  className="text-brand-500 hover:text-brand-600"
                ><Plus size={14}/></button>
              </label>
              <p className="text-[10px] text-text-muted mb-2">Extract JSON response fields as variables.</p>
              {(config.responseMapping || [{path: '$.data.id', varName: 'resultId'}]).map((m: any, i: number) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" placeholder="$.path" className="input-base h-8 text-sm flex-1" value={m.path}
                    onChange={(e) => {
                      const newM = [...(config.responseMapping || [])];
                      newM[i] = { ...m, path: e.target.value };
                      updateField('responseMapping', newM);
                    }} 
                  />
                  <input type="text" placeholder="Var Name" className="input-base h-8 text-sm w-1/3" value={m.varName}
                    onChange={(e) => {
                      const newM = [...(config.responseMapping || [])];
                      newM[i] = { ...m, varName: e.target.value };
                      updateField('responseMapping', newM);
                    }}
                  />
                  <button onClick={() => {
                    const newM = [...(config.responseMapping || [])];
                    newM.splice(i, 1);
                    updateField('responseMapping', newM);
                  }} className="text-error-text mt-2"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONDITION / SWITCH */}
        {(node.type === 'condition' || node.type === 'switch') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-text-secondary">Mode</label>
              <div className="flex bg-bg-page p-0.5 rounded border border-border-default">
                <button 
                  onClick={() => updateNode(node.id, undefined, undefined, 'condition')}
                  className={`px-2 py-1 text-xs rounded ${node.type === 'condition' ? 'bg-bg-surface shadow-sm font-medium' : 'text-text-muted'}`}
                >If/Else</button>
                <button 
                  onClick={() => updateNode(node.id, undefined, undefined, 'switch')}
                  className={`px-2 py-1 text-xs rounded ${node.type === 'switch' ? 'bg-bg-surface shadow-sm font-medium' : 'text-text-muted'}`}
                >Switch</button>
              </div>
            </div>

            {node.type === 'condition' ? (
              <>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-text-secondary">Conditions</label>
                  <select 
                    className="input-base h-6 text-[10px] w-20 py-0"
                    value={config.logicOperator || 'AND'}
                    onChange={(e) => updateField('logicOperator', e.target.value)}
                  >
                    <option>AND</option>
                    <option>OR</option>
                  </select>
                </div>
                {(config.conditions || [{field: '', op: '==', val: ''}]).map((c: any, i: number) => (
                  <div key={i} className="p-3 border border-border-default rounded bg-bg-page mb-2 relative group">
                    <button onClick={() => {
                        const newC = [...(config.conditions || [])];
                        newC.splice(i, 1);
                        updateField('conditions', newC);
                      }} 
                      className="absolute -top-2 -right-2 w-5 h-5 bg-error-bg text-error-text rounded-full flex items-center justify-center border border-error-text/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    ><Trash2 size={12}/></button>
                    
                    <div className="flex gap-2 mb-2">
                      <select 
                        className="input-base h-8 text-sm flex-1"
                        value={c.field}
                        onChange={(e) => {
                          const newC = [...(config.conditions || [])];
                          newC[i] = { ...c, field: e.target.value };
                          updateField('conditions', newC);
                        }}
                      >
                        <option value="">Select Field...</option>
                        {fieldRegistry.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
                      </select>
                      <select 
                        className="input-base h-8 text-sm w-24"
                        value={c.op}
                        onChange={(e) => {
                          const newC = [...(config.conditions || [])];
                          newC[i] = { ...c, op: e.target.value };
                          updateField('conditions', newC);
                        }}
                      >
                        <option>==</option>
                        <option>!=</option>
                        <option>Contains</option>
                        <option>&gt;</option>
                        <option>&lt;</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <input 
                        type="text" placeholder="Value" className="input-base h-8 text-sm w-full" 
                        value={c.val}
                        onChange={(e) => {
                          const newC = [...(config.conditions || [])];
                          newC[i] = { ...c, val: e.target.value };
                          updateField('conditions', newC);
                        }}
                      />
                      {renderVariableInsert(`conditions[${i}].val`, c.val || '')}
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" size="sm" className="w-full text-xs" icon={Plus}
                  onClick={() => updateField('conditions', [...(config.conditions || []), {field: '', op: '==', val: ''}])}
                >Add Condition</Button>
              </>
            ) : (
              <>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Evaluate Field</label>
                <select 
                  className="input-base h-8 text-sm w-full mb-4"
                  value={config.switchField || ''}
                  onChange={(e) => updateField('switchField', e.target.value)}
                >
                  <option value="">Select Field...</option>
                  {fieldRegistry.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
                </select>
                
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-text-secondary">Branches</label>
                  <button 
                    onClick={() => updateField('branches', [...(config.branches || []), {name: 'New Branch', val: ''}])}
                    className="text-brand-500 hover:text-brand-600"
                  ><Plus size={14}/></button>
                </div>
                {(config.branches || []).map((b: any, i: number) => (
                  <div key={i} className="flex gap-2 mb-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input 
                        type="text" placeholder="Branch Name" className="input-base h-8 text-sm w-full" value={b.name}
                        onChange={(e) => {
                          const newB = [...(config.branches || [])];
                          newB[i] = { ...b, name: e.target.value };
                          updateField('branches', newB);
                        }}
                      />
                      <input 
                        type="text" placeholder="Match Value" className="input-base h-8 text-sm w-full" value={b.val}
                        onChange={(e) => {
                          const newB = [...(config.branches || [])];
                          newB[i] = { ...b, val: e.target.value };
                          updateField('branches', newB);
                        }}
                      />
                    </div>
                    <button onClick={() => {
                        const newB = [...(config.branches || [])];
                        newB.splice(i, 1);
                        updateField('branches', newB);
                      }} className="text-error-text mt-2"
                    ><Trash2 size={14}/></button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* LOOP */}
        {node.type === 'loop' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Array Variable to Iterate</label>
              <select 
                className="input-base h-8 text-sm w-full"
                value={config.arrayVar || ''}
                onChange={(e) => updateField('arrayVar', e.target.value)}
              >
                <option value="">Select Variable...</option>
                {contextVariables.map((v: string) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Item Variable Name</label>
              <input 
                type="text" className="input-base h-8 text-sm w-full" placeholder="item"
                value={config.itemVar || 'item'}
                onChange={(e) => updateField('itemVar', e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={config.continueOnFail !== false} 
                  onChange={(e) => updateField('continueOnFail', e.target.checked)} 
                  className="rounded border-border-default text-brand-500 focus:ring-brand-500" 
                />
                <span className="text-sm">Continue on item failure</span>
              </label>
            </div>
          </div>
        )}

        {/* MERGE */}
        {node.type === 'merge' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Wait Mode</label>
              <select 
                className="input-base h-8 text-sm w-full"
                value={config.waitMode || 'all'}
                onChange={(e) => updateField('waitMode', e.target.value)}
              >
                <option value="all">Wait for all incoming branches</option>
                <option value="first">Proceed on first branch to arrive</option>
              </select>
            </div>
          </div>
        )}

        {/* SEND COMMUNICATION */}
        {node.type === 'send_communication' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Send To</label>
              <input 
                type="text" className="input-base h-8 text-sm w-full" placeholder="Customer Email"
                value={config.sendTo || ''}
                onChange={(e) => updateField('sendTo', e.target.value)}
              />
              {renderVariableInsert('sendTo', config.sendTo || '')}
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Channel</label>
              <select 
                className="input-base h-8 text-sm w-full"
                value={config.channel || 'Email'}
                onChange={(e) => updateField('channel', e.target.value)}
              >
                <option>Email</option>
                <option>SMS</option>
                <option>Chat</option>
              </select>
            </div>
            {config.channel !== 'SMS' && config.channel !== 'Chat' && (
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Subject</label>
                <input 
                  type="text" className="input-base h-8 text-sm w-full" 
                  value={config.subject || ''}
                  onChange={(e) => updateField('subject', e.target.value)}
                />
                {renderVariableInsert('subject', config.subject || '')}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Message Body</label>
              <RichTextEditor content={config.body || ''} onChange={(c) => updateField('body', c)} minHeight="min-h-[120px]" />
            </div>
          </div>
        )}

        {/* SEND NOTIFICATION */}
        {node.type === 'send_notification' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Notify To (User/Team)</label>
              <input 
                type="text" className="input-base h-8 text-sm w-full" 
                value={config.notifyTo || ''}
                onChange={(e) => updateField('notifyTo', e.target.value)}
              />
              {renderVariableInsert('notifyTo', config.notifyTo || '')}
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Channel</label>
              <select 
                className="input-base h-8 text-sm w-full"
                value={config.channel || 'In-App'}
                onChange={(e) => updateField('channel', e.target.value)}
              >
                <option>In-App</option>
                <option>Email</option>
                <option>Slack</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Message</label>
              <textarea 
                className="input-base w-full h-24 text-sm p-2 custom-scrollbar" 
                value={config.message || ''}
                onChange={(e) => updateField('message', e.target.value)}
              />
              {renderVariableInsert('message', config.message || '')}
            </div>
          </div>
        )}

        {/* UPDATE TICKET */}
        {node.type === 'update_ticket' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-text-secondary">Fields to Update</label>
              <button 
                onClick={() => updateField('updates', [...(config.updates || []), {field: '', value: ''}])}
                className="text-brand-500 hover:text-brand-600"
              ><Plus size={14}/></button>
            </div>
            {(config.updates || []).map((u: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2 items-start">
                <select 
                  className="input-base h-8 text-sm w-1/3"
                  value={u.field}
                  onChange={(e) => {
                    const newU = [...(config.updates || [])];
                    newU[i] = { ...u, field: e.target.value };
                    updateField('updates', newU);
                  }}
                >
                  <option value="">Field...</option>
                  {fieldRegistry.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
                </select>
                <div className="flex-1 flex flex-col">
                  <input 
                    type="text" placeholder="Value" className="input-base h-8 text-sm w-full" value={u.value}
                    onChange={(e) => {
                      const newU = [...(config.updates || [])];
                      newU[i] = { ...u, value: e.target.value };
                      updateField('updates', newU);
                    }}
                  />
                  {renderVariableInsert(`updates[${i}].value`, u.value || '')}
                </div>
                <button onClick={() => {
                  const newU = [...(config.updates || [])];
                  newU.splice(i, 1);
                  updateField('updates', newU);
                }} className="text-error-text mt-2"><Trash2 size={14}/></button>
              </div>
            ))}
          </div>
        )}

        {/* ADD COMMENT */}
        {node.type === 'add_comment' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Comment</label>
              <RichTextEditor content={config.comment || ''} onChange={(c) => updateField('comment', c)} minHeight="min-h-[120px]" />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={config.attachContext === true} 
                  onChange={(e) => updateField('attachContext', e.target.checked)} 
                  className="rounded border-border-default text-brand-500 focus:ring-brand-500" 
                />
                <span className="text-sm">Attach workflow context variables</span>
              </label>
            </div>
          </div>
        )}

        {/* CREATE TASK */}
        {node.type === 'create_task' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Task Title</label>
              <input 
                type="text" className="input-base h-8 text-sm w-full" 
                value={config.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
              />
              {renderVariableInsert('title', config.title || '')}
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Assignee</label>
              <input 
                type="text" className="input-base h-8 text-sm w-full" 
                value={config.assignee || ''}
                onChange={(e) => updateField('assignee', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Due Date</label>
              <input 
                type="text" placeholder="+2 business days" className="input-base h-8 text-sm w-full" 
                value={config.dueDate || ''}
                onChange={(e) => updateField('dueDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Priority</label>
              <select 
                className="input-base h-8 text-sm w-full"
                value={config.priority || 'Medium'}
                onChange={(e) => updateField('priority', e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Description</label>
              <RichTextEditor content={config.description || ''} onChange={(c) => updateField('description', c)} minHeight="min-h-[100px]" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
