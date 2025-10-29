const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  {
    name: 'Wireless Headphones',
    priceCents: 7999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description:
      'Premium wireless headphones with active noise cancellation and 30-hour battery life',
  },
  {
    name: 'Smart Watch',
    priceCents: 19999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
  },
  {
    name: 'Laptop Stand',
    priceCents: 3499,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    description: 'Ergonomic aluminum laptop stand with adjustable height',
  },
  {
    name: 'Mechanical Keyboard',
    priceCents: 12999,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    description: 'RGB mechanical keyboard with Cherry MX switches',
  },
  {
    name: 'Wireless Mouse',
    priceCents: 4999,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    description: 'Ergonomic wireless mouse with precision tracking',
  },
  {
    name: 'USB-C Hub',
    priceCents: 5999,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
  },
  {
    name: 'Portable SSD 1TB',
    priceCents: 8999,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
    description: 'Ultra-fast portable SSD with 1TB storage and USB-C connectivity',
  },
  {
    name: 'Webcam HD',
    priceCents: 6999,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop',
    description: '1080p HD webcam with auto-focus and built-in microphone',
  },
  {
    name: 'Bluetooth Speaker',
    priceCents: 5499,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    description: 'Portable Bluetooth speaker with 360° sound and 12-hour battery',
  },
  {
    name: 'Phone Stand',
    priceCents: 2499,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    description: 'Adjustable phone stand with cable management for desk or bedside',
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
  
  // Display seeded products
  const allProducts = await prisma.product.findMany();
  console.log('\n📦 Products in database:');
  allProducts.forEach((p) => {
    console.log(`   ${p.id}. ${p.name} - $${(p.priceCents / 100).toFixed(2)}`);
  });

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
