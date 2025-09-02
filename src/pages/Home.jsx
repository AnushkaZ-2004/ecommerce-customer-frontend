import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import ProductGrid from "../components/product/ProductGrid";
import CategoryList from "../components/product/CategoryList";
import Loading from "../components/common/Loading";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const products = await productService.getAllProducts();
      setFeaturedProducts(products.slice(0, 8)); // Show first 8 products
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading homepage..." />;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopEasy</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="hero-cta">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2021/03/02/Shopping-bag-Hand-holding-a-shopping-Graphics-9096002-1.png"
            alt="Shopping"
          />
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <CategoryList
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/products" className="view-all-link">
              View All Products
            </Link>
          </div>
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over $100</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Your payment information is safe with us</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>30-day hassle-free return policy</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
