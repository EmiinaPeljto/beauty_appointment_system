import React from "react";
import { FiClock } from "react-icons/fi";

const TimeSlotComponent = ({
  selectedTime,
  onTimeChange,
  availableTimes,
  loading,
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
      <FiClock className="mr-2 text-pink-500" /> Select Time
    </h3>
    {loading ? (
      <p className="text-sm text-gray-500">Loading times...</p>
    ) : availableTimes.length > 0 ? (
      <select
        value={selectedTime}
        onChange={(e) => onTimeChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
      >
        <option value="">Select a time</option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    ) : (
      <p className="text-sm text-gray-500">
        Select a date to see available times.
      </p>
    )}
    <p className="mt-2 text-xs text-gray-500">Time slots placeholder.</p>
  </div>
);

export default TimeSlotComponent;