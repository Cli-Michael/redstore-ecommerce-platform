import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Container for the whole testimonial section
export const TestimonialContainer = styled.div`
  padding: 40px 20px;
  background-color: #f9f9f9;
`;

// Wrapper to center content and control width
export const TestimonialWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Row for testimonials grid layout
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

// Each testimonial column/card
export const Col = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  flex: 1 1 300px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// Quote icon styling
export const QuoteIcon = styled.i`
  font-size: 36px;
  color: #ccc;
  margin-bottom: 20px;
`;

// The testimonial text body
export const TestimonialText = styled.p`
  font-size: 16px;
  font-style: italic;
  color: #333;
  margin-bottom: 20px;
  min-height: 100px;
`;

// Container for the star rating
export const Rating = styled.div`
  margin-bottom: 20px;
`;

// Each star icon
export const Star = styled.i`
  color: #f5a623;
  margin: 0 2px;
  font-size: 20px;
`;

// User profile image
export const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  box-shadow: 0 0 5px rgba(0,0,0,0.15);
`;

// User name text
export const UserName = styled.h4`
  font-weight: 600;
  color: #222;
  margin: 0;
`;

// Loading spinner component (animated)
export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #ccc;
  border-top: 6px solid #000;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 40px auto;
`;

// Error text styling
export const ErrorText = styled.div`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 40px;
`;

// No data text styling
export const NoDataText = styled.div`
  color: #777;
  font-size: 18px;
  text-align: center;
  margin-top: 40px;
`;
