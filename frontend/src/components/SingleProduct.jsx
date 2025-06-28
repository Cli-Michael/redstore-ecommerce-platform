import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
    gap: 8px;
    margin-left: 40px;
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
`;

const MainImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MainImage = styled.img`
  width: 350px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-right: 0;

  @media (max-width: 768px) {
    width: 80%;
    margin-right: 40px;
  }
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

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;

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

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  }

  img {
    width: 100%;
    height: 327px;
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

// Component

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

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [dummyWishlist, setDummyWishlist] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      console.log("Fetching product data...");
      try {
        setRelatedLoading(true);
        const userId = sessionStorage.getItem("userId");
        console.log("User ID from sessionStorage:", userId);

        // Fetch product data
        const productRes = await axiosInstance.get(`/api/products/${id}`);
        console.log("Fetched product data:", productRes.data);

        // Check wishlist status
        let wishlistCheckRes = { data: { isInWishlist: false } };
        if (userId) {
          wishlistCheckRes = await axiosInstance.post(`/api/wishlist/${userId}/check`, {
            itemId: id,
            itemType: "Product",
          });
          console.log("Wishlist status response:", wishlistCheckRes.data);
        }

        // Fetch related products
        const relatedProductsRes = await axiosInstance.get(`/api/products/Product/${id}/related`);
        console.log("Fetched related products:", relatedProductsRes.data);

        const relatedItems = relatedProductsRes?.data?.relatedItems || [];
        setProduct(productRes.data.product);
        setMainImage(productRes.data.product.singleImage || "/default-image.jpg");
        setIsWishlisted(wishlistCheckRes.data.isInWishlist);
        setRelatedProducts(relatedItems);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError(err.message || "Failed to load product data.");
      } finally {
        setLoading(false);
        setRelatedLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleWishlistToggle = async () => {
    // const userId = sessionStorage.getItem("userId");
    // if (!userId) {
    //   console.log("No user logged in. Redirecting to login page.");
    //   toast.info("Please log in to manage your wishlist.");
    //   setTimeout(() => {
    //     navigate("/account");
    //   }, 2000);
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
      console.log(`Toggling wishlist status for item ${id}. Current status:`, isWishlisted);
      setWishlistLoading(true);

      if (isWishlisted) {
        const res = await axiosInstance.delete(`/api/wishlist/${userId}/${id}/Product`);
        console.log("Removed from wishlist response:", res.data);
        toast.success("Item removed from wishlist.");
      } else {
        const res = await axiosInstance.post(`/api/wishlist/${userId}`, {
          itemId: id,
          itemType: "Product",
        });
        console.log("Added to wishlist response:", res.data);
        toast.success("Item added to wishlist.");
      }

      setIsWishlisted((prev) => !prev);
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("An error occurred while updating the wishlist.");
    } finally {
      setWishlistLoading(false);
    }

  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.log("No user logged in. Redirecting to login page.");
      toast.info("Log in to add items to your cart.");
      setTimeout(() => {
        navigate("/account");
      }, 2000);
      return;
    }

    if (!selectedSize) {
      console.log("No size selected. Cannot add to cart.");
      toast.error("Please select a size before adding to the cart.");
      return;
    }

    try {
      console.log(`Adding item ${id} to cart with size ${selectedSize}`);
      const response = await axiosInstance.post(`/api/cart/${userId}`, {
        productId: id,
        quantity: 1,
        size: selectedSize,
      });
      console.log("Add to cart response:", response.data);

      if (response.status === 200 && response.data.success) {
        toast.success("Item successfully added to cart!");
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("An error occurred while adding to the cart.");
    }
  };


  const handleBuyNow = async () => {
    console.log("Initiating buy now process...");

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.log("No user logged in. Redirecting to login page.");
      toast.info("Log in to proceed with the purchase.");
      setTimeout(() => {
        navigate("/account");
      }, 2000);
      return;
    }

    if (!selectedSize) {
      console.log("No size selected. Cannot proceed to checkout.");
      toast.error("Please select a size before proceeding to checkout.");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      console.error("Failed to load Razorpay script.");
      toast.error("Failed to load payment gateway. Please try again later.");
      return;
    }

    try {
      const amount = product.price; // Convert to paise
      console.log("Creating order for amount:", amount);

      const orderRes = await axiosInstance.post("/api/payment/create-order", {
        amount,
        userId,
        productId: product._id,
        size: selectedSize,
      });
      console.log("Order creation response:", orderRes.data);

      const userProfile = await axiosInstance.get(`/api/users/${userId}`);
      console.log("User profile for payment prefill:", userProfile.data);

      const options = {
        key: "rzp_test_aoXAc54cIyrPl1", // Razorpay Key ID
        amount,
        currency: "INR",
        name: "Your Store",
        description: product.name,
        order_id: orderRes.data.orderId,
        handler: async function (response) {
          console.log("Razorpay payment response:", response);
          try {
            const verifyRes = await axiosInstance.post("/api/payment/verify-direct-payment", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              userId,
              productId: product._id,
              size: selectedSize,
              amount,
            });
            console.log("Payment verification response:", verifyRes.data);

            if (verifyRes.data.success) {
              toast.success("Payment successful! Thank you for your purchase.");
              setTimeout(() => navigate("/order-success"), 2500);
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Error during payment verification:", err);
            toast.error("Error verifying payment. Please try again.");
          }
        },
        prefill: {
          name: userProfile.data.username || "Guest User",
          email: userProfile.data.email || "",
          contact: userProfile.data.phone || "",
        },
        theme: {
          color: "#ff4d4f",
        },
      };

      console.log("Initializing Razorpay payment...");
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initialization error:", err);
      toast.error("Payment initialization failed. Please try again.");
    }
  };

  if (loading) return <DefaultSpinner />;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Container>
        <Wrapper>
          {/* Left Column */}
          <LeftColumn>
            <ThumbnailColumn>
              {product?.multipleImages?.length > 0 ? (
                product.multipleImages.map((img, i) => (
                  <Thumbnail
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i}`}
                    onClick={() => setMainImage(img)}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
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
          {/* Right Column */}
          <RightColumn>
            <Title>{product?.name}</Title>
            <InfoText>
              <strong>Price:</strong> ₹{product?.price}
            </InfoText>
            <InfoText>
              <strong>Description:</strong>
              <span>
                {product?.description?.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            </InfoText>
            <InfoText>
              <strong>Available Sizes:</strong>
              <SizesContainer>
                {product?.sizes?.length > 0 ? (
                  product.sizes.map((sizeObj, index) => (
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

        {/* Related Products */}
        <RelatedProductsSection>
          <RelatedTitle>Related Products</RelatedTitle>
          {relatedLoading ? (
            <DefaultSpinner />
          ) : relatedProducts.length > 0 ? (
            <RelatedGrid>
              {relatedProducts.map((related) => (
                <RelatedCard
                  key={related._id}
                  onClick={() => navigate(`/product-details/${related._id}`)}
                  style={{ cursor: "pointer" }}  // Change cursor to pointer for UX
                >
                  <img src={related.singleImage || "/default-image.jpg"} alt={related.name} />
                  <h3>{related.name}</h3>
                  <p>₹{related.price}</p>
                </RelatedCard>
              ))}
            </RelatedGrid>
          ) : (
            <p style={{ textAlign: "center" }}>No related products found.</p>
          )}
        </RelatedProductsSection>
      </Container>
    </>
  );
};

export default SingleProduct;
