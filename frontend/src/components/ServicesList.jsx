import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ServicesList = ({ servicesByCategory, salonId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedServices, setSelectedServices] = useState(
    location.state?.existingServices || []
  );

  // Effect to synchronize selectedServices if navigating back with existing selections
  // or if servicesByCategory changes (e.g., different salon loaded)
  useEffect(() => {
    if (servicesByCategory && Object.keys(servicesByCategory).length > 0) {
      const allAvailableServiceIds = Object.values(servicesByCategory)
        .flat()
        .map((s) => s.id)
        .filter((id) => id !== undefined); // Ensure IDs are defined

      if (location.state?.existingServices) {
        // Filter existingServices to only include those available in the current salon's list
        const validExistingServices = location.state.existingServices.filter(
          (existingService) =>
            existingService.id !== undefined &&
            allAvailableServiceIds.includes(existingService.id)
        );
        setSelectedServices(validExistingServices);
      } else {
        // If not coming from appointment page, ensure current selections are valid
        setSelectedServices((prevSelected) =>
          prevSelected.filter(
            (s) => s.id !== undefined && allAvailableServiceIds.includes(s.id)
          )
        );
      }
    }
  }, [servicesByCategory, location.state?.existingServices]);

  const handleServiceToggle = (serviceToToggle) => {
    // Ensure serviceToToggle and its ID are valid before proceeding
    if (!serviceToToggle || typeof serviceToToggle.id === "undefined") {
      console.error(
        "Attempted to toggle a service with an undefined ID:",
        serviceToToggle
      );
      return; // Prevent state update with invalid data
    }

    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.find((s) => s.id === serviceToToggle.id);
      if (isSelected) {
        return prevSelected.filter((s) => s.id !== serviceToToggle.id);
      } else {
        return [...prevSelected, serviceToToggle];
      }
    });
  };

  const handleProceedToAppointment = () => {
    if (selectedServices.length > 0) {
      // Save to localStorage for refresh/direct access support
      localStorage.setItem(
        "selectedServices",
        JSON.stringify(selectedServices)
      );
      localStorage.setItem("salonId", salonId);
      navigate("/appointment", { state: { selectedServices, salonId } });
    } else {
      alert("Please select at least one service.");
    }
  };

  // Handle cases where servicesByCategory might be loading or empty
  if (!servicesByCategory || Object.keys(servicesByCategory).length === 0) {
    return (
      <div className="ml-4 md:ml-8 mt-8 mb-16 text-center text-gray-500">
        No services available for this salon or still loading...
      </div>
    );
  }

  return (
    <div className="ml-4 md:ml-8 mt-8 mb-16">
      {Object.entries(servicesByCategory).map(([category, services]) => {
        if (!services || services.length === 0) {
          return null;
        }
        return (
          <div key={category} className="mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 ml-8 md:ml-12">
              {category}
            </h1>
            {services.map((service) => {
              if (typeof service.id === "undefined") {
                console.warn(
                  "Service with undefined ID found, skipping render:",
                  service
                );
                return null; // Skip rendering this service to prevent errors
              }

              return (
                <div
                  key={service.id}
                  className="flex justify-between items-center border-b border-gray-200 py-3 pr-4 md:mr-24 ml-10 md:ml-16  transition-colors duration-150 rounded-md"
                >
                  <div className="flex items-center flex-grow">
                    <input
                      type="checkbox"
                      id={`service-${service.id}`}
                      className="w-4 h-4 accent-pink-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                      checked={selectedServices.some(
                        (s) => s.id === service.id
                      )}
                      onChange={() => handleServiceToggle(service)}
                    />
                    <label
                      htmlFor={`service-${service.id}`}
                      className="ml-3 flex flex-col flex-grow cursor-pointer"
                      onClick={(e) => {
                        // Allow clicking label to toggle checkbox
                        e.stopPropagation();
                        handleServiceToggle(service);
                      }}
                    >
                      <p className="font-medium text-gray-800">
                        {service.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duration: {service.duration_minutes || service.duration}{" "}
                        mins
                      </p>
                    </label>
                  </div>
                  <div className="text-right text-gray-700 font-semibold pr-2">
                    ${parseFloat(service.price).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {selectedServices.length > 0 && (
        <div className="mt-10 text-center px-4 md:px-0">
          <button
            onClick={handleProceedToAppointment}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Proceed to Book ({selectedServices.length} service
            {selectedServices.length !== 1 ? "s" : ""})
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
