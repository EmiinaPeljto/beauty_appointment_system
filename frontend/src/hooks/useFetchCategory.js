import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await api.get("/categories");
        setCategories(response || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again later.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useFetchCategory;
