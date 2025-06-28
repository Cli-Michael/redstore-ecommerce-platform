import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import {
  FeaturedProductsContainer,
  Title,
  Row,
  Col,
  ProductImage,
  ProductName,
  Rating,
  Star,
  Price,
} from "../assets/css/FeaturedProductsStyles";
import DefaultSpinner from "./DefaultSpinner";
import axiosInstance from "../api/axiosInstance";

// Page-level animation variants
const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.8 } },
};

// Product-level animation variants
const productVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.2,
    },
  }),
};

const FeaturedProducts = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await axiosInstance.get("/api/featured");
        setFeaturedItems(response.data.featuredItems || []);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching featured items");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  if (loading) return <DefaultSpinner message="Loading featured items..." />;
  if (error) {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src="images/Empty.png"
          alt="No Data Available"
          style={{ width: "200px", height: "200px", objectFit: "contain" }}
        />
      </div>
    );
  }


  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <FeaturedProductsContainer>
        <Title>Featured Products</Title>
        <Row>
          {featuredItems.length > 0 ? (
            featuredItems.map((item, index) => (
              <motion.div
                key={item._id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={productVariants}
              >
                <Link to={`/featured-details/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Col>
                    <ProductImage src={item.singleImage} alt={item.name} />
                    <ProductName>{item.name}</ProductName>
                    <Rating>
                      {[...Array(Math.floor(item.rating))].map((_, i) => (
                        <Star key={`full-${i}`} className="fa fa-star"></Star>
                      ))}
                      {item.rating % 1 !== 0 && <Star className="fa fa-star-half-o"></Star>}
                      {[...Array(5 - Math.ceil(item.rating))].map((_, i) => (
                        <Star key={`empty-${i}`} className="fa fa-star-o"></Star>
                      ))}
                    </Rating>
                    <Price>₹{item.price.toFixed(2)}</Price>
                  </Col>
                </Link>
              </motion.div>
            ))
          ) : (
            <p>No featured items available.</p>
          )}
        </Row>
      </FeaturedProductsContainer>
    </motion.div>
  );
};

export default FeaturedProducts;
