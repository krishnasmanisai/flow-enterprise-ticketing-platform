const fs = require('fs');
let content = fs.readFileSync('src/components/ui/Button.tsx', 'utf-8');
content = content.replace('children: React.ReactNode;', 'children?: React.ReactNode;');
fs.writeFileSync('src/components/ui/Button.tsx', content);
