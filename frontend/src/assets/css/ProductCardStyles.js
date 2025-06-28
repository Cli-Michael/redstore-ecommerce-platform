import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  width: 200px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Details = styled.div`
  margin-top: 10px;
  font-size: 0.9em;
  text-align: left;

  p {
    margin: 5px 0;
  }
`;

export const AdditionalImages = styled.div`
  margin-top: 10px;

  img {
    width: 100px;
    margin: 5px;
  }
`;
