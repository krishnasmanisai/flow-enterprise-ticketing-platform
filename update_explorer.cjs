const fs = require('fs');
const file = 'src/pages/TicketExplorer.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/export default function TicketExplorer\(\)/, "export default function TicketExplorer({ onNavigate }: { onNavigate: (page: import('../types').Page) => void })");

content = content.replace(/<tr className="hover:bg-bg-surface-hover transition-colors"/g, `<tr className="hover:bg-bg-surface-hover transition-colors cursor-pointer" onClick={() => onNavigate('ticket_history')}`);

fs.writeFileSync(file, content);
