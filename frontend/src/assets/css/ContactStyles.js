// ContactStyles.js
import styled from "styled-components";

export const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem; /* Increase horizontal padding on mobile */
  }
`;



export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Form = styled.form`
  margin: 2rem auto;
  max-width: 600px;
  text-align: left;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1.5rem; /* Add horizontal padding for the form */
  }
`;


export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;

  @media (max-width: 768px) {
    padding: 0.65rem;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;

  @media (max-width: 768px) {
    padding: 0.65rem;
  }
`;

export const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #ff523b;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e84118;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;
