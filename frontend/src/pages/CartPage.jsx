import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { checkout as checkoutApi } from '../api/cart';
import Cart from '../components/Cart';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';
import '../styles/CartPage.css';

function CartPage({ onNavigate }) {
  const { cart, refreshCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const handleCheckout = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const receiptData = await checkoutApi(formData.name, formData.email);
      setReceipt(receiptData);
      await refreshCart();
      setShowCheckout(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
    onNavigate('home');
  };

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {showCheckout ? (
        <CheckoutForm
          onSubmit={handleCheckout}
          onCancel={() => setShowCheckout(false)}
          loading={loading}
        />
      ) : (
        <Cart cart={cart} onCheckout={() => setShowCheckout(true)} />
      )}
      <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
    </div>
  );
}

export default CartPage;
