const fs = require('fs');

function replaceClassAndText(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // TICKET ID / TASK ID
    content = content.replace(/<span className="font-mono text-brand-500 hover:underline">/g, '<span className="text-[11px] text-brand-500 hover:underline">');
    content = content.replace(/<td className="px-3 py-3 font-mono text-text-secondary">\{task\.id\}<\/td>/g, '<td className="px-3 py-3"><span className="text-[11px] text-text-secondary">{task.id}</span></td>');
    content = content.replace(/<td className="px-3 py-3 font-mono text-text-secondary">\{t\.id\}<\/td>/g, '<td className="px-3 py-3"><span className="text-[11px] text-text-secondary">{t.id}</span></td>');
    content = content.replace(/<td className="px-3 py-3 font-mono text-text-secondary">\{ticket\.id\}<\/td>/g, '<td className="px-3 py-3"><span className="text-[11px] text-text-secondary">{ticket.id}</span></td>');

    // Title
    content = content.replace(/<span className="font-medium text-text-secondary truncate max-w-\[200px\] block"/g, '<div className="text-xs font-medium text-text-primary truncate max-w-[240px]"');
    content = content.replace(/<span className="font-medium text-text-secondary truncate max-w-\[280px\]"/g, '<div className="text-xs font-medium text-text-primary truncate max-w-[240px]"');
    content = content.replace(/<div className="flex items-center gap-2">\s*\{t\.icon === 'lock'.*?\s*<span className="font-medium text-text-primary truncate max-w-\[280px\]"/g, '<div className="flex items-center gap-2">\n                      {t.icon === \'lock\' ? <Lock size={14} className="text-text-muted shrink-0" /> : <MessageSquare size={14} className="text-text-muted shrink-0" />}\n                      <div className="text-xs font-medium text-text-primary truncate max-w-[240px]"');
    content = content.replace(/<div className="flex items-center gap-2">\s*\{task\.icon === 'lock'.*?\s*<span className="font-medium text-text-primary truncate max-w-\[280px\]"/g, '<div className="flex items-center gap-2">\n                      {task.icon === \'lock\' ? <Lock size={14} className="text-text-muted shrink-0" /> : <MessageSquare size={14} className="text-text-muted shrink-0" />}\n                      <div className="text-xs font-medium text-text-primary truncate max-w-[240px]"');
    content = content.replace(/<\/span>\s*<\/div>/g, '</div>\n                    </div>');

    // Created by / Assignee / Client
    content = content.replace(/<td className="px-3 py-3 font-medium text-text-secondary">/g, '<td className="px-3 py-3 text-[11.5px] text-text-secondary">');
    content = content.replace(/<td className="px-3 py-3 text-text-secondary">/g, '<td className="px-3 py-3 text-[11.5px] text-text-secondary">');
    content = content.replace(/<span className="font-medium text-text-secondary">/g, '<span className="text-[11.5px] text-text-secondary">');

    // Icons
    content = content.replace(/<Mail size=\{16\}/g, '<Mail size={14}');
    content = content.replace(/<Phone size=\{16\}/g, '<Phone size={14}');
    content = content.replace(/<Monitor size=\{16\}/g, '<Monitor size={14}');
    content = content.replace(/<Globe size=\{16\}/g, '<Globe size={14}');

    fs.writeFileSync(file, content);
}

replaceClassAndText('src/pages/MyTickets.tsx');
replaceClassAndText('src/pages/Tasks.tsx');
replaceClassAndText('src/pages/TicketExplorer.tsx');
replaceClassAndText('src/pages/CreatedByMe.tsx');

