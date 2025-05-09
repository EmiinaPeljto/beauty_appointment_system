import React from "react";
import UserTable from "../components/UserTable";
import HomeCategories from "../components/HomeCategories";


const Home = () => {
  
  return (
    <div>
      <HomeCategories />
      <h1>All Users</h1>
      <UserTable />
    </div>
  );
};

export default Home;