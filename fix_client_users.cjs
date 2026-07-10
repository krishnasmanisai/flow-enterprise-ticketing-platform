const fs = require('fs');

function fixClientConfiguration() {
    let content = fs.readFileSync('src/pages/ClientConfiguration.tsx', 'utf8');
    content = content.replace(/<td className="px-3 py-3"><div className="text-xs font-medium text-text-primary">\s*<div className="flex items-center gap-3">/g, 
        '<td className="px-3 py-3">\n                      <div className="flex items-center gap-3 text-xs font-medium text-text-primary">');
    // I replaced the unclosed div by just adding the classes to the inner div.
    fs.writeFileSync('src/pages/ClientConfiguration.tsx', content);
}
fixClientConfiguration();
