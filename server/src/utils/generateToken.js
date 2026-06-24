import jwt from 'jsonwebtoken'

export function signToken(user) {
  const payload = { userId: user._id, role: user.role }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

