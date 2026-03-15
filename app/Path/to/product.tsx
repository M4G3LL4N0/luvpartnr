import { useState } from 'react';

const ProductPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Module A', description: 'Core functionality', price: 29 },
    { id: 2, name: 'Module B', description: 'Advanced feature', price: 49 },
  ]);

  return (
    <div className="dark-theme">
      <h1>Product Page</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
