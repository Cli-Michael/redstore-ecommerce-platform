import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f6f9fc;
  padding: 2rem;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const Icon = styled.div`
  font-size: 6rem;
  color: #4caf50;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: #555;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const RedirectNote = styled.p`
  font-size: 0.9rem;
  color: #999;
`;

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Wrapper>
      <Icon>✅</Icon>
      <Title>Order Successful!</Title>
      <Message>Thank you for your purchase. Your order has been placed successfully.</Message>
      <RedirectNote>Redirecting you to homepage shortly...</RedirectNote>
    </Wrapper>
  );
};

export default OrderSuccess;
