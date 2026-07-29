const COMMON_WEAK_PASSWORDS = new Set([
  '123456',
  'password',
  '123456789',
  '12345678',
  '12345',
  '1234567',
  'qwerty',
  'password123',
  'welcome',
  'admin123',
  'eps123456',
])

export function validatePasswordPolicy(password) {
  const errors = []

  if (!password || typeof password !== 'string') {
    return { isValid: false, errors: ['Password is required'] }
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  const normalized = password.toLowerCase().replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '')
  if (COMMON_WEAK_PASSWORDS.has(password.toLowerCase()) || COMMON_WEAK_PASSWORDS.has(normalized)) {
    errors.push('This password is too common or known to be leaked. Please choose a stronger password.')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
