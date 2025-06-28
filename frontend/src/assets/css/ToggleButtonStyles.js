import styled from "styled-components";

export const ToggleButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  gap: 12px;
`;

export const ToggleButton = styled.button`
  padding: 12px 28px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #555555;
  border-radius: 30px;
  background-color: ${(props) => (props.active ? "#555555" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#555555")};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.active
      ? "0 4px 12px rgba(85, 85, 85, 0.3)"
      : "0 2px 6px rgba(0, 0, 0, 0.08)"};
  transition: background-color 0.35s ease, color 0.35s ease,
    box-shadow 0.35s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#444444" : "#f7f7f7")};
    color: ${(props) => (props.active ? "#fff" : "#444444")};
    box-shadow: ${(props) =>
      props.active
        ? "0 6px 16px rgba(68, 68, 68, 0.45)"
        : "0 4px 10px rgba(0, 0, 0, 0.12)"};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(85, 85, 85, 0.5);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
  }
`;
