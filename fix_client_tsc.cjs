const fs = require('fs');
let content = fs.readFileSync('src/pages/ClientConfiguration.tsx', 'utf-8');

// Fix imports
content = content.replace("SettingsIcon, Building, ArrowLeft } from 'lucide-react';", "SettingsIcon, Building, ArrowLeft, Edit2, ArrowRight } from 'lucide-react';");

// Fix logo
content = content.replace(/{client.logo}/g, "{client.name.substring(0, 1)}");

fs.writeFileSync('src/pages/ClientConfiguration.tsx', content);
