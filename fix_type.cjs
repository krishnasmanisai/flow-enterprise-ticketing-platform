const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// Cast to any for the emailDetails properties
content = content.replace(/msg\.emailDetails/g, "(msg as any).emailDetails");

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
