const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

const replacement3 = `        {/* 4. Conversation Workspace */}
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
        </div>`;

const newReplacement3 = `        {/* 4. Conversation Workspace */}
        <div className="flex flex-col mt-2 rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden">
          {messages.map((msg, i) => {
            const isCustomer = msg.type === 'customer';
            const isInternal = msg.type === 'internal';
            const isSystem = msg.type === 'system';
            
            return (
              <div key={i} className={\`p-5 transition-colors border-b border-border-default last:border-b-0
                \${isCustomer ? 'bg-bg-surface' : 
                  isInternal ? 'bg-[#fffcf0]' : 
                  isSystem ? 'bg-bg-surface-alt' : 
                  'bg-brand-50/10'}\`}>
                    
                  <div className="flex items-start gap-3">
                     <div className={\`flex items-center justify-center w-8 h-8 rounded-full shrink-0 shadow-sm
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
                              {isInternal && <Badge variant="warning" className="py-0.5 px-2 text-[9px] font-bold uppercase tracking-wider">Internal Note</Badge>}
                              {!isInternal && !isCustomer && !isSystem && <Badge variant="neutral" className="bg-brand-100 text-brand-700 border border-brand-500/20 py-0.5 px-2 text-[9px] font-bold uppercase tracking-wider">Public Reply</Badge>}
                          </div>
                          <span className="text-[11px] text-text-muted font-mono">{msg.time}</span>
                        </div>
                        
                        {ticketSource === 'EMAIL' && !isInternal && !isSystem && msg.emailDetails && (
                          <div className="mt-2 mb-2 text-[12px] text-text-secondary flex flex-col gap-1">
                            <div className="flex items-start gap-2"><span className="w-12 font-bold text-text-muted shrink-0">To:</span><span className="truncate font-medium">{msg.emailDetails.to}</span></div>
                            {msg.emailDetails.cc && <div className="flex items-start gap-2"><span className="w-12 font-bold text-text-muted shrink-0">CC:</span><span className="truncate font-medium">{msg.emailDetails.cc}</span></div>}
                          </div>
                        )}
                        
                        <div className={\`text-[14px] leading-relaxed whitespace-pre-wrap mt-2 font-medium \${isSystem ? 'text-text-muted italic' : 'text-text-primary'}\`}>
                          {msg.content}
                        </div>
                     </div>
                  </div>
              </div>
            );
          })}
        </div>`;

content = content.replace(replacement3, newReplacement3);
fs.writeFileSync('src/pages/TicketDetails.tsx', content);
