import React from 'react';

const CancelAppointmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText,
  cancelText,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/40 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h3 className="text-xl text-center font-semibold text-gray-800">{title}</h3>

        {/* Content */}
        <div className="mt-4 text-sm text-center text-gray-600">
          {children}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto rounded-full px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            {cancelText || "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto rounded-full px-5 py-2.5 bg-[#F178B6] text-white hover:from-pink-600 hover:to-pink-700 transition disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                </svg>
                Processing...
              </div>
            ) : (
              confirmText || "Confirm"
            )}
          </button>
        </div>
      </div>

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
  );
};

export default CancelAppointmentModal;
