const fs = require('fs');

const frontend = JSON.parse(fs.readFileSync('frontend_routes.json', 'utf8'));
const backend = JSON.parse(fs.readFileSync('backend_routes.json', 'utf8'));

// Build prefix map from index.js
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

function matchRoute(frontendUrl, backendRoutes) {
  // Normalize frontend URL (remove template literals logic for matching)
  let searchUrl = frontendUrl.replace(/\$\{.*?\}/g, ':id').split('?')[0];
  if (searchUrl.endsWith('/')) searchUrl = searchUrl.slice(0, -1);
  
  // Try exact match first
  for (const br of backendRoutes) {
    let bUrl = br.url;
    // convert express params :id to match
    let bRegexStr = '^' + bUrl.replace(/:[a-zA-Z0-9_]+/g, ':[a-zA-Z0-9_]+') + '$';
    let bRegex = new RegExp(bRegexStr);
    if (bRegex.test(searchUrl)) {
      return br;
    }
  }
  return null;
}

const mismatches = [];
const matched = [];

for (const f of frontend) {
  const match = matchRoute(f.url, fullBackendRoutes.filter(br => br.method === f.method));
  if (match) {
    matched.push({ front: f, back: match });
  } else {
    mismatches.push(f);
  }
}

let output = 'Mismatches:\n' + JSON.stringify(mismatches, null, 2) + '\n';
output += `\nMatched: ${matched.length}\n`;
output += `Mismatched: ${mismatches.length}\n`;
fs.writeFileSync('analysis.txt', output);
