export type WorkflowStatus = 'draft' | 'published' | 'inactive';

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  version: number;
  triggerType: string;
  graph: {
    nodes: WfNode[];
    edges: WfEdge[];
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  executionCount: number;
}

export type NodeType = 
  | 'trigger'
  | 'condition'
  | 'loop'
  | 'merge'
  | 'send_communication'
  | 'send_notification'
  | 'update_ticket'
  | 'add_comment'
  | 'create_task'
  | 'api_call';

export interface WfNode {
  id: string;
  type: NodeType;
  config: any;
  position: { x: number, y: number };
}

export interface WfEdge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}

export interface FieldRegistryEntry {
  key: string;
  label: string;
  category: string;
  baseType: 'selection' | 'text' | 'number' | 'datetime';
  valueSource: 'static' | 'tenant_scoped' | 'dependent_on' | 'computed' | 'custom_per_project';
  dependentOn?: string;
  projectScope?: string;
}

export interface NodeExecution {
  nodeId: string;
  input: any;
  output: any;
  branchTaken?: string;
  durationMs: number;
  error?: string;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowVersion: number;
  ticketId: string;
  startedAt: string;
  finishedAt: string;
  outcome: 'success' | 'failure';
  nodeExecutions: NodeExecution[];
}
