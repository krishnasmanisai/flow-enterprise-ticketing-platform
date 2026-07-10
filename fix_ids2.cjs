const fs = require('fs');

function replaceInFile(file, replaces) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // add import if we have replacements
    for (const r of replaces) {
        if (content.match(r.search)) {
            content = content.replace(r.search, r.replace);
            changed = true;
        }
    }
    
    if (changed && !content.includes("import { CopyId }")) {
        // find last import
        const lastImportMatch = content.match(/import .*?;/g);
        if (lastImportMatch) {
            const lastImport = lastImportMatch[lastImportMatch.length - 1];
            content = content.replace(lastImport, lastImport + "\nimport { CopyId } from '../components/ui/CopyId';");
        }
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}

// 1. Dashboard.tsx
replaceInFile('src/pages/Dashboard.tsx', [
    {
        search: /<span className="font-mono text-\[11px\] font-medium text-text-secondary">\{ticket\.id\}<\/span>/g,
        replace: '<span className="text-[11px]"><CopyId id={ticket.id} type="ticket" /></span>'
    }
]);

// 2. MyTickets.tsx
replaceInFile('src/pages/MyTickets.tsx', [
    {
        search: /<td className="py-3 px-4 font-mono font-medium text-text-primary">\{t\.id\}<\/td>/g,
        replace: '<td className="py-3 px-4"><CopyId id={t.id} type="ticket" /></td>'
    }
]);

// 3. CreatedByMe.tsx
replaceInFile('src/pages/CreatedByMe.tsx', [
    {
        search: /<td className="py-3 px-4 font-mono font-medium text-text-primary">\{t\.id\}<\/td>/g,
        replace: '<td className="py-3 px-4"><CopyId id={t.id} type="ticket" /></td>'
    }
]);

// 7. TicketDetails.tsx
replaceInFile('src/pages/TicketDetails.tsx', [
    {
        search: /<h1 className="text-2xl font-bold text-text-primary tracking-tight">TKT-1088<\/h1>/g,
        replace: '<div className="text-2xl font-bold text-text-primary tracking-tight"><CopyId id="TKT-1088" type="ticket" /></div>'
    }
]);

// 8. TaskDetails.tsx
replaceInFile('src/pages/TaskDetails.tsx', [
    {
        search: /<h1 className="text-xl font-bold text-text-primary tracking-tight">TSK-8492<\/h1>/g,
        replace: '<div className="text-xl font-bold text-text-primary tracking-tight"><CopyId id="TSK-8492" type="task" /></div>'
    }
]);

