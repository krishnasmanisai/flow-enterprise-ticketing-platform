import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Clock, History as HistoryIcon, Paperclip, 
  MessageSquare, Link as LinkIcon, RefreshCw, ExternalLink,
  ChevronDown, Send, Check, Download, Bold, Italic, 
  Underline, Strikethrough, List, ListOrdered, Link2, 
  Lock, AtSign, Maximize2, MoreHorizontal, User, FileText,
  Copy
} from 'lucide-react';
import { Page } from '../types';
import { LogTimeModal, TimeLogEntry } from '../components/ticket/LogTimeModal';
import { CreateTicketFlow } from './CreateTicketFlow';

interface TaskData {
  id: string;
  source: 'JIRA' | 'Internal';
  status: string;
  priority: string;
  reporter: string;
  createdDate: string;
  title: string;
  assignee: {
    name: string;
    department: string;
    avatar: string;
  };
  linkedTicket?: {
    id: string;
    title: string;
    status: string;
    priority: string;
  };
  jira?: {
    issueKey: string;
    project: string;
    status: string;
    url?: string;
  };
  description: {
    intro: string;
    tableData: { parameter: string; value: string; isLink?: boolean }[];
    notes: string[];
  };
  attachments: {
    name: string;
    type: string;
    size: string;
  }[];
  comments: {
    id: string;
    author: string;
    avatar: string;
    department: string;
    badges: { label: string; variant: 'blue' | 'gray' | 'green' }[];
    date: string;
    content: string;
  }[];
  history: {
    id: string;
    user: string;
    action: string;
    details: string | null;
    time: string;
  }[];
}

const MOCK_TASKS: Record<string, TaskData> = {
  'TSK-597': {
    id: 'TSK-597',
    source: 'JIRA',
    status: 'Closed',
    priority: 'Urgent',
    reporter: 'Ankita Verma',
    createdDate: 'Sep 15, 12:28 AM',
    title: 'test Jira task',
    assignee: {
      name: 'Vanaparthy Mani Sai Guptha',
      department: 'Technology → Software Engineering',
      avatar: 'VM'
    },
    linkedTicket: {
      id: 'UNKN-26985',
      title: 'testing after prod',
      status: 'Open',
      priority: 'Urgent'
    },
    jira: {
      issueKey: 'ELT-204',
      project: 'ELT',
      status: 'Closed',
      url: 'https://easyrewardz.atlassian.net/browse/ELT-204'
    },
    description: {
      intro: 'Created by: Ankita Verma This ticket was created from Flow via the Jira Integration.',
      tableData: [
        { parameter: 'Ticket ID', value: 'Ticket id' },
        { parameter: 'Priority', value: 'https://easyrewardz.atlassian.net/browse/LT-2671', isLink: true },
        { parameter: 'Status', value: 'Open' },
        { parameter: 'Assigned To', value: 'Support Team' },
        { parameter: 'SLA', value: '4 Hours' }
      ],
      notes: [
        '! @ # $ % ^ & * ( ) _ + = { } [ ] | \\ : ; " \' < > ? / ~',
        '@vanapathy',
        '✅ Done',
        '❌ Failed'
      ]
    },
    attachments: [
      { name: 'Generated Image September 04, 2026 - 4...', type: 'JPG', size: '1.4 MB' },
      { name: 'task-description-image-1.png', type: 'PNG', size: '640 KB' }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Vanaparthy Mani Sai Guptha',
        avatar: 'VM',
        department: 'Technology → Software Engineering',
        badges: [
          { label: 'JIRA - INTERNAL', variant: 'blue' },
          { label: 'ELT-204', variant: 'gray' },
          { label: 'Closed • Done', variant: 'green' }
        ],
        date: '15 Sep 2026 10:22 AM',
        content: 'test comment'
      }
    ],
    history: [
      { id: 'h1', user: 'Ankita Verma', action: 'Created task via Flow Jira Integration', details: null, time: '15 Sep 2026 12:28 AM' },
      { id: 'h2', user: 'System', action: 'Linked to ticket UNKN-26985', details: 'Status: Open', time: '15 Sep 2026 12:28 AM' },
      { id: 'h3', user: 'Vanaparthy Mani Sai Guptha', action: 'Added comment', details: '"test comment"', time: '15 Sep 2026 10:22 AM' },
      { id: 'h4', user: 'Vanaparthy Mani Sai Guptha', action: 'Updated status', details: 'Open → Closed', time: '15 Sep 2026 10:25 AM' }
    ]
  },
  'TSK-8493': {
    id: 'TSK-8493',
    source: 'JIRA',
    status: 'Open',
    priority: 'High',
    reporter: 'John Doe',
    createdDate: 'Oct 24, 08:00 AM',
    title: 'API Rate Limit Exceeded on Prod',
    assignee: {
      name: 'Jane Smith',
      department: 'Platform Engineering',
      avatar: 'JS'
    },
    linkedTicket: {
      id: 'TKT-1024',
      title: 'Payment gateway failing for premium users',
      status: 'Open',
      priority: 'Critical'
    },
    jira: {
      issueKey: 'JIRA-4092',
      project: 'SIA',
      status: 'Open',
      url: 'https://easyrewardz.atlassian.net/browse/JIRA-4092'
    },
    description: {
      intro: 'We are consistently hitting the API rate limits on the production payment gateway starting from 08:00 UTC today.',
      tableData: [
        { parameter: 'Endpoint', value: '/api/v2/transactions/process' },
        { parameter: 'Rate Limit', value: '1000 req/min' },
        { parameter: 'Current Spike', value: '~1450 req/min' }
      ],
      notes: [
        'Production payment gateway cluster is throttling transactions.'
      ]
    },
    attachments: [
      { name: 'Grafana_Spike_Report.pdf', type: 'PDF', size: '1.2 MB' },
      { name: 'error_logs_snippet.txt', type: 'TXT', size: '45 KB' }
    ],
    comments: [
      {
        id: 'c2',
        author: 'John Doe',
        avatar: 'JD',
        department: 'DevOps',
        badges: [{ label: 'INTERNAL', variant: 'blue' }],
        date: '24 Oct 2026 08:30 AM',
        content: 'Checked the logs, definitely a rate limit issue on the proxy level.'
      }
    ],
    history: [
      { id: 'h1', user: 'System', action: 'Created task', details: null, time: '24 Oct 2026 08:00 AM' }
    ]
  }
};

const STATUS_OPTIONS = ['Open', 'In Progress', 'Under Investigation', 'Resolved', 'Closed', 'Reopened', 'Blocked'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent', 'Critical'];
const ASSIGNEE_OPTIONS = [
  'Vanaparthy Mani Sai Guptha',
  'Ankita Verma',
  'Jane Smith',
  'John Doe',
  'David E.',
  'Support Team'
];

export default function TaskDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rawId = searchParams.get('id') || 'TSK-597';

  const task = MOCK_TASKS[rawId] || MOCK_TASKS['TSK-597'];

  // Local interactive state
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const [currentPriority, setCurrentPriority] = useState(task.priority);
  const [currentAssignee, setCurrentAssignee] = useState(task.assignee.name);

  // Dropdown open states
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'comments' | 'history'>('comments');

  // Comment input
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsList, setCommentsList] = useState(task.comments);

  // Time logging
  const [isLogTimeOpen, setIsLogTimeOpen] = useState(false);
  const [loggedEntries, setLoggedEntries] = useState<TimeLogEntry[]>([]);

  // Clone Task Modal
  const [isCloneTaskOpen, setIsCloneTaskOpen] = useState(false);

  // Sync state if task ID changes
  useEffect(() => {
    setCurrentStatus(task.status);
    setCurrentPriority(task.priority);
    setCurrentAssignee(task.assignee.name);
    setCommentsList(task.comments);
  }, [rawId, task]);

  // Handle post comment
  const handlePostComment = () => {
    if (!newCommentText.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: 'Vanaparthy Mani Sai Guptha',
      avatar: 'VM',
      department: 'Technology → Software Engineering',
      badges: [
        { label: 'FLOW - USER', variant: 'blue' as const },
        { label: task.jira ? task.jira.issueKey : 'TASK', variant: 'gray' as const }
      ],
      date: 'Just now',
      content: newCommentText.trim()
    };
    setCommentsList(prev => [...prev, newComment]);
    setNewCommentText('');
  };

  // Calculate total logged time
  const totalLoggedMinutes = loggedEntries.reduce((acc, entry) => acc + (entry.hours * 60 + entry.minutes), 0);
  const totalHours = Math.floor(totalLoggedMinutes / 60);
  const totalMins = totalLoggedMinutes % 60;

  return (
    <div className="flex flex-col bg-slate-50/50 min-h-screen pb-16 font-sans text-text-primary">
      {/* Top Header */}
      <header className="bg-bg-surface border-b border-border-default sticky top-0 z-30 shadow-2xs">
        <div className="px-6 py-4 max-w-[1600px] mx-auto flex flex-col gap-3">
          {/* Top Row: Back button, Task ID, Badges, Metadata, Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('tasks')}
                className="p-1.5 -ml-1 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors cursor-pointer"
                title="Back to Tasks"
              >
                <ArrowLeft size={18} />
              </button>
              
              <span className="font-bold text-base text-text-primary tracking-tight">{task.id}</span>
              
              {/* Status pill badge */}
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {currentStatus}
              </span>

              {/* Source pill badge */}
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                {task.source}
              </span>

              {/* Created & Reporter Metadata */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted ml-1 font-normal">
                <span>Created: {task.createdDate}</span>
                <span>•</span>
                <span>Reporter: {task.reporter}</span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 self-end md:self-auto">
              {task.jira?.url && (
                <a
                  href={task.jira.url}
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 px-3 rounded-lg border border-border-default bg-bg-surface hover:bg-bg-surface-hover text-xs font-medium text-text-primary shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink size={13} className="text-text-muted" />
                  <span>Open in Jira</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setIsCloneTaskOpen(true)}
                className="h-8 px-3 rounded-lg border border-border-default bg-bg-surface hover:bg-bg-surface-hover text-xs font-medium text-text-primary shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Clone Task"
              >
                <Copy size={13} className="text-text-muted" />
                <span>Clone Task</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className="h-8 px-3 rounded-lg border border-border-default bg-bg-surface hover:bg-bg-surface-hover text-xs font-medium text-text-primary shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <HistoryIcon size={13} className="text-text-muted" />
                <span>History</span>
              </button>
            </div>
          </div>

          {/* Title Row */}
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">{task.title}</h1>
          </div>

          {/* Attribute Dropdown Controls Row */}
          <div className="flex flex-wrap items-center gap-6 pt-1">
            {/* STATUS DROPDOWN */}
            <div className="relative flex items-center gap-2">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">STATUS</span>
              <button
                type="button"
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsPriorityOpen(false);
                  setIsAssigneeOpen(false);
                }}
                className="h-7 px-2.5 rounded-md border border-border-default bg-bg-surface hover:bg-bg-surface-hover text-xs font-semibold text-text-primary shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>{currentStatus}</span>
                <ChevronDown size={13} className="text-text-muted" />
              </button>
              {isStatusOpen && (
                <div className="absolute top-full left-12 mt-1 w-44 bg-bg-surface border border-border-default rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setCurrentStatus(opt);
                        setIsStatusOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-surface-hover flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      {currentStatus === opt && <Check size={13} className="text-brand-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRIORITY DROPDOWN */}
            <div className="relative flex items-center gap-2">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">PRIORITY</span>
              <button
                type="button"
                onClick={() => {
                  setIsPriorityOpen(!isPriorityOpen);
                  setIsStatusOpen(false);
                  setIsAssigneeOpen(false);
                }}
                className="h-7 px-2.5 rounded-md border border-border-default bg-bg-surface hover:bg-bg-surface-hover text-xs font-semibold text-text-primary shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>{currentPriority}</span>
                <ChevronDown size={13} className="text-text-muted" />
              </button>
              {isPriorityOpen && (
                <div className="absolute top-full left-14 mt-1 w-36 bg-bg-surface border border-border-default rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {PRIORITY_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setCurrentPriority(opt);
                        setIsPriorityOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-surface-hover flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      {currentPriority === opt && <Check size={13} className="text-brand-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ASSIGNEE DROPDOWN */}
            <div className="relative flex items-center gap-2">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">ASSIGNEE</span>
              <button
                type="button"
                onClick={() => {
                  setIsAssigneeOpen(!isAssigneeOpen);
                  setIsStatusOpen(false);
                  setIsPriorityOpen(false);
                }}
                className="h-7 px-2.5 rounded-md border border-border-default bg-bg-surface hover:bg-bg-surface-hover text-xs font-semibold text-text-primary shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <User size={13} className="text-text-muted" />
                <span className="truncate max-w-[200px]">{currentAssignee}</span>
                <ChevronDown size={13} className="text-text-muted" />
              </button>
              {isAssigneeOpen && (
                <div className="absolute top-full left-14 mt-1 w-64 bg-bg-surface border border-border-default rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {ASSIGNEE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setCurrentAssignee(opt);
                        setIsAssigneeOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-surface-hover flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      {currentAssignee === opt && <Check size={13} className="text-brand-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout Grid */}
      <main className="p-6 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Description, Attachments, Comments & Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* CARD 1: Description */}
          <section className="bg-bg-surface rounded-2xl border border-border-default shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-text-primary">
              <FileText size={18} className="text-text-secondary" />
              <h2>Description</h2>
            </div>

            <div className="border border-border-subtle rounded-xl p-4 bg-bg-page/40 space-y-4 text-xs sm:text-sm text-text-primary">
              <p className="leading-relaxed">
                {task.description.intro}
              </p>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-border-strong rounded-lg border-collapse text-xs">
                  <thead className="bg-bg-page border-b border-border-strong">
                    <tr>
                      <th className="border-r border-border-strong px-3 py-2 text-left font-semibold text-text-primary w-1/3">Parameter</th>
                      <th className="px-3 py-2 text-left font-semibold text-text-primary">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.description.tableData.map((row, idx) => (
                      <tr key={idx} className="border-t border-border-strong">
                        <td className="border-r border-border-strong px-3 py-2 text-text-secondary font-medium">{row.parameter}</td>
                        <td className="px-3 py-2 text-text-primary">
                          {row.isLink ? (
                            <a
                              href={row.value}
                              target="_blank"
                              rel="noreferrer"
                              className="text-brand-600 hover:text-brand-800 underline font-mono text-[11px] break-all"
                            >
                              {row.value}
                            </a>
                          ) : (
                            <span>{row.value}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer notes */}
              <div className="space-y-1.5 pt-2 text-xs">
                {task.description.notes.map((note, idx) => (
                  <div key={idx} className={idx === 1 ? 'text-brand-600 font-medium' : 'text-text-secondary font-mono'}>
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CARD 2: Attachments */}
          <section className="bg-bg-surface rounded-2xl border border-border-default shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-text-primary">
              <Paperclip size={18} className="text-text-secondary" />
              <h2>Attachments ({task.attachments.length})</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {task.attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-border-default bg-bg-surface hover:bg-bg-surface-hover transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold text-[10px] px-2 py-0.5 rounded-md shrink-0">
                      {att.type}
                    </span>
                    <span className="text-xs font-semibold text-text-primary truncate" title={att.name}>
                      {att.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    title="Download file"
                    className="text-text-muted hover:text-text-primary p-1 transition-colors cursor-pointer shrink-0"
                  >
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CARD 3: Comments & Activity */}
          <section className="bg-bg-surface rounded-2xl border border-border-default shadow-2xs overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-border-default bg-bg-surface">
              <button
                type="button"
                onClick={() => setActiveTab('comments')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'comments'
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <MessageSquare size={16} />
                <span>Comments ({commentsList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'history'
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <HistoryIcon size={16} />
                <span>History</span>
              </button>
            </div>

            {/* TAB CONTENT: Comments */}
            {activeTab === 'comments' && (
              <div className="p-6 space-y-6">
                {/* Composer Box */}
                <div className="border border-border-default rounded-xl overflow-hidden bg-bg-surface shadow-2xs">
                  <textarea
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    placeholder="Write a comment... Use @ to mention"
                    rows={3}
                    className="w-full p-3.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none bg-transparent"
                  />

                  {/* Rich Text Toolbar */}
                  <div className="border-t border-border-default bg-bg-page/50 px-3 py-1.5 flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
                    <button type="button" className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-bg-surface text-text-primary font-medium border border-border-subtle shadow-2xs cursor-pointer">
                      <span>Normal text</span>
                      <ChevronDown size={11} />
                    </button>
                    <div className="w-px h-3.5 bg-border-default mx-0.5" />
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary font-bold cursor-pointer" title="Bold"><Bold size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Italic"><Italic size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Underline"><Underline size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Strikethrough"><Strikethrough size={13} /></button>
                    <div className="w-px h-3.5 bg-border-default mx-0.5" />
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Bullet List"><List size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Numbered List"><ListOrdered size={13} /></button>
                    <div className="w-px h-3.5 bg-border-default mx-0.5" />
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Link"><Link2 size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Internal Note"><Lock size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="Mention"><AtSign size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer ml-auto" title="Expand"><Maximize2 size={13} /></button>
                    <button type="button" className="p-1 rounded hover:bg-bg-surface text-text-primary cursor-pointer" title="More options"><MoreHorizontal size={13} /></button>
                  </div>

                  {/* Drag and drop upload zone */}
                  <div className="border-t border-dashed border-border-default bg-bg-page/20 p-4 text-center cursor-pointer hover:bg-bg-page/50 transition-colors flex flex-col items-center justify-center">
                    <Paperclip size={16} className="text-text-muted mb-1" />
                    <span className="text-xs font-medium text-text-secondary">Click or drag files to upload</span>
                    <span className="text-[11px] text-text-muted">Max 100MB per file.</span>
                  </div>
                </div>

                {/* Composer Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
                  <span className="text-xs text-text-muted font-normal">Mentions notify teammates on this task.</span>
                  <button
                    type="button"
                    onClick={handlePostComment}
                    disabled={!newCommentText.trim()}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer ${
                      newCommentText.trim()
                        ? 'bg-brand-600 hover:bg-brand-700 text-white'
                        : 'bg-brand-600 text-white opacity-80'
                    }`}
                  >
                    <Send size={13} />
                    <span>Post Comment</span>
                  </button>
                </div>

                {/* Comments List */}
                <div className="space-y-4 pt-2">
                  {commentsList.map(comment => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {comment.avatar}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-xs text-text-primary">{comment.author}</span>
                          {comment.badges.map((badge, bIdx) => (
                            <span
                              key={bIdx}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                badge.variant === 'blue'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : badge.variant === 'green'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-bg-page text-text-secondary border-border-default font-mono'
                              }`}
                            >
                              {badge.label}
                            </span>
                          ))}
                          <span className="text-xs text-text-muted font-normal ml-auto sm:ml-1">{comment.date}</span>
                        </div>
                        <p className="text-xs text-text-muted">{comment.department}</p>
                        <div className="bg-bg-page/50 border border-border-subtle rounded-xl p-3 text-xs sm:text-sm text-text-primary mt-1.5 shadow-2xs">
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: History */}
            {activeTab === 'history' && (
              <div className="p-6 space-y-4">
                <div className="relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-border-default space-y-4">
                  {task.history.map(item => (
                    <div key={item.id} className="relative flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-bg-surface bg-brand-50 text-brand-600 shrink-0 z-10 mt-0.5 shadow-2xs">
                        <HistoryIcon size={12} />
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 pt-0.5">
                        <span className="font-bold text-xs text-text-primary">{item.user}</span>
                        <span className="text-xs text-text-secondary">{item.action}</span>
                        {item.details && (
                          <span className="text-[11px] text-text-primary font-mono bg-bg-page border border-border-subtle px-1.5 py-0.5 rounded sm:ml-1 shrink-0">
                            {item.details}
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-text-muted sm:ml-auto">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: Linked Ticket, Jira Details, Time Tracking */}
        <div className="lg:col-span-4 space-y-6">
          {/* CARD 1: Linked Ticket */}
          {task.linkedTicket && (
            <section className="bg-bg-surface rounded-2xl border border-border-default shadow-2xs overflow-hidden">
              <div className="bg-indigo-50/70 border-b border-indigo-100/80 px-4 py-3 flex items-center gap-2">
                <LinkIcon size={16} className="text-indigo-600" />
                <h3 className="font-bold text-sm text-indigo-950">Linked Ticket</h3>
              </div>

              <div className="p-4">
                <div
                  onClick={() => onNavigate(`/ticket_details?id=${task.linkedTicket?.id}`)}
                  className="bg-bg-page/50 border border-border-default rounded-xl p-4 space-y-2 hover:border-indigo-300 hover:bg-bg-page transition-all cursor-pointer group shadow-2xs"
                  title="Click to view full ticket details"
                >
                  <div className="font-bold text-base text-text-primary tracking-tight group-hover:text-brand-600 transition-colors">
                    {task.linkedTicket.id}
                  </div>
                  <div className="font-medium text-sm text-text-secondary">
                    {task.linkedTicket.title}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold text-xs px-2.5 py-0.5 rounded-md">
                      {task.linkedTicket.status}
                    </span>
                    <span className="bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold text-xs px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                      {task.linkedTicket.priority}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CARD 2: Jira Details */}
          {task.jira && (
            <section className="bg-bg-surface rounded-2xl border border-border-default shadow-2xs overflow-hidden">
              <div className="bg-blue-50/70 border-b border-blue-100/80 px-4 py-3 flex items-center gap-2">
                <RefreshCw size={16} className="text-blue-600" />
                <h3 className="font-bold text-sm text-blue-950">Jira Details</h3>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs py-1 border-b border-border-subtle">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">ISSUE KEY</span>
                    <span className="font-bold text-xs text-text-primary font-mono">{task.jira.issueKey}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-border-subtle">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">PROJECT</span>
                    <span className="font-bold text-xs text-text-primary">{task.jira.project}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">STATUS</span>
                    <span className="font-bold text-xs text-text-primary">{task.jira.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {task.jira.url && (
                    <a
                      href={task.jira.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ExternalLink size={13} />
                      <span>Open in Jira</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsCloneTaskOpen(true)}
                    className="py-2.5 px-3 border border-border-default hover:bg-bg-surface-hover rounded-lg text-xs font-semibold text-text-primary transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    title="Clone Task"
                  >
                    <Copy size={13} className="text-text-muted" />
                    <span>Clone</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* CARD 3: Time Tracking */}
          <section className="bg-bg-surface rounded-2xl border border-border-default shadow-2xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <Clock size={16} className="text-text-secondary" />
                <h3>Time Tracking</h3>
              </div>
              <span className="text-xs font-mono text-text-muted font-medium">
                {totalHours}h {totalMins}m
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-text-primary">Logged Time</div>
              {loggedEntries.length === 0 ? (
                <div className="text-xs text-text-muted pt-1">No time logged yet.</div>
              ) : (
                <div className="space-y-1.5 pt-2">
                  {loggedEntries.map(entry => (
                    <div key={entry.id} className="text-xs p-2 rounded-lg bg-bg-page border border-border-subtle flex justify-between items-center">
                      <span className="font-medium text-text-primary">{entry.user}: {entry.comment || 'Logged work'}</span>
                      <span className="font-mono text-text-muted">{entry.hours}h {entry.minutes}m</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsLogTimeOpen(true)}
              className="w-full mt-2 py-2 border border-border-default hover:bg-bg-surface-hover rounded-lg text-xs font-semibold text-text-primary transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <Clock size={14} className="text-text-muted" />
              <span>Log Time</span>
            </button>
          </section>
        </div>
      </main>

      {/* Log Time Modal */}
      {isLogTimeOpen && (
        <LogTimeModal
          onClose={() => setIsLogTimeOpen(false)}
          onAddEntry={entry => {
            const newEntry: TimeLogEntry = {
              id: Date.now().toString(),
              user: entry.user,
              hours: entry.hours,
              minutes: entry.minutes,
              comment: entry.comment,
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString()
            };
            setLoggedEntries(prev => [newEntry, ...prev]);
          }}
          entries={loggedEntries}
        />
      )}

      {/* Clone Task Flow Modal */}
      {isCloneTaskOpen && (
        <CreateTicketFlow
          type={task.source === 'JIRA' ? 'jira_task' : 'internal_task'}
          mode="clone"
          initialData={{
            client: 'Easyrewardz',
            project: task.jira?.project || 'ELT',
            jiraBoard: task.jira?.project === 'ELT' ? 'ELT' : 'ENG',
            summary: task.title,
            description: task.description.intro,
            assignee: currentAssignee,
            user: task.reporter,
            businessUnit: 'Technology',
            subBusinessUnit: 'Software Engineering',
            attachments: task.attachments || []
          }}
          onClose={() => setIsCloneTaskOpen(false)}
        />
      )}
    </div>
  );
}
