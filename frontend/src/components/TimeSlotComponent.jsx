import React, { useEffect, useState } from "react";
import { FiClock, FiAlertTriangle } from "react-icons/fi";
import moment from "moment";

const TimeSlotComponent = ({
  selectedTime,
  onTimeChange,
  availableTimes,
  loading,
}) => {
  const [salonClosed, setSalonClosed] = useState(false);
  const [nextAvailableDate, setNextAvailableDate] = useState("");
  
  // Check if selected date is today
  const selectedDate = sessionStorage.getItem("selectedDate");
  const isToday = moment().format("YYYY-MM-DD") === selectedDate;

  useEffect(() => {
    // Only run this check if today is selected and times have loaded
    if (isToday && !loading && availableTimes) {
      const now = moment();
      
      // Check if salon is closed (no available times) or all times are in the past
      const allTimesInPast = availableTimes.length > 0 &&
        availableTimes.every(time => {
          const timeSlot = moment(`${selectedDate} ${time}`, "YYYY-MM-DD HH:mm");
          return timeSlot.isBefore(now);
        });
        
      if (availableTimes.length === 0 || allTimesInPast) {
        setSalonClosed(true);
        
        // Calculate tomorrow's date for the message
        const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
        setNextAvailableDate(tomorrow);
      } else {
        setSalonClosed(false);
      }
    } else {
      setSalonClosed(false);
    }
  }, [isToday, loading, availableTimes, selectedDate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <FiClock className="mr-2 text-pink-500" /> Select Time
      </h3>
      
      {/* Show alert when salon is closed for today */}
      {salonClosed && isToday && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-4">
          <div className="flex items-center">
            <FiAlertTriangle className="text-amber-500 mr-2" />
            <p className="text-amber-700 text-sm">
              The salon is closed for today's remaining hours. 
              The next available slot would be tomorrow 
              ({moment(nextAvailableDate).format("MMM DD")}).
            </p>
          </div>
        </div>
      )}
      
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
          {isToday && !salonClosed && (
            <p className="mt-2 text-xs text-amber-600">
              Note: Times earlier than now are not available for today.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500">
          {!selectedDate ? "Select a date to see available times." : 
            salonClosed && isToday ? 
              "No more available times for today." : 
              "No available times for the selected date."}
        </p>
      )}
    </div>
  );
};

export default TimeSlotComponent;