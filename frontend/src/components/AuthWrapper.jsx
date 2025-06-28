import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Allow access if no token exists
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        // Token expired: clear token AND userId, then redirect
        localStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        navigate("/account");
      }
    } catch (error) {
      // Invalid token: clear token AND userId, then redirect
      localStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      console.error("Invalid token.");
      navigate("/account");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthWrapper;
