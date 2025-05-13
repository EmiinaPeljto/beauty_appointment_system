import React from 'react';
import { FiSend } from 'react-icons/fi';
import useSubmitSupportRequest from '../hooks/useSubmitSupportRequest';
import { useAuth } from '../contexts/AuthContext';

const SupportRequestForm = ({ onClose }) => {
  const { user } = useAuth();
  const {
    formData,
    status,
    handleChange,
    submitRequest,
    resetForm
  } = useSubmitSupportRequest();

  // Handle successful submission
  const handleSuccess = () => {
    if (status.success) {
      return (
        <div className="text-center py-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Request Submitted!</h3>
          <p className="mt-2 text-sm text-gray-500">Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="mt-5 w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-[#F178B6] text-base font-medium text-white hover:bg-[#FF66B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF66B2] sm:w-auto sm:text-sm"
          >
            Close
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {status.success ? (
        handleSuccess()
      ) : (
        <form onSubmit={submitRequest} className="space-y-4 mt-5">
          {/* Form Header */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Contact Support
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Our team is here to help with any questions or concerns
            </p>
          </div>

          {/* Form Fields */}
          {/* Name display - just for showing the user their name, not sending to backend */}
          {user && (user.first_name || user.last_name) && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Submitting as:</p>
              <p className="font-medium text-gray-900">{`${user.first_name || ''} ${user.last_name || ''}`}</p>
            </div>
          )}

          {/* Email field removed as requested */}

          <div>
            <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
              Subject
            </label>
            <div className="mt-2">
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What can we help you with?"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F178B6] sm:text-sm sm:leading-6 pl-3 pr-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Please describe your issue or question in detail..."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F178B6] sm:text-sm sm:leading-6 p-3"
              />
            </div>
          </div>

          {/* Error Message */}
          {status.error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{status.error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="mt-8 flex flex-col space-y-3">
            <button
              type="submit"
              disabled={status.loading}
              className="flex w-full justify-center items-center rounded-md bg-[#F178B6] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#FF66B2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF66B2]"
            >
              {status.loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Request <FiSend className="ml-2" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SupportRequestForm;
