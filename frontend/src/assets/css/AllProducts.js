import styled from "styled-components";

// Ensure you import the font globally by adding it in your root HTML or CSS file
// Example in your global CSS or HTML
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" />

export const SmallContainer = styled.div`
  max-width: 1000px; /* Reduce the maximum width */
  margin: 90px auto; /* Center align with margin adjustments */
  padding: 0 20px; /* Maintain padding for inner content */
  font-family: 'Poppins', sans-serif; /* Apply Poppins font */
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px; /* Reduce horizontal spacing between columns */

  &.row-2 {
    justify-content: space-between;
    margin: 40px 0 30px; /* Adjust top and bottom margins */

    h2 {
      flex: 1;
      margin-left: 10px; /* Slight left margin for better spacing */
      font-family: 'Poppins', sans-serif; /* Apply Poppins font */
    }

    select {
      border: 1px solid #ff523b;
      padding: 5px;
      margin-right: 10px; /* Add spacing on the right */
      font-family: 'Poppins', sans-serif; /* Apply Poppins font */
    }

    select:focus {
      outline: none;
    }
  }
`;

export const Col = styled.div`
  flex: 1 0 21%; /* Keep items responsive */
  margin: 15px 10px; /* Adjust horizontal and vertical margins */
  text-align: center;
  font-family: 'Poppins', sans-serif; /* Apply Poppins font */

  img {
    max-width: 100%;
    border-radius: 10px;
    margin-bottom: 10px; /* Add spacing below the image */
  }

  h4 {
    font-size: 16px;
    margin: 10px 0;
    font-family: 'Poppins', sans-serif; /* Apply Poppins font */
  }

  .rating {
    margin: 5px 0;
    color: #ff523b;

    i {
      margin-right: 2px;
    }
  }

  p {
    font-size: 14px;
    color: #333;
    font-family: 'Poppins', sans-serif; /* Apply Poppins font */
  }

  @media (max-width: 768px) {
    flex: 1 0 45%; /* 2 items per row */
  }

  @media (max-width: 480px) {
    flex: 1 0 100%; /* 1 item per row */
  }
`;

export const PageButton = styled.div`
  margin: 20px auto 80px;
  text-align: center;

  span {
    display: inline-block;
    border: 1px solid #ff523b;
    margin-left: 10px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    font-family: 'Poppins', sans-serif; /* Apply Poppins font */

    &:hover {
      background: #ff523b;
      color: #fff;
    }
  }
`;
