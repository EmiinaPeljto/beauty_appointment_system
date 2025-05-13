import React from "react";
import { Link } from "react-router-dom";

const SalonCard = ({ id, name, rating, address, image }) => {
  return (
    <Link to={`/salon/${id}`}>
      <div className="my-4 w-full max-w-xs h-[330px] bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 flex flex-col">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-40 object-cover" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-1">
            <div className="text-slate-900 text-sm font-bold">{name}</div>
            <div className="text-slate-700 text-sm">{rating}⭐</div>
          </div>
          <p className="text-slate-600 text-sm mb-4 flex-grow">{address}</p>
          <div className="text-center mt-auto">
            <button className="w-full rounded-md bg-[#FF66B2] px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#FF66B2]/90 transition">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SalonCard;
