const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// Fix the variable definitions
content = content.replace(/isEmail \? '\{customerName\}' : 'Bob S\.'/g, "isEmail ? 'Sarah Connor' : 'Bob S.'");
content = content.replace(/isEmail \? '\{customerInitials\}' : 'BS'/g, "isEmail ? 'SC' : 'BS'");
content = content.replace(/isEmail \? '\{customerEmail\}' : 'bob\.s@globex\.com'/g, "isEmail ? 'sarah.connor@acmecorp.com' : 'bob.s@globex.com'");
content = content.replace(/isEmail \? '\{customerCompany\}' : 'Globex'/g, "isEmail ? 'Acme Corp' : 'Globex'");
content = content.replace(/isEmail \? '\{customerPhone\}' : '\+1 555-9921'/g, "isEmail ? '+1 555-0198' : '+1 555-9921'");
content = content.replace(/isEmail \? '\{customerBU\}' : 'DevOps'/g, "isEmail ? 'IT Operations' : 'DevOps'");

content = content.replace(/isEmail \? '\{originalRequestTime\}' : 'Oct 24, 08:15 AM UTC'/g, "isEmail ? 'Oct 24, 08:00 AM UTC' : 'Oct 24, 08:15 AM UTC'");
content = content.replace(/isEmail \? '\{originalRequestSubject\}' : 'Login API returning 500'/g, "isEmail ? 'Users unable to authenticate in APAC region' : 'Login API returning 500'");
content = content.replace(/isEmail \n    \? '\{originalRequestBody\}'\n    : 'I am getting/g, "isEmail \\n    ? 'Users from the APAC region (specifically Japan and Singapore) are reporting timeouts when attempting to log in via SSO. The error logs show 500 Internal Server Errors originating from the Auth Gateway. Started around 08:00 AM UTC. Please help ASAP.'\\n    : 'I am getting");

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
