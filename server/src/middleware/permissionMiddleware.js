import { ROLE_PERMISSIONS } from '../constants/permissions.js'

/**
 * Fine-grained permissions middleware checking if user's role grants specific permission
 */
export function hasPermission(...requiredPermissions) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || []
    const hasAll = requiredPermissions.every((perm) => userPermissions.includes(perm))

    if (!hasAll) {
      return res.status(403).json({
        message: 'Forbidden: Insufficient permissions for this action',
        requiredPermissions,
      })
    }

    return next()
  }
}
