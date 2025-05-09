import React from "react";
import ServicesHeader from "../components/ServicesHeader";
import SalonCard from "../components/SalonCard";
import useFetchSalonsByCategory from "../hooks/useFetchSalonsByCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Services = () => {
  const categoryIds = [1, 2, 3, 4];
  const categoryNames = ["Hair Salons", "Facial Treatment", "Body Treatment", "Nails"];

  return (
    <div>
      <ServicesHeader />
      {categoryIds.map((categoryId, index) => {
        const { salons, loading, error } = useFetchSalonsByCategory(categoryId);

        return (
          <div key={categoryId} className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{categoryNames[index]}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
              >
                {salons.map((salon) => (
                  <SwiperSlide key={salon.id}>
                    <SalonCard
                      name={salon.name}
                      rating="4.9"
                      address={salon.location}
                      image={salon.image}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Services;