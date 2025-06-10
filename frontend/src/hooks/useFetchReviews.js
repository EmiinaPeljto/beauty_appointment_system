import { useState, useEffect } from "react";

const useFetchReviews = (salonId, refreshFlag = false) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!salonId) return;
    setLoading(true);
    fetch(`http://localhost:3000/api/v1/gen/reviews/reviewBySalonId/${salonId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [salonId, refreshFlag]);

  return { reviews, loading, error };
};

export default useFetchReviews;
