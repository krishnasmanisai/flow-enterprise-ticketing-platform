const fs = require('fs');
let content = fs.readFileSync('src/pages/ClientConfiguration.tsx', 'utf8');

// fix thead
content = content.replace(/<thead>\n\s*<tr className="border-b border-border-default bg-bg-page">>\n\s*<tr>/g, 
  '<thead>\n                <tr className="border-b border-border-default bg-bg-page">');

// fix td unclosed span
content = content.replace(/<td className="px-3 py-3"><span className="text-\[11px\] text-text-secondary">\n\s*\{client.modified\}\n\s*<\/td>/g, 
  '<td className="px-3 py-3"><span className="text-[11px] text-text-secondary">{client.modified}</span></td>');

// fix `i` which is undefined, it should be `index`
content = content.replace(/\$\{i \% 2 !== 0 \? 'bg-bg-surface-alt' : ''\}/g, 
  '${index % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}');

fs.writeFileSync('src/pages/ClientConfiguration.tsx', content);
