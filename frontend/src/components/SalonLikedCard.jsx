import React from "react";
import { Link } from "react-router-dom";

const SalonLikeCard = ({ id, name, rating, address, image, onUnlike }) => (
  <div className="my-4 w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 flex flex-col relative">
    <div className="relative">
      <img src={image} alt={name} className="w-full h-36 object-cover" />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex items-center justify-between mb-1">
        <span className="text-slate-900 text-base font-bold">{name}</span>
        {/* Heart button in line with name */}
        <button
          className="ml-2"
          onClick={() => onUnlike && onUnlike(id)}
          aria-label="Unlike"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            className="w-7 h-7 drop-shadow"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between mb-4 flex-grow">
        <p className="text-slate-600 text-sm">{address}</p>
        <span className="text-slate-700 text-xs bg-white bg-opacity-80 rounded px-1 font-semibold ml-2">
          {Number(rating).toFixed(1)}⭐
        </span>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <Link to={`/salon/${id}`}>
          <button className="rounded-md bg-[#e0559c] px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#e0559c]/90 transition">
            View
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default SalonLikeCard;
