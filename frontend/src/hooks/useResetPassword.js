import { useState } from "react";
import axios from "axios";

const useResetPassword = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendResetPassword = async (newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/gen/users/reset-password/${token}`,
        { new_password: newPassword }
      );
      setSuccess(res.data.message || "Password reset successful! You can now log in.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return { sendResetPassword, loading, error, success };
};

export default useResetPassword;