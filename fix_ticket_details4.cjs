const fs = require('fs');

const content = `import { useState } from 'react';
import { 
  ChevronLeft, Send, Paperclip, MoreHorizontal, User, Clock, Link as LinkIcon, 
  Activity, CheckSquare, History, FileText, Image as ImageIcon, Download, 
  Lock, Mail, Phone, Building, Briefcase, Info, CheckCircle2, Shield, Globe
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

  const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL'>('EMAIL');

  const [emailTo, setEmailTo] = useState('sarah.connor@acmecorp.com');
  const [emailCc, setEmailCc] = useState('');
  const [emailBcc, setEmailBcc] = useState('');
  const [emailSubject, setEmailSubject] = useState('Re: Users unable to authenticate in APAC region');

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [ticketFields, setTicketFields] = useState([
    { id: 'f1', label: 'Project', type: 'select', value: 'Customer Support', options: ['Customer Support', 'IT Ops', 'HR'] },
    { id: 'f2', label: 'Request Type', type: 'select', value: 'Incident', options: ['Incident', 'Service Request', 'Question'] },
    { id: 'f3', label: 'Service Type', type: 'select', value: 'Authentication', options: ['Authentication', 'Billing', 'Access'] },
    { id: 'f4', label: 'Brand', type: 'text', value: 'Acme Corp' },
    { id: 'f5', label: 'Loyalty Program', type: 'select', value: 'Platinum', options: ['Platinum', 'Gold', 'Silver', 'None'] },
    { id: 'f6', label: 'Store / Store Code', type: 'text', value: 'Online (ONL-1)' },
    { id: 'f7', label: 'Affected Regions', type: 'textarea', value: 'APAC (Japan, Singapore)' },
  ]);

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isChangeProjectModalOpen, setIsChangeProjectModalOpen] = useState(false);
  const [isLinkTicketModalOpen, setIsLinkTicketModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);

  const messages = [
    { sender: 'System', type: 'system', content: 'Ticket SLA breached for First Response.', time: 'Oct 24, 09:45 AM', isCustomer: false },
    { sender: 'John Doe', type: 'internal', content: 'Checking the logs now. Looks like a DB connection pool issue in the apac-1 cluster.', time: 'Oct 24, 08:45 AM', isCustomer: false, role: 'Support Agent' },
    { sender: 'Jane Smith', type: 'public', content: \`Hi Sarah,\n\nWe are looking into the authentication issue affecting the APAC region. Our engineering team is currently investigating the gateway timeouts.\n\nWe will keep you updated.\`, time: 'Oct 24, 08:30 AM', isCustomer: false, role: 'Support Lead', emailDetails: { to: 'sarah.connor@acmecorp.com', cc: '', subject: 'Re: Users unable to authenticate in APAC region' } },
    { sender: 'Sarah Connor', type: 'customer', content: 'Thank you. Please let me know as soon as it is resolved, our users are completely blocked.', time: 'Oct 24, 08:35 AM', isCustomer: true, role: 'Customer', emailDetails: { to: 'support@flow.com', cc: '', subject: 'Re: Users unable to authenticate in APAC region' } },
  ];

  return (
    <div className="flex flex-col bg-bg-page min-h-screen pb-12">
      {/* 1. Sticky Ticket Header */}
      <div className="bg-bg-surface border-b border-border-default sticky top-0 z-30 px-6 py-4 shadow-sm flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('my_tickets')} className="text-text-secondary hover:bg-bg-surface-hover -ml-2 shrink-0 mt-0.5">
              <ChevronLeft size={20} />
            </Button>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <CopyId id="TKT-1088" type="ticket" className="text-sm font-bold text-text-primary" />
                <Badge variant="error" className="py-0.5 px-2 text-[10px] font-bold tracking-wide uppercase">SLA Breached</Badge>
                <div className="flex items-center gap-2 text-[12px] text-text-muted font-mono ml-1">
                  <button 
                    onClick={() => setTicketSource(s => s === 'EMAIL' ? 'PORTAL' : 'EMAIL')}
                    className="flex items-center gap-1.5 hover:text-text-primary transition-colors cursor-pointer bg-bg-surface-hover px-2 py-0.5 rounded font-medium border border-border-default"
                    title="Click to toggle ticket source mode for testing"
                  >
                    {ticketSource === 'EMAIL' ? <Mail size={12}/> : <Globe size={12}/>} 
                    {ticketSource}
                  </button>
                  <span>•</span>
                  <span>Acme Corp</span>
                  <span>•</span>
                  <span>Created: Oct 24, 08:00 AM</span>
                  <span>•</span>
                  <span>Age: 2h 45m</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-text-primary leading-tight mt-0.5">Users unable to authenticate in APAC region</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="outline" size="sm" icon={MoreHorizontal} className="h-8 font-semibold">Actions</Button>
          </div>
        </div>

        {/* Quick editable attributes in header */}
        <div className="flex flex-wrap items-center gap-6 pl-11">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</span>
            <SingleSearchDropdown 
              options={['Open', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed']} 
              value={status} 
              onChange={setStatus} 
              className="px-2 py-1 bg-transparent border-none hover:bg-bg-surface-hover rounded text-sm font-bold text-text-primary h-7 min-w-[120px] cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Priority</span>
            <SingleSearchDropdown 
              options={['Low', 'Medium', 'High', 'Critical']} 
              value={priority} 
              onChange={setPriority} 
              className="px-2 py-1 bg-transparent border-none hover:bg-bg-surface-hover rounded text-sm font-bold text-text-primary h-7 min-w-[100px] cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Assignee</span>
            <SingleSearchDropdown 
              options={['Unassigned', 'John Doe', 'Jane Smith', 'System']} 
              value={assignee} 
              onChange={setAssignee} 
              className="px-2 py-1 bg-transparent border-none hover:bg-bg-surface-hover rounded text-sm font-bold text-text-primary h-7 min-w-[140px] cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto w-full flex flex-col gap-6">
        
        {/* 2. Customer & Ticket Details */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Customer Snapshot (30%) */}
          <div className="lg:w-[30%] card-base p-0 overflow-hidden flex flex-col shadow-sm h-fit">
             <div className="px-5 py-4 bg-bg-surface border-b border-border-default flex items-center gap-2">
               <User size={16} className="text-text-secondary"/>
               <h3 className="font-bold text-sm text-text-primary">Customer</h3>
             </div>
             <div className="p-5 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg shadow-sm">SC</div>
                  <div className="min-w-0">
                    <div className="font-bold text-text-primary text-base truncate">Sarah Connor</div>
                    <div className="text-[13px] text-text-secondary truncate">sarah.connor@acmecorp.com</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-y-3.5 mt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={14} className="text-text-muted shrink-0"/>
                    <span className="text-text-primary font-semibold">+1 555-0198</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building size={14} className="text-text-muted shrink-0"/>
                    <span className="text-text-secondary w-16 shrink-0 font-medium">Tenant:</span>
                    <span className="text-text-primary font-semibold truncate">Acme Corp</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase size={14} className="text-text-muted shrink-0"/>
                    <span className="text-text-secondary w-16 shrink-0 font-medium">BU:</span>
                    <span className="text-text-primary font-semibold truncate">IT Operations</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Ticket Details (70%) */}
          <div className="lg:w-[70%] card-base p-0 overflow-hidden flex flex-col shadow-sm transition-all h-fit">
            <div className="px-5 py-3 bg-bg-surface border-b border-border-default flex items-center justify-between">
               <h3 className="font-bold text-sm text-text-primary">Ticket Details</h3>
               {isEditingDetails ? (
                 <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(false)} className="text-text-secondary hover:text-text-primary h-8 text-xs font-bold">Cancel</Button>
                   <Button variant="primary" size="sm" onClick={() => setIsEditingDetails(false)} className="h-8 text-xs px-4 font-bold">Save Changes</Button>
                 </div>
               ) : (
                 <Button variant="ghost" size="sm" onClick={() => setIsEditingDetails(true)} className="text-brand-500 hover:text-brand-600 hover:bg-brand-50/50 h-8 text-xs font-bold px-3">Edit Ticket</Button>
               )}
             </div>
             
             <div className="p-6 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  {ticketFields.map(field => (
                    <div key={field.id} className={field.type === 'textarea' ? 'col-span-1 md:col-span-2' : ''}>
                      <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">{field.label}</div>
                      {isEditingDetails ? (
                        field.type === 'select' ? (
                          <SingleSearchDropdown 
                            options={field.options || []} 
                            value={field.value} 
                            onChange={(val) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: val } : f))} 
                            className="h-9 text-sm w-full input-base border border-border-default bg-bg-page focus-within:border-border-focus font-medium" 
                          />
                        ) : field.type === 'textarea' ? (
                          <textarea 
                            className="input-base w-full h-20 text-sm border-border-default focus:border-border-focus p-2.5 resize-none font-medium" 
                            value={field.value} 
                            onChange={(e) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: e.target.value } : f))} 
                          />
                        ) : (
                          <input 
                            type="text" 
                            className="input-base w-full h-9 text-sm border-border-default focus:border-border-focus px-3 font-medium" 
                            value={field.value} 
                            onChange={(e) => setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: e.target.value } : f))} 
                          />
                        )
                      ) : (
                        <div className="text-[13px] font-semibold text-text-primary break-words leading-relaxed bg-bg-surface px-3 py-2 rounded-md border border-border-default">
                          {field.value || '-'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* 3. Original Request */}
        <div className="card-base p-0 bg-bg-surface border border-border-default shadow-sm relative overflow-hidden mt-2">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
          <div className="p-5 flex items-start justify-between border-b border-border-subtle bg-bg-page">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded bg-brand-100 text-brand-700 flex items-center justify-center font-bold shadow-sm shrink-0">SC</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-text-primary text-base flex items-center gap-2">
                    Sarah Connor
                    <Badge variant="neutral" className="bg-bg-surface border border-border-default text-[10px] py-0.5 px-2 font-bold uppercase tracking-wider shadow-sm">Original Request</Badge>
                  </div>
                  <div className="text-[11px] text-text-muted font-mono flex items-center gap-2">
                    Oct 24, 08:00 AM UTC
                  </div>
                </div>
                {ticketSource === 'EMAIL' ? (
                  <div className="mt-3 text-[12px] text-text-secondary flex flex-col gap-1 border border-border-subtle bg-bg-surface p-2.5 rounded-md shadow-sm">
                    <div className="flex items-center gap-2"><span className="w-12 font-bold text-text-muted">From:</span><span className="text-text-primary font-medium">sarah.connor@acmecorp.com</span></div>
                    <div className="flex items-center gap-2"><span className="w-12 font-bold text-text-muted">To:</span><span className="text-text-primary font-medium">support@flow.com</span></div>
                    <div className="flex items-center gap-2"><span className="w-12 font-bold text-text-muted">Subject:</span><span className="font-bold text-text-primary">Users unable to authenticate in APAC region</span></div>
                  </div>
                ) : (
                  <div className="mt-1 text-[11px] text-text-muted flex items-center gap-2 font-semibold">
                    via {ticketSource === 'PORTAL' ? 'Customer Portal' : 'API'}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap font-medium">
              Users from the APAC region (specifically Japan and Singapore) are reporting timeouts when attempting to log in via SSO. The error logs show 500 Internal Server Errors originating from the Auth Gateway. Started around 08:00 AM UTC. Please help ASAP.
            </div>
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-bg-page px-3 py-1.5 rounded-md border border-border-default text-[11px] font-bold text-text-secondary cursor-pointer hover:border-border-strong transition-colors shadow-sm">
                <Paperclip size={14} className="text-text-muted" /> apac_auth_errors.log <span className="text-text-muted font-mono ml-1 font-normal">142 KB</span>
              </div>
              <div className="flex items-center gap-2 bg-bg-page px-3 py-1.5 rounded-md border border-border-default text-[11px] font-bold text-text-secondary cursor-pointer hover:border-border-strong transition-colors shadow-sm">
                <ImageIcon size={14} className="text-text-muted" /> timeout_screenshot.png <span className="text-text-muted font-mono ml-1 font-normal">1.2 MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Conversation Workspace */}
        <div className="flex flex-col gap-5 mt-2">
          {messages.map((msg, i) => {
            const isCustomer = msg.type === 'customer';
            const isInternal = msg.type === 'internal';
            const isSystem = msg.type === 'system';
            
            return (
              <div key={i} className={\`card-base p-5 shadow-sm border transition-colors
                \${isCustomer ? 'bg-bg-surface border-border-default' : 
                  isInternal ? 'bg-[#fffdf7] dark:bg-warning-bg/10 border-warning-text/30' : 
                  isSystem ? 'bg-bg-page border-border-subtle border-dashed shadow-none' : 
                  'bg-brand-50/20 border-brand-500/30'}\`}>
                  
                  <div className="flex items-start gap-3">
                     <div className={\`flex items-center justify-center w-8 h-8 rounded shrink-0 shadow-sm
                        \${isCustomer ? 'bg-bg-page text-text-secondary border border-border-default' : 
                          isInternal ? 'bg-warning-text text-white' : 
                          isSystem ? 'bg-bg-surface-hover text-text-secondary' : 
                          'bg-brand-500 text-white'}\`}>
                        {isCustomer ? <User size={14} /> : isInternal ? <Lock size={14}/> : isSystem ? <Info size={14}/> : <Shield size={14}/>}
                     </div>

                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                              <span className={\`font-bold text-[13px] \${isSystem ? 'text-text-secondary' : 'text-text-primary'}\`}>{msg.sender}</span>
                              {msg.role && <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">{msg.role}</span>}
                              {isInternal && <Badge variant="warning" className="py-0.5 px-2 text-[9px] font-bold uppercase tracking-wider shadow-sm border border-warning-text/20">Internal Note</Badge>}
                              {!isInternal && !isCustomer && !isSystem && <Badge variant="neutral" className="bg-brand-100 text-brand-700 border border-brand-500/20 py-0.5 px-2 text-[9px] font-bold uppercase tracking-wider shadow-sm">Public Reply</Badge>}
                          </div>
                          <span className="text-[11px] text-text-muted font-mono">{msg.time}</span>
                        </div>
                        
                        {ticketSource === 'EMAIL' && !isInternal && !isSystem && msg.emailDetails && (
                          <div className="mt-3 mb-2 p-2.5 rounded-md text-[12px] text-text-secondary flex flex-col gap-1 border border-border-subtle bg-bg-page shadow-sm">
                            <div className="flex items-start gap-2"><span className="w-12 font-bold text-text-muted shrink-0">To:</span><span className="truncate font-medium">{msg.emailDetails.to}</span></div>
                            {msg.emailDetails.cc && <div className="flex items-start gap-2"><span className="w-12 font-bold text-text-muted shrink-0">CC:</span><span className="truncate font-medium">{msg.emailDetails.cc}</span></div>}
                            <div className="flex items-start gap-2"><span className="w-12 font-bold text-text-muted shrink-0">Subject:</span><span className="font-bold text-text-primary truncate">{msg.emailDetails.subject}</span></div>
                          </div>
                        )}
                        
                        <div className={\`text-[13px] leading-relaxed whitespace-pre-wrap mt-3 font-medium \${isSystem ? 'text-text-muted italic' : 'text-text-primary'}\`}>
                          {msg.content}
                        </div>
                     </div>
                  </div>
              </div>
            );
          })}
        </div>

        {/* 5. Reply Composer */}
        <div className="card-base p-0 shadow-md border-border-strong overflow-hidden mt-4">
          <div className="flex border-b border-border-default bg-bg-surface relative">
            <button 
              onClick={() => setActiveTab('reply')}
              className={\`flex-1 py-3.5 text-sm font-bold transition-colors relative z-10 \${activeTab === 'reply' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}\`}
            >
              Reply to Customer
            </button>
            <div className="w-px bg-border-default"></div>
            <button 
              onClick={() => setActiveTab('internal')}
              className={\`flex-1 py-3.5 text-sm font-bold transition-colors relative z-10 flex items-center justify-center gap-2 \${activeTab === 'internal' ? 'text-warning-text bg-warning-bg/30' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}\`}
            >
              <Lock size={14} /> Internal Note
            </button>
            <div 
              className={\`absolute bottom-0 h-[3px] transition-all duration-300 ease-out z-20 \${activeTab === 'reply' ? 'bg-brand-500 left-0 w-1/2' : 'bg-warning-text left-1/2 w-1/2'}\`}
            ></div>
          </div>
          
          {ticketSource === 'EMAIL' && activeTab === 'reply' && (
            <div className="flex flex-col border-b border-border-default bg-bg-page px-5 py-3 gap-1.5 shadow-inner">
              <div className="flex items-center gap-3 text-[13px] py-1 border-b border-border-subtle">
                 <span className="text-text-muted w-14 shrink-0 font-bold uppercase tracking-wider text-[10px]">To</span>
                 <input type="text" className="flex-1 bg-transparent focus:outline-none text-text-primary font-semibold" value={emailTo} onChange={e => setEmailTo(e.target.value)} />
              </div>
              <div className="flex items-center gap-3 text-[13px] py-1 border-b border-border-subtle">
                 <span className="text-text-muted w-14 shrink-0 font-bold uppercase tracking-wider text-[10px]">Cc</span>
                 <input type="text" className="flex-1 bg-transparent focus:outline-none text-text-primary font-semibold" value={emailCc} onChange={e => setEmailCc(e.target.value)} placeholder="Add CC..." />
              </div>
              <div className="flex items-center gap-3 text-[13px] py-1 border-b border-border-subtle">
                 <span className="text-text-muted w-14 shrink-0 font-bold uppercase tracking-wider text-[10px]">Bcc</span>
                 <input type="text" className="flex-1 bg-transparent focus:outline-none text-text-primary font-semibold" value={emailBcc} onChange={e => setEmailBcc(e.target.value)} placeholder="Add BCC..." />
              </div>
              <div className="flex items-center gap-3 text-[13px] py-1">
                 <span className="text-text-muted w-14 shrink-0 font-bold uppercase tracking-wider text-[10px]">Subject</span>
                 <input type="text" className="flex-1 bg-transparent focus:outline-none text-text-primary font-bold" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
              </div>
            </div>
          )}
          
          <div className={\`p-4 transition-colors duration-300 \${activeTab === 'internal' ? 'bg-warning-bg/10' : 'bg-bg-surface'}\`}>
            <RichTextEditor 
              content={replyContent} 
              onChange={setReplyContent} 
              placeholder={activeTab === 'internal' ? 'Write an internal note (only visible to agents)...' : ticketSource === 'EMAIL' ? 'Write your email reply...' : 'Type your reply to Sarah Connor...'}
              className={activeTab === 'internal' ? 'bg-[#fffdf7] dark:bg-warning-bg/20 border-warning-text/30 focus-within:border-warning-text focus-within:ring-1 focus-within:ring-warning-text shadow-sm' : 'bg-bg-page border-border-default focus-within:border-border-focus focus-within:ring-1 focus-within:ring-border-focus shadow-sm'}
              minHeight="min-h-[240px]"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={Paperclip} className="text-text-secondary h-9 font-bold bg-bg-surface shadow-sm">
                  Attach Files
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="md" className="font-bold">
                  Discard
                </Button>
                <Button 
                  variant="primary" 
                  size="md" 
                  className={activeTab === 'internal' ? 'bg-warning-text hover:bg-warning-text/90 focus-visible:ring-warning-text border-transparent text-white font-bold shadow-sm' : 'font-bold shadow-sm'}
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
                className={\`flex items-center gap-2 px-6 py-3.5 text-sm font-bold transition-colors whitespace-nowrap border-b-2 \${
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
                 <h4 className="text-sm font-bold text-text-primary">Master Attachment Repository</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    <div className="flex items-center justify-between p-3 bg-bg-surface border border-border-default rounded-md group hover:border-border-strong transition-colors cursor-pointer shadow-sm">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded bg-bg-page border border-border-default flex items-center justify-center text-text-secondary shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-sm font-bold text-text-primary truncate">apac_auth_errors.log</span>
                          <span className="text-[11px] text-text-muted font-mono">142 KB • Original Request</span>
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
                          <span className="text-sm font-bold text-text-primary truncate">timeout_screenshot.png</span>
                          <span className="text-[11px] text-text-muted font-mono">1.2 MB • Original Request</span>
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
                      <span className="text-sm font-bold text-text-primary">First Response Time</span>
                      <Badge variant="error" className="font-bold tracking-wider">Breached</Badge>
                    </div>
                    <div className="w-full h-2.5 bg-error-text/20 rounded-full overflow-hidden">
                      <div className="h-full bg-error-text" style={{ width: '100%' }}></div>
                    </div>
                    <div className="text-[11px] text-text-muted text-right font-mono font-medium">-15m overdue</div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-text-primary">Resolution Time</span>
                      <span className="text-sm font-mono font-bold text-warning-text">1h 45m remaining</span>
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
                   <h4 className="text-sm font-bold text-text-primary">Linked Tickets</h4>
                   <Button variant="outline" size="sm" icon={LinkIcon} onClick={() => setIsLinkTicketModalOpen(true)} className="font-bold">Link Ticket</Button>
                 </div>
                 <div className="bg-bg-surface border border-border-default rounded-md p-4 flex items-center justify-between group hover:border-border-strong cursor-pointer shadow-sm max-w-3xl mt-2">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[13px] text-brand-500 group-hover:underline">INC-1092</span>
                        <Badge variant="success" className="font-bold tracking-wider">Resolved</Badge>
                      </div>
                      <span className="text-sm text-text-secondary font-medium">Users reporting timeouts during login</span>
                    </div>
                    <Button variant="ghost" size="sm" className="font-bold">View</Button>                 </div>
               </div>
             )}

             {(activeBottomTab === 'tasks' || activeBottomTab === 'activity' || activeBottomTab === 'history') && (
               <div className="flex items-center justify-center h-32 text-text-muted text-sm">
                 <div className="flex flex-col items-center gap-2">
                    <Activity size={24} className="opacity-50"/>
                    <span className="font-medium">No items to display in this view yet.</span>
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
