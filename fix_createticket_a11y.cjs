const fs = require('fs');
let content = fs.readFileSync('src/pages/CreateTicketFlow.tsx', 'utf-8');

content = content.replace(
  /<aside className="fixed inset-y-0 right-0 w-full max-w-2xl bg-bg-page shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-border-strong">/,
  '<aside role="dialog" aria-modal="true" aria-labelledby="create-ticket-title" className="fixed inset-y-0 right-0 w-full max-w-2xl bg-bg-page shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-border-strong">'
);

content = content.replace(
  /<h2 className="text-base font-semibold text-text-primary tracking-tight">/,
  '<h2 id="create-ticket-title" className="text-base font-semibold text-text-primary tracking-tight">'
);

fs.writeFileSync('src/pages/CreateTicketFlow.tsx', content);
