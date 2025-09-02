import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import SearchBar from "./SearchBar";

const Header = () => {
  const { user, logout } = useAuthContext();
  const { itemCount, toggleCart } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ShopEasy</h1>
        </Link>

        <SearchBar />

        <nav className="header-nav">
          <Link to="/products" className="nav-link">
            Products
          </Link>

          {user ? (
            <div className="user-menu">
              <button
                className="user-menu-trigger"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Hi, {user.firstName}
              </button>
              {isMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                    My Account
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}

          <button className="cart-button" onClick={toggleCart}>
            <span className="cart-icon">🛒</span>
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          {user ? (
            <>
              <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                My Account
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
