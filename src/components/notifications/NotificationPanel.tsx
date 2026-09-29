import { useState } from 'react';
import { useNotificationStore } from '../../services/notificationService';
import { NotificationGroupCard } from './NotificationGroupCard';

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'DIRECT' | 'WATCHING'>('DIRECT');
  
  const groups = useNotificationStore(state => state.getGroupedNotifications(activeTab));
  const markAllAsRead = useNotificationStore(state => state.markAllNotificationsAsRead);

  return (
    <div className="absolute top-full right-0 mt-1 w-[380px] max-w-[calc(100vw-32px)] bg-bg-surface border border-border-default shadow-xl rounded-lg flex flex-col z-50 overflow-hidden max-h-[85vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-default bg-bg-surface">
        <h3 className="font-semibold text-text-primary">Notifications</h3>
        <button 
          onClick={markAllAsRead}
          className="text-xs font-medium text-brand-500 hover:text-brand-600 transition-colors"
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-default px-2 bg-bg-page">
        <button
          onClick={() => setActiveTab('DIRECT')}
          className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'DIRECT' 
              ? 'border-brand-500 text-brand-600' 
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Direct
        </button>
        <button
          onClick={() => setActiveTab('WATCHING')}
          className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'WATCHING' 
              ? 'border-brand-500 text-brand-600' 
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Watching
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2 bg-bg-page custom-scrollbar min-h-[300px]">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary p-8 space-y-2">
            <p className="text-sm">No {activeTab.toLowerCase()} notifications</p>
            <p className="text-xs text-text-muted">You're all caught up.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {groups.map(group => (
              <NotificationGroupCard 
                key={`${group.entity_type}-${group.entity_id}`} 
                group={group} 
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
