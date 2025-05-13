import React, { useEffect, useRef } from "react";
import ServicesHeader from "../components/ServicesHeader";
import SalonCard from "../components/SalonCard";
import useFetchSalonsByCategory from "../hooks/useFetchSalonsByCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Services = () => {
  const categoryIds = ["1", "2", "3", "4"]; // Ensure these IDs match the HomeCards component
  const categoryNames = [
    "Hair Salons",
    "Facial Treatment",
    "Body Treatment",
    "Nails",
  ];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Get the hash from the URL
    console.log("Hash:", hash); // Debugging
    console.log("Category IDs:", categoryIds); // Debugging
    const index = categoryIds.indexOf(hash);
    if (index !== -1 && sectionRefs.current[index]) {
      setTimeout(() => {
        sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      }, 200); // Delay scrolling by 100ms
    }
  }, []);

  return (
    <div>
      <ServicesHeader />
      {categoryIds.map((categoryId, index) => {
        const { salons, loading, error } = useFetchSalonsByCategory(categoryId);

        return (
          <div
            key={categoryId}
            ref={(el) => (sectionRefs.current[index] = el)} // Assign ref to each section
            className="relative px-10 md:px-16 mt-12 mb-12" // Add padding or margin
          >
            <h2 className="text-2xl font-bold mb-4">{categoryNames[index]}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <div className="swiper-container-wrapper relative px-10 md:px-16">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  navigation
                  className="!overflow-visible"
                >
                  {salons.map((salon) => (
                    <SwiperSlide key={salon.id}>
                      <SalonCard
                        name={salon.name}
                        rating={salon.averageRating}
                        address={salon.location}
                        image={salon.image}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Services;
