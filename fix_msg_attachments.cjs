const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

const attachCode = `                        <div className={\`text-[13px] leading-relaxed whitespace-pre-wrap mt-3 font-medium \${isSystem ? 'text-text-muted italic' : 'text-text-primary'}\`}>
                          {msg.content}
                        </div>
                        
                        {(msg as any).attachments && (msg as any).attachments.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(msg as any).attachments.map((att: any, idx: number) => (
                               <div key={idx} className="flex items-center gap-2 border border-border-default rounded bg-bg-page px-2 py-1 cursor-pointer hover:border-border-strong transition-colors">
                                 <Paperclip size={12} className="text-text-muted" />
                                 <span className="text-[11px] font-medium text-text-primary">{att.name}</span>
                                 <span className="text-[10px] font-mono text-text-muted">{att.size}</span>
                               </div>
                            ))}
                          </div>
                        )}
`;

content = content.replace(/<div className={`text-\[\13px\] leading-relaxed whitespace-pre-wrap mt-3 font-medium \${isSystem \? 'text-text-muted italic' : 'text-text-primary'}`}>\s*\{msg\.content\}\s*<\/div>/, attachCode);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
