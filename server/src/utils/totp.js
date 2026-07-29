import crypto from 'crypto'

const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function base32Encode(buffer) {
  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i]
    bits += 8
    while (bits >= 5) {
      output += BASE32_CHARS[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += BASE32_CHARS[(value << (5 - bits)) & 31]
  }

  return output
}

function base32Decode(base32Str) {
  const cleanStr = base32Str.toUpperCase().replace(/=+$/, '').replace(/\s+/g, '')
  let bits = 0
  let value = 0
  const bytes = []

  for (let i = 0; i < cleanStr.length; i++) {
    const val = BASE32_CHARS.indexOf(cleanStr[i])
    if (val === -1) continue
    value = (value << 5) | val
    bits += 5
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255)
      bits -= 8
    }
  }

  return Buffer.from(bytes)
}

/**
 * Generate Base32 TOTP secret key
 */
export function generateTOTPSecret(length = 20) {
  const buffer = crypto.randomBytes(length)
  return base32Encode(buffer)
}

/**
 * Generate HOTP / TOTP token for given counter
 */
export function generateTOTPToken(secret, counter = Math.floor(Date.now() / 1000 / 30)) {
  const key = base32Decode(secret)
  const buffer = Buffer.alloc(8)
  for (let i = 7; i >= 0; i--) {
    buffer[i] = counter & 0xff
    counter = counter >> 8
  }

  const hmac = crypto.createHmac('sha1', key).update(buffer).digest()
  const offset = hmac[hmac.length - 1] & 0xf
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)

  const otp = (code % 1000000).toString().padStart(6, '0')
  return otp
}

/**
 * Verify TOTP token with +/- window tolerance
 */
export function verifyTOTPToken(secret, token, window = 1) {
  if (!secret || !token) return false
  const currentCounter = Math.floor(Date.now() / 1000 / 30)

  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const generatedToken = generateTOTPToken(secret, currentCounter + errorWindow)
    if (crypto.timingSafeEqual(Buffer.from(generatedToken), Buffer.from(token))) {
      return true
    }
  }
  return false
}

/**
 * Build OTPAuth URL format for Authenticator apps
 */
export function generateOTPAuthURL({ label, issuer = 'EPS Workforce', secret }) {
  const encodedLabel = encodeURIComponent(label)
  const encodedIssuer = encodeURIComponent(issuer)
  return `otpauth://totp/${encodedIssuer}:${encodedLabel}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`
}

/**
 * Generate 10 random 8-character numeric/hex backup codes
 */
export function generateBackupCodes(count = 10) {
  const codes = []
  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase()
    codes.push(code)
  }
  return codes
}
