export type PageType = 
  | 'login' 
  | 'dashboard'
  | 'my_tickets' 
  | 'tasks' 
  | 'ticket_explorer' 
  | 'created_by_me' 
  | 'ticket_details' 
  | 'ticket_history'
  | 'create_ticket_drawer' 
  | 'create_ticket_full' 
  | 'create_ticket_success' 
  | 'task_details'
  | 'settings'
  | 'reports'
  | 'client_configuration'
  | 'client_details'
  | 'workflows'
  | 'edit_workflow'
  | 'internal_users'
  | 'help';

export type Page = PageType | string;
