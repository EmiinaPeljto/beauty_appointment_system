import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

const ServiceCategoryList = ({ services, selectedServices, onServiceSelect }) => {
  const [categorizedServices, setCategorizedServices] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  // Group services by category on component mount
  useEffect(() => {
    if (!services || !services.length) return;

    // Create a map of services grouped by category
    const groupedServices = services.reduce((acc, service) => {
      const category = service.category || 'Other Services';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    }, {});

    setCategorizedServices(groupedServices);

    // Set first category as expanded by default
    if (Object.keys(groupedServices).length > 0) {
      const initialExpandedState = Object.keys(groupedServices).reduce((acc, category) => {
        acc[category] = false; // All collapsed initially
        return acc;
      }, {});
      setExpandedCategories(initialExpandedState);
    }
  }, [services]);

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Check if a service is selected
  const isServiceSelected = (serviceId) => {
    return selectedServices.some(selected => selected.id === serviceId);
  };

  return (
    <div className="space-y-4">
      {Object.keys(categorizedServices).map((category) => (
        <div 
          key={category} 
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Category header - clickable to expand/collapse */}
          <div 
            className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 flex justify-between items-center cursor-pointer"
            onClick={() => toggleCategory(category)}
          >
            <h3 className="font-medium text-gray-800">{category}</h3>
            {expandedCategories[category] ? (
              <FiChevronUp className="text-pink-500" />
            ) : (
              <FiChevronDown className="text-pink-500" />
            )}
          </div>

          {/* Services in this category */}
          {expandedCategories[category] && (
            <div className="p-2">
              {categorizedServices[category].map((service) => (
                <div 
                  key={service.id}
                  className={`p-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors ${
                    isServiceSelected(service.id) ? 'bg-pink-50' : ''
                  }`}
                  onClick={() => onServiceSelect(service)}
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-medium text-pink-600 mr-3">${service.price}</div>
                    {isServiceSelected(service.id) && (
                      <div className="bg-pink-500 text-white rounded-full p-1">
                        <FiCheck size={14} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceCategoryList;