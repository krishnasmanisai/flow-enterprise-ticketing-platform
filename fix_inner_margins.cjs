const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

content = content.replace(
  /<div className="rounded-xl bg-brand-50\/30 border border-brand-500\/20 shadow-sm relative overflow-hidden mt-2 flex flex-col">/g,
  '<div className="rounded-xl bg-brand-50/30 border border-brand-500/20 shadow-sm relative overflow-hidden flex flex-col">'
);

content = content.replace(
  /<div className="flex flex-col mt-4 shadow-sm border border-border-default rounded-xl overflow-hidden">/g,
  '<div className="flex flex-col shadow-sm border border-border-default rounded-xl overflow-hidden">'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
