const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

const replacement2 = `        {/* 3. Original Request */}
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
        </div>`;

const newReplacement2 = `        {/* 3. Original Request */}
        <div className="rounded-xl bg-brand-50/30 border border-brand-500/20 shadow-sm relative overflow-hidden mt-2 flex flex-col">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
          <div className="p-5 flex items-start justify-between border-b border-brand-500/10 bg-brand-50/50">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded bg-brand-100 text-brand-700 flex items-center justify-center font-bold shadow-sm shrink-0 border border-brand-500/20">SC</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-text-primary text-base flex items-center gap-2 tracking-tight">
                    Sarah Connor
                    <Badge variant="neutral" className="bg-bg-surface border border-border-default text-[10px] py-0.5 px-2 font-bold uppercase tracking-wider shadow-sm">Original Request</Badge>
                  </div>
                  <div className="text-[11px] text-text-muted font-mono flex items-center gap-2">
                    Oct 24, 08:00 AM UTC
                  </div>
                </div>
                {ticketSource === 'EMAIL' ? (
                  <div className="mt-2 text-[12px] text-text-secondary flex flex-col gap-1">
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
            <div className="text-[14px] text-text-primary leading-relaxed whitespace-pre-wrap font-medium">
              Users from the APAC region (specifically Japan and Singapore) are reporting timeouts when attempting to log in via SSO. The error logs show 500 Internal Server Errors originating from the Auth Gateway. Started around 08:00 AM UTC. Please help ASAP.
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
        </div>`;

content = content.replace(replacement2, newReplacement2);
fs.writeFileSync('src/pages/TicketDetails.tsx', content);
