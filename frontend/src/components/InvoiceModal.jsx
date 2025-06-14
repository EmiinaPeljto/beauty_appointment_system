import React from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import useFetchInvoice from "../hooks/useFetchInvoice";

// Helper to format ISO date string to YYYY-MM-DD
function formatDateToYYYYMMDD(dateString) {
  if (!dateString) return "";
  return dateString.slice(0, 10);
}

const InvoiceModal = ({ isOpen, appointmentId, onClose }) => {
  const { invoice, loading, error } = useFetchInvoice(isOpen ? appointmentId : null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8">
            Failed to load appointment details
          </div>
        )}

        {!loading && !error && invoice && (
          <>
            <div className="flex items-center justify-center mb-6">
              <FiCheckCircle className="text-green-500 text-4xl mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Appointment Details
              </h2>
            </div>

            <div className="mb-6 text-center">
              <p className="font-semibold text-lg mb-1">{invoice.salon_name}</p>
              <p className="text-gray-600">{invoice.location}</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Date:</span>
                <span className="text-gray-800">
                  {formatDateToYYYYMMDD(invoice.date)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Time:</span>
                <span className="text-gray-800">
                  {invoice.time ? invoice.time.slice(0, 5) : ""}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Services:</span>
                <span className="text-gray-800 text-right">{invoice.service_names}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Total Price:</span>
                <span className="font-bold text-lg">
                  ${parseFloat(invoice.total_price).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Your Details
              </h3>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Name:</span>
                <span className="text-gray-800">
                  {invoice.first_name} {invoice.last_name}
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">{invoice.email}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-800">{invoice.phone_number}</span>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </>
        )}

        {/* Animation style */}
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.25s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default InvoiceModal;