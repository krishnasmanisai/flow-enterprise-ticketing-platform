const fs = require('fs');
let content = fs.readFileSync('src/pages/InternalUsers.tsx', 'utf-8');

content = content.replace(
  '              </div>\n\n            )}',
  '              </div>\n              </>\n            )}'
);

fs.writeFileSync('src/pages/InternalUsers.tsx', content);
