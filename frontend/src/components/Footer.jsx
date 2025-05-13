import React from "react";
import Logo from "../assets/images/logo.png"; // Adjust the path as necessary

const Footer = () => {
  const handleNavigation = (path) => {
    window.location.href = path; // Reload the page and navigate to the specified path
  };

  return (
    <footer className="bg-white border-t border-gray-300 py-6 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - Contact Info */}
        <div className="text-center md:text-left">
          <h2 className="font-semibold mb-2">Contact Us</h2>
          <div className="flex items-center justify-center md:justify-start mb-1">
            <span className="mr-2">📞</span>
            <span>+38762378704</span>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <span className="mr-2">📧</span>
            <span>info@glamifyme.ba</span>
          </div>
        </div>

        {/* Center - Logo */}
        <div className="flex justify-center">
          <img alt="Logo" src={Logo} className="h-16 w-auto" />
        </div>

        {/* Right - Quick Links */}
        <div className="text-center md:text-right ml-25">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <button
            onClick={() => handleNavigation("/")}
            className="text-base hover:text-[#FF66B2] block"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/services")}
            className="text-base hover:text-[#FF66B2] block"
          >
            Services
          </button>
          <button
            onClick={() => handleNavigation("/help")}
            className="text-base hover:text-[#FF66B2] block"
          >
            Help
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        © 2025 GlamifyMe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;