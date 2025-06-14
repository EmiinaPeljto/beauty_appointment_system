import { useEffect, useState } from "react";
import api from "../utils/api";

const useCompletedAppointments = (userId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      console.log(`Fetching completed appointments for user ${userId}`);
      
      // Make the API call
      const result = await api.get(`/appointments/getAppointmentsByStatus/${userId}/completed`);
      console.log("API response for completed appointments:", result);
      
      // Format appointments
      const formattedAppointments = Array.isArray(result) ? result.map(appt => ({
        id: appt.id,
        salonName: appt.salon_name || "Unknown Salon",
        date: appt.date || "No date",
        time: appt.time || "No time",
        service: appt.service || "Beauty Service",
        status: appt.status,
        location: appt.location || "No location"
      })) : [];
      
      setAppointments(formattedAppointments);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch completed appointments:", err);
      setError("Failed to load completed appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  return { appointments, loading, error, refetch: fetchAppointments };
};

export default useCompletedAppointments;