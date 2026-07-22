const fs = require('fs');

const frontend = JSON.parse(fs.readFileSync('frontend_routes.json', 'utf8'));
const backend = JSON.parse(fs.readFileSync('backend_routes.json', 'utf8'));

// Backend prefix map
const prefixMap = {
  'authRoutes.js': ['/api/auth'],
  'meRoutes.js': ['/api/auth/me'],
  'candidateRoutes.js': ['/api/candidates'],
  'savedJobRoutes.js': ['/api/saved-jobs'],
  'resumeRoutes.js': ['/api/resume'],
  'companyRoutes.js': ['/api/companies'],
  'jobRoutes.js': ['/api/jobs'],
  'applicationRoutes.js': ['/api/applications'],
  'interviewRoutes.js': ['/api/interviews'],
  'placementRoutes.js': ['/api/placements'],
  'blogRoutes.js': ['/api/blogs'],
  'aiRoutes.js': ['/api/ai'],
  'paymentRoutes.js': ['/api/payments'],
  'employerCommunicationRoutes.js': ['/api/employer-communication', '/api/company'],
  'feedbackRoutes.js': ['/api/feedback'],
  'notificationRoutes.js': ['/api/notifications'],
  'adminRoutes.js': ['/api/admin'],
  'analyticsRoutes.js': ['/api/analytics'],
  'publicRoutes.js': ['/api/public']
};

const fullBackendRoutes = [];
for (const b of backend) {
  const prefixes = prefixMap[b.file] || [];
  for (const prefix of prefixes) {
    let full = prefix + (b.route === '/' ? '' : b.route);
    fullBackendRoutes.push({
      method: b.method,
      url: full.replace(/\/+/g, '/').replace(/\/$/, ''), // normalize
      file: b.file,
      originalRoute: b.route
    });
  }
}

// Function to check if a route matches
function matchRoute(frontendUrl, method, backendRoutes) {
  let searchUrl = frontendUrl.replace(/\$\{.*?\}/g, ':id').split('?')[0];
  if (searchUrl.endsWith('/')) searchUrl = searchUrl.slice(0, -1);
  
  for (const br of backendRoutes) {
    if (br.method !== method) continue;
    let bUrl = br.url;
    // Fix: correctly handle path parameters for regex
    let bRegexStr = '^' + bUrl.replace(/:[a-zA-Z0-9_]+/g, '[^/]+') + '$';
    let bRegex = new RegExp(bRegexStr);
    if (bRegex.test(searchUrl)) {
      return br;
    }
  }
  return null;
}

const matrix = [];
const seenFrontend = new Set();

for (const f of frontend) {
  const key = f.method + ' ' + f.url;
  if (seenFrontend.has(key)) continue;
  seenFrontend.add(key);
  
  const match = matchRoute(f.url, f.method, fullBackendRoutes);
  
  matrix.push({
    frontendUrl: f.url,
    backendUrl: match ? match.url : 'Missing',
    method: f.method.toUpperCase(),
    routeExists: match ? 'Yes' : 'No',
    mounted: match ? 'Yes' : 'No', // For this audit, if we found it, it is mounted
    controllerExists: match ? 'Yes' : 'No',
    status: match ? (match.url === f.url.replace(/\$\{.*?\}/g, ':id') ? 'Match' : 'Mismatch') : 'Missing'
  });
}

// Format as Markdown table
let md = '| Frontend URL | Backend URL | Method | Route Exists | Mounted | Controller Exists | Status |\n';
md += '|---|---|---|---|---|---|---|\n';

// Group by prefix to make it easier to read
matrix.sort((a, b) => a.frontendUrl.localeCompare(b.frontendUrl));

for (const row of matrix) {
  md += `| ${row.frontendUrl} | ${row.backendUrl} | ${row.method} | ${row.routeExists} | ${row.mounted} | ${row.controllerExists} | ${row.status} |\n`;
}

fs.writeFileSync('route_matrix.md', md);
console.log('Created route_matrix.md');
