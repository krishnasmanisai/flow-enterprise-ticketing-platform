const fs = require('fs');
let content = fs.readFileSync('src/components/EditConfigurationModal.tsx', 'utf-8');

content = content.replace(
  /<div className="fixed inset-0 bg-text-primary\/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">/,
  '<div role="dialog" aria-modal="true" aria-labelledby="edit-config-title" className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">'
);
content = content.replace(
  /<h2 className="text-base font-bold text-text-primary flex items-center gap-2">/,
  '<h2 id="edit-config-title" className="text-base font-bold text-text-primary flex items-center gap-2">'
);

fs.writeFileSync('src/components/EditConfigurationModal.tsx', content);
