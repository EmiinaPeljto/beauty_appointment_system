import React, { useEffect } from "react";
import LogInForm from "../components/LogInForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LogIn = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const redirectData = localStorage.getItem("redirectAfterLogin");
      if (redirectData) {
        const { salonId, selectedServices, path } = JSON.parse(redirectData);
        localStorage.removeItem("redirectAfterLogin");
        if (path) {
          navigate(path);
        } else if (salonId && selectedServices && selectedServices.length > 0) {
          navigate("/appointment", { state: { salonId, selectedServices } });
        } else if (salonId) {
          navigate(`/salon/${salonId}?tab=pricing`);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div>
      <LogInForm />
    </div>
  );
};

export default LogIn;