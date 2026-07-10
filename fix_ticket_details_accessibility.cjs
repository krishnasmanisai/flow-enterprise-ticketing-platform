const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// 1. Fix Reply Composer Tabs
content = content.replace(
  /<div className="flex border-b border-border-default bg-bg-surface relative">/g,
  '<div role="tablist" aria-label="Reply modes" className="flex border-b border-border-default bg-bg-surface relative">'
);
content = content.replace(
  /<button\s+onClick=\{\(\) => setActiveTab\('reply'\)\}\s+className=\{\`flex-1(.*?)\`\}/g,
  '<button role="tab" aria-selected={activeTab === \'reply\'} aria-controls="reply-panel" id="tab-reply" onClick={() => setActiveTab(\'reply\')} className={`flex-1$1`}'
);
content = content.replace(
  /<button\s+onClick=\{\(\) => setActiveTab\('internal'\)\}\s+className=\{\`flex-1(.*?)\`\}/g,
  '<button role="tab" aria-selected={activeTab === \'internal\'} aria-controls="internal-panel" id="tab-internal" onClick={() => setActiveTab(\'internal\')} className={`flex-1$1`}'
);

content = content.replace(
  /\{ticketSource === 'EMAIL' && activeTab === 'reply' && \(/g,
  '{ticketSource === \'EMAIL\' && activeTab === \'reply\' && (\n<div id="reply-panel" role="tabpanel" aria-labelledby="tab-reply">'
);
content = content.replace(
  /<\/div>\n\s*\)\}\n\s*<div className=\{\`p-4 transition-colors/g,
  '</div>\n</div>\n)}\n          <div className={`p-4 transition-colors'
);
// Make the outer reply wrapper a generic div if both modes use it, but semantically maybe just keeping roles on buttons is fine.

// 2. Fix Bottom Utility Tabs
content = content.replace(
  /<div className="flex border-b border-border-default bg-bg-surface overflow-x-auto custom-scrollbar">/g,
  '<div role="tablist" aria-label="Ticket details tabs" className="flex border-b border-border-default bg-bg-surface overflow-x-auto custom-scrollbar">'
);
content = content.replace(
  /<button\n\s*key=\{tab\.id\}\n\s*onClick=\{\(\) => setActiveBottomTab\(tab\.id as any\)\}\n\s*className=/g,
  '<button key={tab.id} role="tab" aria-selected={activeBottomTab === tab.id} aria-controls={`panel-${tab.id}`} id={`tab-${tab.id}`} onClick={() => setActiveBottomTab(tab.id as any)} className='
);

// Wrapping bottom tab panels
content = content.replace(
  /<div className="p-6 bg-bg-page min-h-\[200px\]">/g,
  '<div className="p-6 bg-bg-page min-h-[200px]" role="tabpanel" aria-labelledby={`tab-${activeBottomTab}`} id={`panel-${activeBottomTab}`}>'
);

// 3. Fix Main container
content = content.replace(
  /<div className="flex flex-col bg-bg-page min-h-screen pb-12">/,
  '<main className="flex flex-col bg-bg-page min-h-screen pb-12" aria-label="Ticket Details">'
);
content = content.replace(
  /<\/div>\n\s*\{isHistoryModalOpen/g,
  '</main>\n      {isHistoryModalOpen'
);


fs.writeFileSync('src/pages/TicketDetails.tsx', content);
