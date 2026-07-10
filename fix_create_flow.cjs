const fs = require('fs');
let content = fs.readFileSync('src/pages/CreateTicketFlow.tsx', 'utf-8');

if (!content.includes('RichTextEditor')) {
    // it's used but not imported
}

if (!content.includes('import { RichTextEditor }')) {
    content = content.replace(
        "import { Button } from '../components/ui/Button';",
        "import { Button } from '../components/ui/Button';\nimport { RichTextEditor } from '../components/ui/RichTextEditor';"
    );
    fs.writeFileSync('src/pages/CreateTicketFlow.tsx', content);
}
