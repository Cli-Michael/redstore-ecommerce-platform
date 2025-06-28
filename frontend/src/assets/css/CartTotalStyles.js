import styled from "styled-components";

export const TotalPriceContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
  padding: 1rem;

  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 0.5rem;
  }
`;

export const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;

  td {
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.5rem;
    }
  }

  td:nth-child(2) {
    text-align: right;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  tr:last-child td {
    font-size: 1.25rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const CheckoutButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #ff523b;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e84118;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
`;
