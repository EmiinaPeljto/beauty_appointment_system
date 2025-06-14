import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useFetchSalonById from "../hooks/useFetchSalonById";
import useFetchServicesBySalon from "../hooks/useFetchServicesBySalon";
import SalonProfileHeader from "../components/SalonProfileHeader";
import ServicesList from "../components/ServicesList";
import AboutSalon from "../components/AboutSalon";
import Reviews from "../components/Reviews";
import ServiceCategoryList from "../components/ServiceCategoryList";

const SalonProfile = () => {
  const { salonId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("pricing");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Centralized loading state
  const isLoading = salonLoading || servicesLoading;
  const error = salonError || servicesError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-[#FF66B2] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center px-4">
          Error loading salon data: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SalonProfileHeader
        salon={salon}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "pricing" && (
        <ServicesList
          servicesByCategory={servicesByCategory}
          salonId={salonId}
        />
      )}
      {activeTab === "about" && <AboutSalon salon={salon} />}
      {activeTab === "reviews" && <Reviews salonId={salonId} />}
    </div>
  );
};

export default SalonProfile;
