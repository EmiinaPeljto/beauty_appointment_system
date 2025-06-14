import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchSalonById = (salonId) => {
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const data = await api.get(`/salons/salonById/${salonId}`);
        setSalon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (salonId) {
      fetchSalon();
    }
  }, [salonId]);

  return { salon, loading, error };
};

export default useFetchSalonById;