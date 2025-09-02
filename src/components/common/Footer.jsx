import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopEasy</h3>
          <p>Your favorite online shopping destination</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/account">My Account</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <a href="#help">Help Center</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#returns">Returns</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ShopEasy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
