const fs = require('fs');
let content = fs.readFileSync('src/components/ReassignModal.tsx', 'utf8');

if (!content.includes('RichTextEditor')) {
  content = content.replace("import { Button } from './ui/Button';", "import { Button } from './ui/Button';\nimport { RichTextEditor } from './ui/RichTextEditor';");
}

content = content.replace(
  /<textarea\s+value=\{note\}\s+onChange=\{\(e\) => setNote\(e\.target\.value\)\}\s+placeholder="Explain why this ticket is being reassigned\.\.\."\s+className="input-base w-full h-24 p-3 resize-none text-sm"\s+\/>/g,
  '<RichTextEditor content={note} onChange={setNote} placeholder="Explain why this ticket is being reassigned..." minHeight="min-h-[96px]" />'
);

fs.writeFileSync('src/components/ReassignModal.tsx', content);
