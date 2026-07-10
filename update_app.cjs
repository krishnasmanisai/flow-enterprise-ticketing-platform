const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('TicketHistory')) {
    content = content.replace(/import TicketExplorer from '.\/pages\/TicketExplorer';/, "import TicketExplorer from './pages/TicketExplorer';\nimport TicketHistory from './pages/TicketHistory';");
    content = content.replace(/<Route path="\/ticket_explorer" element={<TicketExplorer onNavigate={\(p\) => navigate\(\`\/\$\{p\}\`\)} \/>} \/>/, "<Route path=\"/ticket_explorer\" element={<TicketExplorer onNavigate={(p) => navigate(`/${p}`)} />} />\n            <Route path=\"/ticket_history\" element={<TicketHistory onNavigate={(p) => navigate(`/${p}`)} />} />");
    fs.writeFileSync(file, content);
}
