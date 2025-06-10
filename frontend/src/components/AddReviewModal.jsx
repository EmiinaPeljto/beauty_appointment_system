import React, { useState } from "react";
import { FiStar, FiUser, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

const StarInput = ({ value, onChange }) => (
  <div className="flex items-center gap-1 justify-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className={`text-2xl transition-colors ${
          value >= star ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
      >
        <FiStar />
      </button>
    ))}
  </div>
);

const AddReviewModal = ({ open, onClose, onSubmit, submitting, error, salonId }) => {
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && privacyAccepted) {
      onSubmit({
        rating,
        comment,
        privacyAccepted,
        reset: () => {
          setRating(0);
          setComment("");
          setPrivacyAccepted(false);
        },
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-1 text-center">
            Share your experience
          </h3>
          <p className="text-gray-500 text-sm text-center">
            We value your feedback! Please rate and review your visit.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="rounded-lg bg-yellow-50 p-6 text-center mb-4">
            <FiAlertTriangle className="mx-auto h-8 w-8 text-yellow-400" />
            <h4 className="mt-2 text-lg font-semibold text-yellow-800">
              Log in required
            </h4>
            <p className="mt-1 text-sm text-yellow-700">
              Please{" "}
              <a
                href={`/login?review=1&salonId=${salonId}&tab=reviews`}
                className="text-pink-500 underline hover:text-pink-600"
              >
                log in
              </a>{" "}
              to leave a review.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <span className="block mb-2 font-medium text-gray-700">
                How would you rate us?
              </span>
              <StarInput value={rating} onChange={setRating} />
              {rating === 0 && (
                <span className="text-xs text-red-500 block mt-1">
                  Please select a rating.
                </span>
              )}
            </div>
            <div className="mb-4">
              <textarea
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-200"
                rows={4}
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="privacy"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                required
                className="mr-2"
              />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                I accept the{" "}
                <a href="/privacy" className="underline text-[#F178B6]">
                  Privacy Policy
                </a>
              </label>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-3 mb-2 flex items-center">
                <FiAlertTriangle className="mr-2 text-red-400" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#F178B6] hover:bg-[#FF66B2] text-white py-2 rounded-md font-semibold transition"
              disabled={submitting || rating === 0 || !privacyAccepted}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AddReviewModal;
