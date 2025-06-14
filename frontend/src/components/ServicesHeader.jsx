import React from "react";
const ServicesHeader = () => {
  return (
    <div className="relative isolate bg-white px-6 pt-14 lg:px-8">
      {/* Top Gradient Blur - positioned relative to this component, not the entire page */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Hero Section */}
      <header className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl ">
            Explore Our Services
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mt-4">
            <span className="text-[#FF66B2] mt-12">
              Beauty, Wellness & Everything in Between{" "}
            </span>
          </h3>
          <p className="mt-5 text-lg text-gray-600">
            Browse our range of beauty services from expert stylists and
            therapists near you. Whether it’s a glow-up or a fresh cut, we’ve
            got you covered.
          </p>
        </div>
      </header>
    </div>
  );
};

export default ServicesHeader;
