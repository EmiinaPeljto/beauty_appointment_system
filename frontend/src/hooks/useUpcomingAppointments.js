import { useEffect, useState } from "react";
import axios from "axios";

const useUpcomingAppointments = (user_id) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user_id) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/gen/appointments/getAppointmentsByStatus/${user_id}/upcoming`)
      .then((res) => setAppointments(res.data))
      .catch(() => setError("Failed to fetch appointments"))
      .finally(() => setLoading(false));
  }, [user_id]);

  return { appointments, loading, error };
};

export default useUpcomingAppointments;