const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// Find the Conversation Workspace
const convStart = content.indexOf('{/* 4. Conversation Workspace */}');
const replyEndIndex = content.indexOf('{/* 6. Bottom Utility Tabs */}');

let before = content.substring(0, convStart);
let middle = content.substring(convStart, replyEndIndex);
let after = content.substring(replyEndIndex);

// In the middle part, we want to remove the borders separating them
// or wrap them in a container that has less gap.
middle = middle.replace(
  /<div className="flex flex-col rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden">/,
  '<div className="flex flex-col rounded-xl bg-bg-surface border border-border-default shadow-sm overflow-hidden mb-4">'
);
// Make the Reply Composer lack the top margin if we want them connected. But mb-4 is already tight.
// Actually, let's wrap 4 and 5 in a div.
middle = `<div className="flex flex-col gap-4">
` + middle + `</div>
`;

fs.writeFileSync('src/pages/TicketDetails.tsx', before + middle + after);
