import { ArrowLeft, Edit3, CheckCircle, Clock, CheckSquare, RefreshCw, Paperclip, MessageSquare } from 'lucide-react';
import { Page } from '../types';
import { CopyId } from '../components/ui/CopyId';

export default function TaskDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="flex flex-col bg-bg-page">
      <header className="bg-bg-surface border-b border-border-default px-8 py-4 shrink-0 shadow-sm z-10">
        <div className="flex flex-col gap-2 max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-text-secondary font-mono text-xs uppercase tracking-wide">
            <button onClick={() => onNavigate('tasks')} className="flex items-center hover:text-brand-600 transition-colors group">
              <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Tasks
            </button>
            <span className="text-text-muted">/</span>
            <CopyId id="TSK-25" type="task" className="text-brand-600 font-bold" />
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <h1 className="font-sans tracking-tight text-2xl font-bold text-text-primary flex items-center gap-3">
              <CheckSquare size={28} className="text-primary" />
              API Rate Limit Exceeded on Prod
              <span className="text-xs font-mono bg-bg-surface-alt px-2 py-1 rounded border border-border-default ml-2"><CopyId id="JIRA-4092" type="jira" /></span>
            </h1>
            <div className="flex items-center gap-3">
              <button className="h-10 px-4 bg-bg-surface text-text-primary border border-border-default rounded-lg font-medium text-sm hover:bg-bg-surface-hover transition-colors flex items-center gap-2">
                <Edit3 size={16} /> Edit
              </button>
              <button className="h-10 px-6 bg-brand-500 text-white rounded-lg font-medium text-sm hover:bg-brand-600 transition-colors shadow-sm flex items-center gap-2">
                <CheckCircle size={16} /> Resolve Task
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 bg-bg-page">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-bg-surface rounded-xl shadow-sm border border-border-subtle p-6">
              <h2 className="font-sans tracking-tight text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
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

            <div className="bg-bg-surface rounded-xl shadow-sm border border-border-subtle p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-sans tracking-tight text-lg font-bold text-text-primary flex items-center gap-2">
                  <Paperclip size={20} className="text-text-secondary" /> Attachments (2)
                </h2>
                <button className="text-primary text-sm font-medium hover:underline">Add</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border border-border-default rounded-lg hover:bg-bg-page transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded bg-error-bg text-error-text flex items-center justify-center shrink-0 font-mono text-xs font-bold">PDF</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">Grafana_Spike_Report.pdf</p>
                    <p className="text-xs text-text-secondary">1.2 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border-default rounded-lg hover:bg-bg-page transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded bg-info-bg text-info-text flex items-center justify-center shrink-0 font-mono text-xs font-bold">TXT</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">error_logs_snippet.txt</p>
                    <p className="text-xs text-text-secondary">45 KB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-bg-surface rounded-xl shadow-sm border border-info-text/20 overflow-hidden">
              <div className="bg-info-bg p-4 border-b border-info-text/20 flex items-center justify-between">
                <h3 className="font-bold text-info-text flex items-center gap-2"><RefreshCw size={16} /> Jira Details</h3>
                <span className="text-xs font-mono text-info-text">Synced 2m ago</span>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-border-subtle pb-2"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Issue Key</span><CopyId id="JIRA-4092" type="jira" /></div>
                <div className="flex justify-between border-b border-border-subtle pb-2"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Project</span><span className="font-medium">SIA (Secure Infra)</span></div>
                <div className="flex justify-between border-b border-border-subtle pb-2"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Type</span><span className="font-medium text-error-text">Bug</span></div>
                <div className="flex justify-between pb-2"><span className="text-text-secondary uppercase text-[10px] font-bold tracking-wider">Status</span><span className="bg-bg-surface-alt px-2 py-0.5 rounded text-xs font-medium">Open</span></div>
                <button className="w-full mt-2 h-10 bg-brand-500 text-bg-bg-surface rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">Open in Jira</button>
              </div>
            </div>

            <div className="bg-bg-surface rounded-xl shadow-sm border border-border-subtle p-6">
              <h3 className="font-sans tracking-tight text-lg font-bold text-text-primary mb-4 flex items-center gap-2"><Clock size={20} className="text-text-secondary" /> Time Tracking</h3>
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
