import React from "react";

const ServicesList = ({ servicesByCategory }) => {
  return (
    <div className="ml-8 mt-8">
      {Object.entries(servicesByCategory).map(([category, services], idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}</h3>
          {services.map((service, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-300 py-2 pr-4 mr-8">
              <div className="flex items-center">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  id={`service-${category}-${index}`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                />
                <label htmlFor={`service-${category}-${index}`} className="ml-2">
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">Duration: {service.duration} mins</p>
                </label>
              </div>
              <div className="text-right text-pink-600 font-semibold">${service.price}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ServicesList;