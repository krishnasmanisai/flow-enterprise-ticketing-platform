const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

content = content.replace(
  'return (\n      {/* Mobile Backdrop */}',
  'return (\n    <>\n      {/* Mobile Backdrop */}'
);

content = content.replace('</aside>\n  );\n}', '</aside>\n    </>\n  );\n}');

fs.writeFileSync('src/components/Sidebar.tsx', content);
