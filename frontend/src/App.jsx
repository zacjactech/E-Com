import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <CartProvider>
      <div className="app">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="main-content">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'cart' && <CartPage onNavigate={setCurrentPage} />}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
