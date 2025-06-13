import React, { useRef, useState, useEffect } from "react";
import ServicesHeader from "../components/ServicesHeader";
import SalonCard from "../components/SalonCard";
import useFetchSalonsByCategory from "../hooks/useFetchSalonsByCategory";
import useScrollToHash from "../hooks/useScrollToHash";
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
  
  const [allSalonsData, setAllSalonsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sectionRefs = useRef([]);
  const hash = window.location.hash.substring(1);

  useScrollToHash(hash, sectionRefs, categoryIds);
  
  useEffect(() => {
    const fetchAllSalons = async () => {
      try {
        setIsLoading(true);
        
        const promises = categoryIds.map(async (categoryId) => {
          const response = await fetch(`http://localhost:3000/api/v1/gen/salons/salonsByCategory/${categoryId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch salons for category ${categoryId}`);
          }
          
          const data = await response.json();
          
          // Fetch average rating for each salon
          const salonsWithRatings = await Promise.all(
            data.map(async (salon) => {
              const ratingResponse = await fetch(`http://localhost:3000/api/v1/gen/reviews/averageRating/${salon.id}`);
              const ratingData = await ratingResponse.json();
              return { ...salon, averageRating: ratingData.data || "N/A" };
            })
          );
          
          return { categoryId, salons: salonsWithRatings };
        });
        
        const results = await Promise.all(promises);
        setAllSalonsData(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllSalons();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <ServicesHeader />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-[#FF66B2] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <ServicesHeader />
        <div className="flex-grow flex items-center justify-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ServicesHeader />
      {categoryIds.map((categoryId, index) => {
        const categoryData = allSalonsData.find(item => item.categoryId === categoryId);
        const salons = categoryData ? categoryData.salons : [];

        return (
          <div
            key={categoryId}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="relative px-10 md:px-16 mt-12 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">{categoryNames[index]}</h2>
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
                {salons.length > 0 ? (
                  salons.map((salon) => (
                    <SwiperSlide key={salon.id}>
                      <SalonCard
                        id={salon.id}
                        name={salon.name}
                        rating={salon.averageRating}
                        address={salon.location}
                        image={salon.image}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="h-[330px] flex items-center justify-center text-slate-500">
                      No salons found in this category
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;