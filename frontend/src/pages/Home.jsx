import React from "react";
import UserTable from "../components/UserTable";
import HomeCategories from "../components/HomeCategories";
import HomeCards from "../components/HomeCards";
import BestRatedSalons from "../components/BestRatedSalons";
import useFetchCategory from "../hooks/useFetchCategory";
import useFetchBestRatedSalons from "../hooks/useFetchSalonsByRate";

const Home = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategory();
  const { salons, loading: salonsLoading, error: salonsError } = useFetchBestRatedSalons();
  
  const isLoading = categoriesLoading || salonsLoading;
  const hasError = categoriesError || salonsError;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <HomeCategories />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-[#FF66B2] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <HomeCategories />
        <div className="flex-grow flex items-center justify-center text-red-500">
          {categoriesError || salonsError}
        </div>
      </div>
    );
  }

  // Pass the already fetched data to prevent components from fetching again
  return (
    <div className="bg-gray-50">
      <HomeCategories />
      <HomeCards initialCategories={categories} skipFetching={true} />
      <BestRatedSalons initialSalons={salons} skipFetching={true} />
    </div>
  );
};

export default Home;