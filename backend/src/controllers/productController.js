const productService = require('../services/productService');

async function getProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
};
