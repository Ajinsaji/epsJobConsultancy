const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/features/auth/pages');

const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.jsx')) {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    
    // Fix redux imports
    content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/redux/g, "from '../../../redux");
    
    // Fix components imports
    content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/components/g, "from '../../../components");
    content = content.replace(/from '\.\.\/\.\.\/\.\.\/components/g, "from '../../../components");
    
    fs.writeFileSync(path.join(dir, f), content);
  }
});
console.log('Fixed imports');
