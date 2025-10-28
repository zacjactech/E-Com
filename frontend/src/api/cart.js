import apiClient from './client';

export async function fetchCart() {
  const response = await apiClient.get('/cart');
  return response.data;
}

export async function addToCart(productId, qty) {
  const response = await apiClient.post('/cart', { productId, qty });
  return response.data;
}

export async function removeFromCart(cartItemId) {
  const response = await apiClient.delete(`/cart/${cartItemId}`);
  return response.data;
}

export async function checkout(name, email) {
  const response = await apiClient.post('/checkout', { name, email });
  return response.data;
}
