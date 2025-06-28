import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";  // Import styled here
import { CartTable, CartTotal } from "../components/CartComponents";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToggleButton, ToggleButtonGroup } from "../assets/css/ToggleButtonStyles";
import EmptyCart from "../components/EmptyCart";
import OrderTracking from "../components/OrderTracking";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const TableWrapper = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    font-family: 'Poppins', sans-serif;
  }

  th {
    background-color: #f9f9f9;
    font-weight: 600;
    color: #333;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const OrderCardContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const OrderCard = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 15px 20px;
  margin-bottom: 15px;
  font-family: 'Poppins', sans-serif;
  background: #fff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
`;

const OrderField = styled.div`
  margin-bottom: 8px;
  font-size: 14px;

  & strong {
    color: #555;
  }
`;

const OrderItemsList = styled.div`
  margin-left: 10px;
  font-size: 13px;
  color: #444;
`;

const ToggleTrackingBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  border-radius: 20px;
  border: 2px solid #555555;
  background-color: ${(props) => (props.active ? "#555555" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#555555")};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
`;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const [view, setView] = useState("cart");
  const [trackingVisible, setTrackingVisible] = useState({});
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();


  // General fetch helper using axiosInstance
  const fetchData = async (endpoint, updateState) => {
    if (!userId) {
      toast.error("Please log in to continue...");
      setTimeout(() => {
        navigate("/account");
      }, 2000); // wait 2 seconds before redirecting
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.get(endpoint);
      updateState(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = () =>
    fetchData(`/api/cart/${userId}`, (data) => {
      setCartItems(data.items || []);
    });

  const fetchOrderHistory = () =>
    fetchData(`/api/orders/${userId}/history`, setOrderHistory);

  const handleAction = async (url, data, successCallback, errorMsg) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(url, data);
      if (response.status === 200) successCallback();
      else setError(errorMsg);
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeQuantity = (productId, newQuantity) =>
    handleAction(
      `/api/cart/${userId}/${productId}/quantity`,
      { quantity: newQuantity },
      () =>
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
          )
        ),
      "Failed to update quantity."
    );

  const handleChangeSize = (productId, newSize) =>
    handleAction(
      `/api/cart/${userId}/${productId}/size`,
      { size: newSize },
      () =>
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId === productId ? { ...item, size: newSize } : item
          )
        ),
      "Failed to update size."
    );

  const handleRemoveItem = async (productId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/api/cart/${userId}/${productId}`);
      if (response.status === 200)
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      else setError("Failed to remove item.");
    } catch (err) {
      console.error("Error removing item:", err);
      setError("An error occurred while removing the item.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (totalAmount <= 0) {
      toast.error("Cart is empty. Add items before checkout.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create order on backend
      const {
        data: { orderId },
      } = await axiosInstance.post("/api/payment/create-order", {
        amount: totalAmount,
      });

      // Fetch user profile
      const { data: userProfile } = await axiosInstance.get(`/api/users/${userId}`);

      const product = cartItems[0]; // Assuming checkout for one product
      const selectedSize = product.size;

      // Step 2: Configure Razorpay options
      const options = {
        key: "rzp_test_aoXAc54cIyrPl1", // Your Razorpay Key ID
        amount: totalAmount * 100, // paise
        currency: "INR",
        name: "Your Store",
        description: product.name || "Purchase",
        order_id: orderId, // Razorpay order ID
        prefill: {
          name: userProfile.username || "Guest User",
          email: userProfile.email || "",
          contact: userProfile.phone || "",
        },
        theme: {
          color: "#ff4d4f",
        },
        handler: async (response) => {
          console.log("Razorpay response:", response);

          try {
            // Step 3: Verify payment on backend
            const verifyRes = await axiosInstance.post("/api/payment/verify-payment", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              amount: totalAmount,
              userId,
              productId: product._id,
              size: selectedSize,
            });

            if (verifyRes.data.success) {
              toast.success("Payment successful! Thank you for your purchase.");
              setTimeout(() => window.location.assign("/order-success"), 2500);
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Error during payment verification:", err);
            toast.error("Error verifying payment. Please try again.");
          }
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        console.error("Payment failure details:", response.error);
        toast.error("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTracking = (orderId) =>
    setTrackingVisible((prev) => ({ ...prev, [orderId]: !prev[orderId] }));

  useEffect(() => {
    if (view === "cart") fetchCart();
    else fetchOrderHistory();
  }, [view]);


  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="small-container cart-page" style={{ marginBottom: "400px" }}>
        <ToggleButtonGroup>
          <ToggleButton active={view === "cart"} onClick={() => setView("cart")}>
            View Cart
          </ToggleButton>
          <ToggleButton active={view === "history"} onClick={() => setView("history")}>
            View Order History
          </ToggleButton>
        </ToggleButtonGroup>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : view === "cart" ? (
          cartItems.length > 0 ? (
            <>
              <CartTable
                cartItems={cartItems}
                onRemove={handleRemoveItem}
                onChangeQuantity={handleChangeQuantity}
                onChangeSize={handleChangeSize}
              />
              <CartTotal cartItems={cartItems} onCheckout={handleCheckout} />
            </>
          ) : (
            <EmptyCart />
          )
        ) : orderHistory.length > 0 ? (
          <>
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Track Order</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr>
                        <td>{order._id}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>{order.status}</td>
                        <td>₹{order.amount}</td>
                        <td>
                          <ToggleTrackingBtn
                            active={trackingVisible[order._id]}
                            onClick={() => toggleTracking(order._id)}
                          >
                            {trackingVisible[order._id] ? (
                              <>
                                Hide Tracking <FaChevronUp />
                              </>
                            ) : (
                              <>
                                Track Order <FaChevronDown />
                              </>
                            )}
                          </ToggleTrackingBtn>
                        </td>
                      </tr>
                      {trackingVisible[order._id] && (
                        <tr>
                          <td colSpan="5" style={{ padding: 0 }}>
                            <OrderTracking orderId={order._id} />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </TableWrapper>

            <OrderCardContainer>
              {orderHistory.map((order) => (
                <OrderCard key={order._id}>
                  <OrderField>
                    <strong>Order ID:</strong> {order._id}
                  </OrderField>
                  <OrderField>
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                  </OrderField>
                  <OrderField>
                    <strong>Status:</strong> {order.status}
                  </OrderField>
                  <OrderField>
                    <strong>Total:</strong> ₹{order.amount}
                  </OrderField>
                  <ToggleTrackingBtn
                    active={trackingVisible[order._id]}
                    onClick={() => toggleTracking(order._id)}
                  >
                    {trackingVisible[order._id] ? (
                      <>
                        Hide Tracking <FaChevronUp />
                      </>
                    ) : (
                      <>
                        Track Order <FaChevronDown />
                      </>
                    )}
                  </ToggleTrackingBtn>
                  {trackingVisible[order._id] && <OrderTracking orderId={order._id} />}
                </OrderCard>
              ))}
            </OrderCardContainer>
          </>
        ) : (
          <p>No orders found. Start shopping!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;