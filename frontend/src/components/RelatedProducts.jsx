import React from "react";
import styled from "styled-components";

const RelatedProductsContainer = styled.div`
  margin: 40px auto;
  max-width: 1200px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
`;

const ProductCard = styled.div`
  background: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 18px;
    margin: 10px 0;
  }

  .price {
    font-size: 16px;
    color: #ff523b;
    font-weight: bold;
  }

  .rating {
    margin-top: 10px;
    color: #ff523b;

    i {
      margin: 0 2px;
    }
  }
`;

const RelatedProducts = () => {
  const relatedItems = [
    {
      id: 1,
      image: "/product-2.jpg",
      title: "Black Sportx Watch",
      price: "$135.00",
      rating: 4.5,
    },
    {
      id: 2,
      image: "/product-3.jpg",
      title: "Black HRX Shoes",
      price: "$50.00",
      rating: 4.8,
    },
    {
      id: 3,
      image: "/product-4.jpg",
      title: "Gray Nike Shoes",
      price: "$55.00",
      rating: 4.7,
    },
    {
      id: 4,
      image: "/product-12.jpg",
      title: "HRX Black Trackpants",
      price: "$75.00",
      rating: 4.3,
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 > 0.4 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <i key={`full-${index}`} className="fa fa-star"></i>
          ))}
        {halfStar > 0 && <i className="fa fa-star-half-o"></i>}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <i key={`empty-${index}`} className="fa fa-star-o"></i>
          ))}
      </>
    );
  };

  return (
    <RelatedProductsContainer>
      <h2>Related Products</h2>
      <div className="products-grid">
        {relatedItems.map((item) => (
          <ProductCard key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <div className="price">{item.price}</div>
            <div className="rating">{renderStars(item.rating)}</div>
          </ProductCard>
        ))}
      </div>
    </RelatedProductsContainer>
  );
};

export default RelatedProducts;
