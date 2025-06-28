import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import EmptyWishlist from "./EmptyWishlist";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";


// Styled components

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

// Grid container for desktop, flex column for mobile
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on small screens */
    gap: 10px; /* Reduce gap for smaller screens */
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  padding: 16px;
  display: flex;
  flex-direction: row; /* Desktop: horizontal */
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 15px rgb(0 0 0 / 0.15);
  }

  @media (max-width: 600px) {
    flex-direction: column; /* Mobile: vertical */
    padding: 12px;
  }
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
  flex-shrink: 0; /* keep image size */

  @media (max-width: 600px) {
    width: 100%;   /* full width on mobile */
    height: auto;  /* auto height to keep aspect ratio */
    margin-bottom: 16px;
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 16px;

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

const ItemName = styled.h3`
  margin: 0 0 6px 0;
  font-weight: 600;
  font-size: 1.2rem;
  color: #222;
`;

const ItemType = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 8px;
  display: inline-block;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: #3498db;
  margin-bottom: 12px;
`;

const SizesWrapper = styled.div`
  margin-bottom: 12px;
`;

const SizeButton = styled.button`
  font-family: 'Poppins', sans-serif;
  margin-right: 8px;
  margin-bottom: 6px;
  padding: 6px 12px;
  border: 1px solid ${(props) => (props.selected ? "#3498db" : "#ccc")};
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected ? "rgba(52, 152, 219, 0.1)" : "#f9f9f9"};
  color: ${(props) => (props.selected ? "#3498db" : "#333")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
    props.selected ? "rgba(52, 152, 219, 0.2)" : "#e9e9e9"};
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;

  @media (max-width: 600px) {
    margin-top: 0;
    align-items: center;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: ${(props) => (props.variant === "delete" ? "#e74c3c" : "#3498db")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
    props.variant === "delete"
      ? "rgba(231, 76, 60, 0.15)"
      : "rgba(52, 152, 219, 0.15)"};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

const Wishlist = ({ userId }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosInstance.get(`/api/wishlist/${userId}`);
        setWishlistItems(response.data.wishlist?.items || []);
      } catch (err) {
        setError("Failed to load wishlist.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleAddToCart = async (itemId, itemType) => {
    const selectedSize = selectedSizes[itemId];

    if ((itemType === "Product" || itemType === "Featured") && !selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    if (!userId) {
      toast.info("Please log in to add items to your cart.");
      return;
    }

    try {
      const endpoint = `/api/wishlist/${userId}/cart`;
      const payload = {
        productId: itemId,
        productType: itemType,
        size: selectedSize || null,
      };

      const response = await axiosInstance.post(endpoint, payload);

      if (response.status === 200) {
        await axiosInstance.delete(`/api/wishlist/${userId}/${itemId}/${itemType}`);

        toast.success("Item added to cart successfully.");

        setWishlistItems((prev) =>
          prev.filter(
            (item) => item.itemId !== itemId || item.itemType !== itemType
          )
        );
      } else {
        toast.error(response.data.message || "Failed to add item to cart.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.response?.data?.message || "Error adding item to cart.");
    }
  };


  const handleRemove = async (itemId, itemType) => {
    try {
      await axiosInstance.delete(`/api/wishlist/${userId}/${itemId}/${itemType}`);
      setWishlistItems((prev) =>
        prev.filter(
          (item) => item.itemId !== itemId || item.itemType !== itemType
        )
      );
      toast.success("Item removed from wishlist.");
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
      toast.error("Failed to remove item from wishlist.");
    }
  };

  const handleCardClick = (itemId, itemType) => {
    const path =
      itemType === "Featured"
        ? `/featured-details/${itemId}`
        : `/product-details/${itemId}`;
    navigate(path);
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (wishlistItems.length === 0) return <EmptyWishlist />;

  return (
    <Container>
      <Title>Your Wishlist</Title>
      <CardGrid>
        {wishlistItems.map((item) => {
          const details = item.details || {};
          return (
            <Card key={item.itemId} role="group" tabIndex={-1}>
              <Thumbnail
                src={
                  details.singleImage ||
                  "https://via.placeholder.com/120?text=No+Image"
                }
                alt={details.name || "Item image"}
              />
              <CardContent
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(item.itemId, item.itemType)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(item.itemId, item.itemType);
                  }
                }}
              >
                <ItemName>{details.name || "Unknown Item"}</ItemName>
                <ItemType>{item.itemType}</ItemType>
                <Price>
                  {details.price ? `$${details.price.toFixed(2)}` : "N/A"}
                </Price>
                <SizesWrapper>
                  {details.sizes && details.sizes.length > 0 ? (
                    details.sizes.map((sizeObj, index) => (
                      <SizeButton
                        key={index}
                        selected={selectedSizes[item.itemId] === sizeObj.size}
                        disabled={!sizeObj.available}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (sizeObj.available)
                            handleSizeChange(item.itemId, sizeObj.size);
                        }}
                      >
                        {sizeObj.size}
                      </SizeButton>
                    ))
                  ) : (
                    <p>No sizes available</p>
                  )}
                </SizesWrapper>
                <ActionsWrapper>
                  <IconButton
                    aria-label="Add to cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item.itemId, item.itemType);
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-13.83-3.25l1.2-5.3h13.335l-1.453 5.3H3.17zm15.213-7.05l-1.413-2.983c-.145-.31-.43-.516-.76-.557L6.147 3H3v2h2l3.6 7.59-1.35 2.45C6.16 14.33 6 14.66 6 15c0 1.104.896 2 2 2h12v-2H8.42c-.102 0-.188-.075-.21-.172l.03-.122L9.1 13h7.455c.68 0 1.28-.45 1.46-1.1l2.5-7.1-2.45-.8z" />
                    </svg>
                  </IconButton>
                  <IconButton
                    aria-label="Delete from wishlist"
                    variant="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item.itemId, item.itemType);
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 01-1 .5H8.5a1 1 0 01-1-.5L6 9zm3 2v7h2v-7H9zm4 0v7h2v-7h-2zM10 4h4v2h-4V4z" />
                    </svg>
                  </IconButton>
                </ActionsWrapper>
              </CardContent>
            </Card>
          );
        })}
      </CardGrid>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </Container>
  );
};

export default Wishlist;