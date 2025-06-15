import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/categories");
                setCategories(response);
            } catch (err) {
                setError(err.message || "Failed to fetch categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export default useFetchCategory;
