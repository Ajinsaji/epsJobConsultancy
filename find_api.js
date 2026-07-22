const fs = require('fs');
const path = require('path');

function findApi(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findApi(filePath, fileList);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = findApi(path.join(__dirname, 'client', 'src'));
const regex = /axios\.(get|post|put|patch|delete)\(\s*[`'"](.*?)[`'"]/g;

const results = [];
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    results.push({
      method: match[1],
      url: match[2],
      file: file.replace(__dirname, '')
    });
  }
}

fs.writeFileSync('frontend_routes.json', JSON.stringify(results, null, 2));
