import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white shadow p-4">
      {/* Logo and App Name on the Left */}
      <div className="flex items-center">
        <img alt="Logo" src={Logo} className="h-12 w-auto" />
        <div className="ml-2">
          <span className="text-xl md:text-2xl font-sans italic">GlamifyMe</span>
          <span className="block text-xs md:text-sm font-sans text-gray-500">
            Beauty Appointment System
          </span>
        </div>
      </div>

      {/* Links in the Center (Desktop) */}
      <div className="hidden md:flex flex-1 justify-center gap-8">
        <Link to="/" className="text-sm md:text-base hover:text-[#FF66B2]">
          Home
        </Link>
        <Link to="/services" className="text-sm md:text-base hover:text-[#FF66B2]">
          Services
        </Link>
        <Link to="/help" className="text-sm md:text-base hover:text-[#FF66B2]">
          Help
        </Link>
      </div>

      {/* LogIn Button on the Right (Desktop) */}
      <div className="hidden md:flex items-center ml-10">
        <Link
          to="/login"
          className="flex items-center text-sm md:text-base hover:text-[#FF66B2]"
        >
          LogIn <FiLogIn className="ml-1" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-500 hover:text-[#FF66B2] focus:outline-none"
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 z-50">
          <Link
            to="/"
            className="text-sm hover:text-[#FF66B2]"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-sm hover:text-[#FF66B2]"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/help"
            className="text-sm hover:text-[#FF66B2]"
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </Link>
          <Link
            to="/login"
            className="text-sm hover:text-[#FF66B2]"
            onClick={() => setIsMenuOpen(false)}
          >
            LogIn
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;