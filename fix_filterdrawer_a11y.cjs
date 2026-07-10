const fs = require('fs');
let content = fs.readFileSync('src/components/FilterDrawer.tsx', 'utf-8');

content = content.replace(
  /<div className="fixed inset-y-0 right-0 w-\[400px\] bg-bg-page shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-border-strong">/,
  '<div role="dialog" aria-modal="true" aria-labelledby="filter-drawer-title" className="fixed inset-y-0 right-0 w-[400px] bg-bg-page shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-border-strong">'
);

content = content.replace(
  /<h2 className="text-base font-semibold text-text-primary tracking-tight">Advanced Filters<\/h2>/,
  '<h2 id="filter-drawer-title" className="text-base font-semibold text-text-primary tracking-tight">Advanced Filters</h2>'
);

fs.writeFileSync('src/components/FilterDrawer.tsx', content);
