import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";

const ServicesList = ({ servicesByCategory, salonId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState({});

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

      // Initialize expanded categories state - all collapsed by default
      const initialExpandedState = Object.keys(servicesByCategory).reduce((acc, category) => {
        acc[category] = false;
        return acc;
      }, {});
      setExpandedCategories(initialExpandedState);
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

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const isServiceSelected = (serviceId) => {
    return selectedServices.some(selected => selected.id === serviceId);
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
    <div className="mx-4 md:mx-8 mt-8 mb-16 ">
      <div className="space-y-4">
        {Object.entries(servicesByCategory).map(([category, services]) => {
          if (!services || services.length === 0) {
            return null;
          }
          
          return (
            <div 
              key={category}
              className="bg-white overflow-hidden py-2 border-b border-gray-200" 
            >
              {/* Category header - clickable to expand/collapse */}
              <div 
                className="p-4 flex justify-between items-center cursor-pointer w-full"
                onClick={() => toggleCategory(category)}
              >
                <h3 className="font-medium text-xl text-gray-800">{category}</h3>
                {expandedCategories[category] ? (
                  <FiChevronUp className="text-gray-800" />
                ) : (
                  <FiChevronDown className="text-gray-800" />
                )}
              </div>

              {/* Services in this category */}
              {expandedCategories[category] && (
                <div className="p-4">
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
                        className={`p-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors ${
                          isServiceSelected(service.id) ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleServiceToggle(service)}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-700">{service.name}</div>
                          <div className="text-sm text-gray-500">Duration: {service.duration_minutes || service.duration} mins</div>
                        </div>
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800 mr-3">${parseFloat(service.price).toFixed(2)}</div>
                          {isServiceSelected(service.id) && (
                            <div className="bg-pink-500 text-white rounded-full p-1">
                              <FiCheck size={14} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-2 text-center px-4 md:px-0">
          
            <div className="flex justify-end items-center p-8">
              <span className="font-medium text-gary-800 text-xl">
                Total: ${selectedServices.reduce((sum, service) => 
                  sum + parseFloat(service.price), 0).toFixed(2)}
              </span>
            </div>
          
          
          <button
            onClick={handleProceedToAppointment}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 mt-4"
          >
            Make an Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesList;