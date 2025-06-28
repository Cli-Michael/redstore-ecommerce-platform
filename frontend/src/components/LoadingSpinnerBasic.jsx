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
const LoadingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 4px solid #ccc;
  border-top: 4px solid #007bff; /* Primary color */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SpinnerText = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #007bff;
`;

// Spinner Component
const LoadingSpinner = () => (
  <LoadingSpinnerWrapper>
    <Spinner />
    <SpinnerText>...</SpinnerText>
  </LoadingSpinnerWrapper>
);

export default LoadingSpinner;
