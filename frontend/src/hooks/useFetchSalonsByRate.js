import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBestRatedSalons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestRatedSalons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/gen/salons/bestRatedSalons"
        );
        setSalons(response.data);
      } catch (err) {
        setError("Failed to fetch best-rated salons");
      } finally {
        setLoading(false);
      }
    };

    fetchBestRatedSalons();
  }, []);

  return { salons, loading, error };
};

export default useFetchBestRatedSalons;
