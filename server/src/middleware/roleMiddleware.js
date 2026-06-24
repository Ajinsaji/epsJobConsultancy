import { authorizeRoles } from './authMiddleware.js'

// Backward-compatible re-export.
export const roleMiddleware = (...roles) => authorizeRoles(...roles)

