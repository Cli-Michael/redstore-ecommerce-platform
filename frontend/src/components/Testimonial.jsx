import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // Adjust the path based on your folder structure

import {
  TestimonialContainer,
  TestimonialWrapper,
  Row,
  Col,
  QuoteIcon,
  TestimonialText,
  Rating,
  Star,
  UserImage,
  UserName,
  LoadingSpinner,
  ErrorText,
  NoDataText,
} from "../assets/css/TestimonialStyles"; // Import styled components

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/api/testimonials");
        setTestimonials(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <TestimonialContainer>
        <LoadingSpinner />
      </TestimonialContainer>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src="images/Empty.png"
          alt="No Data Available"
          style={{ width: "200px", height: "200px", objectFit: "contain" }}
        />
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <TestimonialContainer>
        <NoDataText>No testimonials available at the moment.</NoDataText>
      </TestimonialContainer>
    );
  }

  return (
    <TestimonialContainer>
      <TestimonialWrapper>
        <Row>
          {testimonials.map((testimonial) => (
            <Col key={testimonial._id}>
              <QuoteIcon className="fa fa-quote-left" />
              <TestimonialText>{testimonial.text}</TestimonialText>
              <Rating>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`fa ${index < testimonial.rating ? "fa-star" : "fa-star-o"}`}
                  />
                ))}
              </Rating>
              <UserImage src={testimonial.userImage} alt={testimonial.userName} />
              <UserName>{testimonial.userName}</UserName>
            </Col>
          ))}
        </Row>
      </TestimonialWrapper>
    </TestimonialContainer>
  );
};

export default Testimonial;
