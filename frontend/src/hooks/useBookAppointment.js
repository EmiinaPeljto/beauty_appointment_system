import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:3000/api/v1/gen/appointments/makeAnAppointment",
        {
          user_id,
          salon_id,
          date,
          time,
          service_id,
        }
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
      setLoading(false);
      return null;
    }
  };

  return { bookAppointment, loading, error };
};

export default useBookAppointment;
