const fs = require('fs');
let content = fs.readFileSync('src/pages/Tasks.tsx', 'utf-8');

// Add import
content = content.replace(
  "import { CopyId } from '../components/ui/CopyId';",
  "import { CopyId } from '../components/ui/CopyId';\nimport { DateRangeDropdown } from '../components/ui/DateRangeDropdown';"
);

// Add state
content = content.replace(
  "const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);",
  "const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);\n  const [dateRange, setDateRange] = useState('Last 7 Days');"
);

// Replace Date Range
const target = `<div className="flex items-center gap-2 bg-bg-surface border border-border-default rounded-md px-3 h-9 shadow-sm cursor-pointer hover:border-border-strong">
              <span className="text-sm text-text-secondary font-medium">Date Range:</span>
              <span className="text-sm text-text-primary">24-06-2026 ~ 09-07-2026</span>
              <Calendar size={14} className="text-text-muted ml-1" />
            </div>`;
const replacement = `<div className="w-48 z-40">
              <DateRangeDropdown value={dateRange} onChange={setDateRange} />
            </div>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/pages/Tasks.tsx', content);
