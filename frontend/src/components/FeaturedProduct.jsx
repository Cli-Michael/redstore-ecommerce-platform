import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled, { createGlobalStyle } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultSpinner from "./DefaultSpinner";
import axiosInstance from "../api/axiosInstance";

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f4f6f8;
    color: #333;
  }
`;

// Styled Components
const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex-wrap: nowrap;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ThumbnailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: row; /* Display thumbnails in a row */
    flex-wrap: wrap;    /* Allow wrapping */
    justify-content: center;
    gap: 8px;
  }
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: #ff4d4f;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 8px); /* Adjust width for 2 thumbnails per row */
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center; /* Center the main image horizontally */
  align-items: center; /* Center the main image vertically */
  overflow: hidden; /* Ensure no overflowing content */
  background-color: #f9f9f9; /* Optional background for better contrast */
  border-radius: 12px;
`;

const MainImage = styled.img`
  max-width: 100%; /* Ensure the image fits within the container */
  max-height: 500px; /* Limit the height */
  object-fit: contain; /* Maintain aspect ratio and contain within the area */
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  position: relative; /* Ensure it layers correctly within the container */
`;

const HeartIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: ${(props) => (props.active ? "#ff4d4f" : "#ccc")};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff4d4f;
  }

  @media (max-width: 768px) {
    font-size: 30px;
    top: 10px;
    right: 10px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    top: 8px;
    right: 8px;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  padding-top: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #222;
  margin-bottom: 20px;
`;

const InfoText = styled.div`
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.6;

  strong {
    font-weight: 600;
    color: #000;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 14px 30px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, #ff6a6a, #ff4d4f);
  box-shadow: 0 4px 14px rgba(255, 77, 79, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff4d4f, #d73737);
    box-shadow: 0 6px 20px rgba(255, 77, 79, 0.4);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RelatedProductsSection = styled.div`
  margin-top: 60px;
`;

const RelatedTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const RelatedCard = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  background-color: #fafafa;
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  }

  img {
    width: 100%;
    height: 377px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    font-size: 16px;
    margin-top: 10px;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const SizesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SizeButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${({ available }) => (available ? "#ccc" : "#ddd")};
  background-color: ${({ selected, available }) =>
    selected ? "#ff4d4f" : available ? "#fff" : "#f4f4f4"};
  color: ${({ available }) => (available ? "#333" : "#888")};
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ available }) => (available ? "#f5c6c6" : "inherit")};
  }
`;

const FeaturedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [dummyWishlist, setDummyWishlist] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const userId = sessionStorage.getItem("userId");

        const productReq = axiosInstance.get(`/api/featured/${id}`);
        const wishlistReq = userId
          ? axiosInstance
            .post(`/api/wishlist/${userId}/check`, {
              itemId: id,
              itemType: "Featured",
            })
            .catch((err) =>
              err.response?.status === 404
                ? { data: { isInWishlist: false } }
                : Promise.reject(err)
            )
          : Promise.resolve({ data: { isInWishlist: false } });

        const relatedReq = axiosInstance.get(`/api/products/featured/${id}/related`);

        const [productRes, wishlistRes, relatedRes] = await Promise.all([
          productReq,
          wishlistReq,
          relatedReq,
        ]);

        setProduct(productRes.data.featuredItem);
        setMainImage(productRes.data.featuredItem.singleImage || "");
        setIsWishlisted(wishlistRes.data.isInWishlist);
        setRelatedProducts(relatedRes.data.relatedItems || []);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleWishlistToggle = async () => {
    // const userId = sessionStorage.getItem("userId");
    // if (!userId) {
    //   toast.info("Log in to use wishlist feature.");
    //   return;
    // }

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      // Dummy wishlist logic
      if (dummyWishlist.includes(id)) {
        setDummyWishlist(dummyWishlist.filter((item) => item !== id));
        toast.info("Removed from wishlist (guest mode).");
      } else {
        setDummyWishlist([...dummyWishlist, id]);
        toast.info("Added to wishlist (guest mode).");
      }
      return;
    }

    try {
      if (isWishlisted) {
        await axiosInstance.delete(`/api/wishlist/${userId}/${id}/Featured`);
        toast.success("Removed from wishlist.");
      } else {
        await axiosInstance.post(`/api/wishlist/${userId}`, {
          itemId: id,
          itemType: "Featured",
        });
        toast.success("Added to wishlist.");
      }
      setIsWishlisted((prev) => !prev);
    } catch {
      toast.error("Error updating wishlist.");
    }

  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.info("Please register or log in to add items to your cart.");
      setTimeout(() => {
        navigate("/account"); // Redirect to /register instead of /account
      }, 2000);
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size before adding to the cart.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axiosInstance.post(
        `/api/cart/${userId}/cart/featured`,
        { productId: id, quantity: 1, size: selectedSize },
        config
      );

      if (res.status === 200 && res.data.success) {
        toast.success("Added to cart!");
      } else {
        toast.error("Failed to add to cart.");
      }
    } catch (error) {
      toast.error("Error adding to cart.");
    }
  };


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.info("Log in to proceed with the purchase.");
      setTimeout(() => navigate("/account"), 2000);
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size before proceeding to checkout.");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway. Please try again later.");
      return;
    }

    try {
      const amount = product.price; // amount in paise
      const orderResponse = await axiosInstance.post("/api/payment/create-order", {
        amount,
        userId,
        productId: product._id,
        size: selectedSize,
        modelType: product.modelType || "product",
      });

      const userProfile = await axiosInstance.get(`/api/users/${userId}`);

      const options = {
        key: "rzp_test_aoXAc54cIyrPl1", // Your Razorpay Key
        amount,
        currency: "INR",
        name: "Your Store",
        description: product.name,
        order_id: orderResponse.data.orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axiosInstance.post(
              "/api/payment/verify-direct-payment",
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                userId,
                productId: product._id,
                size: selectedSize,
                amount,
              }
            );

            if (verifyResponse.data.success) {
              toast.success("Payment successful! Thank you for your purchase.");
              setTimeout(() => navigate("/order-success"), 2500);
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            toast.error("Error verifying payment. Please try again.");
          }
        },
        prefill: {
          name: userProfile.data.username || "Guest User",
          email: userProfile.data.email || "",
          contact: userProfile.data.phone || "",
        },
        theme: { color: "#ff4d4f" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment initialization failed. Please try again.");
    }
  };

  if (loading) return <DefaultSpinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p style={{ color: "red" }}>Product not found.</p>;

  const { name, price, description, rating, multipleImages, sizes } = product;

  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Container>
        <Wrapper>
          <LeftColumn>
            <ThumbnailColumn>
              {multipleImages?.map((img, idx) => (
                <Thumbnail
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </ThumbnailColumn>
            <MainImageContainer>
              <MainImage src={mainImage} alt={name} />
              <HeartIcon
                active={isWishlisted || dummyWishlist.includes(id)}
                onClick={handleWishlistToggle}
              >
                {(isWishlisted || dummyWishlist.includes(id)) ? <FaHeart /> : <FaRegHeart />}
              </HeartIcon>
            </MainImageContainer>
          </LeftColumn>
          <RightColumn>
            <Title>{name}</Title>
            <InfoText>
              <strong>Price:</strong> ₹{price}
            </InfoText>
            <InfoText>
              <strong>Rating:</strong> {rating} ⭐
            </InfoText>
            <InfoText>
              <strong>Description:</strong>
              <div>
                {description.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </InfoText>
            <InfoText>
              <strong>Available Sizes:</strong>
              <SizesContainer>
                {sizes?.length > 0 ? (
                  sizes.map((sizeObj, index) => (
                    <SizeButton
                      key={index}
                      available={sizeObj.available}
                      selected={sizeObj.size === selectedSize}
                      onClick={() => sizeObj.available && setSelectedSize(sizeObj.size)}
                    >
                      {sizeObj.size}
                    </SizeButton>
                  ))
                ) : (
                  <p>No sizes available</p>
                )}
              </SizesContainer>
            </InfoText>

            <ButtonRow>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
              <Button onClick={handleBuyNow}>Buy Now</Button>
            </ButtonRow>
          </RightColumn>
        </Wrapper>

        <RelatedProductsSection>
          <RelatedTitle>Related Products</RelatedTitle>
          {relatedProducts?.length > 0 ? (
            <RelatedGrid>
              {relatedProducts.map((relatedProduct) => (
                <RelatedCard
                  key={relatedProduct._id}
                  onClick={() => navigate(`/featured-details/${relatedProduct._id}`)}
                >
                  <img src={relatedProduct.singleImage} alt={relatedProduct.name} />
                  <h3>{relatedProduct.name}</h3>
                  <p>₹{relatedProduct.price}</p>
                </RelatedCard>
              ))}
            </RelatedGrid>
          ) : (
            <p>No related products found.</p>
          )}
        </RelatedProductsSection>
      </Container>
    </>
  );
};

export default FeaturedProduct;