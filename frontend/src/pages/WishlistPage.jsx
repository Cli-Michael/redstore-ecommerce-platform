import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/Navbar";
import Wishlist from "../components/Wishlist";
import Footer from "../components/Footer";

// Global styles
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f4f4f4;
  }
`;

// Styled components
const FallbackMessage = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
  color: #e74c3c;
`;

const WishlistPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("User ID not found in sessionStorage. Ensure the user is logged in.");
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      {userId ? (
        <Wishlist userId={userId} />
      ) : (
        <FallbackMessage>Please log in to view your wishlist.</FallbackMessage>
      )}
      <div style={{ marginTop: "300px" }}>
        <Footer />
      </div>
    </>
  );
};

export default WishlistPage;
