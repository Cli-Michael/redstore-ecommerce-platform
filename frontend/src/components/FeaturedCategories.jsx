import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link
import {
  Section,
  Title,
  Container,
  Row,
  Category,
  CategoryImage,
} from '../assets/css/FeaturedCategories';

// Animation for individual categories
const categoryVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const imageStyle = {
  height: "330px", // Uniform height
  width: "310px",  // Uniform width
  objectFit: "cover", // Ensures proper scaling
};

const FeaturedCategories = () => {
  return (
    <Section>
      <Title>Featured Categories</Title>
      <Container>
        <Row>
          {/* Jeans Category */}
          <motion.div
            variants={categoryVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link to="/products/category/jeans" style={{ textDecoration: "none" }}>
              <Category>
                <CategoryImage
                  src="/category-1.jpg"
                  alt="All Products"
                  style={imageStyle} // Apply uniform styling
                />
              </Category>
            </Link>
          </motion.div>

          {/* Shoes Category */}
          <motion.div
            variants={categoryVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link to="/products/category/shoes" style={{ textDecoration: "none" }}>
              <Category>
                <CategoryImage
                  src="category-2.jpg"
                  alt="Shoes"
                  style={imageStyle} // Apply uniform styling
                />
              </Category>
            </Link>
          </motion.div>

          {/* Jackets Category */}
          <motion.div
            variants={categoryVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link to="/products/category/jackets" style={{ textDecoration: "none" }}>
              <Category>
                <CategoryImage
                  src="jacket.jpg"
                  alt="Jackets"
                  style={imageStyle} // Apply uniform styling
                />
              </Category>
            </Link>
          </motion.div>
        </Row>
      </Container>
    </Section>
  );
};

export default FeaturedCategories;
