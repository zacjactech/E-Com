const request = require('supertest');
const app = require('../../src/server');
const prisma = require('../../src/db');

describe('Products API', () => {
  beforeAll(async () => {
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();

    await prisma.product.createMany({
      data: [
        { name: 'Product 1', priceCents: 1000, image: 'img1.jpg' },
        { name: 'Product 2', priceCents: 2000, image: 'img2.jpg' },
      ],
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/api/products').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('priceCents');
    });

    it('should return products with correct price conversion', async () => {
      const response = await request(app).get('/api/products').expect(200);

      const product = response.body.find((p) => p.name === 'Product 1');
      expect(product.priceCents).toBe(1000);
      expect(product.price).toBe(10.0);
    });
  });
});
