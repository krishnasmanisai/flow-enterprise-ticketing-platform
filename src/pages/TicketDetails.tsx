import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FolderOpen, ChevronLeft, Send, Paperclip, MoreHorizontal, User, Clock, Link as LinkIcon, 
  Activity, CheckSquare, History, FileText, Image as ImageIcon, Download, 
  Lock, Mail, Phone, Building, Briefcase, Info, CheckCircle2, Shield, Globe, Plus, ArrowUpRight } from 'lucide-react';
import { Page } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SingleSearchDropdown } from '../components/ui/SingleSearchDropdown';
import { CopyId } from '../components/ui/CopyId';
import { RichTextEditor } from '../components/ui/RichTextEditor';
import { LogTimeModal, TimeLogEntry } from '../components/ticket/LogTimeModal';
import { LinkTicketModal } from '../components/LinkTicketModal';
import { CreateTicketFlow } from './CreateTicketFlow';
import { CallAssistQuickActions } from '../components/ticket/CallAssistQuickActions';
import { Copy } from 'lucide-react';
import { CommentThread, CommentType } from '../components/comments/CommentThread';

// Mock modals
const TicketHistoryModal = ({ onClose }: any) => null;

const ReassignModal = ({ onClose }: any) => null;

export interface TicketDetailsProps {
  onNavigate: (page: Page) => void;
  ticketId?: string;
  embedded?: boolean;
}

export default function TicketDetails({ onNavigate, ticketId: propTicketId, embedded = false }: TicketDetailsProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ticketId = propTicketId || searchParams.get('id') || 'TKT-1088';
  const isDemoCall = ticketId === '10-07';
  
  const [activeTab, setActiveTab] = useState<'reply' | 'internal'>('reply');
  const [activeBottomTab, setActiveBottomTab] = useState<'activity' | 'sla' | 'tasks' | 'linked' | 'history' | 'attachments'>('attachments');
  const [replyContent, setReplyContent] = useState('');
  
  const [status, setStatus] = useState('Open');
  const userRole = 'edit'; // Mock user role
  const isCallCenterUser = true; // Assume true for demo
  
  const [priority, setPriority] = useState('Critical');
  const [assignee, setAssignee] = useState('John Doe');

  const isEmail = ticketId === 'TKT-1088' || ticketId === 'TKT-1070';
  const isTKT1024 = ticketId === 'TKT-1024';
  const isTKT1085 = ticketId === 'TKT-1085';
  const initialSource = isDemoCall ? 'CALL' : isEmail ? 'EMAIL' : 'PORTAL';
  const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL' | 'API' | 'CALL'>(initialSource as any);
  
  // Ticket Type: Internal or External
  const isInitialInternal = ticketId === 'TKT-1088' || ticketId === 'TKT-1070' || ticketId === 'TKT-1058' || ticketId === 'TKT-1051';
  const [ticketType, setTicketType] = useState<'internal' | 'external'>(isInitialInternal ? 'internal' : 'external');
  const [showTypeTooltip, setShowTypeTooltip] = useState(false);

  useEffect(() => {
    const isInt = ticketId === 'TKT-1088' || ticketId === 'TKT-1070' || ticketId === 'TKT-1058' || ticketId === 'TKT-1051';
    setTicketType(isInt ? 'internal' : 'external');
  }, [ticketId]);

  const customerName = isDemoCall ? 'Sarah Connor' : isTKT1024 ? 'Alex Morgan' : isTKT1085 ? 'Bob S.' : isEmail ? 'Alice B.' : 'Bob S.';
  const customerInitials = isDemoCall ? 'SC' : isTKT1024 ? 'AM' : isTKT1085 ? 'BS' : isEmail ? 'AB' : 'BS';
  const customerEmail = isDemoCall ? 'sarah.connor@acmecorp.com' : isTKT1024 ? 'alex.morgan@retailpay.io' : isTKT1085 ? 'bob.s@globex.com' : isEmail ? 'alice.b@acmecorp.com' : 'bob.s@globex.com';
  const customerCompany = isDemoCall ? 'Acme Corp' : isTKT1024 ? 'RetailPay Global' : isTKT1085 ? 'Globex' : isEmail ? 'Acme Corp' : 'Globex';
  const customerPhone = isDemoCall ? '+91 98765 43210' : isTKT1024 ? '+1 415-555-0133' : isTKT1085 ? '+1 555-9921' : isEmail ? '+1 555-0198' : '+1 555-9921';
  const customerBU = isDemoCall ? 'Retail' : isTKT1024 ? 'Payment Systems' : isTKT1085 ? 'DevOps' : isEmail ? 'IT Operations' : 'DevOps';
  
  const originalRequestTime = isDemoCall ? 'Aug 16, 10:31 AM UTC' : isTKT1024 ? 'Oct 24, 07:45 AM UTC' : isTKT1085 ? 'Oct 24, 08:15 AM UTC' : isEmail ? 'Oct 24, 08:00 AM UTC' : 'Oct 24, 08:15 AM UTC';
  const ticketCreatedDisplay = isDemoCall ? 'Aug 16, 10:31 AM' : isTKT1085 ? 'Oct 24, 08:15 AM' : isEmail ? 'Oct 24, 08:00 AM' : 'Oct 24, 08:15 AM';
  const ticketAgeDisplay = isDemoCall ? '1h 30m' : isTKT1085 ? '3h 30m' : '2h 45m';

  const originalRequestSubject = isDemoCall 
    ? 'Inbound Customer Call - Sarah Connor' 
    : isTKT1024 
    ? 'Payment gateway failing for premium users' 
    : isTKT1085
    ? 'Login API returning 500'
    : isEmail 
    ? 'Users unable to authenticate in APAC region' 
    : 'Login API returning 500';
  const originalRequestBody = isDemoCall
    ? 'Incoming call from +91 98765 43210. Customer needs assistance with loyalty points and recent coupons.'
    : isTKT1024
    ? 'High-priority alert: Multiple checkout failures reported on prod payment gateway. Customers on premium checkout flows are receiving 429 rate limit errors followed by 500 failures. This requires urgent infrastructure remediation.'
    : isTKT1085
    ? 'I am getting a 500 error every time I try to hit the /v2/login endpoint. It worked fine yesterday. See attached trace.'
    : isEmail 
    ? 'Users from the APAC region (specifically Japan and Singapore) are reporting timeouts when attempting to log in via SSO. The error logs show 500 Internal Server Errors originating from the Auth Gateway. Started around 08:00 AM UTC. Please help ASAP.'
    : 'I am getting a 500 error every time I try to hit the /v2/login endpoint. It worked fine yesterday. See attached trace.';

  
  useEffect(() => {
    setTicketSource(isDemoCall ? 'CALL' : isEmail ? 'EMAIL' : 'PORTAL');
  }, [ticketId, isDemoCall, isEmail]);
  
  const isCallAssistEligible = ticketSource === 'CALL' && isCallCenterUser;

  const [emailTo, setEmailTo] = useState(customerEmail);
  const [emailCc, setEmailCc] = useState('');
  const [emailBcc, setEmailBcc] = useState('');
  const [emailSubject, setEmailSubject] = useState(`Re: ${originalRequestSubject}`);

  const [ticketFields, setTicketFields] = useState([
    { id: 'f0', label: 'Ticket Type', type: 'select', value: isInitialInternal ? 'Internal' : 'External', options: ['Internal', 'External'] },
    { id: 'f1', label: 'Project', type: 'select', value: isEmail ? 'Internal IT' : 'Customer Support', options: ['Customer Support', 'IT Ops', 'Internal IT', 'HR', 'DevOps'] },
    { id: 'f2', label: 'Request Type', type: 'select', value: 'Incident', options: ['Incident', 'Service Request', 'Question'] },
    { id: 'f3', label: 'Service Type', type: 'select', value: 'Authentication', options: ['Authentication', 'Billing', 'Access'] },
    { id: 'f4', label: 'Brand', type: 'text', value: customerCompany },
    { id: 'f5', label: 'Loyalty Program', type: 'select', value: 'Platinum', options: ['Platinum', 'Gold', 'Silver', 'None'] },
    { id: 'f6', label: 'Store / Store Code', type: 'text', value: 'Online (ONL-1)' },
    { id: 'f7', label: 'Affected Regions', type: 'textarea', value: 'APAC (Japan, Singapore)' },
  ]);

  // Keep ticketFields synced with ticketType
  useEffect(() => {
    setTicketFields(prev => prev.map(f => f.id === 'f0' ? { ...f, value: ticketType === 'internal' ? 'Internal' : 'External' } : f));
  }, [ticketType]);

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isChangeProjectModalOpen, setIsChangeProjectModalOpen] = useState(false);
  const [isLinkTicketModalOpen, setIsLinkTicketModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isCloneTicketOpen, setIsCloneTicketOpen] = useState(false);

  const [isLogTimeModalOpen, setIsLogTimeModalOpen] = useState(false);
  const [timeLogEntries, setTimeLogEntries] = useState<TimeLogEntry[]>([]);
  const [showToast, setShowToast] = useState(false);

  const totalLoggedMinutes = timeLogEntries.reduce((acc, entry) => acc + entry.hours * 60 + entry.minutes, 0);
  const totalLoggedFormatted = `${Math.floor(totalLoggedMinutes / 60)}h ${totalLoggedMinutes % 60}m`;
  
  const handleAddLogEntry = (entry: Omit<TimeLogEntry, 'id' | 'date' | 'time'>) => {
    const newEntry: TimeLogEntry = {
      ...entry,
      id: Math.random().toString(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setTimeLogEntries(prev => [newEntry, ...prev]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogCallActivity = (activity: any) => {
    const newEntry: TimeLogEntry = {
      id: Math.random().toString(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      user: 'John Doe', // Current user
      hours: 0,
      minutes: 0,
      comment: `<div class="font-bold text-brand-600 mb-1">${activity.type}</div><div class="whitespace-pre-wrap">${activity.details}</div>`
    };
    setTimeLogEntries(prev => [newEntry, ...prev]);
    // Also add to generic ticket history or switch active tab to activity to show the user
    setActiveBottomTab('activity');
  };

  const [messages, setMessages] = useState<CommentType[]>(isEmail ? [
    { id: '1', sender: 'System', type: 'system', content: 'Ticket SLA breached for First Response.', time: 'Oct 24, 09:45 AM', parentId: null },
    { id: '2', sender: 'John Doe', type: 'internal', content: 'Checking the logs now. Looks like a DB connection pool issue in the apac-1 cluster.', time: 'Oct 24, 08:45 AM', role: 'Support Agent', parentId: null },
    { id: '3', sender: 'Jane Smith', type: 'public', content: `Hi ${customerName.split(' ')[0]},\n\nWe are looking into the authentication issue affecting the APAC region. Our engineering team is currently investigating the gateway timeouts.\n\nWe will keep you updated.`, time: 'Oct 24, 08:30 AM', role: 'Support Lead', emailDetails: { to: customerEmail, cc: '', subject: `Re: ${originalRequestSubject}` }, parentId: null },
    { id: '4', sender: customerName, type: 'customer', content: 'Thank you. Please let me know as soon as it is resolved, our users are completely blocked.', time: 'Oct 24, 08:35 AM', role: 'Customer', emailDetails: { to: 'support@flow.com', cc: '', subject: `Re: ${originalRequestSubject}` }, parentId: '3' },
  ] : [
    { id: '1', sender: 'Bob S.', type: 'customer', content: 'I am getting a 500 error every time I try to hit the /v2/login endpoint. It worked fine yesterday.', time: 'Oct 24, 08:15 AM', role: 'Customer', attachments: [{name: 'error_trace.log', size: '24 KB'}], parentId: null },
    { id: '2', sender: 'System', type: 'system', content: 'Ticket SLA assigned: Gold Tier SLA (4h resolution)', time: 'Oct 24, 08:16 AM', parentId: null },
    { id: '3', sender: 'System', type: 'internal', content: 'Auto-assigned to DevOps queue based on routing rules.', time: 'Oct 24, 08:18 AM', parentId: null },
    { id: '4', sender: 'Alice Agent', type: 'internal', content: 'Checked Datadog. Seeing spikes in latency. Might be related to the recent deploy.', time: 'Oct 24, 08:30 AM', role: 'DevOps', parentId: null },
    { id: '5', sender: 'Alice Agent', type: 'public', content: 'Hi Bob, we are looking into this right now. Our monitoring shows some elevated error rates on that endpoint. We expect a fix shortly.', time: 'Oct 24, 08:35 AM', role: 'DevOps', parentId: '1' },
    { id: '6', sender: 'Bob S.', type: 'customer', content: 'Thanks Alice! Also I noticed it mostly happens on the mobile app.', time: 'Oct 24, 08:40 AM', role: 'Customer', parentId: '1' },
    { id: '7', sender: 'Alice Agent', type: 'public', content: 'Got it, thanks for the additional detail. That helps us narrow it down.', time: 'Oct 24, 08:45 AM', role: 'DevOps', parentId: '1' }
  ]);

  return (
    <div className="flex flex-col bg-bg-page min-h-screen pb-12">
      {/* 1. Sticky Ticket Header */}
      <div className={`bg-bg-surface border-b border-border-default ${embedded ? 'static' : 'sticky top-0 z-30'} px-6 py-4 shadow-sm flex flex-col gap-4`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {!embedded && (
              <Button variant="ghost" size="icon" onClick={() => onNavigate('my_tickets')} className="text-text-secondary hover:bg-bg-surface-hover -ml-2 shrink-0 mt-0.5">
                <ChevronLeft size={20} />
              </Button>
            )}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <CopyId id={ticketId} type="ticket" className="text-sm font-bold text-text-primary" />
                <Badge variant="error" className="py-0.5 px-2 text-[10px] font-bold tracking-wide uppercase">SLA Breached</Badge>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-text-muted font-mono ml-1">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-surface border border-border-default text-text-primary text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {ticketSource === 'EMAIL' ? <Mail size={12}/> : <Globe size={12}/>} 
                    {ticketSource}
                  </div>
                  <span>•</span>
                  <span>{customerCompany}</span>
                  <span>•</span>
                  <span>Created: {ticketCreatedDisplay}</span>
                  <span>•</span>
                  <span>Age: {ticketAgeDisplay}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1.5 font-sans">
                    <span className="text-text-secondary font-medium text-[11px]">Ticket Type:</span>
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border shadow-2xs transition-colors ${
                        ticketType === 'internal'
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${ticketType === 'internal' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <span className="capitalize">{ticketType}</span>
                      
                      {/* 'i' icon with tooltip */}
                      <div 
                        className="relative group/typeinfo inline-flex items-center ml-0.5 cursor-help"
                        onMouseEnter={() => setShowTypeTooltip(true)}
                        onMouseLeave={() => setShowTypeTooltip(false)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTypeTooltip(prev => !prev);
                        }}
                      >
                        <button
                          type="button"
                          aria-label="Ticket visibility information"
                          className="p-0.5 rounded-full hover:bg-black/5 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors cursor-pointer"
                        >
                          <Info 
                            size={13} 
                            className={ticketType === 'internal' ? 'text-amber-700' : 'text-emerald-700'} 
                          />
                        </button>

                        {/* Tooltip */}
                        <div 
                          role="tooltip" 
                          className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 flex-col items-center pointer-events-none transition-all duration-150 ${
                            showTypeTooltip ? 'flex' : 'hidden group-hover/typeinfo:flex'
                          }`}
                        >
                          <div className="bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap leading-tight text-center">
                            {ticketType === 'internal' 
                              ? 'This ticket is only visible to internal users.' 
                              : 'This ticket will be visible to client users as well.'}
                          </div>
                          <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                        </div>
                      </div>
                    </span>
                  </div>
                  {totalLoggedMinutes > 0 && (
                    <>
                      <span>•</span>
                      <span className="font-bold text-brand-600">Logged: {totalLoggedFormatted}</span>
                    </>
                  )}
                </div>
              </div>
              <h1 className="text-xl font-bold text-text-primary leading-tight mt-0.5">{originalRequestSubject}</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Quick Demo Switcher between Internal (TKT-1088) and External (TKT-1085) */}
            <div className="hidden sm:flex items-center gap-1.5 bg-bg-surface-alt px-2.5 py-1 rounded-md border border-border-default text-xs">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Demo Tickets:</span>
              <button
                type="button"
                onClick={() => onNavigate('/ticket_details?id=TKT-1088')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  ticketId === 'TKT-1088'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold shadow-2xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="View Internal Ticket"
              >
                TKT-1088 (Internal)
              </button>
              <span className="text-border-default">|</span>
              <button
                type="button"
                onClick={() => onNavigate('/ticket_details?id=TKT-1085')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  ticketId === 'TKT-1085'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold shadow-2xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="View External Ticket"
              >
                TKT-1085 (External)
              </button>
            </div>
            {embedded && (
              <Button 
                variant="primary" 
                size="sm" 
                icon={ArrowUpRight} 
                onClick={() => onNavigate(`/ticket_details?id=${ticketId}`)} 
                className="h-8 font-semibold shadow-sm"
              >
                Open Ticket
              </Button>
            )}
            <Button variant="secondary" size="sm" icon={Clock} onClick={() => setIsLogTimeModalOpen(true)} className="h-8 font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-200">Log Time</Button>
            <div className="relative">
              <Button variant="outline" size="sm" icon={MoreHorizontal} className="h-8 font-semibold" onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}>Actions</Button>
              {isActionsMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsActionsMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-bg-surface border border-border-default rounded-md shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button 
                      onClick={() => { setIsActionsMenuOpen(false); setIsLinkTicketModalOpen(true); }}
                      className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-surface-hover flex items-center gap-2"
                    >
                      <LinkIcon size={14} /> Link Ticket
                    </button>
                    <button 
                      onClick={() => { setIsActionsMenuOpen(false); setIsChangeProjectModalOpen(true); }}
                      className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-surface-hover flex items-center gap-2"
                    >
                      <FolderOpen size={14} /> Change Project
                    </button>
                    <button 
                      onClick={() => { setIsActionsMenuOpen(false); setIsCloneTicketOpen(true); }}
                      className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-surface-hover flex items-center gap-2"
                    >
                      <Copy size={14} /> Clone Ticket
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick editable attributes in header */}
        <div className="flex flex-wrap items-center gap-6 pl-11">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Type</span>
            <SingleSearchDropdown 
              options={['Internal', 'External']} 
              value={ticketType === 'internal' ? 'Internal' : 'External'} 
              onChange={(val) => setTicketType(val.toLowerCase() as 'internal' | 'external')} 
              className="px-2 py-1 bg-transparent border-none hover:bg-bg-surface-hover rounded text-sm font-bold text-text-primary h-7 min-w-[105px] cursor-pointer"
            />
          </div>
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
        
        {isCallAssistEligible && (
          <CallAssistQuickActions customerMobile={customerPhone} onLogActivity={handleLogCallActivity} />
        )}
        
        {/* 2. Unified Workspace Panel */}
        <div className="card-base p-0 overflow-hidden flex flex-col bg-bg-surface shadow-sm border border-border-default rounded-xl">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border-default">
            
            {/* Left Column (Customer & SLA) - 30% */}
            <div className="lg:w-[30%] flex flex-col divide-y divide-border-default">
              {/* Customer */}
              <div className="flex flex-col">
                 <div className="px-5 py-4 bg-bg-surface-alt/50 border-b border-border-default flex items-center gap-2">
                   <User size={16} className="text-text-secondary"/>
                   <h3 className="font-bold text-sm text-text-primary tracking-tight">Customer Profile</h3>
                 </div>
                 <div className="p-5 flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg border border-brand-500/20">{customerInitials}</div>
                      <div className="min-w-0">
                        <div className="font-bold text-text-primary text-base truncate tracking-tight">{customerName}</div>
                        <div className="text-[13px] text-text-secondary truncate">{customerEmail}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-3.5 mt-2">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={14} className="text-text-muted shrink-0"/>
                        <span className="text-text-primary font-semibold">{customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Building size={14} className="text-text-muted shrink-0"/>
                        <span className="text-text-secondary w-16 shrink-0 font-medium">Tenant:</span>
                        <span className="text-text-primary font-semibold truncate">{customerCompany}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Briefcase size={14} className="text-text-muted shrink-0"/>
                        <span className="text-text-secondary w-16 shrink-0 font-medium">BU:</span>
                        <span className="text-text-primary font-semibold truncate">{customerBU}</span>
                      </div>
                    </div>
                 </div>
              </div>

              {/* SLA */}
              <div className="flex flex-col">
                 <div className="px-5 py-4 bg-bg-surface-alt/50 border-b border-border-default flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Clock size={16} className="text-text-secondary"/>
                     <h3 className="font-bold text-sm text-text-primary tracking-tight">SLA Summary</h3>
                   </div>
                   <Badge variant="error" className="py-0.5 px-2 text-[10px] font-bold tracking-wide uppercase">Breached</Badge>
                 </div>
                 <div className="p-5 flex flex-col gap-6">
                     <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-text-primary">First Response</span>
                          <span className="text-[11px] font-bold text-error-text tracking-wider uppercase">Breached</span>
                        </div>
                        <div className="w-full h-1.5 bg-error-text/20 rounded-full overflow-hidden">
                          <div className="h-full bg-error-text" style={{ width: '100%' }}></div>
                        </div>
                        <div className="text-[11px] text-text-muted font-mono font-medium flex justify-between">
                          <span>Target: 08:30 AM</span>
                          <span className="text-error-text font-bold">-15m overdue</span>
                        </div>
                     </div>
                     
                     <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-text-primary">Resolution</span>
                          <span className="text-[11px] font-bold text-warning-text tracking-wider uppercase">Healthy</span>
                        </div>
                        <div className="w-full h-1.5 bg-border-default rounded-full overflow-hidden">
                          <div className="h-full bg-warning-text" style={{ width: '40%' }}></div>
                        </div>
                        <div className="text-[11px] text-text-muted font-mono font-medium flex justify-between">
                          <span>Target: 16:00 PM</span>
                          <span className="text-warning-text font-bold">1h 45m left</span>
                        </div>
                     </div>
                 </div>
              </div>
            </div>

            {/* Right Column (Ticket Details) - 70% */}
            <div className="lg:w-[70%] flex flex-col transition-all">
              <div className="px-5 py-4 bg-bg-surface-alt/50 border-b border-border-default flex items-center justify-between">
                 <h3 className="font-bold text-sm text-text-primary tracking-tight">Ticket Details</h3>
                 
               </div>
               
               <div className="p-6 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div className="">
                      <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Status</div>
                      {userRole === 'edit' ? (
                        <SingleSearchDropdown 
                          options={['Open', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed']} 
                          value={status} 
                          onChange={setStatus} 
                          className="h-9 text-sm w-full input-base border border-border-default bg-bg-page focus-within:border-border-focus font-medium" 
                        />
                      ) : (
                        <div className="text-[13px] font-semibold text-text-primary break-words leading-relaxed py-1.5 border-b border-border-subtle">
                          {status || '-'}
                        </div>
                      )}
                    </div>
                    {ticketFields.map(field => (
                      <div key={field.id} className={field.type === 'textarea' ? 'col-span-1 md:col-span-2' : ''}>
                        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">{field.label}</div>
                        {userRole === 'edit' ? (
                          field.type === 'select' ? (
                            <SingleSearchDropdown 
                              options={field.options || []} 
                              value={field.value} 
                              onChange={(val) => {
                                setTicketFields(prev => prev.map(f => f.id === field.id ? { ...f, value: val } : f));
                                if (field.id === 'f0') {
                                  setTicketType(val.toLowerCase() as 'internal' | 'external');
                                }
                              }} 
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
                          <div className="text-[13px] font-semibold text-text-primary break-words leading-relaxed py-1.5 border-b border-border-subtle">
                            {field.value || '-'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* 3. Original Request */}
        <div className="rounded-xl bg-brand-50/30 border border-brand-500/20 shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
          <div className="p-5 flex items-start justify-between border-b border-brand-500/10 bg-brand-50/50">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded bg-brand-100 text-brand-700 flex items-center justify-center font-bold shadow-sm shrink-0 border border-brand-500/20">{customerInitials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-text-primary text-base flex items-center gap-2 tracking-tight">
                    {customerName}
                    <Badge variant="neutral" className="bg-bg-surface border border-border-default text-[10px] py-0.5 px-2 font-bold uppercase tracking-wider shadow-sm">Original Request</Badge>
                  </div>
                  <div className="text-[11px] text-text-muted font-mono flex items-center gap-2">
                    {originalRequestTime}
                  </div>
                </div>
                {ticketSource === 'EMAIL' ? (
                  <div className="mt-2 text-[12px] text-text-secondary flex flex-col gap-1">
                    <div className="flex items-center gap-2"><span className="w-12 font-bold text-text-muted">From:</span><span className="text-text-primary font-medium">{customerEmail}</span></div>
                    <div className="flex items-center gap-2"><span className="w-12 font-bold text-text-muted">To:</span><span className="text-text-primary font-medium">support@flow.com</span></div>
                    <div className="flex items-center gap-2"><span className="w-12 font-bold text-text-muted">Subject:</span><span className="font-bold text-text-primary">{originalRequestSubject}</span></div>
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
            <div className="text-[14px] text-text-primary leading-relaxed whitespace-pre-wrap font-medium">
              {originalRequestBody}
            </div>
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-bg-surface px-3 py-1.5 rounded-md border border-border-default text-[11px] font-bold text-text-secondary cursor-pointer hover:border-border-strong transition-colors shadow-sm">
                <Paperclip size={14} className="text-text-muted" /> apac_auth_errors.log <span className="text-text-muted font-mono ml-1 font-normal">142 KB</span>
              </div>
              <div className="flex items-center gap-2 bg-bg-surface px-3 py-1.5 rounded-md border border-border-default text-[11px] font-bold text-text-secondary cursor-pointer hover:border-border-strong transition-colors shadow-sm">
                <ImageIcon size={14} className="text-text-muted" /> timeout_screenshot.png <span className="text-text-muted font-mono ml-1 font-normal">1.2 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col shadow-sm border border-border-default rounded-xl overflow-hidden">
        {/* 4. Conversation Workspace */}
        <div className="flex flex-col bg-bg-surface p-4">
           <CommentThread 
             comments={messages as any}
             onReply={(parentId, content) => {
               const newMsg = {
                  id: Date.now().toString(),
                  sender: 'Support Agent',
                  role: 'Support',
                  type: 'public' as const,
                  content,
                  time: 'Just now',
                  isAgent: true,
                  parentId
               };
               setMessages(prev => [...prev, newMsg]);
             }}
             currentUser="Support Agent"
           />
        </div>

        {/* 5. Reply Composer */}
        <div className="flex flex-col bg-bg-surface border-t border-border-default relative z-10">
          <div role="tablist" aria-label="Reply modes" className="flex border-b border-border-default bg-bg-surface relative">
            <button role="tab" aria-selected={activeTab === 'reply'} aria-controls="reply-panel" id="tab-reply" onClick={() => setActiveTab('reply')} className={`flex-1 py-3.5 text-sm font-bold transition-colors relative z-10 ${activeTab === 'reply' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
            >
              Reply to Customer
            </button>
            <div className="w-px bg-border-default"></div>
            <button role="tab" aria-selected={activeTab === 'internal'} aria-controls="internal-panel" id="tab-internal" onClick={() => setActiveTab('internal')} className={`flex-1 py-3.5 text-sm font-bold transition-colors relative z-10 flex items-center justify-center gap-2 ${activeTab === 'internal' ? 'text-warning-text bg-warning-bg/30' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
            >
              <Lock size={14} /> Internal Note
            </button>
            <div 
              className={`absolute bottom-0 h-[3px] transition-all duration-300 ease-out z-20 ${activeTab === 'reply' ? 'bg-brand-500 left-0 w-1/2' : 'bg-warning-text left-1/2 w-1/2'}`}
            ></div>
          </div>
          
          {ticketSource === 'EMAIL' && activeTab === 'reply' && (
<div id="reply-panel" role="tabpanel" aria-labelledby="tab-reply">
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
</div>
)}
          <div className={`p-4 transition-colors duration-300 ${activeTab === 'internal' ? 'bg-warning-bg/10' : 'bg-bg-surface'}`}>
            <RichTextEditor 
              content={replyContent} 
              onChange={setReplyContent} 
              placeholder={activeTab === 'internal' ? 'Write an internal note (only visible to agents)...' : ticketSource === 'EMAIL' ? 'Write your email reply...' : 'Type your reply to {customerName}...'}
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
                  onClick={() => {
                    if (!replyContent.trim()) return;
                    const newMsg = {
                      id: Date.now().toString(),
                      sender: 'Support Agent',
                      role: 'Support',
                      type: activeTab === 'internal' ? 'internal' as const : 'public' as const,
                      content: replyContent,
                      time: 'Just now',
                      isAgent: true,
                      parentId: null
                    };
                    setMessages(prev => [...prev, newMsg]);
                    setReplyContent('');
                  }}
                >
                  {activeTab === 'internal' ? 'Add Note' : 'Send Reply'}
                </Button>
              </div>
            </div>
          </div>
        </div>

                </div>
        {/* 6. Bottom Utility Tabs */}
        <div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden">
          <div role="tablist" aria-label="Ticket details tabs" className="flex border-b border-border-default bg-bg-surface overflow-x-auto custom-scrollbar">
            {[
              { id: 'attachments', label: 'Attachments (2)', icon: Paperclip },
              { id: 'tasks', label: 'Tasks (2)', icon: CheckSquare },
              { id: 'linked', label: 'Linked Tickets (1)', icon: LinkIcon },
              { id: 'activity', label: 'Activity (18)', icon: Activity },
            ].map(tab => (
              <button key={tab.id} role="tab" aria-selected={activeBottomTab === tab.id} aria-controls={`panel-${tab.id}`} id={`tab-${tab.id}`} onClick={() => setActiveBottomTab(tab.id as any)} className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold transition-colors whitespace-nowrap border-b-2 ${
                  activeBottomTab === tab.id 
                    ? 'border-brand-500 text-brand-500 bg-brand-50/50' 
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-6 bg-bg-page min-h-[200px]" role="tabpanel" aria-labelledby={`tab-${activeBottomTab}`} id={`panel-${activeBottomTab}`}>
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
             
             {activeBottomTab === 'tasks' && (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                   <h4 className="text-sm font-bold text-text-primary">Tasks</h4>
                   <Button variant="primary" size="sm" icon={Plus} className="font-bold shadow-sm">Add Task</Button>
                 </div>
                 <div className="overflow-x-auto mt-2 border border-border-default rounded-md shadow-sm bg-bg-surface">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border-default bg-bg-page">
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Task Title</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Assignee</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Reporter</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Due Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-text-primary font-medium">
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover cursor-pointer transition-colors">
                          <td className="py-3 px-4 font-bold text-text-primary">Investigate apac-1 cluster logs</td>
                          <td className="py-3 px-4">John Doe</td>
                          <td className="py-3 px-4 text-text-secondary">System</td>
                          <td className="py-3 px-4"><Badge variant="warning" className="font-bold shadow-sm">In Progress</Badge></td>
                          <td className="py-3 px-4 text-text-muted font-mono">Today, 14:00</td>
                        </tr>
                        <tr className="hover:bg-bg-surface-hover cursor-pointer transition-colors">
                          <td className="py-3 px-4 font-bold text-text-primary">Restart auth services in APAC</td>
                          <td className="py-3 px-4 text-text-secondary italic">Unassigned</td>
                          <td className="py-3 px-4 text-text-secondary">Jane Smith</td>
                          <td className="py-3 px-4"><Badge variant="neutral" className="font-bold shadow-sm">To Do</Badge></td>
                          <td className="py-3 px-4 text-text-muted font-mono">Tomorrow, 10:00</td>
                        </tr>
                      </tbody>
                    </table>
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

             {activeBottomTab === 'activity' && (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="text-sm font-bold text-text-primary">Ticket Historical</h4>
                   <Button variant="outline" size="sm" icon={Download} className="font-bold shadow-sm">Export Log</Button>
                 </div>
                 
                 <div className="overflow-x-auto border border-border-default rounded-md shadow-sm bg-bg-surface">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border-default bg-bg-page">
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider w-[25%]">Name</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider w-[50%]">Action</th>
                          <th className="py-3 px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider w-[25%]">Time & Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-text-primary font-medium">
                        {timeLogEntries.map((entry) => (
                          <tr key={entry.id} className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                            <td className="py-4 px-4 font-bold text-text-primary align-top">{entry.user}</td>
                            <td className="py-4 px-4 align-top">
                              <div className="font-bold text-text-primary mb-1">Logged Time</div>
                              <div className="text-[12px] text-text-secondary flex flex-col gap-0.5">
                                 <div><span className="text-text-muted">Duration:</span> <span className="font-mono">{entry.hours}h {entry.minutes}m</span></div>
                                 {entry.comment && (
                                   <div className="mt-1">
                                      <span className="text-text-muted">Work Note:</span>
                                      <div className="mt-0.5 bg-bg-page border border-border-default p-2 rounded prose prose-sm max-w-none text-text-secondary text-[12px]" dangerouslySetInnerHTML={{__html: entry.comment}} />
                                   </div>
                                 )}
                              </div>
                            </td>
                            <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                              <div><span className="text-text-muted">Date:</span> {entry.date}</div>
                              <div><span className="text-text-muted">Time:</span> {entry.time}</div>
                            </td>
                          </tr>
                        ))}
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">Sankar Das</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Status</div>
                            <div className="text-[12px] text-text-secondary flex flex-col gap-0.5 font-mono">
                               <div><span className="text-text-muted">From:</span> Open</div>
                               <div><span className="text-text-muted">To:</span> <span className="font-bold text-text-primary">Resolved</span></div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:53:12</div>
                          </td>
                        </tr>
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">Saif Ali Sharafat Hussain Shah</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Assignee</div>
                            <div className="text-[12px] text-text-secondary flex flex-col gap-0.5 font-mono">
                               <div><span className="text-text-muted">From:</span> Navneet Kumar</div>
                               <div><span className="text-text-muted">To:</span> Sankar Das</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:47:48</div>
                          </td>
                        </tr>
                        <tr className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">John Doe</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Added Internal Note</div>
                            <div className="text-[12px] text-text-secondary font-mono">
                               <span className="text-text-muted">No field changes</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:40:00</div>
                          </td>
                        </tr>
                        <tr className="hover:bg-bg-surface-hover transition-colors">
                          <td className="py-4 px-4 font-bold text-text-primary align-top">Veera Chandrakar</td>
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-text-primary mb-1">Ticket Created</div>
                            <div className="text-[12px] text-text-secondary flex flex-col gap-0.5 font-mono">
                               <div><span className="text-text-muted">From:</span> </div>
                               <div><span className="text-text-muted">To:</span> </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top text-text-secondary font-mono text-[12px]">
                            <div><span className="text-text-muted">Date:</span> 09/07/2026</div>
                            <div><span className="text-text-muted">Time:</span> 18:32:38</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
               </div>
             )}
          </div>
        </div>

      </div>
      {isHistoryModalOpen && <TicketHistoryModal onClose={() => setIsHistoryModalOpen(false)} />}
      {isChangeProjectModalOpen && <CreateTicketFlow type="ticket" mode="change_project" initialData={{ client: 'Acme Corp', project: 'Customer Support' }} onClose={() => setIsChangeProjectModalOpen(false)} />}
      {isLinkTicketModalOpen && <LinkTicketModal onClose={() => setIsLinkTicketModalOpen(false)} />}
      {isReassignModalOpen && <ReassignModal onClose={() => setIsReassignModalOpen(false)} currentAssignee={assignee} />}
      {isCloneTicketOpen && <CreateTicketFlow type="ticket" mode="clone" initialData={{
        client: 'Acme Corp',
        reqType: 'Incident',
        subReqType: 'Software',
        serviceType: 'Bug',
        summary: originalRequestSubject,
        description: 'Mock original description',
        businessUnit: 'IT',
        subBusinessUnit: 'Support',
        attachments: [
          { name: 'error_trace.log', size: '24 KB', type: 'LOG' }
        ]
      }} onClose={() => setIsCloneTicketOpen(false)} />}
      {isLogTimeModalOpen && (
        <LogTimeModal 
          onClose={() => setIsLogTimeModalOpen(false)} 
          onAddEntry={handleAddLogEntry} 
          entries={timeLogEntries} 
        />
      )}
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-bg-surface border border-border-default shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-full bg-success-bg text-success-text flex items-center justify-center">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary">Time Logged</h4>
            <p className="text-xs text-text-secondary">Your time entry has been successfully recorded.</p>
          </div>
        </div>
      )}
    </div>
  );
}
