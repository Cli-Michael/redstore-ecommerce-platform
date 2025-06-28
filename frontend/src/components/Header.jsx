import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaHome,
  FaProductHunt,
  FaHeart,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await axiosInstance.get(`/api/cart/${userId}`);
        setCartCount(response.data.items.length);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (isAuthenticated) {
      fetchCartCount();
    }
  }, [isAuthenticated]);

  const menutoggle = () => {
    const menuItems = document.getElementById("MenuItems");
    menuItems.style.maxHeight =
      menuItems.style.maxHeight === "0px" || !menuItems.style.maxHeight
        ? "228px"
        : "0px";
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      setIsAuthenticated(false);
      setCartCount(0);
      window.location.href = "/";
    }
  };

  return (
    <header>
      <div className="header">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <Link to="/">
                <img src="/logo.png" width="125px" alt="Logo" />
              </Link>
            </div>

            <nav>
              <ul id="MenuItems" style={{ maxHeight: "0px" }}>
                <li>
                  <Link to="/">
                    <FaHome /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <FaProductHunt /> Products
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <FaInfoCircle /> About
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <MdContactSupport /> Contact
                  </Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link to="/wishlist">
                      <FaHeart /> Wishlist
                    </Link>
                  </li>
                )}
                {!isAuthenticated && (
                  <li>
                    <Link to="/account">
                      <FaUser /> Account
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li>
                    <button
                      onClick={handleLogout}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontFamily: "'Poppins', sans-serif",
                        color: "#4a4a4a",
                        textDecoration: "none",
                      }}
                      className="nav-item"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            <div style={{ position: "relative" }}>
              <Link to="/cart">
                <FaShoppingCart size={24} />
              </Link>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "3px 6px",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>

            <FaBars onClick={menutoggle} className="menu-icon" size={24} />
          </div>

          {/* Hero Section */}
          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-2">
              <h1>
                Give Your Workout
                <br />
                A New Style!
              </h1>
              <p>
                Success isn’t always about greatness. It’s about consistency.
                Consistent hard work gains success. Greatness will come.
              </p>
              <Link to="/products" className="btn">
                Explore Now &#8594;
              </Link>
            </div>
            <div className="col-2">
              <img src="/image1.png" alt="Workout" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
