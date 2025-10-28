const cartService = require('../services/cartService');

async function getCart(req, res, next) {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user';
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

async function addToCart(req, res, next) {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user';
    const { productId, qty } = req.body;
    const cart = await cartService.addToCart(userId, productId, qty);
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

async function removeCartItem(req, res, next) {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user';
    const { id } = req.params;
    const cart = await cartService.removeCartItem(userId, id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCart,
  addToCart,
  removeCartItem,
};
