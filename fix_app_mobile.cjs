const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');

// Add Menu and X import from lucide-react if not present
if (!appContent.includes("Menu, X")) {
  appContent = appContent.replace("import { BrowserRouter", "import { Menu, X } from 'lucide-react';\nimport { BrowserRouter");
}

if (!appContent.includes("const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);")) {
  const hooksCode = `
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
`;
  appContent = appContent.replace("const closeDrawer = () => {", hooksCode + "\n  const closeDrawer = () => {");
}

appContent = appContent.replace(
  '<Sidebar currentPage={currentPath as Page} onNavigate={(p) => navigate(p.startsWith(\'/\') ? p : `/${p}`)} />',
  '<Sidebar currentPage={currentPath as Page} onNavigate={(p) => { navigate(p.startsWith(\'/\') ? p : `/${p}`); setIsMobileMenuOpen(false); }} isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />'
);

if (!appContent.includes('<div className="md:hidden h-14')) {
  appContent = appContent.replace(
    '<main className="flex-1 overflow-y-auto bg-bg-page relative">',
    `<div className="md:hidden h-14 flex items-center justify-between px-4 border-b border-border-default bg-bg-surface shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-md">
              <Menu size={20} />
            </button>
            <div className="font-sans text-sm font-semibold text-text-primary">FLOW</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shrink-0 text-bg-surface font-semibold text-xs shadow-sm">
            MS
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-bg-page relative">`
  );
}

fs.writeFileSync('src/App.tsx', appContent);
