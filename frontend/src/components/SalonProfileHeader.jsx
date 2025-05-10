import React from "react";

const SalonProfileHeader = () => {
  return (
    <section className="mt-8">
      <div className="flex overflow-hidden gap-12 ml-16 mr-16">
        <div className="w-1/2">
          <img
            src="https://placehold.co/800x400/e0e0e0/e0e0e0"
            alt="Salon Interior"
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <img
            src="https://placehold.co/800x400/d0d0d0/d0d0d0"
            alt="Salon Mirror"
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="mt-8 ml-8">
        <div className="flex items-center justify-between">
          {" "}
          {/* Flex container for name and rating */}
          <h2 className="text-2xl font-semibold text-zinc-800">
            Bon Bon Hair Salon
          </h2>
        </div>
        <p className="mt-2 text-stone-500">Hair salon</p>
        <address className="mt-1 text-stone-500 not-italic">
          4 Dehart St, Morristown, NJ 07960, United States
        </address>

        <div className="flex gap-2 items-center mt-1 text-stone-500">
          <p>Last scheduled 2 hours ago</p>
          <span>•</span>
          <p>Today: open until 20:00</p>
          <span>•</span>
          <p>Accepts payment cards</p>
        </div>
      </div>
    </section>
  );
};

export default SalonProfileHeader;
