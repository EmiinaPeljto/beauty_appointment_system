import useFetchInvoice from "../hooks/useFetchInvoice";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle, FiArrowLeft } from "react-icons/fi";

// Helper to format ISO date string to YYYY-MM-DD
function formatDateToYYYYMMDD(dateString) {
  if (!dateString) return "";
  return dateString.slice(0, 10);
}

const Invoice = () => {
  const { appointment_id } = useParams();
  const { invoice, loading, error } = useFetchInvoice(appointment_id);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-pink-500 text-lg">Loading invoice...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  if (!invoice)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-lg">No invoice found.</div>
      </div>
    );

  const {
    salon_name,
    date,
    time,
    first_name,
    last_name,
    phone_number,
    email,
    location,
    service_names,
    total_price,
  } = invoice;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 mt-10">
        <div className="flex items-center justify-center mb-6">
          <FiCheckCircle className="text-green-500 text-4xl mr-2" />
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Appointment Confirmed!
          </h2>
        </div>
        <div className="mb-6 text-center">
          <p className=" font-semibold text-lg mb-1">
            {salon_name}
          </p>
          <p className="text-gray-600">{location}</p>
        </div>
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Date:</span>
            <span className="text-gray-800">{formatDateToYYYYMMDD(date)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Time:</span>
            <span className="text-gray-800">{time.slice(0, 5)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Services:</span>
            <span className="text-gray-800 text-right">{service_names}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Total Price:</span>
            <span className=" font-bold text-lg">
              ${parseFloat(total_price).toFixed(2)}
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
              {first_name} {last_name}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-800">{email}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Phone:</span>
            <span className="text-gray-800">{phone_number}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/profile"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition mb-3"
          >
            View My Appointments
          </Link>
          <Link
            to="/"
            className="flex items-center text-pink-600 hover:text-pink-800 transition"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Invoice;