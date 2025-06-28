import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
`;

export const Container = styled.div`
  max-width: 900px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  background: #eef1f5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
`;


export const Image = styled.img`
  max-width: 90%;
  border-radius: 8px;
`;

export const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const ToggleButtons = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 2rem;
`;

export const ToggleButton = styled.span`
  flex: 1;
  text-align: center;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? "#333" : "#888")};
`;

export const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({ active }) => (active ? "0" : "50%")};
  width: 50%;
  height: 2px;
  background: #ff5252;
  transition: all 0.3s ease-in-out;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    color: #888; /* Adjust color if needed */
  }

  &:focus {
    outline: none;
    border-color: #ff5252;
  }
`;

export const Button = styled.button`
  padding: 0.8rem;
  background: #ff5252;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: #e14b4b;
  }
`;

export const ForgotPassword = styled.a`
  margin-top: 1rem;
  text-align: center;
  color: #888;
  text-decoration: none;

  &:hover {
    color: #333;
  }
`;
