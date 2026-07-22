const fs = require('fs');
let code = fs.readFileSync('src/components/FloatingDialer.tsx', 'utf8');

code = code.replace(
  /className="w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white/g,
  'className="w-14 h-14 bg-gradient-to-b from-brand-500 to-brand-600 text-white'
);

code = code.replace(
  /className="flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white/g,
  'className="flex items-center gap-3 bg-gradient-to-b from-brand-500 to-brand-600 text-white'
);

code = code.replace(
  /className="w-\[200px\] h-12 bg-success-text hover:bg-green-600 disabled:bg-success-text\/50/g,
  'className="w-[200px] h-12 bg-gradient-to-b from-success-text to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-success-text/50 disabled:to-success-text/50'
);

fs.writeFileSync('src/components/FloatingDialer.tsx', code);
console.log("Patched dialer gradients");
