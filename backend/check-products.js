const { PrismaClient } = require('@prisma/client');

// Use development database (default from .env)
const prisma = new PrismaClient();

async function checkProducts() {
  const products = await prisma.product.findMany();
  console.log(`\n📦 Development Database Products: ${products.length}\n`);
  
  if (products.length === 0) {
    console.log('⚠️  No products found. Run: npm run seed');
  } else {
    products.forEach((p) => {
      console.log(`${p.id}. ${p.name} - $${(p.priceCents / 100).toFixed(2)}`);
    });
    
    // Check if they have Unsplash images
    const hasUnsplash = products.some(p => p.image && p.image.includes('unsplash'));
    if (hasUnsplash) {
      console.log('\n✅ Products have Unsplash images');
    } else {
      console.log('\n⚠️  Products missing Unsplash images. Run: npm run seed');
    }
  }
  
  await prisma.$disconnect();
}

checkProducts();
