const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf-8');

content = content.replace(/<table className="w-full text-left border-collapse whitespace-nowrap">/g, 
  '<table className="w-full text-left border-collapse whitespace-nowrap hidden md:table">');

const mobileCards = `
        <div className="md:hidden flex flex-col gap-3 p-4 bg-bg-page">
          {sortedTickets.map((ticket, i) => (
            <div key={i} className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-sm flex flex-col gap-3 cursor-pointer" onClick={() => console.log('Open ticket', ticket.id)}>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px]"><CopyId id={ticket.id} type="ticket" /></span>
                  <div className="font-medium text-text-primary text-sm">{ticket.title}</div>
                </div>
                {getStatusBadge(ticket.status)}
              </div>
              <div className="flex justify-between items-center text-xs text-text-secondary">
                <span>{ticket.requestor} • {ticket.brand}</span>
                <span className="font-mono text-text-muted">{ticket.created}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border-subtle">
                {getPriorityBadge(ticket.priority)}
                <span className="text-xs text-text-secondary">{ticket.assignee}</span>
              </div>
            </div>
          ))}
        </div>
`;

content = content.replace('</table>\n        </div>', '</table>\n        </div>\n' + mobileCards);

fs.writeFileSync('src/pages/Dashboard.tsx', content);
