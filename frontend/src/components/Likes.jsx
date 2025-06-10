import React, { useState, useEffect } from "react";
import SalonLikeCard from "./SalonLikedCard";
import useLikedSalons from "../hooks/useLikedSalons";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";

const Likes = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const { salons: initialSalons, loading, error } = useLikedSalons(userId);

  const [salons, setSalons] = useState([]);

  useEffect(() => {
    setSalons(initialSalons);
  }, [initialSalons]);

  const handleUnlike = async (salonId) => {
    try {
      await api.delete(`/gen/favourites/deleteFavouriteById/${userId}/${salonId}`);
      setSalons((prev) => prev.filter((salon) => salon.id !== salonId));
    } catch (err) {
      alert("Failed to remove from favourites.");
    }
  };

  if (!userId) return <div>Loading user...</div>;
  if (loading) return <div>Loading...</div>;
  if (error)
    return <div className="text-red-500">Failed to load liked salons.</div>;

  return (
    <div className="max-w-4xl mx-auto py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {salons.length === 0 ? (
        <div className="text-gray-500 text-center col-span-full">
          No liked salons yet.
        </div>
      ) : (
        salons.map((salon) => (
          <SalonLikeCard key={salon.id} {...salon} onUnlike={handleUnlike} />
        ))
      )}
    </div>
  );
};

export default Likes;