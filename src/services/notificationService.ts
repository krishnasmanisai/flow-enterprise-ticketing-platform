import { create } from 'zustand';

export type EntityType = 'TICKET' | 'TASK';
export type NotificationView = 'DIRECT' | 'WATCHING';
export type NotificationType = 
  | 'MENTION' 
  | 'ASSIGNED' 
  | 'TICKET_CREATED' 
  | 'TASK_CREATED' 
  | 'TICKET_STATUS_UPDATED' 
  | 'TASK_STATUS_UPDATED' 
  | 'CUSTOMER_REPLY' 
  | 'INTERNAL_REPLY';

export interface Notification {
  notification_id: string;
  user_id: string; // The user this notification is FOR
  notification_view: NotificationView;
  notification_type: NotificationType;
  entity_type: EntityType;
  entity_id: string; 
  entity_reference: string;
  entity_title: string;
  actor_id: string;
  actor_name: string;
  message: string;
  metadata?: any;
  created_at: string;
  read_at: string | null;
}

// Seed realistic data based on requirements
const mockNotifications: Notification[] = [
  // --- DIRECT ---
  {
    notification_id: 'd1',
    user_id: 'current_user',
    notification_view: 'DIRECT',
    notification_type: 'MENTION',
    entity_type: 'TICKET',
    entity_id: 'ERD-9336',
    entity_reference: 'ERD-9336',
    entity_title: 'Prod RMG Schema Creation',
    actor_id: 'u1',
    actor_name: 'Abhishek',
    message: '"Please verify the schema..."',
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    read_at: null,
  },
  {
    notification_id: 'd2',
    user_id: 'current_user',
    notification_view: 'DIRECT',
    notification_type: 'ASSIGNED',
    entity_type: 'TICKET',
    entity_id: 'ELT-137',
    entity_reference: 'ELT-137',
    entity_title: 'New Client Setup',
    actor_id: 'u2',
    actor_name: 'John Doe',
    message: '',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read_at: null,
  },
  
  // --- WATCHING: ELT-137 ---
  {
    notification_id: 'w1',
    user_id: 'current_user',
    notification_view: 'WATCHING',
    notification_type: 'TICKET_STATUS_UPDATED',
    entity_type: 'TICKET',
    entity_id: 'ELT-137',
    entity_reference: 'ELT-137',
    entity_title: 'New Client Setup',
    actor_id: 'u2',
    actor_name: 'John Doe',
    message: 'Open → In Progress',
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read_at: null,
  },
  {
    notification_id: 'w2',
    user_id: 'current_user',
    notification_view: 'WATCHING',
    notification_type: 'CUSTOMER_REPLY',
    entity_type: 'TICKET',
    entity_id: 'ELT-137',
    entity_reference: 'ELT-137',
    entity_title: 'New Client Setup',
    actor_id: 'c1',
    actor_name: 'Sarah Connor',
    message: '',
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    read_at: null,
  },
  {
    notification_id: 'w3',
    user_id: 'current_user',
    notification_view: 'WATCHING',
    notification_type: 'INTERNAL_REPLY',
    entity_type: 'TICKET',
    entity_id: 'ELT-137',
    entity_reference: 'ELT-137',
    entity_title: 'New Client Setup',
    actor_id: 'u1',
    actor_name: 'Abhishek',
    message: '',
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read_at: null,
  },

  // --- WATCHING: TASK-125 ---
  {
    notification_id: 'w4',
    user_id: 'current_user',
    notification_view: 'WATCHING',
    notification_type: 'TASK_CREATED',
    entity_type: 'TASK',
    entity_id: 'TASK-125',
    entity_reference: 'TASK-125',
    entity_title: 'Configure WhatsApp Webhook',
    actor_id: 'u1',
    actor_name: 'Abhishek',
    message: '',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read_at: null,
  },
  {
    notification_id: 'w5',
    user_id: 'current_user',
    notification_view: 'WATCHING',
    notification_type: 'TASK_STATUS_UPDATED',
    entity_type: 'TASK',
    entity_id: 'TASK-125',
    entity_reference: 'TASK-125',
    entity_title: 'Configure WhatsApp Webhook',
    actor_id: 'u3',
    actor_name: 'Priya Sharma',
    message: 'In Progress → Completed',
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read_at: null,
  }
];

interface NotificationState {
  notifications: Notification[];
  getUnreadCount: () => number;
  markEntityNotificationsAsRead: (entityType: EntityType, entityId: string) => void;
  markAllNotificationsAsRead: () => void;
  getGroupedNotifications: (view: NotificationView) => GroupedNotification[];
}

export interface GroupedNotification {
  entity_type: EntityType;
  entity_id: string;
  entity_reference: string;
  entity_title: string;
  items: Notification[];
  latest_created_at: string;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: mockNotifications,
  
  getUnreadCount: () => {
    return get().notifications.filter(n => !n.read_at && n.user_id === 'current_user').length;
  },

  markEntityNotificationsAsRead: (entityType: EntityType, entityId: string) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        (n.entity_type === entityType && n.entity_id === entityId && n.user_id === 'current_user' && !n.read_at)
          ? { ...n, read_at: new Date().toISOString() }
          : n
      )
    }));
  },

  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        (n.user_id === 'current_user' && !n.read_at) 
          ? { ...n, read_at: new Date().toISOString() } 
          : n
      )
    }));
  },

  getGroupedNotifications: (view: NotificationView) => {
    const relevantUnread = get().notifications.filter(
      n => !n.read_at && n.user_id === 'current_user' && n.notification_view === view
    );
    
    // Group by entity_type + entity_id
    const groups = new Map<string, GroupedNotification>();
    
    for (const n of relevantUnread) {
      const key = `${n.entity_type}-${n.entity_id}`;
      
      if (!groups.has(key)) {
        groups.set(key, {
          entity_type: n.entity_type,
          entity_id: n.entity_id,
          entity_reference: n.entity_reference,
          entity_title: n.entity_title,
          items: [],
          latest_created_at: n.created_at,
        });
      }
      
      const group = groups.get(key)!;
      group.items.push(n);
      
      if (new Date(n.created_at) > new Date(group.latest_created_at)) {
        group.latest_created_at = n.created_at;
      }
    }
    
    const result = Array.from(groups.values());
    
    // Sort by latest_created_at descending
    return result.sort((a, b) => new Date(b.latest_created_at).getTime() - new Date(a.latest_created_at).getTime());
  }
}));
