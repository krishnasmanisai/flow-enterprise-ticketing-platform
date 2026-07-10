const fs = require('fs');
let content = fs.readFileSync('src/pages/InternalUsers.tsx', 'utf-8');

const escHook = `
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsDeleteModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
`;

const insertIndex = content.indexOf('const filteredUsers = useMemo(');
content = content.substring(0, insertIndex) + escHook + '\n  ' + content.substring(insertIndex);

fs.writeFileSync('src/pages/InternalUsers.tsx', content);
