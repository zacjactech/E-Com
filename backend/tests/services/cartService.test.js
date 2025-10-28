const prisma = require('../../src/db');
const cartService = require('../../src/services/cartService');

describe('Cart Service', () => {
  let productId;

  beforeAll(async () => {
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();

    const product = await prisma.product.create({
      data: { name: 'Test Product', priceCents: 5000, image: 'test.jpg' },
    });
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
  });

  describe('getCart', () => {
    it('should return empty cart for new user', async () => {
      const cart = await cartService.getCart('test-user');
      expect(cart.items).toEqual([]);
      expect(cart.total).toBe(0);
      expect(cart.itemCount).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      const cart = await cartService.addToCart('test-user', productId, 2);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].qty).toBe(2);
      expect(cart.total).toBe(100.0);
    });

    it('should update existing item', async () => {
      await cartService.addToCart('test-user', productId, 2);
      const cart = await cartService.addToCart('test-user', productId, 5);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].qty).toBe(5);
    });

    it('should remove item when qty is 0', async () => {
      await cartService.addToCart('test-user', productId, 2);
      const cart = await cartService.addToCart('test-user', productId, 0);
      expect(cart.items.length).toBe(0);
    });
  });

  describe('removeCartItem', () => {
    it('should remove item from cart', async () => {
      const addedCart = await cartService.addToCart('test-user', productId, 2);
      const cartItemId = addedCart.items[0].id;
      const cart = await cartService.removeCartItem('test-user', cartItemId);
      expect(cart.items.length).toBe(0);
    });
  });
});
