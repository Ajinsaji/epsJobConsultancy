export function apiResponse({ res, status = 200, message = 'OK', data = null }) {
  const payload = { message }
  if (data !== null) payload.data = data
  return res.status(status).json(payload)
}

