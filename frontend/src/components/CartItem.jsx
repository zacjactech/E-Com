import { useState } from 'react';
import { addToCart, removeFromCart } from '../api/cart';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import '../styles/CartItem.css';

function CartItem({ item }) {
  const [loading, setLoading] = useState(false);
  const { refreshCart } = useCart();

  const handleUpdateQty = async (newQty) => {
    if (newQty < 0) return;
    try {
      setLoading(true);
      await addToCart(item.productId, newQty);
      await refreshCart();
    } catch (err) {
      console.error('Failed to update quantity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      await removeFromCart(item.id);
      await refreshCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p className="cart-item-price">{formatCurrency(item.price * 100)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="qty-controls">
          <button
            className="qty-btn"
            onClick={() => handleUpdateQty(item.qty - 1)}
            disabled={loading}
          >
            −
          </button>
          <input
            type="number"
            className="qty-input"
            value={item.qty}
            onChange={(e) => handleUpdateQty(parseInt(e.target.value) || 0)}
            min="0"
            disabled={loading}
          />
          <button
            className="qty-btn"
            onClick={() => handleUpdateQty(item.qty + 1)}
            disabled={loading}
          >
            +
          </button>
        </div>
        <span className="line-total">{formatCurrency(item.lineTotal * 100)}</span>
        <button className="btn-remove" onClick={handleRemove} disabled={loading}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default CartItem;
