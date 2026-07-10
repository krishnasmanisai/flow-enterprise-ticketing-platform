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
        search: /<span className="font-mono font-medium">JIRA-4092<\/span>/g,
        replace: '<CopyId id="JIRA-4092" type="jira" />'
    }
]);

