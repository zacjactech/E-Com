const request = require('supertest');
const app = require('../../src/server');
const prisma = require('../../src/db');

describe('Checkout API', () => {
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

  describe('POST /api/checkout', () => {
    it('should process checkout and return receipt', async () => {
      await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 2 });

      const response = await request(app)
        .post('/api/checkout')
        .set('X-User-Id', 'test-user')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(200);

      expect(response.body).toHaveProperty('receiptId');
      expect(response.body.name).toBe('John Doe');
      expect(response.body.email).toBe('john@example.com');
      expect(response.body.total).toBe(100.0);
      expect(response.body.items.length).toBe(1);
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should clear cart after checkout', async () => {
      await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 2 });

      await request(app)
        .post('/api/checkout')
        .set('X-User-Id', 'test-user')
        .send({ name: 'John Doe', email: 'john@example.com' });

      const cartResponse = await request(app)
        .get('/api/cart')
        .set('X-User-Id', 'test-user')
        .expect(200);

      expect(cartResponse.body.items.length).toBe(0);
    });

    it('should return 400 for empty cart', async () => {
      const response = await request(app)
        .post('/api/checkout')
        .set('X-User-Id', 'test-user')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(400);

      expect(response.body.error.code).toBe('EMPTY_CART');
    });

    it('should return 400 for missing name', async () => {
      await request(app)
        .post('/api/checkout')
        .set('X-User-Id', 'test-user')
        .send({ email: 'john@example.com' })
        .expect(400);
    });

    it('should return 400 for invalid email', async () => {
      await request(app)
        .post('/api/checkout')
        .set('X-User-Id', 'test-user')
        .send({ name: 'John Doe', email: 'invalid-email' })
        .expect(400);
    });
  });
});
