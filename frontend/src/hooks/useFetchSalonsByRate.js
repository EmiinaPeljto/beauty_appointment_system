import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchBestRatedSalons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestRatedSalons = async () => {
      try {
        const response = await api.get("/salons/bestRatedSalons");
        setSalons(response);
      } catch (err) {
        setError(err.message || "Failed to fetch best-rated salons");
      } finally {
        setLoading(false);
      }
    };

    fetchBestRatedSalons();
  }, []);

  return { salons, loading, error };
};

export default useFetchBestRatedSalons;
