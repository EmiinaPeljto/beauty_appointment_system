import { useEffect, useState } from "react";
import api from "../utils/api";

const useAvailableDates = (salonId) => {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!salonId) return;
      setLoading(true);
      try {
        const data = await api.get(`/salons/availableDates/${salonId}`);
        setDates(data.availableDates || []);
      } catch (err) {
        setError(err.message || "Failed to fetch available dates");
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableDates();
  }, [salonId]);

  return { dates, loading, error };
};

export default useAvailableDates;