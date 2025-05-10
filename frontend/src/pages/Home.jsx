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
      <h1>All Users</h1>
      <UserTable />
    </div>
  );
};

export default Home;
