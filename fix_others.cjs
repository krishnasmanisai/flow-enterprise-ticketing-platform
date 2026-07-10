const fs = require('fs');

function fixTableDesign(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // fix table class
    content = content.replace(/<table className=".*?"/g, '<table className="w-full text-left border-collapse whitespace-nowrap"');
    
    content = content.replace(/<thead className=".*?"/g, '<thead>\n              <tr className="border-b border-border-default bg-bg-page">');
    content = content.replace(/<tr className="border-b border-border-default bg-bg-page">\s*<tr\s*>/g, '<tr className="border-b border-border-default bg-bg-page">');
    
    // replace th
    content = content.replace(/<th className="py-3 px-6/g, '<th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]');
    
    // fix tbody class
    content = content.replace(/<tbody className="divide-y divide-border-subtle">/g, '<tbody className="divide-y divide-border-subtle">'); // check
    
    // fix tr class
    content = content.replace(/className="hover:bg-bg-surface-hover transition-colors group"/g, 
        'className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${i % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}`}');
    content = content.replace(/className="hover:bg-bg-surface-hover transition-colors group"/g, 
        'className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${index % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}`}');
    
    // replace td
    content = content.replace(/<td className="py-3 px-6/g, '<td className="px-3 py-3');
    content = content.replace(/<td className="py-4 px-6/g, '<td className="px-3 py-3');
    
    content = content.replace(/<td className="px-3 py-3 text-text-secondary font-mono text-xs">/g, '<td className="px-3 py-3"><span className="text-[11px] text-text-secondary">');
    content = content.replace(/<td className="px-3 py-3 text-text-secondary">/g, '<td className="px-3 py-3 text-[11.5px] text-text-secondary">');
    content = content.replace(/<td className="px-3 py-3 font-semibold text-text-primary">/g, '<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary">');
    content = content.replace(/<td className="px-3 py-3 font-medium text-text-primary">/g, '<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary">');

    fs.writeFileSync(file, content);
}

fixTableDesign('src/pages/InternalUsers.tsx');
fixTableDesign('src/pages/ClientConfiguration.tsx');
