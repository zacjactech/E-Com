import apiClient from './client';

export async function fetchProducts() {
  const response = await apiClient.get('/products');
  return response.data;
}
