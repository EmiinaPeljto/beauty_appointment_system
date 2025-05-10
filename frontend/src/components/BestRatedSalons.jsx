import React from "react";
import SalonCard from "../components/SalonCard";
import useFetchBestRatedSalons from "../hooks/useFetchSalonsByRate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const BestRatedSalons = () => {
  const { salons, loading, error } = useFetchBestRatedSalons();

  // Debugging: Log the fetched salons
  console.log("Best Rated Salons:", salons);

  return (
    <div>
      <div className="mt-8 pl-20">
        <h2 className="text-2xl font-bold mb-4">Best Rated Salons</h2>

        {/* Loading State */}
        {loading && <p>Loading...</p>}

        {/* Error State */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Salons */}
        {!loading && !error && salons.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
          >
            {salons.map((salon) => (
              <SwiperSlide key={salon.id}>
                <SalonCard
                  name={salon.name}
                  rating={salon.rating}
                  address={salon.location}
                  image={salon.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* No Salons Found */}
        {!loading && !error && salons.length === 0 && (
          <p className="text-gray-500">No salons found.</p>
        )}
      </div>
    </div>
  );
};

export default BestRatedSalons;
