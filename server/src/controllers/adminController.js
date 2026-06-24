import { asyncHandler } from '../utils/asyncHandler.js'

export const getSystemLogs = asyncHandler(async (req, res) => {
  // Phase 1 scaffold
  res.json({ logs: [] })
})

