import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCancelAppointment from "../hooks/useCancelAppointment";
import { getUser } from "../utils/auth";
import ConfirmationModal from "./CancelAppointmentModal";
import InvoiceModal from "./InvoiceModal";
import useFetchInvoice from "../hooks/useFetchInvoice";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { successToast, errorToast } from "../utils/toastUtils";

// Helper to format ISO date string to YYYY-MM-DD
const toDateOnly = (isoString) => (isoString ? isoString.slice(0, 10) : "");

// CancelConfirmationContent component
const CancelConfirmationContent = ({ appointmentDetails, loading }) => {
  if (loading) {
    return <p className="text-center my-4">Loading appointment details...</p>;
  }
  
  if (!appointmentDetails) {
    return <p className="text-center my-4">Are you sure you want to cancel this appointment?</p>;
  }

  return (
    <div className="text-center">
      <p className="mb-4">Are you sure you want to cancel this appointment?</p>
      <div className="bg-gray-50 rounded-lg p-4 my-4">
        <p className="font-medium">{appointmentDetails.salon_name}</p>
        <p className="text-gray-600">
          {toDateOnly(appointmentDetails.date)} at {appointmentDetails.time ? appointmentDetails.time.slice(0, 5) : ''}
        </p>
        {appointmentDetails.service_names && (
          <p className="text-gray-600 mt-2">{appointmentDetails.service_names}</p>
        )}
      </div>
      <p className="text-sm text-red-500">
        This action cannot be undone.
      </p>
    </div>
  );
};

// Empty state component
const EmptyAppointmentsState = () => (
  <div className="text-center py-10">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
      <FiCalendar className="text-2xl text-gray-500" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-1">No upcoming appointments</h3>
    <p className="text-gray-500 mb-6">You don't have any scheduled appointments.</p>
    <a 
      href="/services" 
      className="inline-flex items-center text-sm font-medium text-pink-500 hover:text-pink-600"
    >
      Browse services <FiArrowRight className="ml-1" />
    </a>
  </div>
);

// AppointmentCard component
const AppointmentCard = ({
  id,
  salon_name,
  date,
  time,
  location,
  status,
  onCancel,
  onClick,
}) => {
  const isUpcoming = (status || "").toLowerCase() === "upcoming";

  const handleClick = (e) => {
    // Only trigger the card click if not clicking the cancel button
    if (!e.target.closest('button')) {
      onClick(id);
    }
  };

  return (
    <div 
      className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-2xl p-6 mb-5 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <h3 className="text-xl font-bold">{salon_name}</h3>
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
            onClick={(e) => {
              e.stopPropagation();
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

// Main UpcomingAppointments component
const UpcomingAppointments = ({
  appointments = [],
  loading,
  error,
  refetch,
}) => {
  const [cancellingAppointment, setCancellingAppointment] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  
  const {
    cancelAppointment,
    loading: cancelLoading,
    error: cancelError,
    success: cancelSuccess,
    resetState,
  } = useCancelAppointment();

  // Fetch invoice for appointment details
  const { invoice: appointmentDetails, loading: invoiceLoading } =
    useFetchInvoice(cancellingAppointment);

  const user = getUser();

  const handleCancelClick = (appointmentId) => {
    setCancellingAppointment(appointmentId);
  };

  const handleCloseModal = () => {
    setCancellingAppointment(null);
    resetState();
  };

  const handleCardClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  const handleCloseInvoiceModal = () => {
    setSelectedAppointmentId(null);
  };

  const handleConfirmCancel = async () => {
    if (!user || !cancellingAppointment) return;

    try {
      const success = await cancelAppointment(cancellingAppointment, user.id);

      if (success) {
        successToast("Appointment cancelled successfully!");

        setTimeout(() => {
          refetch();
          handleCloseModal();
        }, 1000);
      }
    } catch (err) {
      errorToast("Failed to cancel appointment. Please try again.");
      console.error("Error in handleCancel:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
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
            onClick={handleCardClick}
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

      <InvoiceModal 
        isOpen={!!selectedAppointmentId}
        appointmentId={selectedAppointmentId}
        onClose={handleCloseInvoiceModal}
      />
    </div>
  );
};

export default UpcomingAppointments;