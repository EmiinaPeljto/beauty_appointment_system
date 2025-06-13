import React from "react";
import { FiCalendar } from "react-icons/fi";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const toLocalDate = (dateStr) => {
  if (typeof dateStr !== "string") return null;
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return null;
  return new Date(Number(year), Number(month) - 1, Number(day));
};

const CalendarComponent = ({
  selectedDate,
  onDateChange,
  availableDates = [],
}) => {
  const availableDateObjs = availableDates
    .filter((d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d))
    .map(toLocalDate)
    .filter(Boolean);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <FiCalendar className="mr-2 text-pink-500" /> Select Date
      </h3>
      <ReactDatePicker
        selected={
          selectedDate && typeof selectedDate === "string"
            ? toLocalDate(selectedDate)
            : null
        }
        onChange={(date) =>
          onDateChange(date ? formatDateToYYYYMMDD(date) : "")
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
