const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/features/auth/pages');

const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.jsx')) {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/services/g, "from '../../../services");
    fs.writeFileSync(path.join(dir, f), content);
  }
});
console.log('Fixed services imports');
