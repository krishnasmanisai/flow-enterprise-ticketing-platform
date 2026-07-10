const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

const profileReplacement = `
  const customerName = isEmail ? 'Sarah Connor' : 'Bob S.';
  const customerInitials = isEmail ? 'SC' : 'BS';
  const customerEmail = isEmail ? 'sarah.connor@acmecorp.com' : 'bob.s@globex.com';
  const customerCompany = isEmail ? 'Acme Corp' : 'Globex';
  const customerPhone = isEmail ? '+1 555-0198' : '+1 555-9921';
  const customerBU = isEmail ? 'IT Operations' : 'DevOps';
  
  const originalRequestTime = isEmail ? 'Oct 24, 08:00 AM UTC' : 'Oct 24, 08:15 AM UTC';
  const originalRequestSubject = isEmail ? 'Users unable to authenticate in APAC region' : 'Login API returning 500';
  const originalRequestBody = isEmail 
    ? 'Users from the APAC region (specifically Japan and Singapore) are reporting timeouts when attempting to log in via SSO. The error logs show 500 Internal Server Errors originating from the Auth Gateway. Started around 08:00 AM UTC. Please help ASAP.'
    : 'I am getting a 500 error every time I try to hit the /v2/login endpoint. It worked fine yesterday. See attached trace.';
`;

const setupStateIndex = content.indexOf(`const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL' | 'API'>(initialSource);`);
content = content.substring(0, setupStateIndex + `const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL' | 'API'>(initialSource);`.length) + profileReplacement + content.substring(setupStateIndex + `const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL' | 'API'>(initialSource);`.length);

content = content.replace(/Sarah Connor/g, '{customerName}');
content = content.replace(/"SC"/g, '"{customerInitials}"');
content = content.replace(/>SC</g, '>{customerInitials}<');
content = content.replace(/sarah.connor@acmecorp.com/g, '{customerEmail}');
content = content.replace(/Acme Corp/g, '{customerCompany}');
content = content.replace(/\+1 555-0198/g, '{customerPhone}');
content = content.replace(/IT Operations/g, '{customerBU}');

content = content.replace(/Oct 24, 08:00 AM UTC/g, '{originalRequestTime}');
content = content.replace(/Users unable to authenticate in APAC region/g, '{originalRequestSubject}');
content = content.replace(/Users from the APAC region \(specifically Japan and Singapore\) are reporting timeouts when attempting to log in via SSO\. The error logs show 500 Internal Server Errors originating from the Auth Gateway\. Started around 08:00 AM UTC\. Please help ASAP\./g, '{originalRequestBody}');

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
