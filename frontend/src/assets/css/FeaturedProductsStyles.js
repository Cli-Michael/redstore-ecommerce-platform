// src/components/FeaturedProductsStyles.js
import styled from "styled-components";

export const FeaturedProductsContainer = styled.div`
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Default: 2 columns for small screens */
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr); /* 4 columns for larger screens */
  }
`;

export const Col = styled.div`
  text-align: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 20px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const ProductName = styled.h4`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const Rating = styled.div`
  margin: 10px 0;
`;

export const Star = styled.i`
  color: #ff9800;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
`;
