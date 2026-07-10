const fs = require('fs');

// Fix types.ts
let typesContent = fs.readFileSync('src/types.ts', 'utf-8');
if (!typesContent.includes("export type Page = string")) {
  typesContent = typesContent.replace("export type Page = ", "export type PageType = ");
  typesContent += "\nexport type Page = PageType | string;\n";
  fs.writeFileSync('src/types.ts', typesContent);
}

// Fix App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
appContent = appContent.replace(/navigate\(\`\/\$\{p\}\`\)/g, "navigate(p.startsWith('/') ? p : `/${p}`)");
appContent = appContent.replace(/navigate\(\`\/\$\{p\}\`\)/g, "navigate(p.startsWith('/') ? p : `/${p}`)");
fs.writeFileSync('src/App.tsx', appContent);
