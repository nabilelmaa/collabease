import React from "react";
import { useLocation } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"; // Import Lucide icons

const Footer = () => {
  const location = useLocation();

  // Conditions to hide footer on specific pages
  const isLoginPage = location.pathname === "/auth/login";
  const isRegisterPage = location.pathname === "/auth/register";

  if (isLoginPage || isRegisterPage) {
    return null; // Don't render footer on login and register pages
  }

  return (
    <footer className="bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-800 dark:to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Company Name</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your company description goes here. Briefly describe what you do and your mission.
          </p>
        </div>
        
        {/* Column 2: Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/" className="text-gray-600 dark:text-gray-400 hover:underline">Home</a>
            </li>
            <li>
              <a href="/about" className="text-gray-600 dark:text-gray-400 hover:underline">About Us</a>
            </li>
            <li>
              <a href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">Services</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:underline">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:underline">Privacy Policy</a>
            </li>
          </ul>
        </div>
        
        {/* Column 3: Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="text-gray-600 dark:text-gray-400 hover:text-blue-600" size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="text-gray-600 dark:text-gray-400 hover:text-blue-400" size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="text-gray-600 dark:text-gray-400 hover:text-blue-700" size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="text-gray-600 dark:text-gray-400 hover:text-pink-500" size={24} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
