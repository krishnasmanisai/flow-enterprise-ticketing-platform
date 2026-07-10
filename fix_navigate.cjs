const fs = require('fs');
const files = ['src/pages/CreatedByMe.tsx', 'src/pages/Dashboard.tsx', 'src/pages/MyTickets.tsx', 'src/pages/Tasks.tsx', 'src/pages/TicketExplorer.tsx'];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/navigate\(\`/g, "onNavigate(`");
    fs.writeFileSync(file, content);
  }
}
