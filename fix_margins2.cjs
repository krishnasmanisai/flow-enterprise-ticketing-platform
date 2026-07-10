const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

content = content.replace(
  /<div className="rounded-xl bg-brand-50\/30 border border-brand-500\/20 shadow-sm relative overflow-hidden mt-2 flex flex-col">/,
  '<div className="rounded-xl bg-brand-50/30 border border-brand-500/20 shadow-sm relative overflow-hidden flex flex-col">'
);

content = content.replace(
  /<div className="flex flex-col gap-5 mt-2">/,
  '<div className="flex flex-col gap-4">'
);

content = content.replace(
  /<div className="flex flex-col mt-2 rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden">/,
  '<div className="flex flex-col rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden">'
);

content = content.replace(
  /<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-2">/,
  '<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden">'
);

content = content.replace(
  /<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-6">/,
  '<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-2">'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
