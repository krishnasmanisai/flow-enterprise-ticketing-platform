const fs = require('fs');

let content = fs.readFileSync('src/components/ui/RichTextEditor.tsx', 'utf8');

content = content.replace(
  /className=\{`border border-border-default rounded-md bg-bg-page focus-within:border-border-focus focus-within:ring-1 focus-within:ring-border-focus overflow-hidden flex flex-col \$\{className\}`\}/,
  'className={`border rounded-md overflow-hidden flex flex-col ${className || "border-border-default bg-bg-page focus-within:border-border-focus focus-within:ring-1 focus-within:ring-border-focus"}`}'
);

content = content.replace(
  /class: `prose prose-sm max-w-none focus:outline-none w-full p-4 \$\{minHeight\}`/,
  'class: `prose prose-sm max-w-none focus:outline-none w-full p-4 ${minHeight} ${className.includes("text-") ? "" : "text-text-primary"}`'
);

fs.writeFileSync('src/components/ui/RichTextEditor.tsx', content);
