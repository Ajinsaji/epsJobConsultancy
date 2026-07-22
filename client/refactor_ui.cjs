const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const dirs = [
  path.join(process.cwd(), 'src', 'pages'),
  path.join(process.cwd(), 'src', 'layouts'),
  path.join(process.cwd(), 'src', 'components')
];

let files = [];
dirs.forEach(d => {
  if (fs.existsSync(d)) {
    files = files.concat(walk(d));
  }
});

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Components replacement
  content = content.replace(/<GlassButton/g, '<Button');
  content = content.replace(/<\/GlassButton>/g, '</Button>');
  content = content.replace(/<GlassCard/g, '<Card');
  content = content.replace(/<\/GlassCard>/g, '</Card>');
  content = content.replace(/<LoadingSkeleton/g, '<Skeleton');
  content = content.replace(/<\/LoadingSkeleton>/g, '</Skeleton>');

  // Import replacement
  content = content.replace(/import\s*\{\s*GlassButton\s*\}\s*from\s*['"]([^'"]+GlassButton)['"]/g, (match, p1) => {
    const newPath = p1.replace('GlassButton', 'Button');
    return `import { Button } from '${newPath}'`;
  });

  content = content.replace(/import\s+GlassCard\s+from\s*['"]([^'"]+GlassCard)['"]/g, (match, p1) => {
    const newPath = p1.replace('GlassCard', 'Card');
    return `import { Card, CardContent } from '${newPath}'`;
  });

  content = content.replace(/import\s+LoadingSkeleton\s+from\s*['"]([^'"]+LoadingSkeleton)['"]/g, (match, p1) => {
    const newPath = p1.replace('LoadingSkeleton', 'Skeleton');
    return `import { Skeleton } from '${newPath}'`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Refactored: ${file}`);
  }
});
