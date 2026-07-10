const fs = require('fs');
let content = fs.readFileSync('src/pages/ClientDetails.tsx', 'utf-8');
content = content.replace(
  /const EditConfigurationModal = \(\{ onClose \}: any\) => null;/g,
  "import { EditConfigurationModal } from '../components/EditConfigurationModal';"
);
fs.writeFileSync('src/pages/ClientDetails.tsx', content);
