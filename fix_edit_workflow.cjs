const fs = require('fs');

let content = fs.readFileSync('src/pages/EditWorkflow.tsx', 'utf8');

if (!content.includes('RichTextEditor')) {
  content = content.replace("import { Page } from '../types';", "import { Page } from '../types';\nimport { RichTextEditor } from '../components/ui/RichTextEditor';");
}

const target = `<div className="border border-border-default rounded-md overflow-hidden shadow-sm flex flex-col">
                    <div className="bg-bg-page border-b border-border-default px-3 py-2 flex items-center gap-3">
                      <span className="text-xs font-medium text-text-secondary border-r border-border-default pr-3">Normal text</span>
                      <div className="flex items-center gap-0.5 text-text-secondary">
                        <button className="p-1.5 hover:bg-bg-surface-hover hover:text-text-primary rounded transition-colors"><Bold className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-bg-surface-hover hover:text-text-primary rounded transition-colors"><Italic className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-bg-surface-hover hover:text-text-primary rounded transition-colors"><Underline className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-bg-surface-hover hover:text-text-primary rounded transition-colors"><Strikethrough className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-border-default mx-1"></div>
                        <button className="p-1.5 hover:bg-bg-surface-hover hover:text-text-primary rounded transition-colors"><Link className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-bg-surface-hover hover:text-text-primary rounded transition-colors"><Code className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <textarea placeholder="Type your message..." className="w-full h-48 p-4 text-sm text-text-primary bg-bg-surface focus:outline-none resize-none"></textarea>
                  </div>`;

content = content.replace(target, '<RichTextEditor content="" onChange={() => {}} placeholder="Type your message..." minHeight="min-h-[192px]" />');

fs.writeFileSync('src/pages/EditWorkflow.tsx', content);
