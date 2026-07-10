import { useState } from 'react';
import { ArrowLeft, Clock, Edit3, CheckCircle, CheckSquare, RefreshCw, Paperclip, MessageSquare, Link as LinkIcon, Lock, Activity, User, Info } from 'lucide-react';
import { Page } from '../types';
import { CopyId } from '../components/ui/CopyId';
import { Badge } from '../components/ui/Badge';
import { SingleSearchDropdown } from '../components/ui/SingleSearchDropdown';
import { RichTextEditor } from '../components/ui/RichTextEditor';
import { Button } from '../components/ui/Button';

export default function TaskDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [status, setStatus] = useState('Open');
  const [priority, setPriority] = useState('High');
  const [assignee, setAssignee] = useState('Jane Smith');
  const [activeTab, setActiveTab] = useState<'comments' | 'history'>('comments');

  const [commentContent, setCommentContent] = useState('');
  
  const comments = [
    { id: 1, sender: 'John Doe', role: 'DevOps', type: 'internal', content: 'Checked the logs, definitely a rate limit issue on the proxy level.', time: 'Oct 24, 08:30 AM' },
    { id: 2, sender: 'Jane Smith', role: 'Backend Engineer', type: 'internal', content: 'I am increasing the rate limit temporarily to unblock users while we investigate the root cause.', time: 'Oct 24, 08:45 AM' }
  ];

  const history = [
    { id: 1, user: 'System', action: 'Created task', details: null, time: 'Oct 24, 08:00 AM' },
    { id: 2, user: 'John Doe', action: 'Updated status', details: 'To Do → In Progress', time: 'Oct 24, 08:15 AM' },
    { id: 3, user: 'Jane Smith', action: 'Assigned to', details: 'Unassigned → Jane Smith', time: 'Oct 24, 08:20 AM' },
    { id: 4, user: 'Jane Smith', action: 'Added comment', details: null, time: 'Oct 24, 08:45 AM' }
  ];

  return (
    <div className="flex flex-col bg-bg-page min-h-screen pb-12">
      <header className="bg-bg-surface border-b border-border-default px-6 py-4 sticky top-0 z-30 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('tasks')} className="text-text-secondary hover:bg-bg-surface-hover -ml-2 shrink-0 mt-0.5">
              <ArrowLeft size={20} />
            </Button>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <CopyId id="TSK-25" type="task" className="text-sm font-bold text-text-primary" />
                <Badge variant="warning" className="py-0.5 px-2 text-[10px] font-bold tracking-wide uppercase">Due Today</Badge>
                <div className="flex items-center gap-2 text-[12px] text-text-muted font-mono ml-1">
                  <span>Created: Oct 24, 08:00 AM</span>
                  <span>•</span>
                  <span>Reporter: John Doe</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-text-primary leading-tight mt-0.5">API Rate Limit Exceeded on Prod</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
             <Button variant="outline" size="sm" icon={Edit3} className="h-8 font-semibold">Edit</Button>
             <Button variant="primary" size="sm" icon={CheckCircle} className="h-8 font-semibold">Resolve Task</Button>
          </div>
        </div>

        {/* Quick editable attributes in header */}
        <div className="flex flex-wrap items-center gap-6 pl-11">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</span>
            <SingleSearchDropdown 
               options={['To Do', 'Open', 'In Progress', 'In Review', 'Resolved', 'Closed']} 
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
      </header>

      <div className="p-5 max-w-[1400px] mx-auto w-full flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Area */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="bg-bg-surface rounded-xl shadow-sm border border-border-subtle p-5">
              <h2 className="font-sans tracking-tight text-base font-bold text-text-primary mb-3 flex items-center gap-2">
                <MessageSquare size={20} className="text-text-secondary" /> Description
              </h2>
              <div className="prose prose-sm max-w-none text-text-primary">
                <p>We are consistently hitting the API rate limits on the production payment gateway starting from 08:00 UTC today. The error logs indicate a surge in <code>429 Too Many Requests</code> responses.</p>
                <h4 className="font-semibold mt-4 mb-2">Technical Details</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li><strong>Endpoint:</strong> <code>/api/v2/transactions/process</code></li>
                  <li><strong>Rate Limit:</strong> 1000 req/min</li>
                  <li><strong>Current Spike:</strong> ~1450 req/min</li>
                </ul>
                <div className="bg-bg-surface-alt p-4 rounded font-mono text-xs border border-border-default overflow-x-auto mt-4">
                  <code>{`{\n  "error": "rate_limit_exceeded",\n  "message": "API rate limit exceeded for client_id: prod_gateway_1",\n  "retry_after": 60\n}`}</code>
                </div>
              </div>
            </div>

            <div className="bg-bg-surface rounded-xl shadow-sm border border-border-subtle p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-sans tracking-tight text-base font-bold text-text-primary flex items-center gap-2">
                  <Paperclip size={20} className="text-text-secondary" /> Attachments (2)
                </h2>
                <button className="text-brand-600 text-sm font-medium hover:underline">Add</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border border-border-default rounded-lg hover:bg-bg-page transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded bg-error-bg text-error-text flex items-center justify-center shrink-0 font-mono text-xs font-bold">PDF</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">Grafana_Spike_Report.pdf</p>
                    <p className="text-xs text-text-secondary">1.2 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border-default rounded-lg hover:bg-bg-page transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded bg-info-bg text-info-text flex items-center justify-center shrink-0 font-mono text-xs font-bold">TXT</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">error_logs_snippet.txt</p>
                    <p className="text-xs text-text-secondary">45 KB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments & Activity Tabs */}
            <div className="card-base p-0 overflow-hidden flex flex-col bg-bg-surface shadow-sm border border-border-default rounded-xl">
              <div role="tablist" aria-label="Task details tabs" className="flex border-b border-border-default bg-bg-surface relative">
                <button 
                  role="tab" 
                  aria-selected={activeTab === 'comments'} 
                  onClick={() => setActiveTab('comments')} 
                  className={`flex-1 py-3 text-sm font-bold transition-colors relative z-10 ${activeTab === 'comments' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
                >
                  Comments ({comments.length})
                </button>
                <div className="w-px bg-border-default"></div>
                <button 
                  role="tab" 
                  aria-selected={activeTab === 'history'} 
                  onClick={() => setActiveTab('history')} 
                  className={`flex-1 py-3 text-sm font-bold transition-colors relative z-10 ${activeTab === 'history' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'}`}
                >
                  Activity History
                </button>
                <div className={`absolute bottom-0 h-[3px] transition-all duration-300 ease-out z-20 bg-brand-500 ${activeTab === 'comments' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'}`}></div>
              </div>

              {activeTab === 'comments' && (
                <div className="flex flex-col">
                  {/* Composer */}
                  <div className="border-b border-border-default bg-bg-surface p-4">
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[13px] font-bold text-text-primary mb-1">
                          <Lock size={14} className="text-warning-text" /> Add Internal Comment
                        </div>
                        <RichTextEditor 
                          content={commentContent} 
                          onChange={setCommentContent} 
                          placeholder="Type your comment here..."
                          minHeight="100px"
                          className="bg-bg-page"
                        />
                        <div className="flex items-center justify-between mt-2">
                           <Button variant="ghost" size="sm" icon={Paperclip} className="text-text-secondary h-8 px-2">Attach file</Button>
                           <Button variant="primary" size="sm" className="h-8">Post Comment</Button>
                        </div>
                     </div>
                  </div>

                  {/* Comments Thread (Reversed) */}
                  <div className="flex flex-col p-4 bg-bg-page gap-3">
                    {comments.length === 0 ? (
                      <div className="py-10 flex flex-col items-center justify-center text-center">
                         <div className="w-10 h-10 bg-bg-surface-hover rounded-full flex items-center justify-center mb-3">
                           <MessageSquare size={20} className="text-text-muted" />
                         </div>
                         <h3 className="text-sm font-bold text-text-primary">No comments yet</h3>
                         <p className="text-[13px] text-text-secondary mt-1">Be the first to add a comment.</p>
                      </div>
                    ) : (
                      [...comments].reverse().map((comment) => (
                        <div key={comment.id} className="p-3 rounded-lg bg-[#fffdf7] dark:bg-warning-bg/5 border border-warning-text/20 shadow-sm relative group flex gap-3 items-start">
                           <div className="flex items-center justify-center w-7 h-7 rounded bg-warning-text text-white shrink-0 shadow-sm mt-0.5">
                              <Lock size={12}/>
                           </div>
                           <div className="flex-1 min-w-0 flex flex-col">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-[13px] text-text-primary">{comment.sender}</span>
                                    {comment.role && <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">{comment.role}</span>}
                                    <Badge variant="warning" className="py-0 px-1.5 text-[9px] font-bold uppercase tracking-wider shadow-sm border border-warning-text/10 bg-warning-bg/30">Internal</Badge>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="text-[11px] text-text-muted font-mono">{comment.time}</span>
                                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity">
                                    <button className="text-text-muted hover:text-text-primary transition-colors text-[11px] font-bold">Edit</button>
                                    <button className="text-text-muted hover:text-error-text transition-colors text-[11px] font-bold">Delete</button>
                                  </div>
                                </div>
                              </div>
                              <div className="text-[13px] leading-relaxed whitespace-pre-wrap mt-0.5 font-medium text-text-primary">
                                {comment.content}
                              </div>
                           </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="flex flex-col p-5 bg-bg-page">
                   <div className="flex flex-col relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-border-default space-y-4">
                     {history.map((item) => (
                       <div key={item.id} className="relative flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-bg-page bg-bg-surface-hover text-text-secondary shrink-0 z-10 mt-0.5">
                             {item.action === 'Created task' ? <CheckSquare size={12} /> : 
                              item.action === 'Added comment' ? <MessageSquare size={12} /> :
                              item.action.includes('status') ? <Activity size={12} /> : <User size={12} />}
                          </div>
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 pt-1">
                             <span className="font-bold text-[13px] text-text-primary">{item.user}</span>
                             <span className="text-[13px] text-text-secondary">{item.action}</span>
                             {item.details && (
                                <span className="text-[12px] text-text-primary font-mono font-medium bg-bg-surface border border-border-subtle px-1.5 py-0.5 rounded sm:ml-1 shrink-0">
                                  {item.details}
                                </span>
                             )}
                             <span className="font-mono text-[11px] text-text-muted sm:ml-auto mt-1 sm:mt-0">{item.time}</span>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Linked Ticket */}
            <div className="bg-bg-surface rounded-xl shadow-sm border border-brand-500/20 overflow-hidden">
              <div className="bg-brand-50 p-3.5 border-b border-brand-500/20 flex items-center justify-between">
                <h3 className="font-bold text-brand-700 flex items-center gap-2"><LinkIcon size={16} /> Linked Ticket</h3>
              </div>
              <div className="p-4 flex flex-col gap-3">
                 <div className="flex flex-col gap-2 p-3 border border-border-default rounded-lg hover:border-brand-300 hover:shadow-sm transition-all cursor-pointer bg-bg-page group" onClick={() => onNavigate('ticket_details')}>
                    <div className="flex justify-between items-start">
                       <CopyId id="TKT-1024" type="ticket" className="font-bold text-brand-600" />
                       <Badge variant="error" className="py-0 px-1.5 text-[9px] uppercase font-bold tracking-wider">Critical</Badge>
                    </div>
                    <p className="text-sm font-medium text-text-primary line-clamp-1 group-hover:text-brand-700 transition-colors">Payment gateway failing for premium users</p>
                 </div>
              </div>
            </div>

            {/* Jira Sync */}
            <div className="bg-bg-surface rounded-xl shadow-sm border border-info-text/20 overflow-hidden">
              <div className="bg-info-bg p-3.5 border-b border-info-text/20 flex items-center justify-between">
                <h3 className="font-bold text-info-text flex items-center gap-2"><RefreshCw size={16} /> Jira Details</h3>
                <span className="text-xs font-mono text-info-text">Synced 2m ago</span>
              </div>
              <div className="p-4 space-y-2.5 text-[13px]">
                <div className="flex justify-between border-b border-border-subtle pb-1.5"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Issue Key</span><CopyId id="JIRA-4092" type="jira" /></div>
                <div className="flex justify-between border-b border-border-subtle pb-1.5"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Project</span><span className="font-medium">SIA (Secure Infra)</span></div>
                <div className="flex justify-between border-b border-border-subtle pb-1.5"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Type</span><span className="font-medium text-error-text">Bug</span></div>
                <div className="flex justify-between pb-1.5"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Status</span><span className="bg-bg-surface-alt px-2 py-0.5 rounded text-xs font-medium">Open</span></div>
                <button className="w-full mt-2 h-10 bg-brand-500 text-bg-bg-surface rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">Open in Jira</button>
              </div>
            </div>
            
            {/* Time Tracking */}
            <div className="bg-bg-surface rounded-xl shadow-sm border border-border-subtle p-5">
              <h3 className="font-sans tracking-tight text-base font-bold text-text-primary mb-3 flex items-center gap-2"><Clock size={20} className="text-text-secondary" /> Time Tracking</h3>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium">Logged Time</span><span className="text-text-secondary font-mono text-xs">2h 30m / 4h Est.</span></div>
              <div className="w-full h-2 bg-bg-surface-alt rounded-full overflow-hidden mb-4"><div className="bg-brand-500 h-full" style={{ width: '62.5%' }}></div></div>
              <button className="w-full h-10 border border-border-default rounded-lg text-sm font-medium hover:bg-bg-page transition-colors">Log Time</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
