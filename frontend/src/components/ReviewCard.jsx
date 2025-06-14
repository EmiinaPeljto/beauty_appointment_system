import React, { useState } from "react";
import { FiStar, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import useDeleteReview from "../hooks/useDeleteReview";

const getInitialAndColor = (name) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-pink-400",
    "bg-purple-400",
  ];
  const color = colors[initial.charCodeAt(0) % colors.length];
  return { initial, color };
};

const StarDisplay = ({ value }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FiStar key={i} className="text-orange-400" />);
    } else if (value >= i - 0.5) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-orange-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`half${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half${i})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
      );
    } else {
      stars.push(<FiStar key={i} className="text-gray-300" />);
    }
  }
  return <div className="flex gap-0.5">{stars}</div>;
};

// Delete review confirmation modal component
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center mb-5">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Delete Review</h3>
        </div>

        {/* Content */}
        <div className="mt-4 text-sm text-gray-600 text-center leading-relaxed">
          <p>
            Are you sure you want to delete your review? This action cannot be undone.
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
            className="w-full sm:w-auto rounded-full px-5 py-2.5 bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                </svg>
                Deleting...
              </div>
            ) : (
              "Delete Review"
            )}
          </button>
        </div>
      </div>

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

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useAuth();
  const name = review.user_name || review.name || "User";
  const { initial, color } = getInitialAndColor(name);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { deleteReview, isDeleting } = useDeleteReview(onDelete);
  
  // Check if this review belongs to the current user
  const isUsersReview = user && user.id === review.user_id;

  // Parse date
  const createdAt = review.created_at || review.date;
  const dateObj = createdAt ? new Date(createdAt) : null;
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const formattedTime = dateObj
    ? dateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteReview(review.id, user.id);
    if (success) {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md transition hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {review.profile_image ? (
              <img
                src={review.profile_image}
                alt={name}
                className="w-10 h-10 rounded-full object-cover border"
                onError={(e) => (e.target.src = "/default-profile.png")}
              />
            ) : (
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold text-lg ${color}`}
              >
                {initial}
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-gray-800">{name}</div>
              {formattedDate && (
                <div className="text-xs text-gray-400">
                  {formattedDate} at {formattedTime}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <StarDisplay value={review.rating} />
            
            {/* Delete icon - only visible to the review author */}
            {isUsersReview && (
              <button
                onClick={handleDeleteClick}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                title="Delete your review"
              >
                <FiTrash2 size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 text-gray-700 text-sm leading-relaxed">
          {review.review_text}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <DeleteReviewModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ReviewCard;