import { useEffect, useState } from "react";
import axios from "axios";

const useAvailableDates = (salonId) => {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!salonId) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/gen/salons/availableDates/${salonId}`)
      .then((res) => setDates(res.data.availableDates || []))
      .catch(() => setError("Failed to fetch available dates"))
      .finally(() => setLoading(false));
  }, [salonId]);

  return { dates, loading, error };
};

export default useAvailableDates;