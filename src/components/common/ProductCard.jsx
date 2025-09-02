import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { formatCurrency, truncateText } from "../../utils/helpers";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img
            src={
              product.imageUrl ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={product.name}
            loading="lazy"
          />
          {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
            <span className="stock-badge low-stock">
              Only {product.stockQuantity} left
            </span>
          )}
          {product.stockQuantity === 0 && (
            <span className="stock-badge out-of-stock">Out of Stock</span>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{truncateText(product.name, 50)}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-description">
            {truncateText(product.description, 80)}
          </p>
          <div className="product-price">{formatCurrency(product.price)}</div>
        </div>
      </Link>

      <div className="product-actions">
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={product.stockQuantity === 0}
        >
          {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
