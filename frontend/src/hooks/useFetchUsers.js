import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users/all");
                setUsers(response);
            } catch (err) {
                setError(err.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useFetchUsers;