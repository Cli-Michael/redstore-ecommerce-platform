import axiosInstance from "./axiosInstance";

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token); // Save token
  return response.data;
};

export const registerUser = async (email, username, password) => {
  const response = await axiosInstance.post("/auth/register", {
    email,
    username,
    password,
  });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};
