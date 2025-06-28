import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  * {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f9f9f9;
    color: #333;
    font-size: 16px;
  }
`;

// Styled Components
const OrderTrackingContainer = styled.div`
  max-width: 700px;
  background: #fff;
  margin: 30px auto;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const TrackingTitle = styled.h3`
  font-weight: 600;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 30px;
  color: #222;
  letter-spacing: 1.2px;
  font-family: 'Poppins', sans-serif;
`;

const ProgressBar = styled.div`
  position: relative;
  height: 14px;
  background: #e0e0e0;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #81c784 100%);
  width: ${(props) => props.progress}%;
  max-width: 100%;
  border-radius: 7px;
  transition: width 0.6s ease-in-out;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.6);
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  font-family: 'Poppins', sans-serif;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
`;

const StepDot = styled.div`
  margin: 0 auto;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.active ? "#4caf50" : "#bbb")};
  border-radius: 50%;
  border: 3px solid ${(props) => (props.active ? "#388e3c" : "#ddd")};
  box-shadow: ${(props) =>
    props.active ? "0 0 8px rgba(76, 175, 80, 0.7)" : "none"};
  transition: background-color 0.4s, border-color 0.4s, box-shadow 0.4s;
  position: relative;
  z-index: 10;
`;

const StepLabel = styled.div`
  margin-top: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(props) => (props.active ? "#4caf50" : "#777")};
  letter-spacing: 0.03em;
  font-family: 'Poppins', sans-serif;
`;

const StepTimestamp = styled.div`
  margin-top: 6px;
  font-size: 0.75rem;
  color: #999;
  font-weight: 400;
  white-space: nowrap;
  font-family: 'Poppins', sans-serif;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #d32f2f;
  font-weight: 600;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
`;


const OrderTracking = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderTracking = async () => {
      try {
        setError(null);
        const response = await axiosInstance.get(`/api/orders/${orderId}/status`);
        const { status, timeline } = response.data;

        setOrderStatus(timeline || []);
        const stageIndex = (timeline || []).findIndex((stage) => stage.status === status);
        setCurrentStage(stageIndex > -1 ? stageIndex : 0);
      } catch (err) {
        console.error("Error fetching order status:", err);
        setError("Failed to fetch order tracking data.");
      }
    };

    fetchOrderTracking();
  }, [orderId]);

  const stages = orderStatus.length
    ? orderStatus
    : [
      { status: "Processing", timestamp: null },
      { status: "Shipped", timestamp: null },
      { status: "Out for Delivery", timestamp: null },
      { status: "Delivered", timestamp: null },
    ];

  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <>
      <GlobalStyle />
      <OrderTrackingContainer>
        <TrackingTitle>Order Tracking</TrackingTitle>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
            <StepsContainer>
              {stages.map((stage, index) => (
                <Step key={index}>
                  <StepDot active={index <= currentStage} />
                  <StepLabel active={index <= currentStage}>{stage.status}</StepLabel>
                  {stage.timestamp && (
                    <StepTimestamp>{new Date(stage.timestamp).toLocaleDateString()}</StepTimestamp>
                  )}
                </Step>
              ))}
            </StepsContainer>
          </>
        )}
      </OrderTrackingContainer>
    </>
  );
};

export default OrderTracking;
