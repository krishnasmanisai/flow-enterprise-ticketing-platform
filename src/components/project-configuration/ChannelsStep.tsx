import { Mail, MessageSquare, Globe, Phone, Check } from 'lucide-react';

export function ChannelsStep() {
  const channels = [
    { 
      id: 'email', 
      title: 'Email Support', 
      description: 'Automatically create tickets from incoming support emails',
      icon: <Mail className="w-5 h-5 text-brand-600" />,
      enabled: false,
    },
    { 
      id: 'chat', 
      title: 'Live Chat', 
      description: 'Enable real-time chat support widget for your customers',
      icon: <MessageSquare className="w-5 h-5 text-brand-600" />,
      enabled: false,
    },
    { 
      id: 'portal', 
      title: 'Customer Portal', 
      description: 'Dedicated web portal for customers to track and manage requests',
      icon: <Globe className="w-5 h-5 text-brand-600" />,
      enabled: true,
    },
    { 
      id: 'call', 
      title: 'Voice Call', 
      description: 'Enable voice integration for direct customer calls',
      icon: <Phone className="w-5 h-5 text-brand-600" />,
      enabled: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary tracking-tight mb-2">Communication Channels</h3>
        <p className="text-sm text-text-secondary">Enable and configure the communication channels available for this project.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map(channel => (
          <div 
             key={channel.id} 
             className={`border rounded-xl p-6 shadow-sm flex flex-col gap-5 transition-all ${
                channel.enabled ? 'border-brand-500 bg-brand-50/30' : 'border-border-default bg-bg-surface hover:border-brand-300'
             }`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${channel.enabled ? 'bg-brand-100 text-brand-700' : 'bg-bg-page border border-border-default text-text-muted'}`}>
                {channel.icon}
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input type="checkbox" className="sr-only peer" defaultChecked={channel.enabled} />
                <div className="w-11 h-6 bg-border-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-default after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-text"></div>
              </label>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-base font-bold text-text-primary">{channel.title}</h4>
                {channel.enabled && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-success-text uppercase tracking-wider bg-success-bg px-2 py-0.5 rounded border border-success-text/20">
                     <Check size={12} /> Active
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{channel.description}</p>
            </div>
            
            {channel.enabled && (
               <div className="mt-2 pt-4 border-t border-brand-200">
                  <button className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors">Configure {channel.title}</button>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
