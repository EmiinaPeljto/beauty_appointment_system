import React from "react";

// Helper to format ISO date string to YYYY-MM-DD
const toDateOnly = (isoString) => (isoString ? isoString.slice(0, 10) : "");

const AppointmentCard = ({ id, salonName, date, time,  location }) => (
  <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-2xl p-6 mb-5 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
    <div>
      <h3 className="text-xl font-bold">{salonName}</h3>
      <p className="text-gray-700 mt-1">{location}</p>
      <p className="text-gray-500 mt-1">
        📅 {toDateOnly(date)} at 🕒 {time ? time.slice(0, 5) : ""}
      </p>
    </div>

    <div className="flex items-center">
      <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
        Completed
      </span>
    </div>
  </div>
);

const CompletedAppointments = ({ appointments = [], loading = false, error = null }) => {
  if (loading) {
    return <div className="text-pink-500 text-center p-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {appointments.length === 0 ? (
        <div className="text-gray-500 text-center">No completed appointments.</div>
      ) : (
        appointments.map((appt, idx) => (
          <AppointmentCard
            key={appt.id || idx}
            id={appt.id}
            salonName={appt.salonName}
            date={appt.date}
            time={appt.time}
            location={appt.location}
          />
        ))
      )}
    </div>
  );
};

export default CompletedAppointments;