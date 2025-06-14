import { useState } from "react";
import api from "../utils/api";

const useRegisterUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (firstName, lastName, email, phoneNumber, password) => {
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
      setError(err.message || JSON.stringify(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { user, registerUser, error, loading };
};

export default useRegisterUser;