const fs = require('fs');
let code = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf8');

// Set a mock user role
if (!code.includes("const userRole = 'edit';")) {
  code = code.replace(/const \[status, setStatus\] = useState\('Open'\);/, "const [status, setStatus] = useState('Open');\n  const userRole = 'edit'; // Mock user role");
}

// Remove isEditingDetails state
code = code.replace(/const \[isEditingDetails, setIsEditingDetails\] = useState\(false\);\n/, "");

// Replace the Edit/Save buttons in the header
const headerTarget = /{isEditingDetails \? \([\s\S]*?\) : \([\s\S]*?Edit Ticket<\/Button>\s*\)}/;
if (code.match(headerTarget)) {
  code = code.replace(headerTarget, "");
}

// Replace all usages of `isEditingDetails ?` with `userRole === 'edit' ?`
code = code.replace(/isEditingDetails \?/g, "userRole === 'edit' ?");

fs.writeFileSync('src/pages/TicketDetails.tsx', code);
console.log("Patched TicketDetails editability");
