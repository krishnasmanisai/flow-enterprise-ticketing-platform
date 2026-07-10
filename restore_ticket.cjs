const fs = require('fs');
let content = fs.readFileSync('src/pages/TicketDetails.tsx', 'utf-8');

// The file currently has:
// </main>
//       {isHistoryModalOpen
// And ends with:
//     </div>
//   );
// }

// Let's just change </main> back to </div>, and change <main to <div.
// Then we'll put the <main> inside.

content = content.replace(
  /<main className="flex flex-col bg-bg-page min-h-screen pb-12" aria-label="Ticket Details">/,
  '<div className="flex flex-col bg-bg-page min-h-screen pb-12">'
);

content = content.replace(
  /<\/main>\n\s*\{isHistoryModalOpen/g,
  '</div>\n      {isHistoryModalOpen'
);

fs.writeFileSync('src/pages/TicketDetails.tsx', content);
