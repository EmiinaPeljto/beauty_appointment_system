import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSalonById from "../hooks/useFetchSalonById";
import useFetchServicesBySalon from "../hooks/useFetchServicesBySalon";
import SalonProfileHeader from "../components/SalonProfileHeader";
import ServicesList from "../components/ServicesList";
import AboutSalon from "../components/AboutSalon";
import Reviews from "../components/Reviews";

const SalonProfile = () => {
  const { salonId } = useParams();
  const [activeTab, setActiveTab] = useState("pricing");

  const { salon, loading: salonLoading, error: salonError } = useFetchSalonById(salonId);
  const { servicesByCategory, loading: servicesLoading, error: servicesError } = useFetchServicesBySalon(salonId);

  if (salonLoading || servicesLoading) return <p>Loading...</p>;
  if (salonError || servicesError) return <p>Error loading salon or services.</p>;

  return (
    <div>
      {/* Pass activeTab & setActiveTab to header */}
      <SalonProfileHeader
        salon={salon}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Conditionally render tab content */}
      {activeTab === "pricing" && (
        <ServicesList servicesByCategory={servicesByCategory} />
      )}
      {activeTab === "about" && <AboutSalon salon={salon} />}
      {activeTab === "reviews" && <Reviews salonId={salonId} />}
    </div>
  );
};

export default SalonProfile;
