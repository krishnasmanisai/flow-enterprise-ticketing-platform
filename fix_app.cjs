const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('<Route path="/internal_users"')) {
  content = content.replace(
    '<Route path="/team_management" element={<TeamManagement onNavigate={(p) => navigate(`/${p}`)} />} />',
    '<Route path="/team_management" element={<TeamManagement onNavigate={(p) => navigate(`/${p}`)} />} />\n            <Route path="/internal_users" element={<InternalUsers onNavigate={(p) => navigate(`/${p}`)} />} />'
  );
  fs.writeFileSync('src/App.tsx', content);
}
