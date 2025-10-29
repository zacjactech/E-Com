import ProductCard from './ProductCard';
import '../styles/ProductGrid.css';

function ProductGrid({ products, loading, error }) {
  console.log('ProductGrid render:', { productsCount: products?.length, loading, error });

  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="product-card skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="error-banner">Error loading products: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="empty-state">No products available</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
