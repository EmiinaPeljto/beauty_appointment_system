import React from "react";
import { FiSend, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import useSubmitSupportRequest from "../hooks/useSubmitSupportRequest";
import { useAuth } from "../contexts/AuthContext";

const HelpForm = () => {
  const { isAuthenticated, user } = useAuth();
  const {
    formData,
    status,
    handleChange,
    submitRequest,
    resetForm
  } = useSubmitSupportRequest();

  return (
    <div id="support-form" className="relative bg-gradient-to-b from-pink-50 to-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#fcc8d1] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in Touch</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Our beauty experts are here to help with any questions or concerns.
        </p>
      </div>
      
      <div className="mx-auto mt-10 max-w-xl">
        {status.success ? (
          <div className="rounded-lg bg-green-50 p-6 text-center">
            <FiCheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-3 text-lg font-semibold text-green-800">Request Submitted!</h3>
            <p className="mt-2 text-sm text-green-700">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
            <button
              onClick={resetForm}
              className="mt-4 rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send another request
            </button>
          </div>
        ) : (
          <form onSubmit={submitRequest} className="space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${isAuthenticated ? 'bg-gray-50 ring-gray-300' : 'bg-white ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-400'} placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}
                    required
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${isAuthenticated ? 'bg-gray-50 ring-gray-300' : 'bg-white ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-400'} placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}
                    required
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
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
                    placeholder="What can we help you with?"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 focus:outline-none sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                  Message
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your question or issue..."
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 focus:outline-none sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>
            
            {status.error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex items-center">
                  <FiAlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="ml-2 text-sm font-medium text-red-800">{status.error}</p>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={status.loading}
                className="group relative w-full flex justify-center items-center rounded-md bg-[#F178B6] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#FF66B2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF66B2] transition-all duration-200 ease-in-out disabled:opacity-70"
              >
                {status.loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <FiSend className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                )}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>Our support hours are Monday-Friday, 9am-6pm EST</p>
          <p className="mt-2">For urgent matters, please call <span className="font-medium text-gray-700">1-800-GLAMIFY</span></p>
        </div>
      </div>
    </div>
  );
};

export default HelpForm;