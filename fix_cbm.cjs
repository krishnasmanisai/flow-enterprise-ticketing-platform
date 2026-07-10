const fs = require('fs');

let content = fs.readFileSync('src/pages/CreatedByMe.tsx', 'utf8');

content = content.replace(/<td className="px-3 py-3 font-medium text-text-primary truncate max-w-\[250px\]">\{t.subject\}<\/td>/g, '<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px]" title={t.subject}>{t.subject}</div></td>');
content = content.replace(/<td className="py-3 px-5/g, '<td className="px-3 py-3');
content = content.replace(/<th className="py-3 px-5/g, '<th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]');

fs.writeFileSync('src/pages/CreatedByMe.tsx', content);
