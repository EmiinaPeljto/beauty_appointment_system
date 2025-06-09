import React from "react";
import SalonLikeCard from "./SalonLikedCard";

// Example mock data. Replace with real liked salons from your backend.
const likedSalons = [
  {
    id: 1,
    name: "Beauty Bliss",
    rating: 4.8,
    address: "123 Main St, Cityville",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Glow Studio",
    rating: 4.6,
    address: "456 Elm St, Townsville",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Glow Studio",
    rating: 4.6,
    address: "456 Elm St, Townsville",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Glow Studio",
    rating: 4.6,
    address: "456 Elm St, Townsville",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

const Likes = ({ salons = likedSalons }) => (
  <div className="max-w-4xl mx-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {salons.length === 0 ? (
      <div className="text-gray-500 text-center col-span-full">
        No liked salons yet.
      </div>
    ) : (
      salons.map((salon) => <SalonLikeCard key={salon.id} {...salon} />)
    )}
  </div>
);

export default Likes;
