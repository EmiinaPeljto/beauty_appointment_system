import React from "react";
import SalonCard from "../components/SalonCard";
import useFetchBestRatedSalons from "../hooks/useFetchSalonsByRate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const BestRatedSalons = () => {
  const { salons, loading, error } = useFetchBestRatedSalons();

  return (
    <div className="relative px-10 md:px-16 mt-12 mb-12">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center h-[40px] w-[190px] bg-[#FF66B2] rounded-lg">
          <h2 className="text-s text-white  ">CURRENTLLY POPULAR</h2>
        </div>

        <h2 className="text-2xl text-center font-bold mt-4 mb-6">
          Best Rated Salons
        </h2>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && salons.length > 0 && (
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
      )}

      {!loading && !error && salons.length === 0 && (
        <p className="text-gray-500 text-center">No salons found.</p>
      )}
    </div>
  );
};

export default BestRatedSalons;
