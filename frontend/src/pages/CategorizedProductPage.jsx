import React from 'react'
import Navbar from '../components/Navbar'
import ProductListing from '../components/ProductListing'
import Footer from '../components/Footer'
import CategorizedProduct from '../components/CategorizedProduct'

const CategorizedProductPage = () => {
  return (
    <div>
      <Navbar />
      <CategorizedProduct />
      <Footer />
    </div>
  )
}

export default CategorizedProductPage;
