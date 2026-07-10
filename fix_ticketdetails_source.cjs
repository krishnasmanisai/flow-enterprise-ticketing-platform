const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

if (!content.includes('useLocation')) {
  content = content.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';\nimport { useLocation } from 'react-router-dom';");
}

content = content.replace(
  "export default function TicketDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {",
  `export default function TicketDetails({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ticketId = searchParams.get('id') || 'TKT-1088';`
);

// We need to replace the static messages and ticketSource.
const setupStateIndex = content.indexOf(`const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL'>('EMAIL');`);
const afterSetupState = content.substring(0, setupStateIndex) + 
`  const isEmail = ticketId === 'TKT-1088' || ticketId === 'TKT-1070';
  const initialSource = isEmail ? 'EMAIL' : 'PORTAL';
  const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL' | 'API'>(initialSource);
  
  useEffect(() => {
    setTicketSource(isEmail ? 'EMAIL' : 'PORTAL');
  }, [ticketId]);
` + content.substring(setupStateIndex + `const [ticketSource, setTicketSource] = useState<'EMAIL' | 'PORTAL'>('EMAIL');`.length);

fs.writeFileSync('src/pages/TicketDetails.tsx', afterSetupState);
