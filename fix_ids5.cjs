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
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}

replaceInFile('src/pages/TaskDetails.tsx', [
    {
        search: /<span className="text-xs font-mono bg-surface-container-high px-2 py-1 rounded border border-outline-variant\/50 ml-2">JIRA-4092<\/span>/g,
        replace: '<span className="text-xs font-mono bg-surface-container-high px-2 py-1 rounded border border-outline-variant/50 ml-2"><CopyId id="JIRA-4092" type="jira" /></span>'
    }
]);

