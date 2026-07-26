import { Settings as SettingsIcon, BarChart2, SlidersHorizontal, Wand2, ArrowRight, Users, FolderGit2, FileBox, LayoutTemplate, Library, Database, Files, Network } from 'lucide-react';
import { Page } from '../types';

export default function Settings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const categories = [
    {
      title: 'Configuration',
      description: 'Create and manage Projects, Request Types, Forms, Fields, Datasets, and Form Rules entirely through the UI.',
      items: [
        { 
          icon: FolderGit2,
          label: 'Projects', 
          description: 'Manage projects and their configurations.', 
          path: 'config_projects',
          iconColor: 'text-text-primary'
        },
        { 
          icon: FileBox, 
          label: 'Request Types', 
          description: 'Define and manage request types and categories.', 
          path: 'config_request_types',
          iconColor: 'text-text-primary'
        },
        { 
          icon: LayoutTemplate, 
          label: 'Form Builder', 
          description: 'Design dynamic request forms with visual drag-and-drop builder.', 
          path: 'config_form_builder',
          iconColor: 'text-text-primary'
        },
        { 
          icon: Library, 
          label: 'Field Library', 
          description: 'Manage reusable global form fields and their properties.', 
          path: 'config_field_library',
          iconColor: 'text-text-primary'
        },
        { 
          icon: Database, 
          label: 'Data Sources', 
          description: 'Create reusable option lists and stores reusable values.', 
          path: 'config_datasets',
          iconColor: 'text-text-primary'
        },
        { 
          icon: Network, 
          label: 'Relationships', 
          description: 'Manage dependent dropdowns and configure visual mapping hierarchies.', 
          path: 'config_relationships',
          iconColor: 'text-text-primary'
        },
        { 
          icon: Files, 
          label: 'Form Templates', 
          description: 'Manage reusable form templates for quicker setups.', 
          path: 'config_form_templates',
          iconColor: 'text-text-primary'
        },
      ]
    },
    {
      title: 'Workspace & Configuration',
      description: 'Manage your core organization structure, clients, and branding.',
      items: [
        { 
          icon: SlidersHorizontal, 
          label: 'Client Configuration', 
          description: 'Configure tenant-level settings, branding, metadata, and client-specific parameters.', 
          path: 'client_configuration',
          iconColor: 'text-text-primary'
        },
        { 
          icon: Users, 
          label: 'Internal Users', 
          description: 'Manage internal users, reporting hierarchy, business units, roles, and permissions.', 
          path: 'internal_users',
          iconColor: 'text-text-primary'
        },
      ]
    },
    {
      title: 'Operations',
      description: 'Configure intelligent workflows and view operational analytics.',
      items: [
        { 
          icon: Wand2, 
          label: 'Workflow Automation', 
          description: 'Configure workflow rules, routing, SLA automation, assignment rules, and ticket lifecycle automation.', 
          path: 'workflows',
          iconColor: 'text-text-primary',
          badge: '12 Active Rules'
        },
        { 
          icon: BarChart2, 
          label: 'Reports', 
          description: 'View operational reports, dashboards, exports, and analytics.', 
          path: 'reports',
          iconColor: 'text-text-primary'
        },
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full h-full bg-bg-page">
      <div className="p-8 max-w-[1000px] mx-auto w-full">
        <div className="flex items-start gap-4 mb-10">
          <div className="w-12 h-12 rounded-lg bg-bg-surface border border-border-default flex items-center justify-center shrink-0 shadow-sm">
            <SettingsIcon className="w-6 h-6 text-text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Settings Hub</h1>
            <p className="text-sm text-text-secondary mt-1">
              Configure your reporting, client parameters, and automation workflows.
            </p>
          </div>
        </div>
                
        <div className="space-y-12">
          {categories.map((category, idx) => (
            <div key={idx}>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-text-primary tracking-tight">{category.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, itemIdx) => (
                  <button 
                    key={itemIdx}
                    onClick={() => onNavigate(item.path as Page)}
                    className="flex flex-col text-left p-6 bg-bg-surface border border-border-default hover:border-brand-500 hover:shadow-md rounded-xl transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 h-full"
                  >
                    <div className="flex items-center justify-between mb-4 w-full">
                      <div className="w-12 h-12 rounded-lg bg-brand-50 border border-brand-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-bg-page border border-border-default flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-bold text-text-primary group-hover:text-brand-600 transition-colors">{item.label}</h3>
                        {item.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-success-bg text-success-text border border-success-text/20 whitespace-nowrap uppercase tracking-wider shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed font-medium">
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
