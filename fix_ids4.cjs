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

replaceInFile('src/pages/CreatedByMe.tsx', [
    {
        search: /<td className="py-3 px-4 font-mono font-medium text-text-primary group-hover:underline">\{t\.id\}<\/td>/g,
        replace: '<td className="py-3 px-4"><CopyId id={t.id} type="ticket" /></td>'
    }
]);

replaceInFile('src/pages/TaskDetails.tsx', [
    {
        search: /<span className="text-primary font-bold">#TSK-25<\/span>/g,
        replace: '<CopyId id="TSK-25" type="task" className="text-primary font-bold" />'
    }
]);

