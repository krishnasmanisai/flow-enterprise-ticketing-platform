const fs = require('fs');
let content = fs.readFileSync('src/pages/TaskDetails.tsx', 'utf-8');

// Replace standard colors
content = content.replace(/bg-background/g, 'bg-bg-page');
content = content.replace(/bg-surface-container-high/g, 'bg-bg-surface-alt');
content = content.replace(/bg-surface-container-low/g, 'bg-bg-page');
content = content.replace(/bg-surface-container/g, 'bg-bg-surface-hover');
content = content.replace(/bg-surface/g, 'bg-bg-surface');

content = content.replace(/border-outline-variant\/50/g, 'border-border-default');
content = content.replace(/border-outline-variant\/30/g, 'border-border-subtle');
content = content.replace(/border-outline-variant/g, 'border-border-default');
content = content.replace(/text-outline-variant/g, 'text-text-muted');
content = content.replace(/text-outline/g, 'text-text-secondary');

content = content.replace(/text-on-surface-variant/g, 'text-text-secondary');
content = content.replace(/text-on-surface/g, 'text-text-primary');

// Specific classes fixes
content = content.replace(/text-primary font-bold/g, 'text-brand-600 font-bold');
content = content.replace(/hover:text-primary/g, 'hover:text-brand-600');
content = content.replace(/text-primary flex/g, 'text-text-primary flex');
content = content.replace(/text-primary truncate/g, 'text-text-primary truncate');
content = content.replace(/text-primary mb-4/g, 'text-text-primary mb-4');
content = content.replace(/bg-primary\/90/g, 'bg-brand-600');
content = content.replace(/bg-primary/g, 'bg-brand-500');
content = content.replace(/text-on-primary/g, 'text-white');
content = content.replace(/max-w-container-max/g, 'max-w-7xl');
content = content.replace(/font-headline/g, 'font-sans tracking-tight');

fs.writeFileSync('src/pages/TaskDetails.tsx', content);
