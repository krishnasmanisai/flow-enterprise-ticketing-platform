const fs = require('fs');

function fixTableDesign(file, isTaskOrExplorer) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // fix table class
    content = content.replace(/<table className=".*?"/g, '<table className="w-full text-left border-collapse whitespace-nowrap"');
    
    // fix thead and tr
    content = content.replace(/<thead className=".*?"/g, '<thead');
    content = content.replace(/<thead\s*>\s*<tr\s*>/g, '<thead>\n              <tr className="border-b border-border-default bg-bg-page">');
    // wait, we can just replace <thead.*?> with <thead> and then replace <tr> with <tr className="...">
    // actually, let's just do a specific regex
    content = content.replace(/<thead className="[^"]*sticky[^"]*">/g, '<thead>');
    content = content.replace(/<thead className="bg-bg-page text-xs font-semibold text-text-secondary tracking-wider sticky top-0 border-b border-border-default z-10">/g, '<thead>');
    
    // replace th
    content = content.replace(/<th className="py-3 px-4/g, '<th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]');
    content = content.replace(/<th className="py-3 px-3/g, '<th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]');
    content = content.replace(/<th className="px-4 py-3/g, '<th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em]');
    
    // special replacements for some ths in tasks/mytickets
    content = content.replace(/<th className="p-3 w-12 text-center/g, '<th className="px-3 py-2 text-[9.5px] font-medium text-text-muted uppercase tracking-[0.04em] text-center w-12');
    
    // fix tbody class
    content = content.replace(/<tbody className="divide-y divide-border-subtle text-sm">/g, '<tbody className="divide-y divide-border-subtle">');
    
    // fix tr class
    if (file.includes('Tasks.tsx')) {
        content = content.replace(/<tr\s*key=\{i\}\s*className="hover:bg-bg-surface-hover transition-colors cursor-pointer group bg-bg-surface"\s*onClick=\{.*?\}\s*>/g, 
        (match) => {
            return match.replace(/className=".*?"/, 'className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${i % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}`}');
        });
    } else {
         content = content.replace(/className="hover:bg-bg-surface-hover transition-colors group cursor-pointer"/g, 
         'className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${i % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}`}');
         content = content.replace(/className="hover:bg-bg-surface-hover transition-colors cursor-pointer group"/g, 
         'className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${i % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}`}');
         content = content.replace(/className="hover:bg-bg-surface-hover transition-colors group cursor-pointer bg-bg-surface"/g, 
         'className={`hover:bg-bg-surface-hover transition-colors group cursor-pointer ${i % 2 !== 0 ? \'bg-bg-surface-alt\' : \'\'}`}');
    }
    
    // replace td
    content = content.replace(/<td className="py-3 px-4/g, '<td className="px-3 py-3');
    content = content.replace(/<td className="py-3 px-3/g, '<td className="px-3 py-3');
    content = content.replace(/<td className="py-4 px-4/g, '<td className="px-3 py-3');

    fs.writeFileSync(file, content);
}

fixTableDesign('src/pages/MyTickets.tsx', false);
fixTableDesign('src/pages/Tasks.tsx', true);
fixTableDesign('src/pages/TicketExplorer.tsx', false);
fixTableDesign('src/pages/CreatedByMe.tsx', false);

