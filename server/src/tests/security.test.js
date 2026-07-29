import test from 'node:test'
import assert from 'node:assert/strict'

import {
  generateTOTPSecret,
  generateTOTPToken,
  verifyTOTPToken,
  generateOTPAuthURL,
  generateBackupCodes,
} from '../utils/totp.js'

import { validatePasswordPolicy } from '../utils/passwordPolicy.js'
import { PERMISSIONS, ROLE_PERMISSIONS } from '../constants/permissions.js'
import { generateAccessToken } from '../services/securityTokenService.js'
import jwt from 'jsonwebtoken'

test('Phase 5.1 Security: TOTP Secret Generation and OTP Verification', async () => {
  const secret = generateTOTPSecret()
  assert.ok(secret, 'Secret should be generated')
  assert.equal(typeof secret, 'string', 'Secret should be a string')

  const token = generateTOTPToken(secret)
  assert.ok(token, 'TOTP Token should be generated')
  assert.equal(token.length, 6, 'TOTP Token should be 6 digits')

  const isValid = verifyTOTPToken(secret, token)
  assert.equal(isValid, true, 'TOTP Token should be valid for current timestamp')

  const isInvalid = verifyTOTPToken(secret, '000000')
  assert.equal(isInvalid, false, 'Invalid TOTP code should be rejected')

  const otpUrl = generateOTPAuthURL({ label: 'test@eps.com', secret })
  assert.ok(otpUrl.includes('otpauth://totp/'), 'OTPAuth URL should have correct protocol')
  assert.ok(otpUrl.includes(secret), 'OTPAuth URL should contain the secret')

  const backupCodes = generateBackupCodes(10)
  assert.equal(backupCodes.length, 10, 'Should generate 10 backup codes')
})

test('Phase 5.1 Security: Password Policy & Leak Detection', async () => {
  const weakResult = validatePasswordPolicy('123456')
  assert.equal(weakResult.isValid, false, 'Weak password should fail validation')
  assert.ok(weakResult.errors.length > 0, 'Weak password should return error messages')

  const strongResult = validatePasswordPolicy('EpsPass#2026Secure!')
  assert.equal(strongResult.isValid, true, 'Strong password meeting policy should pass')
  assert.equal(strongResult.errors.length, 0, 'Strong password should have zero errors')

  const commonLeak = validatePasswordPolicy('Password123!')
  assert.equal(commonLeak.isValid, false, 'Common leaked password should be detected')
})

test('Phase 5.1 Security: Role-Based Access Control Permissions Matrix', async () => {
  assert.ok(ROLE_PERMISSIONS.super_admin.includes(PERMISSIONS.AUDIT_EXPORT), 'Super admin should have AUDIT_EXPORT')
  assert.ok(ROLE_PERMISSIONS.candidate.includes(PERMISSIONS.APPLICATIONS_SUBMIT), 'Candidate should have APPLICATIONS_SUBMIT')
  assert.equal(
    ROLE_PERMISSIONS.candidate.includes(PERMISSIONS.SYSTEM_SETTINGS),
    false,
    'Candidate should NOT have SYSTEM_SETTINGS',
  )
})

test('Phase 5.1 Security: Dual Access Token Generation & Payload', async () => {
  process.env.JWT_SECRET = 'test_jwt_secret_key_eps_2026'
  const mockUser = {
    _id: '60d5ecb8b5c9c22b8c8b4567',
    role: 'super_admin',
    email: 'admin@eps.com',
  }

  const token = generateAccessToken(mockUser)
  assert.ok(token, 'Access Token should be signed')

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  assert.equal(decoded.userId, mockUser._id, 'Decoded userId should match user ID')
  assert.equal(decoded.role, mockUser.role, 'Decoded role should match user role')
})

test('Phase 5.1 Security: Device User-Agent Parsing & Session Metadata', async () => {
  const { parseUserAgent } = await import('../utils/deviceParser.js')
  
  const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  const parsedDesktop = parseUserAgent(desktopUA)
  assert.equal(parsedDesktop.browser, 'Chrome')
  assert.equal(parsedDesktop.os, 'Windows')
  assert.equal(parsedDesktop.deviceType, 'Desktop')

  const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  const parsedMobile = parseUserAgent(mobileUA)
  assert.equal(parsedMobile.browser, 'Safari')
  assert.equal(parsedMobile.os, 'iOS')
  assert.equal(parsedMobile.deviceType, 'Mobile')
})

