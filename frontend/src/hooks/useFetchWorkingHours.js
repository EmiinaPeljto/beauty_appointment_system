import { useState, useEffect } from "react";
import axios from "axios";

const useFetchWorkingHours = (salonId) => {
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/gen/salons/workingHours/${salonId}`);
        setHours(response.data);
      } catch (err) {
        setError("Failed to fetch working hours");
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, [salonId]);

  return { hours, loading, error };
};

export default useFetchWorkingHours;
