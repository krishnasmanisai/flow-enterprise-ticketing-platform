const fs = require('fs');

let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf8');

if (!content.includes('RichTextEditor')) {
  content = content.replace("import { CopyId } from '../components/ui/CopyId';", "import { CopyId } from '../components/ui/CopyId';\nimport { RichTextEditor } from '../components/ui/RichTextEditor';");
}

const target = /<textarea[\s\S]*?<\/textarea>/;

const replacement = `<RichTextEditor 
              content={replyContent} 
              onChange={setReplyContent} 
              placeholder={activeTab === 'internal' ? 'Write an internal note (only visible to agents)...' : 'Type your reply to Sarah Connor...'}
              className={activeTab === 'internal' ? 'bg-warning-bg/20 border-warning-text/20 focus-within:border-warning-text focus-within:ring-1 focus-within:ring-warning-text' : 'bg-bg-page border-border-default focus-within:border-border-focus focus-within:ring-1 focus-within:ring-border-focus'}
            />`;

content = content.replace(target, replacement);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
