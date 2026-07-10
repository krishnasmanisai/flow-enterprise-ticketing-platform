const fs = require('fs');

let sidebarContent = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

// Update props
sidebarContent = sidebarContent.replace(
  'export default function Sidebar({ currentPage, onNavigate }: { currentPage: Page; onNavigate?: (page: Page) => void }) {',
  'export default function Sidebar({ currentPage, onNavigate, isMobileOpen = false, onMobileClose }: { currentPage: Page; onNavigate?: (page: Page) => void; isMobileOpen?: boolean; onMobileClose?: () => void; }) {'
);

// Add backdrop
const backdrop = `
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onMobileClose}
        />
      )}
`;

// Update aside className
sidebarContent = sidebarContent.replace(
  '<aside aria-label="Sidebar Navigation" className={`relative flex flex-col h-full flex-shrink-0 z-50 border-r border-border-default bg-bg-surface transition-all duration-300 ${isCollapsed ? \'w-[72px]\' : \'w-64\'}`}>',
  backdrop + '\n      <aside aria-label="Sidebar Navigation" className={`fixed inset-y-0 left-0 transform ${isMobileOpen ? \'translate-x-0\' : \'-translate-x-full\'} md:translate-x-0 md:relative flex flex-col h-full flex-shrink-0 z-50 border-r border-border-default bg-bg-surface transition-all duration-300 ${isCollapsed ? \'w-[72px]\' : \'w-64\'}`}>'
);

fs.writeFileSync('src/components/Sidebar.tsx', sidebarContent);
