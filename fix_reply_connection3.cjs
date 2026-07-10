const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// Strip out the wrapper and the mb-4 and negative margins
content = content.replace(/<div className="flex flex-col gap-4">\{\/\* 4. Conversation Workspace \*\/\}/g, '{/* 4. Conversation Workspace */}');
content = content.replace(/<\/div>\{\/\* 6. Bottom Utility Tabs \*\/\}/g, '{/* 6. Bottom Utility Tabs */}');

content = content.replace(
  /<div className="flex flex-col rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden mb-4">/g, 
  '<div className="flex flex-col rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden mt-4">'
);

content = content.replace(
  /<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-\[-1rem\] relative z-10">/g, 
  '<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-b-xl rounded-t-none overflow-hidden mt-[-1px] border-t-0 relative z-10">'
);
// Also make conversation workspace bottom flat
content = content.replace(
  /<div className="flex flex-col rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden mt-4">/g,
  '<div className="flex flex-col rounded-t-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden mt-4">'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
