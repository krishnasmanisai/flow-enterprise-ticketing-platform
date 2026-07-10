const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// Replace the button with just the badge
const buttonMatch = `<button \n                    onClick={() => setTicketSource(s => s === 'EMAIL' ? 'PORTAL' : 'EMAIL')}\n                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-surface border border-border-default hover:bg-bg-surface-hover text-text-primary text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"\n                    title="Click to toggle ticket source mode for testing"\n                  >\n                    {ticketSource === 'EMAIL' ? <Mail size={12}/> : <Globe size={12}/>} \n                    {ticketSource}\n                  </button>`;

content = content.replace(buttonMatch, `<div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-surface border border-border-default text-text-primary text-[10px] font-bold uppercase tracking-wider shadow-sm">\n                    {ticketSource === 'EMAIL' ? <Mail size={12}/> : <Globe size={12}/>} \n                    {ticketSource}\n                  </div>`);

// What if the exact match above failed because of indentation? Let's use a regex instead.

content = content.replace(/<button[^>]*onClick=\{\(\) => setTicketSource[^>]*>[\s\S]*?<\/button>/, 
`<div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-surface border border-border-default text-text-primary text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {ticketSource === 'EMAIL' ? <Mail size={12}/> : <Globe size={12}/>} 
                    {ticketSource}
                  </div>`);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
