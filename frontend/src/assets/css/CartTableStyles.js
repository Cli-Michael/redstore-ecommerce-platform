import styled from "styled-components";

export const CartPage = styled.div`
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 0 0.5rem;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Allows horizontal scrolling for smaller screens */
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    white-space: nowrap; /* Prevents text wrapping */
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
    text-align: left;
  }

  td {
    vertical-align: middle;
  }

  tr {
    border-bottom: 1px solid #ddd;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.75rem;
      font-size: 0.9rem;
    }
  }
`;

export const CartInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: auto;
    margin-right: 1rem;

    @media (max-width: 768px) {
      width: 60px;
    }
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  small {
    font-size: 0.875rem;
    color: #555;

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }

  a {
    font-size: 0.875rem;
    color: #ff523b;
    text-decoration: none;

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const QuantityInput = styled.input`
  width: 50px;
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 40px;
    padding: 0.4rem;
  }
`;

export const Subtotal = styled.td`
  font-size: 1rem;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
