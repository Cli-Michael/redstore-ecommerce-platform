import styled from 'styled-components';

// Styled Checkout Button Component
const CheckoutButton = styled.button`
  padding: 12px 24px;
  background-color: #555;  // Slight dark grey background color
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-family: 'Poppins', sans-serif;  // Apply Poppins font
  
  &:hover {
    background-color: #444;  // Darker grey when hovered
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  margin-top: 20px;  // Add margin if needed for spacing
  margin-left: 900px;  // Left margin for large screens
  align-self: flex-end;  // Align to the right end of its container if in flexbox
  
  @media (max-width: 1200px) {
    margin-left: 700px;  // Adjust for medium screen sizes
  }

  @media (max-width: 992px) {
    margin-left: 500px;  // Adjust for smaller screens
  }

  @media (max-width: 768px) {
    margin-left: 300px;  // Keep the button aligned to the right on mobile screens
    margin-right: 20px;  // Add some space to the right
    align-self: flex-end;  // Ensure it stays aligned to the bottom-right on mobile
  }

  @media (max-width: 480px) {
    margin-left: 50px;  // Minimal left margin on extra small screens
    margin-right: 10px;  // Keep the button from touching the screen edges
  }

  @media (max-width: 375px) {
    margin-left: 20px;  // Very tight left margin for very narrow screens
    margin-right: 10px;  // Adjust the right margin for very narrow screens
  }

`;

export default CheckoutButton;
