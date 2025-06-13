import { useEffect, useState } from "react";
import api from "../utils/api";

const useUpcomingAppointments = (userId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      console.log("Fetching upcoming appointments for user ID:", userId);
      const response = await api.get(`/appointments/getAppointmentsByStatus/${userId}/upcoming`);
      
      console.log("API response for appointments:", response);
      
      // Ensure each appointment has an id field (if not present in API response)
      const appointmentsWithIds = response.map(appt => {
        if (!appt.id) {
          console.warn("Appointment missing id field:", appt);
        }
        return appt;
      });
      
      setAppointments(appointmentsWithIds);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch upcoming appointments:", err);
      setError("Failed to load upcoming appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments
  };
};

export default useUpcomingAppointments;