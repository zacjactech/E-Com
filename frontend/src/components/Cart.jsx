import CartItem from './CartItem';
import { formatCurrency } from '../utils/currency';
import '../styles/Cart.css';

function Cart({ cart, onCheckout }) {
  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <p className="cart-empty-subtitle">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{formatCurrency(cart.subtotal * 100)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>{formatCurrency(cart.total * 100)}</span>
        </div>
        <button className="btn btn-primary btn-checkout" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
