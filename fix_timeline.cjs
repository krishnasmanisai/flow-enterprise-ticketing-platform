const fs = require('fs');

let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf8');

content = content.replace(
  /className=\{`flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-page shrink-0 md:order-1 shadow-sm z-10 \$\{isCustomer \? 'md:group-even:-translate-x-1\/2' : 'md:translate-x-1\/2'\}/,
  "className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-page shrink-0 shadow-sm z-10 md:absolute md:left-1/2 md:-translate-x-1/2`"
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
