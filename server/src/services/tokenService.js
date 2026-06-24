import { signToken } from '../utils/generateToken.js'

// Small abstraction to keep token logic centralized.
export function createAuthToken(user) {
  return signToken(user)
}

