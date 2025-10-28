import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

function Navbar({ currentPage, onNavigate }) {
  const { cart } = useCart();
  const itemCount = cart?.itemCount || 0;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo" onClick={() => onNavigate('home')}>
          🛒 Vibe Commerce
        </h1>
        <div className="navbar-links">
          <button
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Products
          </button>
          <button
            className={`nav-link ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => onNavigate('cart')}
          >
            Cart {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
