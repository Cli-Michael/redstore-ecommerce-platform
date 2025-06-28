// src/assets/css/FeaturedCategoriesStyles.js
import styled from 'styled-components';

export const Section = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 2rem;
  color: #333;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Category = styled.div`
  flex: 1 1 calc(50% - 1.5rem); /* Two items per row with a gap */
  max-width: 300px;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 1rem); /* Adjust gap for smaller screens */
    max-width: 100%; /* Prevent overflow */
  }

  @media (max-width: 480px) {
    flex: 1 1 100%; /* One item per row for very small screens */
  }
`;

export const CategoryImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
