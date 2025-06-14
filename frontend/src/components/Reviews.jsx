import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { FiCheckCircle } from "react-icons/fi";
import useFetchReviews from "../hooks/useFetchReviews";
import ReviewCard from "./ReviewCard";
import AddReviewModal from "./AddReviewModal";

const Reviews = ({ salonId }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const { reviews, loading } = useFetchReviews(salonId, refreshFlag);

  const handleSubmit = async ({ rating, comment, reset }) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/reviews/add/${salonId}`, {
        rating,
        review_text: comment,
        user_id: user?.id,
      });
      setSuccess(true);
      setShowModal(false);
      reset();
      setRefreshFlag((f) => !f);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle review deletion
  const handleLoginRedirect = () => {
    const redirectData = { path: `/salon/${salonId}?tab=reviews` };
    localStorage.setItem("redirectAfterLogin", JSON.stringify(redirectData));
    navigate("/login");
  };

  // Handle review deletion
  const handleDeleteReview = (deletedReviewId) => {
    console.log("Review deleted:", deletedReviewId);
    // Refresh the reviews list
    setRefreshFlag(prev => !prev);
  };

  return (
    <div className="relative px-6 md:px-12 mt-12 mb-16">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center h-10 px-5 bg-[#F178B6] rounded-full shadow-md">
          <h2 className="text-white font-semibold tracking-wide text-sm">
            REVIEWS
          </h2>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mt-4 text-center">
          What People Are Saying
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          {loading && (
            <p className="text-gray-400 text-center">Loading reviews...</p>
          )}
          {!loading && reviews.length === 0 && (
            <p className="text-gray-400 text-center">
              No reviews yet. Be the first to leave one!
            </p>
          )}
          {reviews.map((review, idx) => (
            <ReviewCard 
              key={review.id || idx} 
              review={review}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>

        {isAuthenticated ? (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#F178B6] hover:bg-[#F178B6] text-white px-6 py-3 rounded-full text-sm font-semibold shadow transition duration-200"
            >
              + Add Review
            </button>
          </div>
        ) : (
          <div className="mt-8 text-center text-sm text-gray-500">
            <span>
              <a
                onClick={handleLoginRedirect}
                className="text-pink-500 underline hover:text-pink-600 font-medium cursor-pointer"
              >
                Log in
              </a>{" "}
              to leave a review.
            </span>
          </div>
        )}

        {success && (
          <div className="mt-6 flex items-center justify-center gap-2 text-green-600 bg-green-100 border border-green-200 rounded-lg p-4 shadow-sm">
            <FiCheckCircle className="text-xl" />
            <span className="text-sm font-medium">
              Your review was submitted successfully!
            </span>
          </div>
        )}
      </div>

      <AddReviewModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
        salonId={salonId}
      />
    </div>
  );
};

export default Reviews;