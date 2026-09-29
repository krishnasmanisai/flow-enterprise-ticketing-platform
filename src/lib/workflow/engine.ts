import { Workflow, WfNode, WfEdge, WorkflowRun, NodeExecution } from './types';

// Resolves a variable by traversing backward through the edges to find ancestors
export function resolveVariable(
  variablePath: string, 
  currentNodeId: string, 
  edges: WfEdge[], 
  contextStore: Record<string, any>
): any {
  if (variablePath.startsWith('ticket.')) {
    const key = variablePath.replace('ticket.', '');
    return contextStore['trigger']?.[key];
  }
  
  // Format: node_123.outputField
  const parts = variablePath.split('.');
  if (parts.length < 2) return null;
  const targetNodeId = parts[0];
  const field = parts.slice(1).join('.');

  // In a full implementation, we'd verify `targetNodeId` is an actual ancestor 
  // of `currentNodeId` using the DAG.
  // For now, if the node has executed and is in contextStore, we return it.
  
  const nodeOutput = contextStore[targetNodeId];
  if (!nodeOutput) return null;
  return nodeOutput[field];
}

export async function executeWorkflow(workflow: Workflow, ticketId: string, triggerPayload: any): Promise<WorkflowRun> {
  const runId = 'run_' + Math.random().toString(36).substr(2, 9);
  const startTime = new Date().toISOString();
  
  const nodeExecutions: NodeExecution[] = [];
  const contextStore: Record<string, any> = {
    trigger: triggerPayload
  };

  const { nodes, edges } = workflow.graph;
  
  // Find trigger node
  const triggerNode = nodes.find(n => n.type === 'trigger');
  if (!triggerNode) {
    throw new Error('No trigger node found');
  }

  // Execution queue/stack (assuming simple topological traversal)
  // For a proper DAG, we'd do Kahn's algorithm or similar.
  const visited = new Set<string>();
  const queue: { nodeId: string, branchTaken?: string }[] = [{ nodeId: triggerNode.id }];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current.nodeId)) continue;
    
    const node = nodes.find(n => n.id === current.nodeId);
    if (!node) continue;
    
    const start = Date.now();
    let output: any = null;
    let branchTaken: string | undefined = undefined;
    let error: string | undefined = undefined;
    
    try {
      // Simulate node execution
      if (node.type === 'trigger') {
        output = triggerPayload;
      } else if (node.type === 'condition') {
        const { field, operator, value } = node.config;
        // In real execution, we resolve `field` from context.
        // Mock evaluation:
        branchTaken = 'true'; // Force true for the mock example
        output = { result: true };
      } else if (node.type === 'api_call') {
        // Mock API Call
        output = node.config.mockResponse || { success: true };
      } else if (node.type === 'send_communication') {
        output = { sent: true };
      } else if (node.type === 'update_ticket') {
        output = { updated: true };
      }
      
      contextStore[node.id] = output;
      visited.add(node.id);
    } catch (e: any) {
      error = e.message;
      branchTaken = 'error';
    }
    
    nodeExecutions.push({
      nodeId: node.id,
      input: node.config,
      output,
      branchTaken,
      durationMs: Date.now() - start,
      error
    });
    
    if (error) break;

    // Find outgoing edges
    const outgoingEdges = edges.filter(e => e.source === node.id);
    for (const edge of outgoingEdges) {
      if (!branchTaken || edge.sourceHandle === branchTaken || edge.sourceHandle === 'default' || !edge.sourceHandle) {
         queue.push({ nodeId: edge.target });
      }
    }
  }

  return {
    id: runId,
    workflowId: workflow.id,
    workflowVersion: workflow.version,
    ticketId,
    startedAt: startTime,
    finishedAt: new Date().toISOString(),
    outcome: nodeExecutions.some(n => n.error) ? 'failure' : 'success',
    nodeExecutions
  };
}
