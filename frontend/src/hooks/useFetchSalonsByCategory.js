import { useState, useEffect } from "react";

const useFetchSalonsByCategory = (categoryId) => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/gen/salons/salonsByCategory/${categoryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch salons by category");
        }
        const data = await response.json();
        console.log(data);
        setSalons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [categoryId]);

  return { salons, loading, error };
};

export default useFetchSalonsByCategory;