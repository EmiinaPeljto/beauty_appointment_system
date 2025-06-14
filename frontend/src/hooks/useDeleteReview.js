import { useState } from "react";
import api from "../utils/api";
import { successToast, errorToast } from "../utils/toastUtils";

const useDeleteReview = (onSuccess) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteReview = async (reviewId, userId) => {
    if (!reviewId || !userId) {
      errorToast("Missing review or user information");
      return false;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await api.delete(`/reviews/delete/${reviewId}`, {
        data: { user_id: userId },
      });

      successToast("Your review has been deleted successfully");

      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(reviewId);
      }

      return true;
    } catch (err) {
      console.error("Delete review error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to delete review";
      setError(errorMessage);
      errorToast(errorMessage);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmAndDelete = async (reviewId, userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!isConfirmed) return false;

    return await deleteReview(reviewId, userId);
  };

  return {
    deleteReview,
    confirmAndDelete,
    isDeleting,
    error,
  };
};

export default useDeleteReview;
