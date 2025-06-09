import React from "react";

// Example mock data. Replace with your real data or fetch from API.
const mockAppointments = [
  {
    salonName: "Beauty Bliss",
    date: "2025-06-15",
    time: "14:00",
    service: "Haircut & Styling",
    status: "upcoming",
  },
  {
    salonName: "Glow Studio",
    date: "2025-06-20",
    time: "10:30",
    service: "Facial Treatment",
    status: "upcoming",
  },
];

const AppointmentCard = ({ salonName, date, time, service, status }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
    <div>
      <h3 className="text-lg font-semibold text-[#e0559c]">{salonName}</h3>
      <p className="text-gray-600">{service}</p>
      <p className="text-gray-500">
        {date} at {time}
      </p>
    </div>
    <div className="mt-4 md:mt-0">
      <span
        className={`inline-block px-4 py-1 rounded-full text-sm font-medium
        ${
          status === "upcoming"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {status === "upcoming" ? "Upcoming" : status}
      </span>
    </div>
  </div>
);

const UpcomingAppointments = ({ appointments = mockAppointments }) => (
  <div className="max-w-4xl mx-auto p-0">
    {" "}
    {appointments.length === 0 ? (
      <div className="text-gray-500 text-center">No upcoming appointments.</div>
    ) : (
      appointments.map((appt, idx) => <AppointmentCard key={idx} {...appt} />)
    )}
  </div>
);

export default UpcomingAppointments;
