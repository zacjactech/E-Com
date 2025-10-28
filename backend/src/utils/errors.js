class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, code = 'VALIDATION_ERROR') {
    super(message, code, 400);
  }
}

class NotFoundError extends AppError {
  constructor(message, code = 'NOT_FOUND') {
    super(message, code, 404);
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
};
