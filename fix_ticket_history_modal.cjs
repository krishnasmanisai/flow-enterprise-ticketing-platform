const fs = require('fs');
let content = fs.readFileSync('src/components/TicketHistoryModal.tsx', 'utf-8');

content = content.replace(
  /<div className="fixed left-1\/2 top-1\/2 -translate-x-1\/2 -translate-y-1\/2 w-full max-w-lg bg-bg-page shadow-2xl z-50 rounded-xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden max-h-\[85vh\] border border-border-strong">/,
  '<div role="dialog" aria-modal="true" aria-labelledby="history-modal-title" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-bg-page shadow-2xl z-50 rounded-xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden max-h-[85vh] border border-border-strong">'
);
content = content.replace(
  /<h2 className="text-base font-semibold text-text-primary tracking-tight">Ticket Historical<\/h2>/,
  '<h2 id="history-modal-title" className="text-base font-semibold text-text-primary tracking-tight">Ticket Historical</h2>'
);

fs.writeFileSync('src/components/TicketHistoryModal.tsx', content);
