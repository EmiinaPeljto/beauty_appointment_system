import { useState } from "react";
import api from "../utils/api";

const useCancelAppointment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const cancelAppointment = async (appointmentId, userId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        console.log(`Sending cancel request for appointment ${appointmentId}, user ${userId}`);

        try {
            // This path must match exactly your backend route
            await api.post(`/appointments/cancel/${appointmentId}`, {
                user_id: userId
            });
            
            setSuccess(true);
            return true;
        } catch (error) {
            console.error("Cancel appointment error:", error); 
            setError(error.message || "Failed to cancel appointment");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccess(false);
    };

    return {
        cancelAppointment,
        loading,
        error,
        success,
        resetState
    };
};

export default useCancelAppointment;