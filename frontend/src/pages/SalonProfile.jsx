import React from "react";
import { useParams } from "react-router-dom";
import useFetchSalonById from "../hooks/useFetchSalonById";
import useFetchServicesBySalon from "../hooks/useFetchServicesBySalon";
import SalonProfileHeader from "../components/SalonProfileHeader";
import ServicesList from "../components/ServicesList";

const SalonProfile = () => {
  const { salonId } = useParams();
  const { salon, loading: salonLoading, error: salonError } = useFetchSalonById(salonId);
  const { servicesByCategory, loading: servicesLoading, error: servicesError } = useFetchServicesBySalon(salonId);

  if (salonLoading || servicesLoading) return <p>Loading...</p>;
  if (salonError || servicesError) return <p>Error loading salon or services.</p>;

  return (
    <div>
      <SalonProfileHeader salon={salon} />
      <ServicesList servicesByCategory={servicesByCategory} />
    </div>
  );
};

export default SalonProfile;
