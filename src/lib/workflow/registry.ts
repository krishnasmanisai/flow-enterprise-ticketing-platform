import { FieldRegistryEntry } from './types';

export const triggers = [
  'New Ticket Created', 'Ticket Reassignment', 'Ticket Updated', 
  'Customer Reply Received', 'Customer Reply Sent', 'SLA Breach', 
  'Internal Comment Added', 'Task Created', 'Task Updated', 
  'Tickets Linked', 'Project Changed', 'Time-Based Trigger'
];

export const actions = [
  'API Call', 'Send Communication', 'Send Notification', 
  'Update Ticket', 'Add Internal Comment', 'Create Task'
];

export const fieldRegistry: FieldRegistryEntry[] = [
  // Ticket Attributes
  { key: 'project', label: 'Project', category: 'Ticket Attributes', baseType: 'selection', valueSource: 'static' },
  { key: 'status', label: 'Status', category: 'Ticket Attributes', baseType: 'selection', valueSource: 'static' },
  { key: 'priority', label: 'Priority', category: 'Ticket Attributes', baseType: 'selection', valueSource: 'static' },
  { key: 'channel', label: 'Channel', category: 'Ticket Attributes', baseType: 'selection', valueSource: 'static' },
  
  // Request Hierarchy
  { key: 'requestType', label: 'Request Type', category: 'Request Hierarchy', baseType: 'selection', valueSource: 'static' },
  { key: 'subRequestType', label: 'Sub-request Type', category: 'Request Hierarchy', baseType: 'selection', valueSource: 'dependent_on', dependentOn: 'requestType' },
  { key: 'serviceType', label: 'Service Type', category: 'Request Hierarchy', baseType: 'selection', valueSource: 'dependent_on', dependentOn: 'subRequestType' },
  
  // Business Hierarchy
  { key: 'businessUnit', label: 'Business Unit', category: 'Business Hierarchy', baseType: 'selection', valueSource: 'static' },
  { key: 'subBusinessUnit', label: 'Sub Business Unit', category: 'Business Hierarchy', baseType: 'selection', valueSource: 'dependent_on', dependentOn: 'businessUnit' },
  { key: 'tenantBusinessUnit', label: 'Tenant Business Unit', category: 'Business Hierarchy', baseType: 'selection', valueSource: 'dependent_on', dependentOn: 'subBusinessUnit' },
  
  // User Roles
  { key: 'assignee', label: 'Assignee', category: 'User Roles', baseType: 'selection', valueSource: 'static' },
  { key: 'owner', label: 'Owner', category: 'User Roles', baseType: 'selection', valueSource: 'static' },
  { key: 'editor', label: 'Editor', category: 'User Roles', baseType: 'selection', valueSource: 'static' },
  { key: 'observer', label: 'Observer', category: 'User Roles', baseType: 'selection', valueSource: 'static' },

  // Text
  { key: 'summary', label: 'Ticket Summary', category: 'Text', baseType: 'text', valueSource: 'static' },
  { key: 'body', label: 'Ticket Body', category: 'Text', baseType: 'text', valueSource: 'static' },
  
  // SLA
  { key: 'sla', label: 'SLA Status', category: 'SLA', baseType: 'number', valueSource: 'static' },
  
  // Time
  { key: 'createdDate', label: 'Created Date', category: 'Time', baseType: 'datetime', valueSource: 'static' },
  { key: 'updatedDate', label: 'Updated Date', category: 'Time', baseType: 'datetime', valueSource: 'static' },
  { key: 'createdTime', label: 'Created Time', category: 'Time', baseType: 'datetime', valueSource: 'static' },
  { key: 'updatedTime', label: 'Updated Time', category: 'Time', baseType: 'datetime', valueSource: 'static' },

  // Duration
  { key: 'timeSinceLastUpdate', label: 'Time Since Last Update', category: 'Duration', baseType: 'number', valueSource: 'computed' },
  { key: 'timeSinceCustomerReply', label: 'Time Since Customer Reply', category: 'Duration', baseType: 'number', valueSource: 'computed' },

  // Metrics
  { key: 'replyCount', label: 'Number of Replies', category: 'Metrics', baseType: 'number', valueSource: 'computed' },
  { key: 'firstResponseTime', label: 'First Response Time', category: 'Metrics', baseType: 'number', valueSource: 'computed' },
  { key: 'resolutionTime', label: 'Resolution Time', category: 'Metrics', baseType: 'number', valueSource: 'computed' },

  // Business Time
  { key: 'businessHours', label: 'Business / Non-Business Hours', category: 'Business Time', baseType: 'selection', valueSource: 'static' },
  { key: 'workingDay', label: 'Working Day / Holiday', category: 'Business Time', baseType: 'selection', valueSource: 'static' },

  // Sentiment/Emotion
  { key: 'ticketSentiment', label: 'Ticket Sentiment', category: 'Sentiment/Emotion', baseType: 'selection', valueSource: 'static' },
  { key: 'ticketEmotion', label: 'Ticket Emotion', category: 'Sentiment/Emotion', baseType: 'selection', valueSource: 'static' },
  { key: 'lastInteractionSentiment', label: 'Last Interaction Sentiment', category: 'Sentiment/Emotion', baseType: 'selection', valueSource: 'static' },
  { key: 'lastInteractionEmotion', label: 'Last Interaction Emotion', category: 'Sentiment/Emotion', baseType: 'selection', valueSource: 'static' },

  // Email
  { key: 'customerEmail', label: 'Customer Email', category: 'Email', baseType: 'selection', valueSource: 'static' },
  { key: 'ticketCC', label: 'Ticket CC', category: 'Email', baseType: 'selection', valueSource: 'static' },
  { key: 'ticketBCC', label: 'Ticket BCC', category: 'Email', baseType: 'selection', valueSource: 'static' },
];
