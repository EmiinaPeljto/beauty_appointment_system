import { useEffect, useState } from "react";
import axios from "axios";

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
    axios
      .get(`http://localhost:3000/api/v1/gen/salons/availableTimeSlots/${salonId}/${selectedDate}`)
      .then((res) => {
        setAvailableTimes(res.data.slots || []);
      })
      .catch((err) => {
        setError("Failed to fetch available times");
        setAvailableTimes([]);
      })
      .finally(() => setLoading(false));
  }, [salonId, selectedDate]);

  return { availableTimes, loading, error };
};

export default useAvailableTimes;