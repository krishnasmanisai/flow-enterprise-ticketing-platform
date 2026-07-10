const fs = require('fs');
const path = require('path');

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
  let originalContent = content;

  // Replace onClick={() => onNavigate('...')} on <tr> with proper a11y attributes
  content = content.replace(
    /(<tr[^>]*?)\s+onClick=\{\(\) => onNavigate\('([^']+)'\)\}([^>]*?>)/g,
    (match, p1, targetPage, p2) => {
      // If it already has tabIndex, skip to avoid double addition
      if (match.includes('tabIndex')) return match;

      return `${p1} tabIndex={0} role="button" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate('${targetPage}'); } }} onClick={() => onNavigate('${targetPage}')}${p2}`
        .replace(/className="([^"]+)"/, (clsMatch, clsVal) => `className="${clsVal} focus-visible:outline-none focus-visible:bg-bg-surface-hover"`);
    }
  );

  if (content !== originalContent) {
    fs.writeFileSync(path.join(pagesDir, file), content);
    console.log(`Updated table rows in ${file}`);
  }
}
