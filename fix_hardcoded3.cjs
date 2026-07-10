const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

content = content.replace("isEmail \\n    ? 'Users from", "isEmail \n    ? 'Users from");
content = content.replace("ASAP.'\\n    : 'I am getting", "ASAP.'\n    : 'I am getting");

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
