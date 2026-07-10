const fs = require('fs');
let content = fs.readFileSync('src/pages/GenerateReportDrawer.tsx', 'utf-8');

content = content.replace(
  /<div className="absolute top-2 right-2 bottom-2 w-full max-w-md bg-bg-surface rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">/,
  '<div role="dialog" aria-modal="true" aria-labelledby="generate-report-title" className="absolute top-2 right-2 bottom-2 w-full max-w-md bg-bg-surface rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">'
);

content = content.replace(
  /<h2 className="text-\[18px\] font-bold text-text-primary flex items-center gap-2">/,
  '<h2 id="generate-report-title" className="text-[18px] font-bold text-text-primary flex items-center gap-2">'
);

fs.writeFileSync('src/pages/GenerateReportDrawer.tsx', content);
