const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

content = content.replace(
  /<aside className=\{\`relative flex flex-col h-full flex-shrink-0 z-50 border-r border-border-default bg-bg-surface transition-all duration-300 \$\{isCollapsed \? 'w-\[72px\]' : 'w-64'\}\`\}>/,
  '<aside aria-label="Sidebar Navigation" className={`relative flex flex-col h-full flex-shrink-0 z-50 border-r border-border-default bg-bg-surface transition-all duration-300 ${isCollapsed ? \'w-[72px]\' : \'w-64\'}`}>'
);

content = content.replace(
  /<nav className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">/,
  '<nav aria-label="Main Menu" className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">'
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
