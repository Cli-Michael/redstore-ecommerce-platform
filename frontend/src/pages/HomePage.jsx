import React from 'react';
import Header from '../components/Header';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Offer from '../components/Offer';
import Testimonial from '../components/Testimonial';
import Brands from '../components/Brands';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <FeaturedCategories />
      <FeaturedProducts />
      <Offer />
      <Testimonial />
      <Brands />
      <Footer />
    </div>
  );
};

export default HomePage;
