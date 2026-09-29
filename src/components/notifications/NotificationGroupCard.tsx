import { useNavigate } from 'react-router-dom';
import { GroupedNotification, useNotificationStore } from '../../services/notificationService';

function getRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  
  return `${diffInDays} days ago`;
}

export function NotificationGroupCard({ group, onClose }: { group: GroupedNotification, onClose: () => void }) {
  const navigate = useNavigate();
  const markAsRead = useNotificationStore(state => state.markEntityNotificationsAsRead);

  const handleClick = () => {
    // 1. Mark as read
    markAsRead(group.entity_type, group.entity_id);
    
    // 2. Navigate
    if (group.entity_type === 'TICKET') {
      navigate(`/ticket_details?id=${group.entity_id}`);
    } else if (group.entity_type === 'TASK') {
      navigate(`/task_details?id=${group.entity_id}`);
    }
    
    // 3. Close panel
    onClose();
  };

  const isGrouped = group.items.length > 1;
  const sortedItems = [...group.items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const displayItem = sortedItems[0];

  const getNotificationText = (item: any) => {
    const isTicket = item.entity_type === 'TICKET';
    switch (item.notification_type) {
      case 'MENTION': return `${item.actor_name} mentioned you`;
      case 'ASSIGNED': return `${item.actor_name} assigned this ${isTicket ? 'ticket' : 'task'} to you`;
      case 'TICKET_CREATED': return `${item.actor_name} created a ticket`;
      case 'TASK_CREATED': return `${item.actor_name} created a task`;
      case 'TICKET_STATUS_UPDATED': return `${item.actor_name} updated the ticket status`;
      case 'TASK_STATUS_UPDATED': return `${item.actor_name} updated the task status`;
      case 'CUSTOMER_REPLY': return `${item.actor_name} replied to the ticket`;
      case 'INTERNAL_REPLY': return `${item.actor_name} added an internal reply`;
      default: return item.message || 'New activity';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-brand-50/40 border border-brand-500/20 hover:border-brand-500/40 rounded-md p-3 cursor-pointer shadow-sm transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
      
      <div className="flex justify-between items-start mb-2 gap-2 pl-3">
        <div className="font-semibold text-text-primary text-sm leading-tight group-hover:text-brand-600 transition-colors">
          {isGrouped ? displayItem.entity_title : getNotificationText(displayItem)}
        </div>
        <span className="text-[10px] text-brand-600 font-medium whitespace-nowrap bg-brand-50 px-1.5 py-0.5 rounded">
          {getRelativeTime(group.latest_created_at)}
        </span>
      </div>

      <div className="text-xs text-text-secondary mb-3 pl-3">
        {!isGrouped && (
          <div className="mb-2 line-clamp-2 text-text-primary">
             {displayItem.entity_title}
             {displayItem.message && (
               <div className="text-text-muted mt-1 italic line-clamp-2">
                 {displayItem.message}
               </div>
             )}
          </div>
        )}

        {isGrouped && (
          <div className="mb-2">
            <div className="text-text-primary font-medium mb-2">
              {group.items.length} new notification{group.items.length !== 1 && 's'}
            </div>
            <ul className="space-y-2">
              {sortedItems.slice(0, 3).map((item, i) => (
                <li key={i} className="flex flex-col gap-0.5 relative pl-3 before:content-['•'] before:text-brand-300 before:absolute before:left-0 before:top-0">
                  <span className="truncate text-text-primary">{getNotificationText(item)}</span>
                  {item.message && (
                    <span className="text-text-muted truncate">{item.message}</span>
                  )}
                </li>
              ))}
              {sortedItems.length > 3 && (
                <li className="text-[10px] text-text-muted mt-1 pl-3 font-medium">
                  +{sortedItems.length - 3} more
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="ml-3 text-[11px] font-mono text-text-muted bg-bg-page border border-border-subtle inline-block px-1.5 py-0.5 rounded uppercase">
        {group.entity_type === 'TICKET' ? 'Ticket: ' : 'Task: '}{group.entity_reference}
      </div>
    </div>
  );
}
