import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SingleProduct from '../components/SingleProduct'
import RelatedProducts from '../components/RelatedProducts'

const ProductsDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <SingleProduct />
      <Footer />
    </div>
  )
}

export default ProductsDetailsPage;
