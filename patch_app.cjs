const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("FloatingDialer")) {
  code = code.replace(
    /import \{ CreateTicketFlow \} from '\.\/pages\/CreateTicketFlow';/,
    "import { CreateTicketFlow } from './pages/CreateTicketFlow';\nimport { FloatingDialer } from './components/FloatingDialer';"
  );
  
  code = code.replace(
    /\{isCreateDrawerOpen && <CreateTicketFlow type=\{newParam\} onClose=\{closeDrawer\} \/>\}/,
    "{isCreateDrawerOpen && <CreateTicketFlow type={newParam} onClose={closeDrawer} />}\n        <FloatingDialer />"
  );
  
  fs.writeFileSync('src/App.tsx', code);
  console.log("Patched App.tsx successfully");
} else {
  console.log("FloatingDialer already in App.tsx");
}
