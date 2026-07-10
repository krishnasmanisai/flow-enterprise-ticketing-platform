const fs = require('fs');
let content = fs.readFileSync('src/pages/CreatedByMe.tsx', 'utf-8');

content = content.replace(/<table className="w-full text-left border-collapse whitespace-nowrap">/g, 
  '<table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">');

const mobileCards = `
              <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
                {sortedTickets.map((t, i) => (
                  <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3 cursor-pointer" onClick={() => onNavigate(\`/ticket_details?id=\${t.id}\`)}>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px]"><CopyId id={t.id} type="ticket" /></span>
                        <div className="font-medium text-text-primary">{t.subject}</div>
                      </div>
                      <Badge variant={t.status === 'Resolved' ? 'success' : t.status === 'In Progress' ? 'warning' : t.status === 'Open' ? 'info' : 'neutral'}>
                        {t.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-secondary">
                      <span>{t.requestor}</span>
                      <span className="font-mono text-text-muted">{t.created}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border-subtle">
                      <Badge variant={t.priority === 'Critical' ? 'error' : t.priority === 'High' ? 'warning' : t.priority === 'Medium' ? 'brand' : 'neutral'}>
                        {t.priority}
                      </Badge>
                      <span className="text-[11px] text-text-secondary">{t.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
`;

content = content.replace('</table>\n          </div>', '</table>\n' + mobileCards + '\n          </div>');

fs.writeFileSync('src/pages/CreatedByMe.tsx', content);
