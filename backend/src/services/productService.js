const prisma = require('../db');
const axios = require('axios');
const { centsToDollars, dollarsToCents } = require('../utils/currency');

/**
 * Fetch products from Fake Store API
 */
async function fetchFromFakeStoreAPI() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products?limit=10');
    return response.data.map((item) => ({
      id: item.id,
      name: item.title,
      priceCents: dollarsToCents(item.price),
      price: item.price,
      image: item.image,
      description: item.description,
    }));
  } catch (error) {
    console.error('Failed to fetch from Fake Store API:', error.message);
    throw new Error('Failed to fetch products from external API');
  }
}

/**
 * Get all products
 */
async function getAllProducts() {
  const useFakeStoreAPI = process.env.USE_FAKE_STORE_API === 'true';

  if (useFakeStoreAPI) {
    return await fetchFromFakeStoreAPI();
  }

  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' },
  });

  return products.map((product) => ({
    ...product,
    price: centsToDollars(product.priceCents),
  }));
}

/**
 * Get product by ID
 */
async function getProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return null;
  }

  return {
    ...product,
    price: centsToDollars(product.priceCents),
  };
}

module.exports = {
  getAllProducts,
  getProductById,
};
