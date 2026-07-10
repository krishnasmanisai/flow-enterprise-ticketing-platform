const fs = require('fs');
let content = fs.readFileSync('src/pages/ClientConfiguration.tsx', 'utf-8');

content = content.replace(
  /<tr key=\{idx\} className="hover:bg-bg-surface-hover transition-colors group cursor-pointer"\s+onClick=\{\(\) => onNavigate\('client_details'\)\}>/g,
  '<tr key={idx} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === \'Enter\' || e.key === \' \') { e.preventDefault(); onNavigate(\'client_details\'); } }} className="hover:bg-bg-surface-hover transition-colors group cursor-pointer focus-visible:outline-none focus-visible:bg-bg-surface-hover" onClick={() => onNavigate(\'client_details\')}>'
);

fs.writeFileSync('src/pages/ClientConfiguration.tsx', content);
