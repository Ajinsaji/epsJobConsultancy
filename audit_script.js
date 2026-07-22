const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, 'client', 'src');
const serverDir = path.join(__dirname, 'server', 'src');

// 1. Scrape Frontend API calls
const frontendCalls = [];

function scrapeFrontend(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scrapeFrontend(fullPath);
    } else if (file.match(/\.(js|jsx)$/)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/axios\.(get|post|put|patch|delete)\(\s*[`'"]([^`'"]+)[`'"]/g);
      for (const match of matches) {
        let url = match[2];
        if (url.includes('${')) {
            // Simplify templates
            url = url.replace(/\$\{[^}]+\}/g, ':id');
        }
        // Normalize params
        url = url.split('?')[0];
        frontendCalls.push({
          method: match[1].toUpperCase(),
          url,
          file: fullPath.replace(__dirname, '')
        });
      }
    }
  }
}
scrapeFrontend(clientDir);

// 2. Scrape Backend Routes & Mounts
const backendRoutes = [];
const indexJsPath = path.join(serverDir, 'index.js');
const indexJsContent = fs.readFileSync(indexJsPath, 'utf8');

const routerMounts = {}; // { 'companyRoutes': ['/api/companies', '/api/v1/companies'] }
const mountRegex = /app\.use\(\s*['"`]([^'"`]+)['"`]\s*,\s*([a-zA-Z0-9_]+)\s*\)/g;
for (const match of indexJsContent.matchAll(mountRegex)) {
  const prefix = match[1];
  const routerName = match[2];
  if (!routerMounts[routerName]) routerMounts[routerName] = [];
  routerMounts[routerName].push(prefix);
}

const duplicateMounts = [];
const prefixMapCount = {};
for (const [router, prefixes] of Object.entries(routerMounts)) {
    for (const prefix of prefixes) {
        if (!prefixMapCount[prefix]) prefixMapCount[prefix] = [];
        prefixMapCount[prefix].push(router);
    }
}
for (const [prefix, routers] of Object.entries(prefixMapCount)) {
    if (routers.length > 1) {
        duplicateMounts.push({ prefix, routers });
    }
}


function scrapeBackend(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scrapeBackend(fullPath);
    } else if (file.match(/\.(js)$/)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Match export const routerName = express.Router() or const routerName = ... or export default router
      const routerMatch = content.match(/(?:export\s+const\s+|const\s+)([a-zA-Z0-9_]+)\s*=\s*express\.Router\(\)/);
      let routerName = routerMatch ? routerMatch[1] : 'router';
      if (content.includes('export { router as notificationRoutes }')) routerName = 'notificationRoutes';
      if (content.includes('export default router')) {
         // Determine from index.js what imported it
         for (const [rName, rPrefixes] of Object.entries(routerMounts)) {
             if (rName === 'employerCommunicationRoutes' && file === 'employerCommunicationRoutes.js') {
                 routerName = rName;
             }
         }
      }

      const prefixes = routerMounts[routerName] || (routerName === 'router' && file === 'employerCommunicationRoutes.js' ? routerMounts['employerCommunicationRoutes'] : []);
      
      // Match router.get('/path', controllerFn)
      const routeRegex = /(?:router|[a-zA-Z0-9_]+Routes)\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]+)['"`]\s*,([^;]+)/g;
      for (const match of content.matchAll(routeRegex)) {
        const method = match[1].toUpperCase();
        const routePath = match[2];
        const paramsAndControllers = match[3];
        
        // Extract controller (usually last argument before closing paren, but regex is tricky)
        const parts = paramsAndControllers.split(',');
        let controller = parts[parts.length - 1].trim().replace(/\)$/, '').trim();
        
        for (const prefix of prefixes) {
          let fullUrl = prefix + (routePath === '/' ? '' : routePath);
          backendRoutes.push({
            method,
            url: fullUrl,
            controller,
            file: fullPath.replace(__dirname, '')
          });
        }
      }
    }
  }
}
scrapeBackend(path.join(serverDir, 'routes'));

// 3. Match them up
const inventory = [];
const deadBackend = new Set(backendRoutes);

function matchUrl(fUrl, bUrl) {
    let fRegexStr = '^' + fUrl.replace(/:id/g, ':[a-zA-Z0-9_]+') + '$';
    let fRegex = new RegExp(fRegexStr);
    
    let bRegexStr = '^' + bUrl.replace(/:[a-zA-Z0-9_]+/g, ':[a-zA-Z0-9_]+') + '$';
    let bRegex = new RegExp(bRegexStr);
    
    return fRegex.test(bUrl) || bRegex.test(fUrl);
}

for (const f of frontendCalls) {
    let matchedB = null;
    for (const b of backendRoutes) {
        if (f.method === b.method && matchUrl(f.url, b.url)) {
            matchedB = b;
            deadBackend.delete(b);
            break;
        }
    }
    inventory.push({
        frontend: f,
        backend: matchedB,
        status: matchedB ? '✅ Match' : '❌ Missing Backend'
    });
}

// 4. Validate Responses (Crude Regex)
const badResponses = [];
function validateResponses() {
    const controllersDir = path.join(serverDir, 'controllers');
    const files = fs.readdirSync(controllersDir);
    for (const file of files) {
        const fullPath = path.join(controllersDir, file);
        if (fs.statSync(fullPath).isFile() && file.endsWith('.js')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // If we find res.json({ something without success }) or res.send
            if (content.match(/res\.send\(/)) {
                badResponses.push(`${file}: Uses res.send() instead of structured res.json()`);
            }
        }
    }
}
validateResponses();

// 5. Generate Markdown Report
let md = '# Complete API Route Inventory & Audit Report\n\n';

md += '## 1. Route Conflict Detection\n';
if (duplicateMounts.length > 0) {
    md += '❌ Conflicts found in `server/src/index.js`:\n';
    for (const m of duplicateMounts) {
        md += `- Path \`${m.prefix}\` is mounted by multiple routers: ${m.routers.join(', ')}\n`;
    }
} else {
    md += '✅ No route conflicts found.\n';
}

md += '\n## 2. API Route Inventory\n';
md += '| Frontend Endpoint | Backend Route | Controller | Status |\n';
md += '|---|---|---|---|\n';
// Unique frontend urls for brevity
const uniqueInv = Array.from(new Set(inventory.map(i => i.frontend.url + i.frontend.method)))
    .map(key => inventory.find(i => i.frontend.url + i.frontend.method === key));

uniqueInv.sort((a,b) => a.frontend.url.localeCompare(b.frontend.url)).forEach(i => {
    const bUrl = i.backend ? i.backend.url : 'Missing';
    const bCtrl = i.backend ? i.backend.controller : 'N/A';
    md += `| \`${i.frontend.method} ${i.frontend.url}\` | \`${bUrl}\` | ${bCtrl} | ${i.status} |\n`;
});

md += '\n## 3. Dead Endpoint Detection\n';
md += '### Frontend calls with NO matching backend route\n';
const missingFrontend = uniqueInv.filter(i => !i.backend);
if (missingFrontend.length === 0) md += '✅ None.\n';
missingFrontend.forEach(i => {
    md += `- \`${i.frontend.method} ${i.frontend.url}\` (in ${i.frontend.file})\n`;
});

md += '\n### Backend routes NEVER called by frontend\n';
if (deadBackend.size === 0) md += '✅ None.\n';
for (const b of deadBackend) {
    if (b.url.startsWith('/api/v1')) {
        md += `- \`${b.method} ${b.url}\` (in ${b.file})\n`;
    }
}

md += '\n## 4. Standard API Response Validation\n';
if (badResponses.length > 0) {
    md += '❌ Found non-standard responses:\n';
    badResponses.forEach(r => md += `- ${r}\n`);
} else {
    md += '✅ All controllers seem to use standard JSON responses.\n';
}

fs.writeFileSync('C:\\Users\\my pc\\.gemini\\antigravity\\brain\\5d05d9c3-8944-4f29-9623-0a8d070af54f\\audit_report.md', md, 'utf8');
console.log('Audit completed. Report generated.');
