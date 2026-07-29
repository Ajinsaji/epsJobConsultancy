import { AuditLog } from '../models/AuditLog.js'

/**
 * Audit log entry recorder
 */
export async function logAuditEvent({
  userId = null,
  action,
  category = 'SECURITY',
  status = 'SUCCESS',
  req = null,
  details = {},
}) {
  try {
    const ipAddress = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || req?.ip || '0.0.0.0'
    const userAgent = req?.headers['user-agent'] || 'Unknown'

    await AuditLog.create({
      userId: userId || req?.user?._id,
      action,
      category,
      status,
      ipAddress,
      userAgent,
      details,
    })
  } catch (err) {
    // Non-blocking catch to ensure main request never fails if logging encounters DB issues
    console.error('AuditLog writing failed:', err.message)
  }
}

/**
 * Express middleware to automatically log audit trail for routes
 */
export function auditRouteAction(action, category = 'SECURITY') {
  return (req, res, next) => {
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        logAuditEvent({
          userId: req.user?._id,
          action,
          category,
          status: 'SUCCESS',
          req,
          details: { path: req.originalUrl, method: req.method },
        })
      } else if (res.statusCode >= 400) {
        logAuditEvent({
          userId: req.user?._id,
          action,
          category,
          status: 'FAILURE',
          req,
          details: { path: req.originalUrl, method: req.method, statusCode: res.statusCode },
        })
      }
    })
    next()
  }
}
