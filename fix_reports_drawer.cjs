const fs = require('fs');
let content = fs.readFileSync('src/pages/Reports.tsx', 'utf-8');

content = content.replace(
  /const GenerateReportDrawer = \(\{ onClose \}: any\) => null;/g,
  "import { GenerateReportDrawer } from './GenerateReportDrawer';"
);

fs.writeFileSync('src/pages/Reports.tsx', content);
