/**
 * Central express error handler.
 * Supports validation errors and generic errors.
 */
export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-unused-vars
  const { statusCode = 500, message = 'Internal Server Error' } = err

  // express-validator errors shape (we normalize)
  if (err?.errors && Array.isArray(err.errors)) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors,
    })
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  })
}

