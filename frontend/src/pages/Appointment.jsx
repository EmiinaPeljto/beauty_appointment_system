import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiPlusCircle, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import useAvailableTimes from "../hooks/useAvailableTimes";
import useAvailableDates from "../hooks/useAvailableDates";
import CalendarComponent from "../components/CalendarComponent";
import TimeSlotComponent from "../components/TimeSlotComponent";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useBookAppointment from "../hooks/useBookAppointment";

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Load from state or localStorage
  let initialServices = location.state?.selectedServices;
  let salonId = location.state?.salonId;

  if (!salonId) {
    salonId = localStorage.getItem("salonId");
  }
  if (!initialServices) {
    const stored = localStorage.getItem("selectedServices");
    initialServices = stored ? JSON.parse(stored) : [];
  }

  const [selectedServices] = useState(initialServices);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { dates: availableDates = [], loading: datesLoading } =
    useAvailableDates(salonId);

  const { availableTimes, loading: timesLoading } = useAvailableTimes(
    salonId,
    selectedDate
  );

  const { bookAppointment, loading: bookingLoading } = useBookAppointment();

  const totalPrice = selectedServices.reduce(
    (total, service) => total + parseFloat(service.price),
    0
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    sessionStorage.setItem("selectedDate", date);
  }

  useEffect(() => {
    if (!user) {
      if (!window.__loginToastShown) {
        toast.error("You need to be logged in to make an appointment.");
        window.__loginToastShown = true;
      }
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({
          salonId,
          selectedServices,
        })
      );
      navigate(`/login`, { replace: true });
    } else {
      window.__loginToastShown = false;
    }
  }, [user, navigate, salonId, selectedServices]);

  const handleAddMoreServices = () => {
    navigate(`/salon/${salonId}?tab=pricing`, {
      state: { existingServices: selectedServices },
    });
  };

  const handleGoBackToSalon = () => {
    if (salonId) {
      navigate(`/salon/${salonId}?tab=pricing`);
    } else {
      navigate(-1);
    }
  };

  const handleBookAppointment = async () => {
    const result = await bookAppointment({
      user_id: user.id,
      salon_id: salonId,
      date: selectedDate,
      time: selectedTime,
      service_id: selectedServices.map((s) => s.id),
    });
    if (result && result.appointment_id) {
      navigate(`/invoice/${result.appointment_id}`);
    }
  };

  // Error if no salonId
  if (!salonId) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">
          Salon information is missing. Please go back and try selecting
          services again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  // Error if no services selected
  if (
    selectedServices.length === 0 &&
    !location.state?.comingFromAppointmentPage
  ) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No Services Selected
        </h2>
        <p className="text-gray-700 mb-6">
          You haven't selected any services yet. Please go back to the salon
          page to choose services.
        </p>
        <button
          onClick={handleGoBackToSalon}
          className="bg-[#FF66B2] bg-[#FF66B2] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center justify-center mx-auto"
        >
          <FiArrowLeft className="mr-2 " /> Back to Salon Services
        </button>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={handleGoBackToSalon}
          className="mb-6 inline-flex items-center text-pink-600 hover:text-pink-800 transition-colors"
        >
          <FiArrowLeft className="mr-2 h-5 w-5" />
          Back to Salon
        </button>

        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          Book Your Appointment
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <CalendarComponent
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            availableDates={availableDates}
          />
          <TimeSlotComponent
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
            availableTimes={availableTimes}
            loading={timesLoading}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FiShoppingCart className="mr-2 text-pink-500" /> Your Selected
            Services
          </h3>
          {selectedServices.length > 0 ? (
            <ul className="divide-y divide-gray-200 mb-4">
              {selectedServices.map((service) => (
                <li
                  key={service.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{service.name}</p>
                    <p className="text-sm text-gray-500">
                      {service.duration_minutes || service.duration} min
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ${parseFloat(service.price).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No services selected yet.</p>
          )}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <button
              onClick={handleAddMoreServices}
              className="text-sm text-pink-600 hover:text-pink-800 font-medium flex items-center transition-colors"
            >
              <FiPlusCircle className="mr-1" /> Add More Services
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Price:</p>
              <p className="text-2xl font-bold ">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleBookAppointment}
            disabled={
              !selectedDate ||
              !selectedTime ||
              selectedServices.length === 0 ||
              !user
            }
            className="w-full md:w-auto bg-[#FF66B2] hover:bg-[#FF66B2] disabled:bg-gray-300 text-white font-semibold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
