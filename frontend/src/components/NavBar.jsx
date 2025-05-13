import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FiLogIn,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    // First redirect to home page, then perform logout
    navigate("/");
    setIsLogoutModalOpen(false);
    // Use a slight delay to ensure navigation happens before logout state changes
    setTimeout(() => {
      logout();
    }, 100);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-white shadow p-4 border-b border-gray-300">
        {/* Logo and App Name on the Left */}
        <div className="flex items-center">
          <img alt="Logo" src={Logo} className="h-12 w-auto" />
          <div className="ml-2">
            <span className="text-xl md:text-2xl font-sans italic">
              GlamifyMe
            </span>
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
          <Link
            to="/services"
            className="text-sm md:text-base hover:text-[#FF66B2]"
          >
            Services
          </Link>
          <Link
            to="/help"
            className="text-sm md:text-base hover:text-[#FF66B2]"
          >
            Help
          </Link>
        </div>

        {/* LogIn Button or Profile Link on the Right (Desktop) */}
        <div className="hidden md:flex items-center ml-35 relative">
          {isAuthenticated ? (
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center text-sm md:text-base hover:text-[#FF66B2] focus:outline-none"
              >
                <FiUser className="mr-1" />
                <FiChevronDown
                  className={`ml-1 transition-transform ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <FiSettings className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center text-sm md:text-base hover:text-[#FF66B2]"
            >
              LogIn <FiLogIn className="ml-1" />
            </Link>
          )}
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
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-sm hover:text-[#FF66B2] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiSettings className="mr-1" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-sm hover:text-[#FF66B2] flex items-center"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm hover:text-[#FF66B2] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiLogIn className="mr-1" /> LogIn
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white bg-opacity-80 rounded-lg shadow-sm backdrop-filter backdrop-blur-md">
              {/* Close button */}
              <button 
                type="button" 
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={cancelLogout}
              >
                <FiX className="w-4 h-4" />
                <span className="sr-only">Close modal</span>
              </button>
              
              <div className="p-4 md:p-5 text-center">
                <FiAlertCircle className="mx-auto mb-4 text-gray-400 w-12 h-12" />
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to log out?
                </h3>
                
                <button
                  onClick={confirmLogout}
                  className="text-white bg-[#FF66B2] hover:bg-[#F178B6] focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, log me out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
