import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";  // Corrected import for HomePage
import GlobalStyle from "./assets/css/GlobalStyle";  // Import GlobalStyle
import AccountsPage from "./pages/AccountsPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import AuthWrapper from "./components/AuthWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleProduct from "./components/SingleProduct";
import ProductUploadForm from "./components/ProductUploadForm";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsDetailsPage from "./pages/ProductDetailsPage";
import ScrollToTop from "./utils/ScrollToTop";
import FeaturedDetailsPage from "./pages/FeaturedDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import CategorizedProductPage from "./pages/CategorizedProductPage";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/upload" element={<ProductUploadForm />} />
            <Route path="/details" element={<ProductDetailsPage />} />
            <Route path="/product-details/:id" element={<ProductsDetailsPage />} />
            <Route path="/featured-details/:id" element={<FeaturedDetailsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/products/category/:slug" element={<CategorizedProductPage />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </>
  );
}

export default App;
