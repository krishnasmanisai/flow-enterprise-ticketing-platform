const fs = require('fs');

let content = fs.readFileSync('src/pages/TicketExplorer.tsx', 'utf8');

content = content.replace(/<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-\[240px\]">Authentication gateway timeout during peak load times<\/td>/g, '<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px]">Authentication gateway timeout during peak load times</div></td>');
content = content.replace(/<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-\[240px\]">Update dependency for internal cryptography module<\/td>/g, '<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-[240px]">Update dependency for internal cryptography module</div></td>');
content = content.replace(/td className="px-3 py-3"><div className="text-xs font-medium text-text-primary truncate max-w-\[240px\]" flex items-center gap-2">\s*<Lock size=\{14\} className="text-brand-500 mr-2" \/>\s*Client portal showing 500 error on checkout page\s*<\/td>/g, '<td className="px-3 py-3"><div className="flex items-center gap-2"><Lock size={14} className="text-brand-500 shrink-0" /><div className="text-xs font-medium text-text-primary truncate max-w-[240px]">Client portal showing 500 error on checkout page</div></div></td>');

fs.writeFileSync('src/pages/TicketExplorer.tsx', content);
