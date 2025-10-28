const request = require('supertest');
const app = require('../../src/server');
const prisma = require('../../src/db');

describe('Cart API', () => {
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

  describe('GET /api/cart', () => {
    it('should return empty cart for new user', async () => {
      const response = await request(app)
        .get('/api/cart')
        .set('X-User-Id', 'test-user')
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body.items).toEqual([]);
      expect(response.body.total).toBe(0);
      expect(response.body.itemCount).toBe(0);
    });
  });

  describe('POST /api/cart', () => {
    it('should add item to cart', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 2 })
        .expect(200);

      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0].qty).toBe(2);
      expect(response.body.items[0].productId).toBe(productId);
      expect(response.body.total).toBe(100.0);
      expect(response.body.itemCount).toBe(2);
    });

    it('should update existing item quantity', async () => {
      await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 2 });

      const response = await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 5 })
        .expect(200);

      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0].qty).toBe(5);
    });

    it('should remove item when qty is 0', async () => {
      await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 2 });

      const response = await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 0 })
        .expect(200);

      expect(response.body.items.length).toBe(0);
    });

    it('should return 400 for invalid productId', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId: 99999, qty: 1 })
        .expect(404);

      expect(response.body.error.code).toBe('PRODUCT_NOT_FOUND');
    });

    it('should return 400 for missing qty', async () => {
      await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId })
        .expect(400);
    });
  });

  describe('DELETE /api/cart/:id', () => {
    it('should remove cart item', async () => {
      const addResponse = await request(app)
        .post('/api/cart')
        .set('X-User-Id', 'test-user')
        .send({ productId, qty: 2 });

      const cartItemId = addResponse.body.items[0].id;

      const response = await request(app)
        .delete(`/api/cart/${cartItemId}`)
        .set('X-User-Id', 'test-user')
        .expect(200);

      expect(response.body.items.length).toBe(0);
    });

    it('should return 404 for non-existent item', async () => {
      await request(app).delete('/api/cart/99999').set('X-User-Id', 'test-user').expect(404);
    });
  });
});
