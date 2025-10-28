const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  {
    name: 'Wireless Headphones',
    priceCents: 7999,
    image: 'https://via.placeholder.com/300x300?text=Headphones',
    description:
      'Premium wireless headphones with active noise cancellation and 30-hour battery life',
  },
  {
    name: 'Smart Watch',
    priceCents: 19999,
    image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
  },
  {
    name: 'Laptop Stand',
    priceCents: 3499,
    image: 'https://via.placeholder.com/300x300?text=Laptop+Stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height',
  },
  {
    name: 'Mechanical Keyboard',
    priceCents: 12999,
    image: 'https://via.placeholder.com/300x300?text=Keyboard',
    description: 'RGB mechanical keyboard with Cherry MX switches',
  },
  {
    name: 'Wireless Mouse',
    priceCents: 4999,
    image: 'https://via.placeholder.com/300x300?text=Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
  },
  {
    name: 'USB-C Hub',
    priceCents: 5999,
    image: 'https://via.placeholder.com/300x300?text=USB+Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
  },
  {
    name: 'Portable SSD 1TB',
    priceCents: 8999,
    image: 'https://via.placeholder.com/300x300?text=SSD',
    description: 'Ultra-fast portable SSD with 1TB storage and USB-C connectivity',
  },
  {
    name: 'Webcam HD',
    priceCents: 6999,
    image: 'https://via.placeholder.com/300x300?text=Webcam',
    description: '1080p HD webcam with auto-focus and built-in microphone',
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Seed products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`✅ Seeded ${products.length} products`);

  const productCount = await prisma.product.count();
  console.log(`📦 Total products in database: ${productCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
