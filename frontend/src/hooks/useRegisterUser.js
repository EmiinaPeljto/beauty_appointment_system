import { useState } from "react";
import api from "../utils/api";

const useRegisterUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (
    firstName,
    lastName,
    email,
    phoneNumber,
    password
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.post("/users/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        password: password,
      });

      // Note: In this new flow, we don't set the user yet
      // The user will be created after email verification
      return data;
    } catch (err) {
      console.error("Registration error:", err);

      // Check if this is a validation error with field-specific messages
      if (err.response?.data?.errors) {
        // Set the errors object directly from the response
        setError(err.response.data.errors);
      } else {
        // For other types of errors, set a general error message
        setError({
          general:
            err.response?.data?.message || err.message || "Registration failed",
        });
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { user, registerUser, error, loading };
};

export default useRegisterUser;
