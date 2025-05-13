import React from "react";
import useFetchWorkingHours from "../hooks/useFetchWorkingHours"; // custom hook
import SalonMap from "./Map";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AboutSalon = ({ salon }) => {
  const { hours, loading, error } = useFetchWorkingHours(salon.id);

  const isClosed = (day) => {
    return !hours.some((entry) => entry.day_of_week === day);
  };

  return (
    <div className="px-8 mt-8 text-gray-700">
      <h2 className="text-xl font-semibold mb-2 ml-32">About {salon.name}</h2>
      <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">
        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-start">
            <span className="mr-2">📍</span>
            <p>{salon.location}</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2">📞</span>
            <p>{salon.phone_number}</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2">✉️</span>
            <p>{salon.email}</p>
          </div>
        </div>

        {/* Map Image */}
        <div className="mb-8 h-64 w-full">
          <SalonMap location={salon.location} />
        </div>

        {/* Working Hours & Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between mb-10">
          {/* Working Hours */}
          <div>
            <h4 className="font-semibold mb-2">Working Hours</h4>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul className="text-sm space-y-1">
                {daysOfWeek.map((day, index) => {
                  const record = hours.find((h) => h.day_of_week === index);
                  return (
                    <li key={index}>
                      {day}{" "}
                      {record ? (
                        `${record.open_time.slice(
                          0,
                          5
                        )} – ${record.close_time.slice(0, 5)}`
                      ) : (
                        <span className="text-gray-500">Closed</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Payment Methods */}
          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold mb-2">Payment Methods</h4>
            <ul className="text-sm space-y-1">
              <li>💳 Credit Card</li>
              <li>💵 Cash</li>
            </ul>
          </div>
        </div>

        {/* Top Salon Card */}
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm mb-10">
          <div className="flex items-start">
            <span className="text-yellow-500 mr-2 mt-0.5">⭐</span>
            <div>
              <h5 className="font-semibold mb-1">
                {salon.name} is a Top Salon
              </h5>
              <p className="text-sm text-gray-600">
                Top Salon is an award for salons that during the previous year
                provided users with an above-average good experience, received
                the highest user ratings on GlamifyMe and always had up-to-date
                appointments.
              </p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Meet Our Team</h4>
          <div className="flex flex-wrap gap-6">
            {/* You could replace these with real team members from DB */}
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Alyssa"
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold">Alyssa</p>
                <p className="text-sm text-gray-500">Stylist</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/men/66.jpg"
                alt="Nicholas"
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold">Nicholas</p>
                <p className="text-sm text-gray-500">Stylist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSalon;
