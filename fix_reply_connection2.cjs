const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// Undo the wrapper if we messed it up
content = content.replace(/<div className="flex flex-col gap-4">\s*\{\/\* 4. Conversation Workspace \*\/\}/g, '{/* 4. Conversation Workspace */}');
content = content.replace(/<\/div>\s*\{\/\* 6. Bottom Utility Tabs \*\/\}/g, '{/* 6. Bottom Utility Tabs */}');

// Let's just wrap Conversation and Reply properly.
const convStart = content.indexOf('{/* 4. Conversation Workspace */}');
const replyEndIndex = content.indexOf('{/* 6. Bottom Utility Tabs */}');

let before = content.substring(0, convStart);
let middle = content.substring(convStart, replyEndIndex);
let after = content.substring(replyEndIndex);

// Let's replace the outer container for Conversation Workspace to be borderless if it's connected, or just keep it rounded
// We can change gap-4 in the middle to gap-2
middle = middle.replace(/<div className="flex flex-col gap-4">/, '<div className="flex flex-col rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden mb-4">');

// We will also make Reply Composer visually connected by not being a separate rounded-xl box
middle = middle.replace(/\{\/\* 5. Reply Composer \*\/\}\s*<div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden">/g, 
  '{/* 5. Reply Composer */}\n        <div className="flex flex-col bg-bg-surface border border-border-default shadow-sm rounded-xl overflow-hidden mt-[-1rem] relative z-10">'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', before + '<div className="flex flex-col gap-4">' + middle + '</div>' + after);
