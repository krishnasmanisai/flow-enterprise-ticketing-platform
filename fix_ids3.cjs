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

replaceInFile('src/pages/TicketDetails.tsx', [
    {
        search: /<span className="font-mono text-sm font-semibold text-text-primary">TKT-1088<\/span>/g,
        replace: '<CopyId id="TKT-1088" type="ticket" className="text-sm font-semibold" />'
    }
]);

