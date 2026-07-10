const fs = require('fs');

let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf8');

content = content.replace(
  /className=\{`flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-page shrink-0 shadow-sm z-10 md:absolute md:left-1\/2 md:-translate-x-1\/2`\n                  \$\{isCustomer/,
  "className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-page shrink-0 shadow-sm z-10 md:absolute md:left-1/2 md:-translate-x-1/2\n                  ${isCustomer"
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
