const { getCart, clearCart } = require('./cartService');
const { ValidationError } = require('../utils/errors');
const { sendReceiptEmail } = require('./emailService');

/**
 * Process checkout
 */
async function processCheckout(userId, name, email) {
  const cart = await getCart(userId);

  if (cart.items.length === 0) {
    throw new ValidationError('Cart is empty', 'EMPTY_CART');
  }

  const receipt = {
    receiptId: `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    name,
    email,
    items: cart.items,
    total: cart.total,
    timestamp: new Date().toISOString(),
  };

  // Clear cart before sending email
  await clearCart(userId);

  // Send receipt email (non-blocking, don't fail checkout if email fails)
  sendReceiptEmail(receipt).catch((error) => {
    console.error('Email send failed:', error);
  });

  return receipt;
}

module.exports = {
  processCheckout,
};
