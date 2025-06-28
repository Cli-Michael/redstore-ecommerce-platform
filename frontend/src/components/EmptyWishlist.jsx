import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa"; // using react-icons for icon

const EmptyContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #555;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  color: #ccc;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 12px;
`;

const EmptyMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 24px;
`;

const ShopButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;  /* <-- Add this line */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;


const EmptyWishlist = () => {
  const navigate = useNavigate();

  return (
    <EmptyContainer>
      <EmptyIcon>
        <FaHeartBroken />
      </EmptyIcon>
      <EmptyTitle>Your wishlist is empty</EmptyTitle>
      <EmptyMessage>Looks like you haven’t added anything yet.</EmptyMessage>
      <ShopButton onClick={() => navigate("/products")}>Start Shopping</ShopButton>
    </EmptyContainer>
  );
};

export default EmptyWishlist;
