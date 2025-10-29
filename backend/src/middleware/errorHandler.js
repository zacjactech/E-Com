const { AppError } = require('../utils/errors');

function errorHandler(err, req, res, next) {
  // Log error for debugging (skip in test environment to reduce noise)
  if (process.env.NODE_ENV !== 'test') {
    console.error('Error:', err);
  }

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  // Handle validation errors from express-validator
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: {
        message: 'Invalid JSON in request body',
        code: 'INVALID_JSON',
      },
    });
  }

  // Handle unknown errors
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}

module.exports = errorHandler;
