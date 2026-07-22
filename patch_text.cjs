const fs = require('fs');
let code = fs.readFileSync('src/components/FloatingDialer.tsx', 'utf8');

const callButtonTarget = `<div className="flex justify-center mt-6">`;
const replacement = `{!phoneNumber && (
                  <p className="text-center text-xs font-medium text-text-secondary mt-2 mb-2">
                    Enter a phone number to start calling.
                  </p>
                )}
                <div className="flex justify-center mt-6">`;

if (code.includes(callButtonTarget)) {
  code = code.replace(callButtonTarget, replacement);
  fs.writeFileSync('src/components/FloatingDialer.tsx', code);
  console.log("Patched instruction text");
} else {
  console.log("Target not found");
}
