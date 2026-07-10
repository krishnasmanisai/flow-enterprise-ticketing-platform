const fs = require('fs');
let content = fs.readFileSync('src/pages/InternalUsers.tsx', 'utf-8');
content = content.replace(/\\^\[\\\\w-\\\\\.\]\+@\(\[\\\\w-\]\+\\\\\.\)\+\[\\\\w-\]\{2,4\}\$/g, "/^[\\\\w\\\\.-]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$/");
// Actually let's just do a simpler replace.
content = content.replace("!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(formData.email)", "!/^[\\\\w\\\\.-]+@[\\\\w\\\\.-]+\\\\.[a-zA-Z]{2,4}$/.test(formData.email)");
fs.writeFileSync('src/pages/InternalUsers.tsx', content);
