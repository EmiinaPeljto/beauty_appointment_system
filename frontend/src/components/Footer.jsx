import React from "react";
import Logo from "../assets/images/logo.png"; // Adjust the path as necessary
import { Link } from "react-router-dom";

const Footer = () => {
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

      {/* Right - App Store Buttons */}
      <div className="flex flex-col items-center md:items-end">
        <h3 className="font-semibold mb-2">Quick Links</h3>
        <Link to="/" className="text-base hover:text-[#FF66B2]">
          Home
        </Link>
        <Link to="/help" className="text-base hover:text-[#FF66B2]">
          Services
        </Link>
        <Link to="#" className="text-base hover:text-[#FF66B2]">
          Help
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
