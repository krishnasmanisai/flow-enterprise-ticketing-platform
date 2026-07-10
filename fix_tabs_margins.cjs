const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

content = content.replace(
  /<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-6">/g,
  '<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden">'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
