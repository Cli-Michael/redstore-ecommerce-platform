const Col = styled.div`
  flex: 1 0 21%; /* 4 columns per row */
  margin: 15px;
  text-align: center;
  box-sizing: border-box;

  img {
    max-width: 100%;
    height: auto; /* Ensures the aspect ratio is maintained */
    border-radius: 10px;
    object-fit: cover; /* Ensures the image fills the available space */
    width: 100%; /* Prevents the image from exceeding column width */
    max-height: 250px; /* Restricts large images */
  }

  h4 {
    margin: 10px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .rating {
    color: #ff523b;
    margin: 5px 0;

    i {
      margin-right: 2px;
    }
  }

  p {
    font-size: 14px;
    color: #777;
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    flex: 1 0 45%; /* 2 columns per row for tablets */
  }

  @media (max-width: 480px) {
    flex: 1 0 100%; /* 1 column per row for mobile */
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;

  & > div {
    padding: 15px;
  }

  &.row-2 {
    justify-content: space-between;
    align-items: center;

    h2 {
      flex: 1;
      font-size: 24px;
      font-weight: 700;
    }

    select {
      padding: 8px;
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;
