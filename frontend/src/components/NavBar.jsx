import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi"; // Importing an icon for the LogIn button

const Navbar = () => {
  return (
    <nav className="flex bg-white justify-between items-center shadow p-4 bg-gray-800 text-black">
      {/* Logo and App Name on the Left */}
      <div className="flex items-center">
        <img alt="Logo" src="../vite.svg" className="h-8 w-auto" />
        <span className="ml-2 text-2xl font-bold ">GlamifyMe</span>
      </div>

      {/* Links in the Middle */}
      <div className="flex flex-1 justify-center gap-8 mr-25">
        <Link to="/" className="text-base hover:text-[#FF66B2]">
          Home
        </Link>
        <Link
          to="/"
          className="text-base text-base hover:text-[#FF66B2]"
        >
          Services
        </Link>
        <Link
          to="/"
          className="text-base text-base hover:text-[#FF66B2]"
        >
          Help
        </Link>
      </div>

      {/* LogIn Button on the Right */}
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="flex items-center text-base  text-base hover:text-[#FF66B2]"
        >
          LogIn <FiLogIn className="ml-1" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;