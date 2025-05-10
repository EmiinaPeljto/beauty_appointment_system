import React from "react";
import { useParams } from "react-router-dom"; // To get the salon ID from the URL
import useFetchSalonById from "../hooks/useFetchSalonById";
import SalonProfileHeader from "../components/SalonProfileHeader";

const SalonProfile = () => {
  const { salonId } = useParams(); // Get salonId from the URL
  const { salon, loading, error } = useFetchSalonById(salonId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SalonProfileHeader salon={salon} />
    </div>
  );
};

export default SalonProfile;