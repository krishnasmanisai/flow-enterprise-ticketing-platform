import { useState, useCallback, useMemo } from 'react';
import { 
  ArrowLeft, Check, AlertCircle
} from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNode } from '../components/workflow/Nodes';
import { CustomEdge } from '../components/workflow/Edges';
import { ConfigPanel } from '../components/workflow/ConfigPanel';
import { triggers, actions } from '../lib/workflow/registry';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { label: 'New Ticket Created', sublabel: 'Request Type = "Flat Accrual"', config: { event: 'New Ticket Created', conditions: [{field: 'requestType', op: '==', val: 'Flat Accrual'}] } }
  },
  {
    id: '2',
    type: 'api_call',
    position: { x: 250, y: 150 },
    data: { label: 'Get Customer Profile', sublabel: 'Returns customerType', config: { method: 'GET', url: 'https://api.example.com/profile?email={{ticket.customerEmail}}', responseMapping: [{path: '$.data.customerType', varName: 'customerType'}] } }
  },
  {
    id: '3',
    type: 'condition',
    position: { x: 250, y: 250 },
    data: { label: 'Customer Type Check', sublabel: 'customerType == "Non-Loyalty"', config: { logicOperator: 'AND', conditions: [{field: 'customerType', op: '==', val: 'Non-Loyalty'}] } }
  },
  {
    id: '4',
    type: 'api_call',
    position: { x: 50, y: 350 },
    data: { label: 'Update Profile', sublabel: 'Sets to Loyalty', config: { method: 'POST', url: 'https://api.example.com/profile/update', body: '{\n  "email": "{{ticket.customerEmail}}",\n  "type": "Loyalty"\n}' } }
  },
  {
    id: '5',
    type: 'api_call',
    position: { x: 250, y: 450 },
    data: { label: 'Credit Points', sublabel: 'Returns accrualStatus', config: { method: 'POST', url: 'https://api.example.com/points/credit', body: '{\n  "amount": 500\n}', responseMapping: [{path: '$.data.status', varName: 'accrualStatus'}] } }
  },
  {
    id: '6',
    type: 'condition',
    position: { x: 250, y: 550 },
    data: { label: 'Accrual Status', sublabel: 'accrualStatus == "success"', config: { logicOperator: 'AND', conditions: [{field: 'accrualStatus', op: '==', val: 'success'}] } }
  },
  {
    id: '7',
    type: 'send_communication',
    position: { x: 50, y: 650 },
    data: { label: 'Send Confirmation', sublabel: 'Auto-reply to customer', config: { sendTo: '{{ticket.customerEmail}}', channel: 'Email', subject: 'Points Credited', body: '<p>Your points have been credited successfully.</p>' } }
  },
  {
    id: '8',
    type: 'add_comment',
    position: { x: 450, y: 650 },
    data: { label: 'Add Internal Comment', sublabel: 'Attach context', config: { attachContext: true, comment: '<p>Escalating due to failed accrual.</p>' } }
  },
  {
    id: '9',
    type: 'update_ticket',
    position: { x: 450, y: 750 },
    data: { label: 'Route to Ops', sublabel: 'Change status', config: { updates: [{field: 'status', value: 'Pending Ops'}] } }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'default', type: 'custom' },
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'default', type: 'custom' },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'true', type: 'custom' },
  { id: 'e3-5', source: '3', target: '5', sourceHandle: 'false', type: 'custom' },
  { id: 'e4-5', source: '4', target: '5', sourceHandle: 'default', type: 'custom' }, 
  { id: 'e5-6', source: '5', target: '6', sourceHandle: 'default', type: 'custom' },
  { id: 'e6-7', source: '6', target: '7', sourceHandle: 'true', type: 'custom' },
  { id: 'e6-8', source: '6', target: '8', sourceHandle: 'false', type: 'custom' },
  { id: 'e8-9', source: '8', target: '9', sourceHandle: 'default', type: 'custom' }
];

export default function EditWorkflow({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [draggedType, setDraggedType] = useState<string | null>(null);

  const nodeTypes = useMemo(() => ({
    trigger: CustomNode, api_call: CustomNode, condition: CustomNode, switch: CustomNode, loop: CustomNode, merge: CustomNode,
    send_communication: CustomNode, send_notification: CustomNode, update_ticket: CustomNode, add_comment: CustomNode, create_task: CustomNode
  }), []);

  const edgeTypes = useMemo(() => ({
    custom: CustomEdge
  }), []);

  const getAvailableVariables = () => {
    // Collect variables from trigger and upstream api calls
    // Real implementation would traverse DAG.
    const vars = ['ticket.id', 'ticket.customerEmail', 'ticket.status', 'ticket.requestType'];
    nodes.forEach(n => {
      if (n.type === 'api_call' && (n.data as any).config?.responseMapping) {
        (n.data as any).config.responseMapping.forEach((m: any) => {
          if (m.varName) vars.push(m.varName);
        });
      }
    });
    return vars;
  };

  const contextVariables = getAvailableVariables();

  const handleNodeDelete = useCallback((id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  }, [setNodes, setEdges, selectedNodeId]);

  // Inject onDelete into node data
  const nodesWithActions = nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      onDelete: handleNodeDelete
    }
  }));

  const handleEdgeDelete = useCallback((id: string) => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  }, [setEdges]);

  const handleEdgeInsert = useCallback((edgeId: string) => {
    // Splicing a generic API Call node into the edge
    const edge = edges.find(e => e.id === edgeId);
    if (!edge) return;

    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    if (!sourceNode || !targetNode) return;

    const newNodeId = `node_${Date.now()}`;
    const newY = sourceNode.position.y + (targetNode.position.y - sourceNode.position.y) / 2;
    const newX = sourceNode.position.x + (targetNode.position.x - sourceNode.position.x) / 2;
    
    const newNode = {
      id: newNodeId,
      type: 'api_call',
      position: { x: newX, y: newY },
      data: { label: 'New Action', config: {} }
    };

    const edge1 = { id: `e_${edge.source}_${newNodeId}`, source: edge.source, target: newNodeId, sourceHandle: edge.sourceHandle, type: 'custom' };
    const edge2 = { id: `e_${newNodeId}_${edge.target}`, source: newNodeId, target: edge.target, sourceHandle: 'default', type: 'custom' };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds.filter(e => e.id !== edgeId), edge1, edge2]);
    setSelectedNodeId(newNodeId);
  }, [edges, nodes, setNodes, setEdges]);

  // Inject callbacks into edge data
  const edgesWithActions = edges.map(e => ({
    ...e,
    data: {
      ...e.data,
      onDelete: handleEdgeDelete,
      onInsert: handleEdgeInsert
    }
  }));

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge({...params, type: 'custom'}, eds)), [setEdges]);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setValidationError(null);
  };

  const updateNodeData = (id: string, newConfig?: any, newLabel?: string, newType?: string) => {
    setNodes((nds) => nds.map(n => {
      if (n.id === id) {
        return {
          ...n,
          type: newType || n.type,
          data: {
            ...n.data,
            label: newLabel !== undefined ? newLabel : n.data.label,
            config: newConfig !== undefined ? newConfig : n.data.config
          }
        };
      }
      return n;
    }));
  };

  const validateAndPublish = () => {
    for (const node of nodes) {
      if (node.type === 'condition') {
        const hasConds = (node.data as any).config?.conditions?.length > 0;
        if (!hasConds || !(node.data as any).config.conditions[0].field) {
          setValidationError(`Node "${node.data.label}" has incomplete conditions.`);
          setSelectedNodeId(node.id);
          return;
        }
        // Check routing
        const hasTrue = edges.some(e => e.source === node.id && e.sourceHandle === 'true');
        const hasFalse = edges.some(e => e.source === node.id && e.sourceHandle === 'false');
        if (!hasTrue && !hasFalse) {
          setValidationError(`Node "${node.data.label}" has no branches routed.`);
          setSelectedNodeId(node.id);
          return;
        }
      }
      if (node.type === 'api_call') {
        if (!(node.data as any).config?.url) {
          setValidationError(`Node "${node.data.label}" is missing a URL.`);
          setSelectedNodeId(node.id);
          return;
        }
      }
    }
    // Reachability check (simple BFS)
    const trigger = nodes.find(n => n.type === 'trigger');
    if (!trigger) {
      setValidationError("Workflow must have exactly one Trigger node.");
      return;
    }
    const visited = new Set<string>();
    const queue = [trigger.id];
    while (queue.length > 0) {
      const current = queue.shift()!;
      visited.add(current);
      edges.filter(e => e.source === current).forEach(e => {
        if (!visited.has(e.target)) queue.push(e.target);
      });
    }
    const unreachable = nodes.find(n => !visited.has(n.id));
    if (unreachable) {
      setValidationError(`Node "${unreachable.data.label}" is unreachable.`);
      setSelectedNodeId(unreachable.id);
      return;
    }

    setValidationError(null);
    alert('Workflow published successfully!');
    onNavigate('workflows');
  };

  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    setDraggedType(nodeType);
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: any) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    // We don't have reactFlowInstance ref to accurately project coords without useReactFlow wrapper,
    // so we approximate for the center. Real implementation uses reactFlowInstance.screenToFlowPosition
    const newNodeId = `node_${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type,
      position: { x: event.clientX - 300, y: event.clientY - 100 },
      data: { label: `New ${type.replace('_', ' ')}`, config: {} }
    };
    setNodes((nds) => nds.concat(newNode));
    setSelectedNodeId(newNodeId);
  }, [setNodes]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="flex flex-col w-full h-full bg-bg-page relative">
      {/* Header */}
      <div className="bg-bg-surface border-b border-border-default sticky top-0 z-20 px-6 py-4 flex justify-between items-center shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('workflows')} className="text-text-secondary hover:text-text-primary transition-colors p-1.5 -ml-1.5 rounded hover:bg-bg-surface-hover">
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-5 bg-border-default"></div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-widest bg-bg-page px-2 py-0.5 rounded border border-border-default">Draft</span>
            </div>
            <h1 className="text-lg font-semibold text-text-primary">Flat Accrual Automation</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {validationError && (
            <div className="flex items-center gap-2 text-error-text text-sm bg-error-bg px-3 py-1.5 rounded-md border border-error-text/20">
              <AlertCircle size={16} />
              <span className="font-medium">{validationError}</span>
            </div>
          )}
          <Button variant="outline" size="md">Test Run</Button>
          <Button variant="outline" size="md">Save Draft</Button>
          <Button variant="primary" size="md" icon={Check} onClick={validateAndPublish}>Publish</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Palette */}
        <div className="w-64 border-r border-border-default bg-bg-surface flex flex-col shrink-0 z-10 h-full">
          <div className="p-4 border-b border-border-default font-semibold text-sm">Node Palette</div>
          <div className="p-4 space-y-4 overflow-y-auto">
            <div>
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-2">Triggers</div>
              <div 
                className="p-2 border border-border-default rounded text-sm hover:border-brand-500 cursor-grab bg-bg-page"
                draggable onDragStart={(e) => onDragStart(e, 'trigger')}
              >New Ticket Created</div>
              <div 
                className="p-2 border border-border-default rounded text-sm hover:border-brand-500 cursor-grab bg-bg-page mt-2"
                draggable onDragStart={(e) => onDragStart(e, 'trigger')}
              >Ticket Updated</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-2 mt-4">Logic</div>
              <div className="p-2 border border-border-default rounded text-sm hover:border-brand-500 cursor-grab bg-bg-page" draggable onDragStart={(e) => onDragStart(e, 'condition')}>Condition / Switch</div>
              <div className="p-2 border border-border-default rounded text-sm hover:border-brand-500 cursor-grab bg-bg-page mt-2" draggable onDragStart={(e) => onDragStart(e, 'loop')}>Loop</div>
              <div className="p-2 border border-border-default rounded text-sm hover:border-brand-500 cursor-grab bg-bg-page mt-2" draggable onDragStart={(e) => onDragStart(e, 'merge')}>Merge</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-2 mt-4">Actions</div>
              {actions.map(action => (
                <div 
                  key={action}
                  className="p-2 border border-border-default rounded text-sm hover:border-brand-500 cursor-grab bg-bg-page mt-2" 
                  draggable onDragStart={(e) => onDragStart(e, action.toLowerCase().replace(' ', '_'))}
                >{action}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative h-full">
          <ReactFlow 
            nodes={nodesWithActions}
            edges={edgesWithActions}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onPaneClick={() => setSelectedNodeId(null)}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{ type: 'custom' }}
            fitView
            className="bg-bg-page"
            deleteKeyCode={['Backspace', 'Delete']}
          >
            <Background color="#ccc" gap={16} />
            <Controls />
          </ReactFlow>
        </div>

        {/* Right Config Panel */}
        {selectedNode && (
          <ConfigPanel 
            key={selectedNode.id} // Forces unmount/remount on selection change! Prevents stale data.
            node={selectedNode} 
            updateNode={updateNodeData} 
            onClose={() => setSelectedNodeId(null)} 
            contextVariables={contextVariables}
          />
        )}
      </div>
    </div>
  );
}

