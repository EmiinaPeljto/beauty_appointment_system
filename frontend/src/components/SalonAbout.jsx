import React from 'react';

const AboutSalon = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">
      {/* Contact Info */}
      <div className="space-y-2 mb-6">
        <div className="flex items-start">
          <span className="mr-2">📍</span>
          <p>4 Dehart St, Morristown, NJ 07960, United States</p>
        </div>
        <div className="flex items-start">
          <span className="mr-2">📞</span>
          <p>(973) 123 - 456</p>
        </div>
        <div className="flex items-start">
          <span className="mr-2">✉️</span>
          <p>guestservices@laboratorystudio.com</p>
        </div>
      </div>

      {/* Map Image */}
      <div className="mb-8">
        <img
          src="https://maps.googleapis.com/maps/api/staticmap?center=Morristown,NJ&zoom=13&size=800x200&key=YOUR_API_KEY"
          alt="Map"
          className="w-full h-52 object-cover rounded-md"
        />
      </div>

      {/* Working Hours & Payment Methods */}
      <div className="flex flex-col md:flex-row justify-between mb-10">
        {/* Working Hours */}
        <div>
          <h4 className="font-semibold mb-2">Working Hours</h4>
          <ul className="text-sm space-y-1">
            <li>Tuesday 12PM – 7PM</li>
            <li>Wednesday 9AM – 5PM</li>
            <li>Thursday 12PM – 9PM</li>
            <li>Friday 9AM – 6PM</li>
            <li>Saturday 9AM – 5PM</li>
            <li className="text-gray-500 mt-2">We are closed on Sunday and Monday.</li>
          </ul>
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
            <h5 className="font-semibold mb-1">Laboratory Hair Studio is a Top Salon</h5>
            <p className="text-sm text-gray-600">
              Top Salon is an award for salons that during the previous year provided users with an above-average good experience,
              received the highest user ratings on GlamifyMe and always had up-to-date appointments.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div>
        <h4 className="font-semibold text-xl mb-4">Meet Our Team</h4>
        <div className="flex flex-wrap gap-6">
          {/* Team Member 1 */}
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

          {/* Team Member 2 */}
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
  );
};

export default AboutSalon;
