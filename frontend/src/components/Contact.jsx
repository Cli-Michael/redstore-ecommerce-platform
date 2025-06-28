import React, { useState } from "react";
import axios from "axios";
import {
  ContactContainer,
  Title,
  Form,
  Label,
  Input,
  Textarea,
  Button,
} from "../assets/css/ContactStyles";
import axiosInstance from "../api/axiosInstance";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("All fields are required.");
      return;
    }

    setLoading(true);
    setStatus(""); // Clear any previous status messages

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("Authentication token is missing. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/account";
        }, 2000); // Redirect after 2 seconds
        return;
      }

      const response = await axiosInstance.post(
        "/api/auth/contact",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setStatus(response.data.message || "Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(response.data.error || "Failed to submit form.");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setStatus("Session expired. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/account";
        }, 2000); // Redirect after 2 seconds
      } else {
        setStatus(
          error.response?.data?.error ||
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows="4"
          placeholder="Write your message here"
          value={formData.message}
          onChange={handleChange}
        ></Textarea>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {status && <p>{status}</p>}
      </Form>
    </ContactContainer>
  );
};

export default Contact;
