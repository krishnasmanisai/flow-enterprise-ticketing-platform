import { Settings as SettingsIcon, BarChart2, SlidersHorizontal, Wand2, ArrowRight, ShieldCheck, Users, Bell, Key, Zap, Database } from 'lucide-react';
import { Page } from '../types';
import { Badge } from '../components/ui/Badge';

export default function Settings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const categories = [
    {
      title: 'Workspace & Organization',
      description: 'Manage your core organization structure, clients, and branding.',
      items: [
        { 
          icon: SlidersHorizontal, 
          label: 'Client Configuration', 
          description: 'Establish global settings, branding overrides, and metadata fields.', 
          path: 'client_configuration',
          iconColor: 'text-text-primary'
        },
        { 
          icon: Users, 
          label: 'Internal Users', 
          description: 'Manage agents, roles, and department hierarchies.', 
          path: 'internal_users',
          iconColor: 'text-text-primary'
        },
      ]
    },
    {
      title: 'Automation & Routing',
      description: 'Configure intelligent workflows and SLA policies.',
      items: [
        { 
          icon: Wand2, 
          label: 'Workflow Automation', 
          description: 'Set up intelligent ticket routing, automated responses, and SLA triggers.', 
          path: 'workflows',
          iconColor: 'text-text-primary',
          badge: '12 Active Rules'
        },
        { 
          icon: Zap, 
          label: 'Macros & Canned Responses', 
          description: 'Create reusable responses and quick actions for common issues.', 
          path: 'settings', // Placeholder path
          iconColor: 'text-text-primary'
        },
      ]
    },
    {
      title: 'Data & Analytics',
      description: 'Manage data exports, reports, and security settings.',
      items: [
        { 
          icon: BarChart2, 
          label: 'Reports & Dashboards', 
          description: 'Manage data export schedules and organize analytics dashboards.', 
          path: 'reports',
          iconColor: 'text-text-primary'
        },
        { 
          icon: Database, 
          label: 'Data Management', 
          description: 'Manage data retention policies and storage usage.', 
          path: 'settings', // Placeholder path
          iconColor: 'text-text-primary'
        },
      ]
    },
    {
      title: 'Security & Integrations',
      description: 'Configure authentication and connect third-party apps.',
      items: [
        { 
          icon: ShieldCheck, 
          label: 'Security & Compliance', 
          description: 'Configure SSO, session timeouts, and IP whitelisting.', 
          path: 'settings', // Placeholder path
          iconColor: 'text-text-primary'
        },
        { 
          icon: Key, 
          label: 'API & Integrations', 
          description: 'Manage API keys and external webhooks.', 
          path: 'settings', // Placeholder path
          iconColor: 'text-text-primary'
        },
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="flex items-start gap-4 mb-10">
          <div className="w-12 h-12 rounded-lg bg-bg-surface border border-border-default flex items-center justify-center shrink-0 shadow-sm">
            <SettingsIcon className="w-6 h-6 text-text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Settings Hub</h1>
            <p className="text-sm text-text-secondary mt-1">
              Configure your reporting, client parameters, and automation workflows.
            </p>
          </div>
        </div>
        
        
        <div className="space-y-10">
          {categories.map((category, idx) => (
            <div key={idx}>
              <div className="mb-4">
                <h2 className="text-base font-semibold text-text-primary">{category.title}</h2>
                <p className="text-[13px] text-text-secondary mt-1">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIdx) => (
                  <button 
                    key={itemIdx}
                    onClick={() => onNavigate(item.path as Page)}
                    className="flex flex-col text-left p-5 bg-bg-surface border border-border-default hover:border-brand-500 hover:shadow-md rounded-xl transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <div className="flex items-center justify-between mb-4 w-full">
                      <div className="w-10 h-10 rounded bg-brand-50 border border-brand-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-bg-page border border-border-default flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-sm font-semibold text-text-primary group-hover:text-brand-600 transition-colors">{item.label}</h3>
                        {item.badge && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-success-bg text-success-text border border-success-text/20 whitespace-nowrap">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[12.5px] text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
