import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const DeleteReviewModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6 animate-fade-in transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-5">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#FF66B2] mb-4">
            <FiAlertTriangle className="h-6 w-6 text-[#FF66B7]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Delete Review</h3>
        </div>

        {/* Content */}
        <div className="mt-4 text-sm text-gray-600 text-center leading-relaxed">
          <p>
            Are you sure you want to delete your review? This action cannot be
            undone.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-center gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto rounded-full px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto rounded-full px-5 py-2.5 bg-[#FF66B2] text-white hover:bg-[#F178B6] transition disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                  />
                </svg>
                Deleting...
              </div>
            ) : (
              "Delete Review"
            )}
          </button>
        </div>
      </div>

      {/* Animation style */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteReviewModal;
