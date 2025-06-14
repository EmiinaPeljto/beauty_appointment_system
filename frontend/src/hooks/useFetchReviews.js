import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchReviews = (salonId, refreshFlag = false) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!salonId) return;
      setLoading(true);
      try {
        const data = await api.get(`/reviews/reviewBySalonId/${salonId}`);
        setReviews(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [salonId, refreshFlag]);

  return { reviews, loading, error };
};

export default useFetchReviews;
