import fs from 'fs'
import path from 'path'

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filepath = path.join(dir, file)
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist)
    } else if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
      filelist.push(filepath)
    }
  }
  return filelist
}

const files = walkSync('./client/src/pages')

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  let changed = false
  
  // For files directly in pages/role/ (e.g. pages/admin/ManageCompanies.jsx)
  // The correct path is ../../components/ui/
  // But some might have ../../../components/ui/
  
  const parts = file.split(path.sep)
  const pagesIndex = parts.indexOf('pages')
  const depth = parts.length - pagesIndex - 1 // 2 for pages/admin/ManageCompanies.jsx
  
  const correctPrefix = '../'.repeat(depth) + 'components/ui/'
  
  // Very hacky but safe replacement:
  // Replace all variations of ../../../components/ui/ with the correct prefix based on depth
  
  const regex = /(\.\.\/)+components\/ui\//g
  const newContent = content.replace(regex, correctPrefix)
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8')
    console.log('Fixed:', file)
  }
})
