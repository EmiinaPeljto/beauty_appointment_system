import { useEffect, useState } from "react";
import api from "../utils/api";

const useAvailableTimes = (salonId, selectedDate) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!salonId || !selectedDate) {
      setAvailableTimes([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const fetchAvailableTimes = async () => {
      try {
        const data = await api.get(`/salons/availableTimeSlots/${salonId}/${selectedDate}`);
        setAvailableTimes(data.slots || []);
      } catch (err) {
        setError(err.message || "Failed to fetch available times");
        setAvailableTimes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableTimes();
  }, [salonId, selectedDate]);

  return { availableTimes, loading, error };
};

export default useAvailableTimes;