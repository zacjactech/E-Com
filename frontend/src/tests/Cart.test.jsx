import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from '../components/Cart';
import { CartProvider } from '../context/CartContext';

vi.mock('../api/cart');

describe('Cart', () => {
  it('shows empty state when cart is empty', () => {
    render(
      <CartProvider>
        <Cart cart={{ items: [], total: 0, itemCount: 0 }} onCheckout={vi.fn()} />
      </CartProvider>
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items and totals', () => {
    const cart = {
      items: [
        {
          id: 1,
          productId: 1,
          name: 'Test Product',
          price: 50,
          qty: 2,
          lineTotal: 100,
        },
      ],
      subtotal: 100,
      total: 100,
      itemCount: 2,
    };

    render(
      <CartProvider>
        <Cart cart={cart} onCheckout={vi.fn()} />
      </CartProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getAllByText('$100.00').length).toBeGreaterThan(0);
  });
});
