import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SmallContainer, Row, Col, PageButton } from '../assets/css/ProductListingStyles'; // Update the path based on your folder structure
import DefaultSpinner from './DefaultSpinner';
import axiosInstance from "../api/axiosInstance";

const Rating = ({ value }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, i) => (
        <i className="fa fa-star" key={`full-${i}`}></i>
      ))}
      {halfStar && <i className="fa fa-star-half-o"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i className="fa fa-star-o" key={`empty-${i}`}></i>
      ))}
    </div>
  );
};

const ProductListing = () => {
  const [sortOption, setSortOption] = useState('default'); // State to manage sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]); // Array to hold fetched products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 12; // Define how many products per page
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To handle any error during fetch

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/products'); // Using axiosInstance with the correct endpoint
        const data = response.data;

        // Ensure that 'products' is the array we want
        if (Array.isArray(data.products)) {
          setProducts(data.products); // Use 'data.products'
          setFilteredProducts(data.products); // Initially set filtered products to all products
        } else {
          setError("Invalid data format, expected an array under 'products'.");
        }

        setLoading(false); // Once data is loaded, set loading to false
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to fetch products'); // Set error message if fetch fails
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Sort the products based on the selected option
    let sortedProducts = [...filteredProducts];
    if (sortOption === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'rating') {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'name') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update sort option state when user selects a sort option
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Guard against non-array values
  const currentProducts = Array.isArray(filteredProducts) ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  if (loading) {
    return <DefaultSpinner />; // Show loading state while data is fetching
  }

  if (error) {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src="images/Empty.png"
          alt="No Data Available"
          style={{ width: "200px", height: "200px", objectFit: "contain" }}
        />
      </div>
    ); // Show error if there's an issue fetching data
  }

  return (
    <SmallContainer>
      <h2 style={{ marginBottom: '10px' }}>All Products</h2> {/* Reduce space below header */}
      <Row className="row-2">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="default">Default Sorting</option>
          <option value="price">Sort by price</option>
          <option value="rating">Sort by rating</option>
          <option value="name">Sort by name</option>
        </select>
      </Row>
      <Row>
        {currentProducts.map((product) => (
          <Col key={product._id}>
            <Link to={`/product-details/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <img src={product.singleImage || '/path/to/placeholder.jpg'} alt={product.name} />
                <h4>{product.name}</h4>
                <Rating value={product.rating} />
                <p>₹{product.price.toFixed(2)}</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>

      <PageButton>
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, idx) => (
          <span
            key={idx}
            onClick={() => {
              handlePageChange(idx + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
            }}
            className={currentPage === idx + 1 ? 'active' : ''}
          >
            {idx + 1}
          </span>
        ))}
      </PageButton>

    </SmallContainer>
  );
};

export default ProductListing;
