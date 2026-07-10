const fs = require('fs');
let content = fs.readFileSync('src/pages/CreateTicketFlow.tsx', 'utf8');

if (!content.includes('import { RichTextEditor }')) {
  content = content.replace("import { ChevronLeft } from 'lucide-react';", "import { ChevronLeft } from 'lucide-react';\nimport { RichTextEditor } from '../components/ui/RichTextEditor';");
  fs.writeFileSync('src/pages/CreateTicketFlow.tsx', content);
}
