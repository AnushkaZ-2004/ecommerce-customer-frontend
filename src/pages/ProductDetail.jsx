import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productService } from "../services/productService";
import { useCartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/helpers";
import Loading from "../components/common/Loading";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCartContext();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/products" className="back-to-products">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = [
    product.imageUrl || "https://via.placeholder.com/500x500?text=No+Image",
    // Add more images if available
  ];

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="product-images">
            <div className="main-image">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="product-main-image"
              />
            </div>
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-category">
              <Link to={`/products?category=${product.category}`}>
                {product.category}
              </Link>
            </div>

            <div className="product-price">{formatCurrency(product.price)}</div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-stock">
              {product.stockQuantity > 0 ? (
                <span className="in-stock">
                  ✅ In Stock ({product.stockQuantity} available)
                </span>
              ) : (
                <span className="out-of-stock">❌ Out of Stock</span>
              )}
            </div>

            {product.stockQuantity > 0 && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stockQuantity}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(
                            product.stockQuantity,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        )
                      }
                    />
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(product.stockQuantity, quantity + 1)
                        )
                      }
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn large"
                  onClick={handleAddToCart}
                >
                  Add to Cart - {formatCurrency(product.price * quantity)}
                </button>
              </div>
            )}

            <div className="product-features">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $100</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔄</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <div>
                  <strong>Warranty</strong>
                  <p>1-year manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
