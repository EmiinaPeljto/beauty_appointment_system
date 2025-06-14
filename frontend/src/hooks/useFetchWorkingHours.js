import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchWorkingHours = (salonId) => {
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const response = await api.get(`/salons/workingHours/${salonId}`);
        setHours(response);
      } catch (err) {
        setError(err.message || "Failed to fetch working hours");
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, [salonId]);

  return { hours, loading, error };
};

export default useFetchWorkingHours;
