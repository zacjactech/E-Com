import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';
import ProductGrid from '../components/ProductGrid';
import '../styles/HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      console.log('Fetched products:', data.length, data);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Our Products</h1>
        <p>Discover amazing tech accessories for your workspace</p>
      </div>
      <ProductGrid products={products} loading={loading} error={error} />
    </div>
  );
}

export default HomePage;
