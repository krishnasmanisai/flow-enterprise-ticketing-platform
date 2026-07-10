const fs = require('fs');
let content = fs.readFileSync('src/pages/InternalUsers.tsx', 'utf8');

// fix thead
content = content.replace(/<thead>\n\s*<tr className="border-b border-border-default bg-bg-page">>\n\s*<tr>/g, 
  '<thead>\n                <tr className="border-b border-border-default bg-bg-page">');

// fix td unclosed span for ID
content = content.replace(/<td className="px-3 py-3"><span className="text-\[11px\] text-text-secondary">\{user.id\}<\/td>/g, 
  '<td className="px-3 py-3"><span className="text-[11px] text-text-secondary">{user.id}</span></td>');

// fix row hover index
content = content.replace(/<tr key=\{user.id\} className="hover:bg-bg-surface-hover transition-colors">/g, 
  '<tr key={user.id} className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${index % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}`}>');
  
// I notice filteredUsers.map((user) => ... doesn't have index
content = content.replace(/filteredUsers\.map\(\(user\)/g, 'filteredUsers.map((user, index)');

fs.writeFileSync('src/pages/InternalUsers.tsx', content);
