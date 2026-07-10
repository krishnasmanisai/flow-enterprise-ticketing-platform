const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf-8');

// 1. Fix Modal Accessibility
content = content.replace(
  /<div className="fixed left-1\/2 top-1\/2 -translate-x-1\/2 -translate-y-1\/2 w-full max-w-md bg-bg-page shadow-2xl z-\[70\] rounded-xl flex flex-col animate-in zoom-in-95 duration-200 border border-border-strong">/,
  '<div role="dialog" aria-modal="true" aria-labelledby="bulk-assign-title" className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-bg-page shadow-2xl z-[70] rounded-xl flex flex-col animate-in zoom-in-95 duration-200 border border-border-strong">'
);

content = content.replace(
  /<h2 className="text-base font-semibold text-text-primary tracking-tight">Bulk Assign Tickets<\/h2>/,
  '<h2 id="bulk-assign-title" className="text-base font-semibold text-text-primary tracking-tight">Bulk Assign Tickets</h2>'
);

// 2. Fix Keyboard Accessibility on Table Rows
// By adding tabIndex={0} and onKeyDown
content = content.replace(
  /<tr key=\{ticket\.id\}\s+className=\{\`hover:bg-bg-surface-hover/g,
  '<tr key={ticket.id} tabIndex={0} role="button" aria-label={`View ticket ${ticket.id}`} onKeyDown={(e) => { if(e.key === \'Enter\' || e.key === \' \') onNavigate(\'ticket_details\') }} className={`hover:bg-bg-surface-hover focus-visible:outline-none focus-visible:bg-bg-surface-hover'
);

fs.writeFileSync('src/pages/Dashboard.tsx', content);
