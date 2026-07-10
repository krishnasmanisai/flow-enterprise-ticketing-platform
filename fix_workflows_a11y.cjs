const fs = require('fs');
let content = fs.readFileSync('src/pages/Workflows.tsx', 'utf-8');

content = content.replace(
  /<div key=\{idx\} className="card-base flex flex-col relative overflow-hidden group hover:border-border-strong transition-all h-\[240px\] cursor-pointer" onClick=\{\(\) => onNavigate\('edit_workflow'\)\}>/g,
  '<div key={idx} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === \'Enter\' || e.key === \' \') { e.preventDefault(); onNavigate(\'edit_workflow\'); } }} className="card-base flex flex-col relative overflow-hidden group hover:border-border-strong transition-all h-[240px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" onClick={() => onNavigate(\'edit_workflow\')}>'
);

fs.writeFileSync('src/pages/Workflows.tsx', content);
