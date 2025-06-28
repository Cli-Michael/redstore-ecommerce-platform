import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SmallContainer, Row, Col, PageButton } from '../assets/css/ProductListingStyles';
import DefaultSpinner from './DefaultSpinner';
import axiosInstance from "../api/axiosInstance";

const Rating = ({ value }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, i) => <i className="fa fa-star" key={`full-${i}`} />)}
      {halfStar && <i className="fa fa-star-half-o" />}
      {[...Array(emptyStars)].map((_, i) => <i className="fa fa-star-o" key={`empty-${i}`} />)}
    </div>
  );
};

const CategorizedProduct = () => {
  const { slug } = useParams();
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = slug
          ? `/api/products/category/${slug}`
          : `/api/products`;

        const response = await axiosInstance.get(endpoint);
        const productList = Array.isArray(response.data.products)
          ? response.data.products
          : response.data;

        setProducts(productList);
        setFilteredProducts(productList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);


  useEffect(() => {
    let sorted = [...filteredProducts];
    if (sortOption === 'price') sorted.sort((a, b) => a.price - b.price);
    else if (sortOption === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    else if (sortOption === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredProducts(sorted);
  }, [sortOption]);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  if (loading) return <DefaultSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <SmallContainer>
      <h2>Category: {slug === 'all' || !slug ? 'All Products' : slug.charAt(0).toUpperCase() + slug.slice(1)}</h2>
      <Row className="row-2">
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
              <img src={product.singleImage || '/path/to/placeholder.jpg'} alt={product.name} />
              <h4>{product.name}</h4>
              <Rating value={product.rating} />
              <p>${product.price.toFixed(2)}</p>
            </Link>
          </Col>
        ))}
      </Row>

      <PageButton>
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, idx) => (
          <span key={idx} onClick={() => handlePageChange(idx + 1)} className={currentPage === idx + 1 ? 'active' : ''}>
            {idx + 1}
          </span>
        ))}
      </PageButton>
    </SmallContainer>
  );
};

export default CategorizedProduct;
