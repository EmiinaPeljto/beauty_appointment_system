import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/gen/categories/category");
                setCategories(response.data);
            } catch (err) {
                setError("Failed to fetch categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export default useFetchCategory;
