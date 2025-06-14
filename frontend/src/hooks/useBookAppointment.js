import { useState } from "react";
import api from "../utils/api";

const useBookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookAppointment = async ({
    user_id,
    salon_id,
    date,
    time,
    service_id, // should be an array of service IDs
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/appointments/makeAnAppointment", {
        user_id,
        salon_id,
        date,
        time,
        service_id,
      });
      setLoading(false);
      return response;
    } catch (err) {
      setError(
        err.message || "Failed to book appointment. Please try again."
      );
      setLoading(false);
      return null;
    }
  };

  return { bookAppointment, loading, error };
};

export default useBookAppointment;
