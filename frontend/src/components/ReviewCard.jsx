import React from "react";
import { FiStar } from "react-icons/fi";

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

const ReviewCard = ({ review }) => {
  const name = review.user_name || review.name || "User";
  const { initial, color } = getInitialAndColor(name);

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

  return (
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
        <div className="flex items-center gap-2">
          <StarDisplay value={review.rating} />
        </div>
      </div>

      <div className="mt-4 text-gray-700 text-sm leading-relaxed">
        {review.review_text}
      </div>
    </div>
  );
};

export default ReviewCard;
