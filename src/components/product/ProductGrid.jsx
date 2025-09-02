import React from "react";
import ProductCard from "../common/ProductCard";

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="product-grid-loading">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="product-skeleton"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try adjusting your search criteria or browse all products.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
