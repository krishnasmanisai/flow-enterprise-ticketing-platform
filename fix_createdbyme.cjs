const fs = require('fs');
let content = fs.readFileSync('src/pages/CreatedByMe.tsx', 'utf-8');

if (!content.includes('useNavigate')) {
  content = content.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';");
  
  content = content.replace("export default function CreatedByMe({ onNavigate }: CreatedByMeProps) {", "export default function CreatedByMe({ onNavigate }: CreatedByMeProps) {\n  const navigate = useNavigate();");
  
  content = content.replace(/onNavigate\('ticket_details'\)/g, "navigate(`/ticket_details?id=${t.id}`)");
  
  fs.writeFileSync('src/pages/CreatedByMe.tsx', content);
}
