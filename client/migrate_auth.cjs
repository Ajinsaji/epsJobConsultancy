const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'src', 'pages', 'public');
const authDir = path.join(process.cwd(), 'src', 'features', 'auth', 'pages');

const filesToMove = [
  'AdminLoginPage.jsx',
  'ForgotPasswordPage.jsx',
  'LoginPage.jsx',
  'RegisterCompanyPage.jsx',
  'RegisterPage.jsx',
  'ResetPasswordPage.jsx',
  'VerifyEmailPage.jsx'
];

filesToMove.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(authDir, file);
  
  if (fs.existsSync(src)) {
    let content = fs.readFileSync(src, 'utf8');
    
    // Replace axios imports with authService
    content = content.replace(/import axios from 'axios'/g, "import { authService } from '../../../services/auth.service'");
    
    // Replace API calls
    content = content.replace(/await axios\.post\('\/api\/auth\/login', (data|\{.+?\})\)/g, "await authService.login($1)");
    content = content.replace(/await axios\.post\('\/api\/auth\/register', (data|payload|\{.+?\})\)/g, "await authService.register($1)");
    content = content.replace(/await axios\.post\('\/api\/auth\/forgot-password', (data|\{.+?\})\)/g, "await authService.forgotPassword(data.email || data)");
    content = content.replace(/await axios\.post\('\/api\/auth\/reset-password', (data|\{.+?\})\)/g, "await authService.resetPassword($1.token, $1.password)");
    content = content.replace(/await axios\.post\('\/api\/auth\/verify-email', (data|\{.+?\})\)/g, "await authService.verifyEmail($1.token)");

    // Fix absolute or relative paths broken by the move
    // Since we went from src/pages/public/ (depth 2 from src) to src/features/auth/pages/ (depth 3 from src)
    // imports like '../../components' need to become '../../../components'
    content = content.replace(/from '\.\.\/\.\.\//g, "from '../../../");
    content = content.replace(/from '\.\.\//g, "from '../../");

    fs.writeFileSync(dest, content);
    fs.unlinkSync(src); // delete original
    console.log(`Moved and updated ${file}`);
  }
});
