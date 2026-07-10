const fs = require('fs');
let content = fs.readFileSync('src/pages/MyTickets.tsx', 'utf-8');

// Replace table with responsive card rendering for mobile
content = content.replace(/<table className="w-full text-left border-collapse whitespace-nowrap">/g, 
  '<table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">');

const mobileCards = `
        <div className="md:hidden flex flex-col gap-3 p-4">
          {sortedTickets.map((t, i) => (
            <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3" onClick={() => onNavigate(\`/ticket_details?id=\${t.id}\`)}>
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
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded border border-border-default bg-bg-page flex items-center justify-center text-[9px] font-bold text-text-primary">
                     {t.assignee.charAt(0)}
                   </div>
                   <span className="text-[11px]">{t.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
`;

content = content.replace('</table>\n        </div>', '</table>\n        </div>\n' + mobileCards);

fs.writeFileSync('src/pages/MyTickets.tsx', content);
