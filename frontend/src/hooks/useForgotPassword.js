import { useState } from "react";
import axios from "axios";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/gen/users/forgot-password",
        { email }
      );
      setSuccess(res.data.message || "Reset link sent! Please check your email.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return { sendForgotPassword, loading, error, success };
};

export default useForgotPassword;