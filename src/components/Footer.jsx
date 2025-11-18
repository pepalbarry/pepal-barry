import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand & Anthem */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            NutriGren
          </h2>
          <p className="text-lg italic text-gray-600">
            Har Bite Mein Hai Maa Ka Pyaar
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#products"
                className="hover:text-gray-900 transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-gray-900 transition-colors"
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-600">
            <a href="#" className="hover:text-gray-800 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} NutriGren. All rights reserved.
      </div>
    </footer>
  );
}
