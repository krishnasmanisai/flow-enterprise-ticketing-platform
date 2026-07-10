const fs = require('fs');

let content = fs.readFileSync('src/components/ui/RichTextEditor.tsx', 'utf8');

if (!content.includes('useEffect')) {
  content = content.replace("import React from 'react';", "import React, { useEffect } from 'react';");
}

const useEffectSnippet = `
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
`;

if (!content.includes('editor.commands.setContent')) {
  content = content.replace(
    /return \(\s*<div className=\{`border rounded-md/,
    `${useEffectSnippet}\n  return (\n    <div className={\`border rounded-md`
  );
}

// Add prose to tailwind config? We don't have tailwind typography plugin installed, so we should add basic styles manually or just remove 'prose' class. Wait, I added style block for .ProseMirror. It's fine.

fs.writeFileSync('src/components/ui/RichTextEditor.tsx', content);
