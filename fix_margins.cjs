const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

content = content.replace(/mt-2/g, ''); // Be careful, but let's check where mt-2 is used
fs.writeFileSync('src/pages/TicketDetails.tsx', content);
