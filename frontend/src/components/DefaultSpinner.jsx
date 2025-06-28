import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

// Keyframes for spinner animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components for the spinner
const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full page height
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #ccc;
  border-top: 5px solid #808080; /* Grey color */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const SpinnerText = styled.span`
  font-size: 16px;
  color: #808080; /* Grey color */
`;

// Spinner Component
const DefaultSpinner = ({ message = "Loading..." }) => (
  <SpinnerWrapper>
    <Spinner />
    <SpinnerText>{message}</SpinnerText>
  </SpinnerWrapper>
);

DefaultSpinner.propTypes = {
  message: PropTypes.string,
};

export default DefaultSpinner;
