import React from "react";
const HomeCategories = () => {
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
          Discover Your Perfect Beauty Service
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mt-4">
            <span className="text-[#FF66B2] mt-12">From facials to full glam—browse and book in minutes. </span>
          </h3>
          <p className="mt-5 text-lg text-gray-600">
          Find the right treatment for every occasion. Whether you're getting ready for a special event or just indulging in some self-care, explore our curated categories to book exactly what you need.
          </p>
        </div>
      </header>

      {/* Project Overview Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">

          {/* Card 1: Ad Content Generator */}
          <div className="bg-white rounded-2xl shadow-md max-w-sm p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-100 p-3 rounded-full">
          {/*<Clock className="text-yellow-500 w-8 h-8" />*/}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Time-Saving Automation</h3>
      <p className="text-sm text-gray-600 mt-2">
        No more hours lost browsing multiple sites. <br />
        From budget to bookings,<br />
        <span className="font-medium text-gray-700">TripTidy</span> automates your planning flow—
        just input, tweak, and go.
      </p>
    </div>

          {/* Card 2: Audience Recommendations */}
          <div className="max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <a href="/audience-insights">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
                Smart Audience Recommendations
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-600">
              Discover the best target audiences for your campaigns with
              AI-driven insights. Optimize your reach and engagement by
              connecting with the right people at the right time.
            </p>
            <a
              href="/audience-insights"
              className="inline-flex items-center px-3 py-2 text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Try it now
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>

          {/* Card 3: Feedback Summary */}
          <div className="max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
                AI-Powered Feedback <br /> Summary
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-600">
              Get instant, actionable summaries of customer feedback. Understand
              sentiment, identify trends, and improve your products or services
              with ease.
            </p>
            <a
              href="/feedback-summary"
              className="inline-flex items-center px-3 py-2 text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Try it now
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </div>
  );
};

export default HomeCategories;