const prisma = require('../db');
const { NotFoundError, ValidationError } = require('../utils/errors');
const { centsToDollars } = require('../utils/currency');
const { getProductById } = require('./productService');

/**
 * Get or create active cart for user
 */
async function getOrCreateCart(userId) {
  let cart = await prisma.cart.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        status: 'ACTIVE',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
}

/**
 * Format cart with computed totals
 */
function formatCart(cart) {
  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    price: centsToDollars(item.product.priceCents),
    image: item.product.image,
    qty: item.qty,
    lineTotal: centsToDollars(item.product.priceCents * item.qty),
  }));

  const subtotalCents = cart.items.reduce(
    (sum, item) => sum + item.product.priceCents * item.qty,
    0
  );

  const itemCount = cart.items.reduce((sum, item) => sum + item.qty, 0);

  return {
    id: cart.id,
    userId: cart.userId,
    items,
    subtotal: centsToDollars(subtotalCents),
    total: centsToDollars(subtotalCents),
    itemCount,
  };
}

/**
 * Get user's cart
 */
async function getCart(userId) {
  const cart = await getOrCreateCart(userId);
  return formatCart(cart);
}

/**
 * Add or update item in cart
 */
async function addToCart(userId, productId, qty) {
  if (qty < 0) {
    throw new ValidationError('Quantity must be non-negative');
  }

  const product = await getProductById(productId);
  if (!product) {
    throw new NotFoundError('Product not found', 'PRODUCT_NOT_FOUND');
  }

  const cart = await getOrCreateCart(userId);

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: parseInt(productId),
      },
    },
  });

  if (qty === 0) {
    if (existingItem) {
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
    }
  } else {
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { qty },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: parseInt(productId),
          qty,
        },
      });
    }
  }

  return await getCart(userId);
}

/**
 * Remove item from cart
 */
async function removeCartItem(userId, cartItemId) {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: parseInt(cartItemId) },
    include: { cart: true },
  });

  if (!cartItem) {
    throw new NotFoundError('Cart item not found', 'CART_ITEM_NOT_FOUND');
  }

  if (cartItem.cart.userId !== userId) {
    throw new ValidationError('Cart item does not belong to user');
  }

  await prisma.cartItem.delete({
    where: { id: parseInt(cartItemId) },
  });

  return await getCart(userId);
}

/**
 * Clear cart (set to checked out)
 */
async function clearCart(userId) {
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
    },
  });

  if (cart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { status: 'CHECKED_OUT' },
    });
  }
}

module.exports = {
  getCart,
  addToCart,
  removeCartItem,
  clearCart,
};
