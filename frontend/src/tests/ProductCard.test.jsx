import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { CartProvider } from '../context/CartContext';
import * as cartApi from '../api/cart';

vi.mock('../api/cart');

const mockProduct = {
  id: 1,
  name: 'Test Product',
  priceCents: 5000,
  price: 50,
  image: 'test.jpg',
  description: 'Test description',
};

describe('ProductCard', () => {
  it('renders product information', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('calls addToCart when button is clicked', async () => {
    cartApi.addToCart.mockResolvedValue({});
    cartApi.fetchCart.mockResolvedValue({ items: [], total: 0, itemCount: 0 });

    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);

    await waitFor(() => {
      expect(cartApi.addToCart).toHaveBeenCalledWith(1, 1);
    });
  });
});
