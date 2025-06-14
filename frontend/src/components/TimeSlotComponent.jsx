import React from "react";
import { FiClock } from "react-icons/fi";
import moment from "moment";

const TimeSlotComponent = ({
  selectedTime,
  onTimeChange,
  availableTimes,
  loading,
}) => {
  // Check if selected date is today
  const isToday = moment().format("YYYY-MM-DD") === 
    sessionStorage.getItem("selectedDate");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <FiClock className="mr-2 text-pink-500" /> Select Time
      </h3>
      {loading ? (
        <p className="text-sm text-gray-500">Loading times...</p>
      ) : availableTimes.length > 0 ? (
        <>
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
          {isToday && (
            <p className="mt-2 text-xs text-amber-600">
              Note: Times earlier than now are not available for today.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500">
          {!selectedTime ? "Select a date to see available times." : 
            "No available times for the selected date."}
        </p>
      )}
    </div>
  );
};

export default TimeSlotComponent;