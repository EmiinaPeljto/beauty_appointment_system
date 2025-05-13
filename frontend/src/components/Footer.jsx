import React from "react";
import Logo from "../assets/images/logo.png"; // Adjust the path as necessary

const Footer = () => {
  const handleNavigation = (path) => {
    window.location.href = path; // Reload the page and navigate to the specified path
  };

  return (
    <footer className="bg-white border-t border-gray-300 py-6 px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-800">
      {/* Left - Contact Info */}
      <div className="mb-4 md:mb-0">
        <h2 className="font-semibold mb-2">Contact Us</h2>
        <div className="flex items-center mb-1">
          <span className="mr-2">📞</span>
          <span>+38762378704</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">📧</span>
          <span>info@glamifyme.ba</span>
        </div>
      </div>

      <div className="flex items-center">
        <img alt="Logo" src={Logo} className="h-20 w-auto" />
      </div>

      {/* Right - Quick Links */}
      <div className="flex flex-col items-center md:items-end">
        <h3 className="font-semibold mb-2">Quick Links</h3>
        <button
          onClick={() => handleNavigation("/")}
          className="text-base hover:text-[#FF66B2]"
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation("/services")}
          className="text-base hover:text-[#FF66B2]"
        >
          Services
        </button>
        <button
          onClick={() => handleNavigation("/help")}
          className="text-base hover:text-[#FF66B2]"
        >
          Help
        </button>
      </div>
    </footer>
  );
};

export default Footer;