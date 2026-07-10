const fs = require('fs');

let content = fs.readFileSync('src/pages/CreateTicketFlow.tsx', 'utf8');

if (!content.includes('RichTextEditor')) {
  content = content.replace("import { Page } from '../types';", "import { Page } from '../types';\nimport { RichTextEditor } from '../components/ui/RichTextEditor';");
}

content = content.replace(
  /<textarea\s+value=\{description\}\s+onChange=\{e => setDescription\(e\.target\.value\)\}\s+className=\{`\$\{inputClass\} h-32 resize-none`\}\s+placeholder="Detailed description\.\.\."\s+\/>/g,
  '<RichTextEditor content={description} onChange={setDescription} placeholder="Detailed description..." />'
);

content = content.replace(
  /<textarea\s+value=\{description\}\s+onChange=\{e => setDescription\(e\.target\.value\)\}\s+className=\{`\$\{inputClass\} h-32 resize-none`\}\s+placeholder="Jira issue description\.\.\."\s+\/>/g,
  '<RichTextEditor content={description} onChange={setDescription} placeholder="Jira issue description..." />'
);

fs.writeFileSync('src/pages/CreateTicketFlow.tsx', content);
