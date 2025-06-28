import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  PageWrapper,
  Container,
  Row,
  ImageSection,
  Image,
  FormSection,
  FormContainer,
  ToggleButtons,
  ToggleButton,
  Indicator,
  Form,
  Input,
  Button,
  ForgotPassword,
} from "../assets/css/AccountsStyles";

import LoadingSpinner from "./LoadingSpinner";

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");

  // State for availability checks
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const checkUsername = async (usernameToCheck) => {
    if (!usernameToCheck) {
      setUsernameAvailable(null);
      return;
    }
    try {
      const res = await axiosInstance.post("/api/auth/check-username", { username: usernameToCheck });
      setUsernameAvailable(res.data.available);
    } catch {
      setUsernameAvailable(null);
    }
  };

  const checkEmail = async (emailToCheck) => {
    if (!emailToCheck) {
      setEmailAvailable(null);
      return;
    }
    try {
      const res = await axiosInstance.post("/api/auth/check-email", { email: emailToCheck });
      setEmailAvailable(res.data.available);
    } catch {
      setEmailAvailable(null);
    }
  };

  const debouncedCheckUsername = React.useCallback(debounce(checkUsername, 500), []);
  const debouncedCheckEmail = React.useCallback(debounce(checkEmail, 500), []);

  useEffect(() => {
    if (!isLogin) debouncedCheckUsername(username.trim());
    else setUsernameAvailable(null);
  }, [username, isLogin, debouncedCheckUsername]);

  useEffect(() => {
    if (!isLogin || isForgotPassword) debouncedCheckEmail(email.trim());
    else setEmailAvailable(null);
  }, [email, isLogin, isForgotPassword, debouncedCheckEmail]);

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1);
    setOtp(updatedOtp);
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const apiHandler = async (endpoint, payload, successCallback) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(endpoint, payload);
      successCallback(response);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !username || !password) return toast.error("All fields are required.");
    if (usernameAvailable === false) return toast.error("Username is already taken.");
    if (emailAvailable === false) return toast.error("Email is already registered.");
    apiHandler("/api/auth/initiate-registration", { email, username, password }, () => {
      setIsOtpSent(true);
      toast.success("OTP sent to your email.");
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) return toast.error("Please fill all OTP fields.");
    apiHandler("/api/auth/complete-registration", { email, otp: otp.join("") }, () => {
      toast.success("Email verified successfully!");
      resetState();
      setIsLogin(true);
      navigate("/products");
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return toast.error("Username and Password are required.");
    apiHandler("/api/auth/login", { username, password }, (response) => {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("userId", user.id);
      toast.success("Login successful!");
      navigate("/");
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required.");
    if (emailAvailable === true) return toast.error("Email is not registered.");
    apiHandler("/api/auth/password/forgot", { email }, () => {
      setIsOtpSent(true);
      toast.success("OTP sent to your email.");
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (otp.some((digit) => !digit) || !newPassword)
      return toast.error("All fields are required.");
    apiHandler("/api/auth/password/reset", { email, otp: otp.join(""), newPassword }, () => {
      toast.success("Password reset successfully!");
      resetState();
      navigate("/");
    });
  };

  const resetState = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setOtp(Array(6).fill(""));
    setNewPassword("");
    setUsernameAvailable(null);
    setEmailAvailable(null);
    setIsOtpSent(false);
    setIsForgotPassword(false);
  };

  return (
    <PageWrapper>
      <Container>
        <Row>
          <ImageSection>
            <Image src="/image1.png" alt="Account" />
          </ImageSection>
          <FormSection>
            <FormContainer>
              {!isForgotPassword && (
                <ToggleButtons>
                  <ToggleButton
                    active={isLogin}
                    onClick={() => {
                      setIsLogin(true);
                      resetState();
                    }}
                  >
                    Login
                  </ToggleButton>
                  <ToggleButton
                    active={!isLogin}
                    onClick={() => {
                      setIsLogin(false);
                      resetState();
                    }}
                  >
                    Register
                  </ToggleButton>
                  <Indicator active={isLogin} />
                </ToggleButtons>
              )}
              {isForgotPassword ? (
                <Form onSubmit={!isOtpSent ? handleForgotPassword : handleResetPassword}>
                  {!isOtpSent ? (
                    <>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {emailAvailable === true && (
                        <p style={{ color: "red", fontSize: "0.85rem" }}>
                          Email not found (not registered).
                        </p>
                      )}
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? <LoadingSpinner /> : "Send OTP"}
                      </Button>
                      <ForgotPassword onClick={resetState} style={{ marginTop: "10px" }}>
                        Back to Login
                      </ForgotPassword>
                    </>
                  ) : (
                    <>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        {otp.map((value, index) => (
                          <Input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            maxLength={1}
                            style={{ width: "40px", textAlign: "center" }}
                          />
                        ))}
                      </div>
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <Button type="submit" disabled={isLoading || otp.some((digit) => !digit)}>
                        {isLoading ? <LoadingSpinner /> : "Reset Password"}
                      </Button>
                    </>
                  )}
                </Form>
              ) : isLogin ? (
                <Form onSubmit={handleLogin}>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : "Login"}
                  </Button>
                  <ForgotPassword onClick={() => setIsForgotPassword(true)} style={{ marginTop: "10px" }}>
                    Forgot Password?
                  </ForgotPassword>
                </Form>
              ) : (
                <Form onSubmit={!isOtpSent ? handleRegister : handleVerifyOtp}>
                  {!isOtpSent ? (
                    <>
                      <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      {usernameAvailable === false && (
                        <p style={{ color: "red", fontSize: "0.85rem" }}>
                          Username is already taken.
                        </p>
                      )}
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {emailAvailable === false && (
                        <p style={{ color: "red", fontSize: "0.85rem" }}>
                          Email is already registered.
                        </p>
                      )}
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? <LoadingSpinner /> : "Send OTP"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        {otp.map((value, index) => (
                          <Input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            maxLength={1}
                            style={{ width: "40px", textAlign: "center" }}
                          />
                        ))}
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading || otp.some((digit) => !digit)}
                      >
                        {isLoading ? <LoadingSpinner /> : "Verify OTP"}
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </FormContainer>
          </FormSection>
        </Row>
      </Container>
      <ToastContainer position="top-center" />
    </PageWrapper>
  );
};

export default AccountPage;
