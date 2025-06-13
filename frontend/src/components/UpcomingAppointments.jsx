import React from "react";

// Helper to format ISO date string to YYYY-MM-DD
const toDateOnly = (isoString) => (isoString ? isoString.slice(0, 10) : "");

const AppointmentCard = ({
  salon_name,
  date,
  time,
  location,
  status,
  onCancel,
}) => {
  const isUpcoming = (status || "").toLowerCase() === "upcoming";

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-2xl p-6 mb-5 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div>
        <h3 className="text-xl font-bold ">{salon_name}</h3>
        <p className="text-gray-700 mt-1">{location}</p>
        <p className="text-gray-500 mt-1">
          📅 {toDateOnly(date)} at 🕒 {time ? time.slice(0, 5) : ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium
            ${isUpcoming
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
            }`}
        >
          {isUpcoming
            ? "Upcoming"
            : status
            ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
            : ""}
        </span>

        {isUpcoming && (
          <button
            onClick={onCancel}
            className="bg-red-100 text-red-600 hover:bg-red-200 transition-colors text-sm px-4 py-1 rounded-full font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

const UpcomingAppointments = ({ appointments = [], loading, error, onCancel }) => (
  <div className="max-w-4xl mx-auto p-4">
    {loading ? (
      <div className="text-pink-500 text-center">Loading appointments...</div>
    ) : error ? (
      <div className="text-red-500 text-center">{error}</div>
    ) : appointments.length === 0 ? (
      <div className="text-gray-500 text-center">No upcoming appointments.</div>
    ) : (
      appointments.map((appt, idx) => (
        <AppointmentCard
          key={idx}
          {...appt}
          onCancel={() => onCancel && onCancel(appt)}
        />
      ))
    )}
  </div>
);

export default UpcomingAppointments;
