import React from "react";

const SalonCard = () => {
  return (
    <div className="my-4 w-63 h-75 bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
          alt="Salon"
          className="w-full h-32 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-slate-1200 text-s py-1 rounded font-bold">Bon Bon Hair Salon</div>
          <div className="text-slate-1200 text-s px-2 py-1 rounded ">4.9⭐</div>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          4 Dehart St,
          <br />
          Morristown, NJ
          <br />
          07960, United States
        </p>
        <div className="text-center">
          <button className="flex w-full justify-center rounded-md bg-[#FF66B2] px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#FF66B2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF66B2] transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;
