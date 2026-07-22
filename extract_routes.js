const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'server', 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));

const regex = /(?:router|[a-zA-Z0-9_]+Routes|app|express\.Router\(\))\.(get|post|put|patch|delete)\(\s*[`'"](.*?)[`'"]/g;
const results = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(routesDir, file), 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    results.push({
      method: match[1],
      route: match[2],
      file: file
    });
  }
}

fs.writeFileSync('backend_routes.json', JSON.stringify(results, null, 2));
