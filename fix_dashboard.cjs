const fs = require('fs');
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf-8');

if (!content.includes('useNavigate')) {
  content = content.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';");
  
  content = content.replace("export default function Dashboard({ onNavigate }: DashboardProps) {", "export default function Dashboard({ onNavigate }: DashboardProps) {\n  const navigate = useNavigate();");
  
  content = content.replace(/onNavigate\('ticket_details'\)/g, "navigate(`/ticket_details?id=${ticket.id}`)");
  
  fs.writeFileSync('src/pages/Dashboard.tsx', content);
}
