import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import mapApiKey from "../utils/mapAPI"; // Import the API key

const SalonMap = ({ location }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${mapApiKey}`
        );
        const { lat, lng } = response.data.results[0].geometry;
        setPosition([lat, lng]);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.error("Invalid API key. Please check your OpenCage API key.");
        } else {
          console.error("Geocoding failed:", err);
        }
      }
    };

    fetchCoordinates();
  }, [location]);

  if (!position) return <p>Loading map...</p>;

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="h-64 w-full rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SalonMap;