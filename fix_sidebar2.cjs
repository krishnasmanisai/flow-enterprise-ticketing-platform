const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

content = content.replace(
  'return (\n          {/* Mobile Backdrop */}',
  'return (\n    <>\n      {/* Mobile Backdrop */}'
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
