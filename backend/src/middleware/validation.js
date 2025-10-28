const { body, param, validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        message: errors.array()[0].msg,
        code: 'VALIDATION_ERROR',
        details: errors.array(),
      },
    });
  }
  next();
}

const addToCartValidation = [
  body('productId')
    .exists()
    .withMessage('productId is required')
    .isInt({ min: 1 })
    .withMessage('productId must be a positive integer'),
  body('qty')
    .exists()
    .withMessage('qty is required')
    .isInt({ min: 0 })
    .withMessage('qty must be a non-negative integer'),
  validate,
];

const checkoutValidation = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email').trim().isEmail().withMessage('valid email is required'),
  validate,
];

const deleteCartItemValidation = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
  validate,
];

module.exports = {
  validate,
  addToCartValidation,
  checkoutValidation,
  deleteCartItemValidation,
};
