import React, { useState, useEffect } from "react";
import SalonCard from "../components/SalonCard";
import useFetchBestRatedSalons from "../hooks/useFetchSalonsByRate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const BestRatedSalons = ({ initialSalons = null, skipFetching = false }) => {
  const [salons, setSalons] = useState(initialSalons || []);
  
  const { salons: fetchedSalons, loading, error } = !skipFetching 
    ? useFetchBestRatedSalons() 
    : { salons: [], loading: false, error: null };
  
  useEffect(() => {
    if (!skipFetching && fetchedSalons) {
      setSalons(fetchedSalons);
    }
  }, [fetchedSalons, skipFetching]);

  if (!skipFetching && loading) {
    return (
      <div className="relative px-10 md:px-16 mt-12 mb-12 flex justify-center">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-[#FF66B2] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!skipFetching && error) {
    return (
      <div className="relative px-10 md:px-16 mt-12 mb-12">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative px-10 md:px-16 mt-12 mb-12">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center h-[40px] w-[190px] bg-[#FF66B2] rounded-lg">
          <h2 className="text-s text-white">CURRENTLY POPULAR</h2>
        </div>

        <h2 className="text-2xl text-center font-bold mt-4 mb-6">
          Best Rated Salons
        </h2>
      </div>

      {salons.length > 0 ? (
        <div className="swiper-container-wrapper">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="!overflow-visible"
          >
            {salons.map((salon) => (
              <SwiperSlide key={salon.id}>
                <div className="px-2">
                  <SalonCard
                    id={salon.id}
                    name={salon.name}
                    rating={salon.rating}
                    address={salon.location}
                    image={salon.image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No salons found.</p>
      )}
    </div>
  );
};

export default BestRatedSalons;