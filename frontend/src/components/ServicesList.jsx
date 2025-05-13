import React from 'react';

const ServicesList = () => {
  return (
    <div> {/* Parent container wrapping all child elements */}
      <div className="flex items-center ml-8 mt-8">
        <h6>Service Category</h6>
      </div>
      
      <div className="flex items-center ml-8 mt-8">
        <input
          id="link-checkbox"
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className='ml-4'>
          Service 1
        </label>
      </div>
    </div>
  );
};

export default ServicesList;