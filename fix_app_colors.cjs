const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/bg-background/g, 'bg-bg-page');
content = content.replace(/text-on-background/g, 'text-text-primary');
fs.writeFileSync('src/App.tsx', content);
