const fs = require('fs');

let content = fs.readFileSync('src/pages/Tasks.tsx', 'utf8');

content = content.replace(/ArrowUpRight\n\} from 'lucide-react';/, 'ArrowUpRight, Calendar\n} from \'lucide-react\';');

content = content.replace(/<Button variant="primary" icon=\{Plus\}>Add Task<\/Button>/, 
  '<div className="flex items-center gap-3">\n            <div className="flex items-center gap-2 bg-bg-surface border border-border-default rounded-md px-3 h-9 shadow-sm cursor-pointer hover:border-border-strong">\n              <span className="text-sm text-text-secondary font-medium">Date Range:</span>\n              <span className="text-sm text-text-primary">24-06-2026 ~ 09-07-2026</span>\n              <Calendar size={14} className="text-text-muted ml-1" />\n            </div>\n            <Button variant="primary" icon={Plus}>Add Task</Button>\n          </div>');

fs.writeFileSync('src/pages/Tasks.tsx', content);
