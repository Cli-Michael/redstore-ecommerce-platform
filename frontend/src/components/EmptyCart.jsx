import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  color: #555;
`;

const CartIcon = styled.svg`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  fill: rgba(0, 0, 0, 0.1); /* light transparent black */
  stroke: rgba(0, 0, 0, 0.3);
  stroke-width: 2;
`;

const EmptyCartMessage = styled.p`
  font-size: 1.3rem;
  margin-bottom: 20px;
`;

const ShopButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <EmptyCartContainer>
      <CartIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zM1 2h2l3.6 7.59-1.35 2.44c-.18.31-.25.67-.18 1.02.14.66.74 1.15 1.43 1.15H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49-1.75-1L7 18zm16 16c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" />
        <line x1="3" y1="3" x2="21" y2="21" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
      </CartIcon>
      <EmptyCartMessage>Your cart is empty. Start shopping!</EmptyCartMessage>
      <ShopButton onClick={() => navigate("/products")}>Shop Now</ShopButton>
    </EmptyCartContainer>
  );
};

export default EmptyCart;
