import styled from "styled-components";

export const SmallContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fefefe;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  margin-bottom: 20px;

  &.row-2 {
    justify-content: flex-end;
    margin-top: 10px;  /* Control spacing between header and row */
  }

  select {
    padding: 8px 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:focus {
      border-color: #555;
      background-color: #fff;
      outline: none;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const Col = styled.div`
  flex: 1 1 calc(25% - 20px); /* 4 columns on big screens */
  margin: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 70%; /* Maintain width for larger screens */
    height: 350px; /* Fixed height */
    object-fit: cover;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  h4 {
    margin: 15px 0 10px;
    font-size: 18px;
    font-weight: bold;
    color: #444;
    transition: color 0.3s ease;

    &:hover {
      color: #555;
    }
  }

  .rating i {
    color: #f1c40f;
    margin: 0 2px;
  }

  @media (max-width: 1200px) {
    flex: 1 1 calc(50% - 20px); /* 2 columns on medium screens */
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 20px); /* keep 2 columns on tablets and big phones */
    img {
      width: 90%;
      height: auto;
    }
  }

  @media (max-width: 480px) {
    flex: 1 1 calc(50% - 10px); /* 2 columns on phones */
    max-width: calc(50% - 10px); /* prevent overflow */
    img {
      width: 100%;
      height: auto;
    }
  }
`;


export const PageButton = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  span {
    margin: 5px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fafafa;
    color: #333;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f1f1f1;
      border-color: #999;
    }

    &.active {
      background-color: #333;
      color: #fff;
      border-color: #333;
    }
  }

  @media (max-width: 480px) {
    span {
      font-size: 12px;
      padding: 8px 12px;
    }
  }
`;
