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
        search: /<span className="font-mono font-medium text-text-primary">\{ticket\.id\}<\/span>/g,
        replace: '<CopyId id={ticket.id} type="ticket" />'
    }
]);

// 2. MyTickets.tsx
replaceInFile('src/pages/MyTickets.tsx', [
    {
        search: /<td className="py-3 px-4 font-mono font-medium text-text-primary group-hover:underline">\{ticket\.id\}<\/td>/g,
        replace: '<td className="py-3 px-4"><CopyId id={ticket.id} type="ticket" /></td>'
    }
]);

// 3. CreatedByMe.tsx
replaceInFile('src/pages/CreatedByMe.tsx', [
    {
        search: /<td className="py-3 px-4 font-mono font-medium text-text-primary group-hover:underline">\{ticket\.id\}<\/td>/g,
        replace: '<td className="py-3 px-4"><CopyId id={ticket.id} type="ticket" /></td>'
    }
]);

// 4. Tasks.tsx
replaceInFile('src/pages/Tasks.tsx', [
    {
        search: /<td className="py-3 px-4 font-mono font-medium text-text-primary group-hover:underline">\{task\.id\}<\/td>/g,
        replace: '<td className="py-3 px-4"><CopyId id={task.id} type="task" /></td>'
    }
]);

// 5. TicketExplorer.tsx
replaceInFile('src/pages/TicketExplorer.tsx', [
    {
        search: /<td className="px-4 py-3 font-mono font-medium text-text-primary">SIA-4092<\/td>/g,
        replace: '<td className="px-4 py-3"><CopyId id="SIA-4092" type="jira" /></td>'
    },
    {
        search: /<td className="px-4 py-3 font-mono font-medium text-text-primary">SIA-4088<\/td>/g,
        replace: '<td className="px-4 py-3"><CopyId id="SIA-4088" type="jira" /></td>'
    },
    {
        search: /<td className="px-4 py-3 font-mono font-medium text-text-primary">SEC-1102<\/td>/g,
        replace: '<td className="px-4 py-3"><CopyId id="SEC-1102" type="jira" /></td>'
    }
]);

// 6. TicketHistory.tsx
replaceInFile('src/pages/TicketHistory.tsx', [
    {
        search: /<div className="text-brand-600 font-mono text-sm mt-1 font-medium bg-brand-50 inline-block px-2 py-0\.5 rounded">Jira: EO-85316<\/div>/g,
        replace: '<div className="text-brand-600 font-mono text-sm mt-1 font-medium bg-brand-50 inline-block px-2 py-0.5 rounded"><CopyId id="EO-85316" type="jira" className="text-brand-600" /></div>'
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
        search: /<h1 className="text-2xl font-bold text-text-primary tracking-tight">TSK-8492<\/h1>/g,
        replace: '<div className="text-2xl font-bold text-text-primary tracking-tight"><CopyId id="TSK-8492" type="task" /></div>'
    }
]);

