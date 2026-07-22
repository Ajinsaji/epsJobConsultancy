const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'client', 'src');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      const safeReplacements = [
        { regex: /(['"`])\/api\/public\//g, replace: "$1/api/v1/public/" },
        { regex: /(['"`])\/api\/company\//g, replace: "$1/api/v1/companies/" },
        { regex: /(['"`])\/api\/companies\//g, replace: "$1/api/v1/companies/" },
        { regex: /(['"`])\/api\/(?!v1\/)/g, replace: "$1/api/v1/" }
      ];

      for (const rep of safeReplacements) {
        if (rep.regex.test(content)) {
          // Reset regex state if global
          rep.regex.lastIndex = 0;
          content = content.replace(rep.regex, rep.replace);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log("Done updating frontend API routes.");
