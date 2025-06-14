import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCancelAppointment from "../hooks/useCancelAppointment";
import { getUser } from "../utils/auth";
import ConfirmationModal from "./CancelAppointmentModal";
import useFetchInvoice from "../hooks/useFetchInvoice";
import { FiCalendar, FiArrowRight } from "react-icons/fi";

// Helper to format ISO date string to YYYY-MM-DD
const toDateOnly = (isoString) => (isoString ? isoString.slice(0, 10) : "");

const AppointmentCard = ({
  id,
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
            ${
              isUpcoming
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
            onClick={() => {
              if (id) {
                onCancel(id);
              }
            }}
            className="bg-red-100 text-red-600 hover:bg-red-200 transition-colors text-sm px-4 py-1 rounded-full font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

const EmptyAppointmentsState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 text-center mt-4">
      
      <h3 className="text-xl font-semibold text-gray-800 mb-3">No Appointments Yet</h3>
      
      <p className="text-gray-400 mb-6">
        You don't have any upcoming appointments. 
        Book a service with one of our beauty professionals today!
      </p>
      
      <button 
        onClick={() => navigate('/services')}
        className="bg-[#F178B6] hover:bg-[#FF66B2] text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center mx-auto transition-transform hover:scale-105"
      >
        Book Your Appointment <FiArrowRight className="ml-2" />
      </button>
    </div>
  );
};

const CancelConfirmationContent = ({ appointmentDetails, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (!appointmentDetails) {
    return (
      <div className="py-4 text-center text-gray-500">
        Could not load appointment details.
      </div>
    );
  }
  
  const { salon_name, date, time, service_names, total_price } = appointmentDetails;
  
  return (
    <div className="space-y-5">
      <p className="text-gray-700">
        Are you sure you want to cancel your appointment?
      </p>
      
      <div className="bg-pink-50 border border-pink-100 p-5 rounded-2xl">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-medium text-gray-800">{salon_name}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 ml-2 text-sm">
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Date:</span>
          </div>
          <div className="font-medium text-gray-800">
            {date ? new Date(date).toLocaleDateString() : ''}
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Time:</span>
          </div>
          <div className="font-medium text-gray-800">
            {time && time.slice(0, 5)}
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>Services:</span>
          </div>
          <div className="font-medium text-gray-800">
            {service_names}
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Total:</span>
          </div>
          <div className="font-medium text-gray-800">
            ${parseFloat(total_price).toFixed(2)}
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md text-sm">
        <div className="flex">
          <div className="flex-shrink-0 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="font-medium text-red-700">
              Once canceled, this appointment cannot be restored.
            </p>
            <p className="text-red-600 mt-1">
              The time slot will be made available to other customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingAppointments = ({
  appointments = [],
  loading,
  error,
  refetch,
}) => {
  const [cancellingAppointment, setCancellingAppointment] = useState(null);
  const {
    cancelAppointment,
    loading: cancelLoading,
    error: cancelError,
    success: cancelSuccess,
    resetState,
  } = useCancelAppointment();

  // Fetch invoice for appointment details
  const { invoice: appointmentDetails, loading: invoiceLoading } = useFetchInvoice(
    cancellingAppointment
  );

  const user = getUser();

  const handleCancelClick = (appointmentId) => {
    setCancellingAppointment(appointmentId);
  };
  
  const handleCloseModal = () => {
    setCancellingAppointment(null);
    resetState();
  };

  const handleConfirmCancel = async () => {
    if (!user || !cancellingAppointment) return;
    
    try {
      const success = await cancelAppointment(cancellingAppointment, user.id);
      
      if (success) {
        setTimeout(() => {
          refetch();
          handleCloseModal();
        }, 1000);
      }
    } catch (err) {
      console.error("Error in handleCancel:", err);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      {cancelSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
          Appointment cancelled successfully!
        </div>
      )}

      {cancelError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {cancelError}
        </div>
      )}

      {loading ? (
        <div className="text-pink-500 text-center">Loading appointments...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : appointments.length === 0 ? (
        <EmptyAppointmentsState />
      ) : (
        appointments.map((appt, idx) => (
          <AppointmentCard
            key={idx}
            id={appt.id}
            {...appt}
            onCancel={handleCancelClick}
          />
        ))
      )}

      <ConfirmationModal 
        isOpen={!!cancellingAppointment}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        title="Cancel Appointment"
        confirmText="Yes, Cancel Appointment"
        cancelText="No, Keep Appointment"
        isLoading={cancelLoading}
      >
        <CancelConfirmationContent 
          appointmentDetails={appointmentDetails}
          loading={invoiceLoading}
        />
      </ConfirmationModal>
    </div>
  );
};

export default UpcomingAppointments;