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

replaceInFile('src/pages/Tasks.tsx', [
    {
        search: /<ArrowUpRight size=\{12\} \/> \{task\.linked\}/g,
        replace: '<ArrowUpRight size={12} /> <CopyId id={task.linked} type="ticket" />'
    }
]);

