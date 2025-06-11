import React from "react";
import { FiCalendar } from "react-icons/fi";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";

const CalendarComponent = ({
  selectedDate,
  onDateChange,
  availableDates = [],
}) => {
  const availableDateObjs = availableDates.map((d) => parseISO(d));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <FiCalendar className="mr-2 text-pink-500" /> Select Date
      </h3>
      <ReactDatePicker
        selected={selectedDate ? parseISO(selectedDate) : null}
        onChange={(date) =>
          onDateChange(date ? date.toISOString().slice(0, 10) : "")
        }
        includeDates={availableDateObjs}
        dateFormat="yyyy-MM-dd"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
        placeholderText="Select a date"
      />
      <p className="mt-2 text-xs text-gray-500">
        Only available days are enabled.
      </p>
    </div>
  );
};

export default CalendarComponent;