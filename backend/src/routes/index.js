const express = require('express');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const {
  addToCartValidation,
  checkoutValidation,
  deleteCartItemValidation,
} = require('../middleware/validation');

const router = express.Router();

// Products
router.get('/products', productController.getProducts);

// Cart
router.get('/cart', cartController.getCart);
router.post('/cart', addToCartValidation, cartController.addToCart);
router.delete('/cart/:id', deleteCartItemValidation, cartController.removeCartItem);

// Checkout
router.post('/checkout', checkoutValidation, checkoutController.checkout);

module.exports = router;
