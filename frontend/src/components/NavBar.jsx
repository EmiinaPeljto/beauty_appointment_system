import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => setIsLogoutModalOpen(true);

  const confirmLogout = () => {
    navigate("/");
    setIsLogoutModalOpen(false);
    setTimeout(() => logout(), 100);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-6 lg:px-8 bg-white border-b shadow-sm" aria-label="Global">
        {/* Left: Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <img className="h-8 w-auto" src={Logo} alt="Logo" />
            <div className="ml-2">
              <span className="text-lg font-semibold text-gray-900 italic">GlamifyMe</span>
              <span className="block text-xs text-gray-500">Beauty Appointment System</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Center nav links (Desktop) */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold text-gray-900">Home</Link>
          <Link to="/services" className="text-sm font-semibold text-gray-900">Services</Link>
          <Link to="/help" className="text-sm font-semibold text-gray-900">Help</Link>
        </div>

        {/* Right: Login/Profile (Desktop) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center text-sm font-semibold text-gray-900 hover:text-[#FF66B2]"
              >
                <FiUser className="mr-1" />
                <FiChevronDown className={`ml-1 transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiSettings className="mr-2" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm font-semibold text-gray-900 hover:text-[#FF66B2]">
              Log in <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 space-y-4 border-b z-50">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-gray-900">Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-gray-900">Services</Link>
          <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-gray-900">Help</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-gray-900">Profile</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-semibold text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-gray-900">
              Log in →
            </Link>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              <FiX className="w-5 h-5" />
            </button>
            <div className="text-center">
              <FiAlertCircle className="mx-auto mb-4 text-gray-400 w-12 h-12" />
              <h3 className="mb-4 text-lg text-gray-700">Are you sure you want to log out?</h3>
              <button
                onClick={confirmLogout}
                className="bg-[#FF66B2] hover:bg-[#f178b6] text-white font-medium rounded-lg px-5 py-2.5"
              >
                Yes, log me out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
