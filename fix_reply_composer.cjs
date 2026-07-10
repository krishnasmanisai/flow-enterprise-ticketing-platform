const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

content = content.replace(
  /<div className="card-base p-0 shadow-md border-border-strong overflow-hidden mt-4">/g,
  '<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-2">'
);

content = content.replace(
  /\{\/\* 6\. Bottom Utility Tabs \*\/\}\s*<div className="card-base p-0 overflow-hidden mt-6 shadow-sm border border-border-default">/,
  '        {/* 6. Bottom Utility Tabs */}\n        <div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-6">'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
