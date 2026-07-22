const fs = require('fs');
const path = require('path');

const servicesDir = path.join(process.cwd(), 'src', 'services');
const hooksDir = path.join(process.cwd(), 'src', 'hooks');

if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });

const services = [
  'job', 'candidate', 'company', 'application', 
  'notification', 'upload', 'search', 'ai'
];

services.forEach(s => {
  const file = path.join(servicesDir, s + '.service.js');
  const url = s === 'ai' ? 'ai' : s === 'company' ? 'companies' : s + 's';
  const content = `import axios from 'axios';

const API_URL = '/api/v1/${url}';

export const ${s}Service = {
  // TODO: Implement endpoints
};
`;
  fs.writeFileSync(file, content);
});

const hooks = [
  'useAuth', 'useSearch', 'useUpload', 
  'useNotifications', 'useAI', 'usePermissions'
];

hooks.forEach(h => {
  const file = path.join(hooksDir, h + '.js');
  const content = `import { useState, useCallback } from 'react';

export function ${h}() {
  // TODO: Implement hook
  return {};
}
`;
  fs.writeFileSync(file, content);
});

console.log('Scaffolding complete');
