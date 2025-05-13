import React from "react";
import UserTable from "../components/UserTable";
import HomeCategories from "../components/HomeCategories";
import HomeCards from "../components/HomeCards";
import BestRatedSalons from "../components/BestRatedSalons";

const Home = () => {
  return (
    <div>
      <HomeCategories />
      <HomeCards />
      <BestRatedSalons />
    </div>
  );
};

export default Home;
