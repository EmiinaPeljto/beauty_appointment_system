import { useState } from "react";
import api from "../utils/api";
import { setToken, setUser as storeUser } from "../utils/auth";

const useLogInUser = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const logInUser = async(email, password) => {
        setLoading(true);
        setError(null);

        try {
            const data = await api.post("/users/login", { email, password });

            // Store the JWT token in localStorage
            if (data.token) {
                setToken(data.token);
                storeUser(data.user);
            }

            setUser(data.user);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message || "An error occurred");
            setLoading(false);
            return null;
        } finally {
            setLoading(false);
        }
    }
    return { user, logInUser, error, loading };
};

export default useLogInUser;