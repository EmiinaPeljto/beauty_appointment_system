import { useState, useEffect } from "react";

const useFetchSalonById = (salonId) => {
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/gen/salons/salonById/${salonId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch salon data");
        }
        const data = await response.json();
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