const fs = require('fs');
let content = fs.readFileSync('src/pages/InternalUsers.tsx', 'utf-8');

// Fix the mobile regex
content = content.replace("!/^d{10}$/.test(formData.mobile)", "!/^\\d{10}$/.test(formData.mobile)");

// Fix the email regex
content = content.replace("!/^[w-.]+@([w-]+.)+[w-]{2,4}$/.test(formData.email)", "!/^[^@]+@[^@]+\\.[a-zA-Z]{2,}$/.test(formData.email)");

fs.writeFileSync('src/pages/InternalUsers.tsx', content);
