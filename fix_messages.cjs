const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

const oldMessagesPortal = `  const messagesPortal = [
    { sender: 'System', type: 'system', content: 'Ticket SLA assigned: Gold Tier SLA (4h resolution)', time: 'Oct 24, 08:16 AM', isCustomer: false },
    { sender: 'Bob S.', type: 'customer', content: 'I am getting a 500 error every time I try to hit the /v2/login endpoint. It worked fine yesterday.', time: 'Oct 24, 08:15 AM', isCustomer: true, role: 'Customer' },
    { sender: 'System', type: 'internal', content: 'Auto-assigned to DevOps queue based on routing rules.', time: 'Oct 24, 08:18 AM', isCustomer: false },
    { sender: 'System', type: 'public', content: 'Hi Bob, your request has been received and assigned to our DevOps team.', time: 'Oct 24, 08:20 AM', isCustomer: false },
    { sender: 'Alice Agent', type: 'internal', content: 'Checked Datadog. Seeing spikes in latency. Might be related to the recent deploy.', time: 'Oct 24, 08:30 AM', isCustomer: false, role: 'DevOps' },
    { sender: 'Alice Agent', type: 'public', content: 'Hi Bob, we are looking into this right now. Our monitoring shows some elevated error rates on that endpoint. We expect a fix shortly.', time: 'Oct 24, 08:35 AM', isCustomer: false, role: 'DevOps' }
  ];`;

const newMessagesPortal = `  const messagesPortal = [
    { sender: 'Bob S.', type: 'customer', content: 'I am getting a 500 error every time I try to hit the /v2/login endpoint. It worked fine yesterday.', time: 'Oct 24, 08:15 AM', isCustomer: true, role: 'Customer', attachments: [{name: 'error_trace.log', size: '24 KB'}] },
    { sender: 'System', type: 'system', content: 'Ticket SLA assigned: Gold Tier SLA (4h resolution)', time: 'Oct 24, 08:16 AM', isCustomer: false },
    { sender: 'System', type: 'internal', content: 'Auto-assigned to DevOps queue based on routing rules.', time: 'Oct 24, 08:18 AM', isCustomer: false },
    { sender: 'Alice Agent', type: 'internal', content: 'Checked Datadog. Seeing spikes in latency. Might be related to the recent deploy.', time: 'Oct 24, 08:30 AM', isCustomer: false, role: 'DevOps' },
    { sender: 'Alice Agent', type: 'public', content: 'Hi Bob, we are looking into this right now. Our monitoring shows some elevated error rates on that endpoint. We expect a fix shortly.', time: 'Oct 24, 08:35 AM', isCustomer: false, role: 'DevOps' },
    { sender: 'Bob S.', type: 'customer', content: 'Thanks Alice! Also I noticed it mostly happens on the mobile app.', time: 'Oct 24, 08:40 AM', isCustomer: true, role: 'Customer' },
    { sender: 'Alice Agent', type: 'public', content: 'Got it, thanks for the additional detail. That helps us narrow it down.', time: 'Oct 24, 08:45 AM', isCustomer: false, role: 'DevOps' }
  ];`;

content = content.replace(oldMessagesPortal, newMessagesPortal);
fs.writeFileSync('src/pages/TicketDetails.tsx', content);
