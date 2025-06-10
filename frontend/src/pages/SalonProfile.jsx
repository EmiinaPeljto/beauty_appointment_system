import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useFetchSalonById from "../hooks/useFetchSalonById";
import useFetchServicesBySalon from "../hooks/useFetchServicesBySalon";
import SalonProfileHeader from "../components/SalonProfileHeader";
import ServicesList from "../components/ServicesList";
import AboutSalon from "../components/AboutSalon";
import Reviews from "../components/Reviews";

const SalonProfile = () => {
  const { salonId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("pricing");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab")) {
      setActiveTab(params.get("tab"));
    }
  }, [location.search]);

  const {
    salon,
    loading: salonLoading,
    error: salonError,
  } = useFetchSalonById(salonId);
  const {
    servicesByCategory,
    loading: servicesLoading,
    error: servicesError,
  } = useFetchServicesBySalon(salonId);

  if (salonLoading || servicesLoading) return <p>Loading...</p>;
  if (salonError || servicesError)
    return <p>Error loading salon or services.</p>;

  return (
    <div>
      <SalonProfileHeader
        salon={salon}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "pricing" && (
        <ServicesList servicesByCategory={servicesByCategory} />
      )}
      {activeTab === "about" && <AboutSalon salon={salon} />}
      {activeTab === "reviews" && <Reviews salonId={salonId} />}
    </div>
  );
};

export default SalonProfile;
