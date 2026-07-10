const fs = require('fs');

const content = `import { useState } from 'react';
import { 
  ChevronLeft, Send, Paperclip, MoreHorizontal, User, Clock, Link as LinkIcon, 
  Activity, CheckSquare, History, FileText, Image as ImageIcon, Download, 
  Lock, Mail, Phone, Building, Briefcase, Info, CheckCircle2, Shield
} from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SingleSearchDropdown } from '../components/ui/SingleSearchDropdown';
import { CopyId } from '../components/ui/CopyId';
import { RichTextEditor } from '../components/ui/RichTextEditor';

// Mock modals
const TicketHistoryModal = ({ onClose }: any) => null;
const ChangeProjectModal = ({ onClose }: any) => null;
const LinkTicketModal = ({ onClose }: any) => null;
const ReassignModal = ({ onClose }: any) => null;

export default function TicketDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState<'reply' | 'internal'>('reply');
  const [activeBottomTab, setActiveBottomTab] = useState<'activity' | 'sla' | 'tasks' | 'linked' | 'history' | 'attachments'>('attachments');
  const [replyContent, setReplyContent] = useState('');
  
  const [status, setStatus] = useState('Open');
  const [priority, setPriority] = useState('Critical');
  const [assignee, setAssignee] = useState('John Doe');

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    project: 'Customer Support',
    requestType: 'Incident',
    serviceType: 'Authentication',
    brand: 'Acme Corp',
    loyaltyProgram: 'Platinum',
    storeCode: 'Online (ONL-1)',
    affectedRegions: 'APAC (Japan, Singapore)',
  });

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isChangeProjectModalOpen, setIsChangeProjectModalOpen] = useState(false);
  const [isLinkTicketModalOpen, setIsLinkTicketModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);

  const messages = [
    { sender: 'System', type: 'system', content: 'Ticket SLA breached for First Response.', time: 'Oct 24, 09:45 AM', isCustomer: false },
    { sender: 'John Doe', type: 'internal', content: 'Checking the logs now. Looks like a DB connection pool issue in the apac-1 cluster.', time: 'Oct 24, 08:45 AM', isCustomer: false, role: 'Support Agent' },
    { sender: 'Jane Smith', type: 'public', content: 'Hi Sarah,\n\nWe are looking into the authentication issue affecting the APAC region. Our engineering team is currently investigating the gateway timeouts.\n\nWe will keep you updated.', time: 'Oct 24, 08:30 AM', isCustomer: false, role: 'Support Lead' },
    { sender: 'Sarah Connor', type: 'customer', content: 'Thank you. Please let me know as soon as it is resolved, our users are completely blocked.', time: 'Oct 24, 08:35 AM', isCustomer: true, role: 'Customer' },
  ];

  return (
    <div className="flex flex-col bg-bg-page min-h-screen pb-12">
      {/* 1. Sticky Ticket Header */}
      <div className="bg-bg-surface border-b border-border-default sticky top-0 z-30 px-6 py-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('my_tickets')} className="text-text-secondary hover:bg-bg-surface-hover -ml-2 shrink-0 mt-0.5">
              <ChevronLeft size={20} />
            </Button>
            <div className="w-px h-6 bg-border-default hidden sm:block mt-1"></div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <CopyId id="TKT-1088" type="ticket" className="text-sm font-semibold text-text-primary" />
                <Badge variant="error" className="py-0.5 text-[10px]">SLA Breached</Badge>
                <div className="flex items-center gap-2 text-[11px] text-text-muted font-mono ml-2">
                  <span className="flex items-center gap-1"><Mail size={12}/> Email</span>
                  <span>•</span>
                  <span>Acme Corp</span>
                  <span>•</span>
                  <span>Created: Oct 24, 08:00 AM</span>
                  <span>•</span>
                  <span>Age: 2h 45m</span>
                </div>
              </div>
              <h1 className="text-lg font-bold text-text-primary leading-tight">Users unable to authenticate in APAC region</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="outline" size="sm" icon={MoreHorizontal} className="h-8">Actions</Button>
            <Button variant="primary" size="sm" className="h-8">Update Ticket</Button>
          </div>
        </div>

        {/* Quick editable attributes in header */}
        <div className="flex flex-wrap items-center gap-4 pl-12">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</span>
            <SingleSearchDropdown 
              options={['Open', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed']} 
              value={status} 
              onChange={setStatus} 
              className="px-3 py-1.5 bg-bg-page border border-border-default rounded text-sm font-semibold text-text-primary h-8 min-w-[140px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Priority</span>
            <SingleSearchDropdown 
              options={['Low', 'Medium', 'High', 'Critical']} 
              value={priority} 
              onChange={setPriority} 
              className="px-3 py-1.5 bg-bg-page border border-border-default rounded text-sm font-semibold text-text-primary h-8 min-w-[120px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Assignee</span>
            <SingleSearchDropdown 
              options={['Unassigned', 'John Doe', 'Jane Smith', 'System']} 
              value={assignee} 
              onChange={setAssignee} 
              className="px-3 py-1.5 bg-bg-page border border-border-default rounded text-sm font-semibold text-text-primary h-8 min-w-[160px]"
            />
          </div>
          <div className="flex items-center gap-2">
             <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Owner</span>
             <span className="text-sm font-medium text-text-primary bg-bg-surface-hover px-2 py-1 rounded border border-border-default h-8 flex items-center">Jane Smith</span>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
        
        {/* 2. Customer & Ticket Details */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Customer Snapshot (30%) */}
          <div className="lg:w-[30%] card-base p-0 overflow-hidden flex flex-col shadow-sm">
             <div className="px-4 py-3 bg-bg-surface border-b border-border-default flex items-center gap-2">
               <User size={16} className="text-text-secondary"/>
               <h3 className="font-semibold text-sm text-text-primary">Customer Snapshot</h3>
             </div>
             <div className="p-5 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg">SC</div>
                  <div>
                    <div className="font-semibold text-text-primary text-base">Sarah Connor</div>
                    <div className="text-sm text-text-secondary">sarah.connor@acmecorp.com</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-y-3 mt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={14} className="text-text-muted shrink-0"/>
                    <span className="text-text-primary font-medium">+1 555-0198</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building size={14} className="text-text-muted shrink-0"/>
                    <span className="text-text-secondary w-20 shrink-0">Tenant:</span>
                    <span className="text-text-primary font-medium truncate">Acme Corp</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase size={14} className="text-text-muted shrink-0"/>
                    <span className="text-text-secondary w-20 shrink-0">Project:</span>
                    <span className="text-text-primary font-medium truncate">Customer Support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Activity size={14} className="text-text-muted shrink-0"/>
                    <span className="text-text-secondary w-20 shrink-0">BU:</span>
                    <span className="text-text-primary font-medium truncate">IT Operations</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Ticket Details (70%) */}
          <div className="lg:w-[70%] card-base p-0 overflow-hidden flex flex-col shadow-sm transition-all">
            <div className="px-4 py-3 bg-bg-surface border-b border-border-default flex items-center justify-between">
               <h3 className="font-semibold text-sm text-text-primary">Ticket Details</h3>
               {isEditingDetails ? (
                 <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(false)} className="text-text-secondary hover:text-text-primary h-7 text-xs">Cancel</Button>
                   <Button variant="primary" size="sm" onClick={() => setIsEditingDetails(false)} className="h-7 text-xs px-3">Save Changes</Button>
                 </div>
               ) : (
                 <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(true)} className="text-text-muted hover:text-text-primary h-7 text-xs">Edit Ticket</Button>
               )}
             </div>
             
             <div className="p-5 flex flex-col gap-6">
                {/* Classification */}
                <div>
                  <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3 border-b border-border-subtle pb-1">Classification</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                    <div>
                      <div className="text-xs font-medium text-text-secondary mb-1">Project</div>
                      {isEditingDetails ? (
                        <SingleSearchDropdown options={['Customer Support', 'IT Ops', 'HR']} value={ticketDetails.project} onChange={(v) => setTicketDetails({...ticketDetails, project: v})} className="h-8 text-sm w-full input-base py-0 border border-border-default bg-bg-page focus-within:border-border-focus" />
                      ) : (
                        <div className="text-sm font-medium text-text-primary">{ticketDetails.project}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-text-secondary mb-1">Request Type</div>
                      {isEditingDetails ? (
                        <SingleSearchDropdown options={['Incident', 'Service Request', 'Question']} value={ticketDetails.requestType} onChange={(v) => setTicketDetails({...ticketDetails, requestType: v})} className="h-8 text-sm w-full input-base py-0 border border-border-default bg-bg-page focus-within:border-border-focus" />
                      ) : (
                        <div className="text-sm font-medium text-text-primary">{ticketDetails.requestType}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-text-secondary mb-1">Service Type</div>
                      {isEditingDetails ? (
                        <SingleSearchDropdown options={['Authentication', 'Billing', 'Access']} value={ticketDetails.serviceType} onChange={(v) => setTicketDetails({...ticketDetails, serviceType: v})} className="h-8 text-sm w-full input-base py-0 border border-border-default bg-bg-page focus-within:border-border-focus" />
                      ) : (
                        <div className="text-sm font-medium text-text-primary">{ticketDetails.serviceType}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3 border-b border-border-subtle pb-1">Customer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                    <div>
                      <div className="text-xs font-medium text-text-secondary mb-1">Brand</div>
                      {isEditingDetails ? (
                        <input type="text" className="input-base w-full h-8 text-sm border-border-default focus:border-border-focus px-2 py-0" value={ticketDetails.brand} onChange={(e) => setTicketDetails({...ticketDetails, brand: e.target.value})} />
                      ) : (
                        <div className="text-sm font-medium text-text-primary">{ticketDetails.brand}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-text-secondary mb-1">Loyalty Program</div>
                      {isEditingDetails ? (
                        <SingleSearchDropdown options={['Platinum', 'Gold', 'Silver', 'None']} value={ticketDetails.loyaltyProgram} onChange={(v) => setTicketDetails({...ticketDetails, loyaltyProgram: v})} className="h-8 text-sm w-full input-base py-0 border border-border-default bg-bg-page focus-within:border-border-focus" />
                      ) : (
                        <div className="text-sm font-medium text-text-primary">{ticketDetails.loyaltyProgram}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-text-secondary mb-1">Store / Store Code</div>
                      {isEditingDetails ? (
                        <input type="text" className="input-base w-full h-8 text-sm border-border-default focus:border-border-focus px-2 py-0" value={ticketDetails.storeCode} onChange={(e) => setTicketDetails({...ticketDetails, storeCode: e.target.value})} />
                      ) : (
                        <div className="text-sm font-medium text-text-primary">{ticketDetails.storeCode}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Custom Fields */}
                <div>
                  <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3 border-b border-border-subtle pb-1">Custom Fields</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                    <div className="col-span-2 md:col-span-3">
                      <div className="text-xs font-medium text-text-secondary mb-1">Affected Regions</div>
                      {isEditingDetails ? (
                        <input type="text" className="input-base w-full h-8 text-sm border-border-default focus:border-border-focus px-2 py-0" value={ticketDetails.affectedRegions} onChange={(e) => setTicketDetails({...ticketDetails, affectedRegions: e.target.value})} />
                      ) : (
                        <div className="text-sm font-medium text-text-primary bg-bg-surface-hover inline-block px-2 py-1 rounded border border-border-default">{ticketDetails.affectedRegions}</div>
                      )}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* 3. Original Request */}
        <div className="card-base p-6 bg-brand-50/30 border border-brand-500/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-500"></div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold shadow-sm">SC</div>
              <div>
                <div className="font-bold text-text-primary flex items-center gap-2">
                  Sarah Connor
                  <Badge variant="neutral" className="bg-bg-surface border border-border-default text-[10px] py-0 shadow-sm font-medium">Original Request</Badge>
                </div>
                <div className="text-[11px] text-text-muted font-mono flex items-center gap-2 mt-0.5">
                  Oct 24, 08:00 AM UTC <span className="text-border-strong">•</span> via Email
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap ml-13 pl-1 mb-5 font-medium">
            Users from the APAC region (specifically Japan and Singapore) are reporting timeouts when attempting to log in via SSO. The error logs show 500 Internal Server Errors originating from the Auth Gateway. Started around 08:00 AM UTC. Please help ASAP.
          </div>
          <div className="ml-13 pl-1 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-bg-surface px-3 py-1.5 rounded-md border border-border-default text-xs font-medium text-text-secondary cursor-pointer hover:border-border-strong transition-colors shadow-sm">
              <Paperclip size={14} className="text-text-muted" /> apac_auth_errors.log <span className="text-text-muted font-mono ml-1">(142 KB)</span>
            </div>
            <div className="flex items-center gap-2 bg-bg-surface px-3 py-1.5 rounded-md border border-border-default text-xs font-medium text-text-secondary cursor-pointer hover:border-border-strong transition-colors shadow-sm">
              <ImageIcon size={14} className="text-text-muted" /> timeout_screenshot.png <span className="text-text-muted font-mono ml-1">(1.2 MB)</span>
            </div>
          </div>
        </div>

        {/* 4. Conversation Workspace */}
        <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-[1.2rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border-subtle mt-2">
          {messages.map((msg, i) => {
            const isCustomer = msg.type === 'customer';
            const isInternal = msg.type === 'internal';
            const isSystem = msg.type === 'system';
            
            return (
              <div key={i} className={\`relative flex items-start justify-between md:justify-normal \${isCustomer ? '' : 'md:flex-row-reverse group'} is-active\`}>
                {/* Timeline dot */}
                <div className={\`flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-page shrink-0 md:order-1 shadow-sm z-10 \${isCustomer ? 'md:group-even:-translate-x-1/2' : 'md:translate-x-1/2'}
                  \${isCustomer ? 'bg-bg-surface text-text-primary border-border-default' : 
                    isInternal ? 'bg-warning-bg text-warning-text' : 
                    isSystem ? 'bg-bg-surface-hover text-text-secondary' : 
                    'bg-brand-500 text-bg-surface'}\`}>
                  {isCustomer ? <User size={16} /> : isInternal ? <Lock size={16}/> : isSystem ? <Info size={16}/> : <Shield size={16}/>}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                  <div className={\`card-base p-5 shadow-sm border 
                    \${isCustomer ? 'bg-bg-surface border-border-default' : 
                      isInternal ? 'bg-[#fffdf7] border-warning-text/20 dark:bg-warning-bg/20' : 
                      isSystem ? 'bg-bg-page border-border-subtle border-dashed shadow-none p-3' : 
                      'bg-brand-50/10 border-brand-500/20'}\`}>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className={\`font-semibold text-sm \${isSystem ? 'text-text-secondary' : 'text-text-primary'}\`}>{msg.sender}</span>
                            {msg.role && <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">{msg.role}</span>}
                            {isInternal && <Badge variant="warning" className="py-0.5 text-[9px] font-bold uppercase tracking-wider">Internal Note</Badge>}
                        </div>
                        <span className="text-[10px] text-text-muted font-mono">{msg.time}</span>
                      </div>
                      
                      <p className={\`text-sm leading-relaxed whitespace-pre-wrap \${isSystem ? 'text-text-muted italic' : 'text-text-primary'}\`}>{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Reply Composer */}
        <div className="card-base p-0 shadow-md border-border-strong overflow-hidden mt-6">
          <div className="flex border-b border-border-default bg-bg-surface relative">
            <button 
              onClick={() => setActiveTab('reply')}
              className={\`flex-1 py-3 text-sm font-semibold transition-colors relative z-10 \${activeTab === 'reply' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}\`}
            >
              Reply to Customer
            </button>
            <div className="w-px bg-border-default"></div>
            <button 
              onClick={() => setActiveTab('internal')}
              className={\`flex-1 py-3 text-sm font-semibold transition-colors relative z-10 flex items-center justify-center gap-2 \${activeTab === 'internal' ? 'text-warning-text bg-warning-bg/30' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}\`}
            >
              <Lock size={14} /> Internal Note
            </button>
            <div 
              className={\`absolute bottom-0 h-[3px] transition-all duration-300 ease-out z-20 \${activeTab === 'reply' ? 'bg-brand-500 left-0 w-1/2' : 'bg-warning-text left-1/2 w-1/2'}\`}
            ></div>
          </div>
          
          <div className={\`p-4 transition-colors duration-300 \${activeTab === 'internal' ? 'bg-warning-bg/10' : 'bg-bg-surface'}\`}>
            <RichTextEditor 
              content={replyContent} 
              onChange={setReplyContent} 
              placeholder={activeTab === 'internal' ? 'Write an internal note (only visible to agents)...' : 'Type your reply to Sarah Connor...'}
              className={activeTab === 'internal' ? 'bg-[#fffdf7] dark:bg-warning-bg/20 border-warning-text/20 focus-within:border-warning-text focus-within:ring-1 focus-within:ring-warning-text' : 'bg-bg-page border-border-default focus-within:border-border-focus focus-within:ring-1 focus-within:ring-border-focus'}
              minHeight="min-h-[200px]"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={Paperclip} className="text-text-secondary h-9">
                  Attach Files
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="md">
                  Discard
                </Button>
                <Button 
                  variant="primary" 
                  size="md" 
                  className={activeTab === 'internal' ? 'bg-warning-text hover:bg-warning-text/90 focus-visible:ring-warning-text border-transparent text-white' : ''}
                  icon={Send}
                >
                  {activeTab === 'internal' ? 'Add Note' : 'Send Reply'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Bottom Utility Tabs */}
        <div className="card-base p-0 overflow-hidden mt-6 shadow-sm border border-border-default">
          <div className="flex border-b border-border-default bg-bg-surface overflow-x-auto custom-scrollbar">
            {[
              { id: 'attachments', label: 'Attachments (2)', icon: Paperclip },
              { id: 'sla', label: 'SLA', icon: Clock },
              { id: 'tasks', label: 'Tasks (0)', icon: CheckSquare },
              { id: 'linked', label: 'Linked Tickets (1)', icon: LinkIcon },
              { id: 'activity', label: 'Activity (18)', icon: Activity },
              { id: 'history', label: 'Audit History', icon: History },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveBottomTab(tab.id as any)}
                className={\`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap border-b-2 \${
                  activeBottomTab === tab.id 
                    ? 'border-brand-500 text-brand-500 bg-brand-50/50' 
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                }\`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-6 bg-bg-page min-h-[200px]">
             {activeBottomTab === 'attachments' && (
               <div className="flex flex-col gap-4">
                 <h4 className="text-sm font-semibold text-text-primary">Master Attachment Repository</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-bg-surface border border-border-default rounded-md group hover:border-border-strong transition-colors cursor-pointer shadow-sm">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded bg-bg-page border border-border-default flex items-center justify-center text-text-secondary shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-sm font-medium text-text-primary truncate">apac_auth_errors.log</span>
                          <span className="text-xs text-text-muted font-mono">142 KB • Original Request</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary shrink-0">
                        <Download size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-bg-surface border border-border-default rounded-md group hover:border-border-strong transition-colors cursor-pointer shadow-sm">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded bg-bg-page border border-border-default flex items-center justify-center text-text-secondary shrink-0">
                          <ImageIcon size={20} />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-sm font-medium text-text-primary truncate">timeout_screenshot.png</span>
                          <span className="text-xs text-text-muted font-mono">1.2 MB • Original Request</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary shrink-0">
                        <Download size={16} />
                      </Button>
                    </div>
                 </div>
               </div>
             )}
             
             {activeBottomTab === 'sla' && (
               <div className="flex flex-col gap-6 max-w-2xl">
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-text-primary">First Response Time</span>
                      <Badge variant="error">Breached</Badge>
                    </div>
                    <div className="w-full h-2.5 bg-error-text/20 rounded-full overflow-hidden">
                      <div className="h-full bg-error-text" style={{ width: '100%' }}></div>
                    </div>
                    <div className="text-xs text-text-muted text-right font-mono">-15m overdue</div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-text-primary">Resolution Time</span>
                      <span className="text-sm font-mono font-medium text-warning-text">1h 45m remaining</span>
                    </div>
                    <div className="w-full h-2.5 bg-border-default rounded-full overflow-hidden">
                      <div className="h-full bg-warning-text" style={{ width: '40%' }}></div>
                    </div>
                 </div>
               </div>
             )}

             {activeBottomTab === 'linked' && (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                   <h4 className="text-sm font-semibold text-text-primary">Linked Tickets</h4>
                   <Button variant="outline" size="sm" icon={LinkIcon} onClick={() => setIsLinkTicketModalOpen(true)}>Link Ticket</Button>
                 </div>
                 <div className="bg-bg-surface border border-border-default rounded-md p-4 flex items-center justify-between group hover:border-border-strong cursor-pointer shadow-sm max-w-3xl">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-semibold text-sm text-brand-500 group-hover:underline">INC-1092</span>
                        <Badge variant="success">Resolved</Badge>
                      </div>
                      <span className="text-sm text-text-secondary">Users reporting timeouts during login</span>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                 </div>
               </div>
             )}

             {(activeBottomTab === 'tasks' || activeBottomTab === 'activity' || activeBottomTab === 'history') && (
               <div className="flex items-center justify-center h-32 text-text-muted text-sm">
                 <div className="flex flex-col items-center gap-2">
                    <Activity size={24} className="opacity-50"/>
                    No items to display in this view yet.
                 </div>
               </div>
             )}
          </div>
        </div>

      </div>

      {isHistoryModalOpen && <TicketHistoryModal onClose={() => setIsHistoryModalOpen(false)} />}
      {isChangeProjectModalOpen && <ChangeProjectModal onClose={() => setIsChangeProjectModalOpen(false)} currentProject="Customer Support" />}
      {isLinkTicketModalOpen && <LinkTicketModal onClose={() => setIsLinkTicketModalOpen(false)} />}
      {isReassignModalOpen && <ReassignModal onClose={() => setIsReassignModalOpen(false)} currentAssignee={assignee} />}
    </div>
  );
}
`

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
