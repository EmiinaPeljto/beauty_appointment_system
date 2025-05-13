import React from "react";

const Reviews = ({ salonId }) => {
  return (
    <div className="px-8 mt-8">
      <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
      <p>No reviews yet for salon ID {salonId}.</p>
    </div>
  );
};

export default Reviews;
