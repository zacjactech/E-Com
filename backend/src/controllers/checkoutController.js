const checkoutService = require('../services/checkoutService');

async function checkout(req, res, next) {
  try {
    const userId = req.headers['x-user-id'] || 'demo-user';
    const { name, email } = req.body;
    const receipt = await checkoutService.processCheckout(userId, name, email);
    res.json(receipt);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkout,
};
