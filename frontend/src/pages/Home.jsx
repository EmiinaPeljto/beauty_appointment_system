import React from "react";
import UserTable from "../components/UserTable";
import HomeCategories from "../components/HomeCategories";
import HomeCards from "../components/HomeCards";

const Home = () => {
  return (
    <div>
      <HomeCategories />
      <HomeCards />
      <h1>All Users</h1>
      <UserTable />
    </div>
  );
};

export default Home;
