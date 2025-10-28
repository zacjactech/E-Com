import { useState } from 'react';
import { addToCart } from '../api/cart';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await addToCart(product.id, 1);
      await refreshCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && <p className="product-description">{product.description}</p>}
        <div className="product-footer">
          <span className="product-price">{formatCurrency(product.priceCents)}</span>
          <button className="btn btn-primary" onClick={handleAddToCart} disabled={loading}>
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ProductCard;
