const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// Wrap 4 and 5 in a div
content = content.replace(
  /\{\/\* 4. Conversation Workspace \*\/\}/g,
  '<div className="flex flex-col mt-4 shadow-sm border border-border-default rounded-xl overflow-hidden">\n        {/* 4. Conversation Workspace */}'
);

content = content.replace(
  /\{\/\* 6. Bottom Utility Tabs \*\/\}/g,
  '</div>\n        {/* 6. Bottom Utility Tabs */}'
);

// Now remove borders and border radii from the conversation and reply inner wrappers since the outer div handles it
content = content.replace(
  /<div className="flex flex-col rounded-t-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden mt-4">/g,
  '<div className="flex flex-col bg-bg-surface">'
);

content = content.replace(
  /<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-b-xl rounded-t-none overflow-hidden mt-\[-1px\] border-t-0 relative z-10">/g,
  '<div className="flex flex-col bg-bg-surface border-t border-border-default relative z-10">'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
