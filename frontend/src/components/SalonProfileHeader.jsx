import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/api";

const SalonProfileHeader = ({ salon, activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user) return;
      try {
        const res = await api.get(
          `/favourites/getFavoritesByUserId/${user.id}`
        );
        const found = res.data.some((fav) => fav.name === salon.name);
        setIsFavourite(found);
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      }
    };
    fetchFavourites();
  }, [user, salon]);

  const handleHeartClick = async () => {
    if (!user) {
      alert("Please log in to manage favourites.");
      return;
    }
    try {
      if (isFavourite) {
        // Remove from favourites
        await api.delete(
          `/favourites/deleteFavouriteById/${user.id}/${salon.id}`
        );
        setIsFavourite(false);
      } else {
        // Add to favourites
        await api.post(`/favourites/addFavourite/${user.id}/${salon.id}`);
        setIsFavourite(true);
      }
    } catch (err) {
      alert("Failed to update favourites: " + err.message);
    }
  };

  return (
    <section className="mt-8">
      {/* Images Section */}
      <div className="flex overflow-hidden gap-12 ml-16 mr-16">
        <div className="w-1/2">
          <img
            src={salon.image || "https://placehold.co/800x400"}
            alt={salon.name}
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <img
            src={salon.image}
            alt="Salon Mirror"
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Salon Info */}
      <div className="mt-8 ml-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <h2 className="text-2xl font-semibold text-zinc-800">
              {salon.name}
            </h2>
            <span className="text-xl font-semibold text-zinc-800">
              {salon.rating} ⭐
            </span>
          </div>
          <button
            className={`flex items-center justify-center w-10 h-10 active:bg-red-200 transition mr-8 ${
              isFavourite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            onClick={handleHeartClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 
                C13.09 3.81 14.76 3 16.5 3 
                19.58 3 22 5.42 22 8.5c0 
                3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-stone-500">{salon.categories}</p>
        <address className="mt-1 text-stone-500 not-italic">
          {salon.location}
        </address>
      </div>

      {/* Tabs */}
      <nav className="flex gap-8 mt-6 ml-8 border-b border-gray-200">
        {["pricing", "about", "reviews"].map((tab) => (
          <button
            key={tab}
            className={`pb-4 font-medium cursor-pointer capitalize ${
              activeTab === tab
                ? "border-b-2 border-zinc-800 text-zinc-800"
                : "text-stone-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </section>
  );
};

export default SalonProfileHeader;
