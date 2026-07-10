const fs = require('fs');
let content = fs.readFileSync('src/pages/InternalUsers.tsx', 'utf-8');

content = content.replace(
  ') : (\n              <table',
  ') : (\n              <>\n              <table'
);

content = content.replace(
  '              </div>\n            )}',
  '              </div>\n              </>\n            )}'
);

fs.writeFileSync('src/pages/InternalUsers.tsx', content);
