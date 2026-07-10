const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

content = content.replace(/<CopyId id="TKT-1088"/g, '<CopyId id={ticketId}');

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
