import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { assets } from "../assets/assets";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "#about" },
    { name: "Service", path: "#service" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-3 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 py-2 rounded-full   cursor-pointer hover:scale-105 transition-transform">
          <img
            src={assets.plogo}
            alt="PocketPulse Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-white  font-bold text-lg tracking-wide">
            PocketPulse
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 bg-white px-5 py-2 rounded-full shadow border border-gray-100">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.path}
                className="px-3 py-1 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:text-indigo-600 hover:border-indigo-400 transition"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="px-5 py-2 rounded-full bg-white text-sm font-medium text-gray-800 shadow hover:bg-gray-50 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-5 py-2 rounded-full bg-indigo-100 text-sm font-medium text-indigo-900 shadow hover:bg-indigo-200 transition"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-4 space-y-3 animate-slideDown">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              className="block rounded-full px-4 py-3 text-sm font-medium transition bg-white hover:bg-indigo-100 text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}

          <div className="flex gap-2 pt-3">
            <a
              href="/login"
              className="flex-1 text-center bg-white rounded-full px-4 py-3 text-sm font-medium text-gray-800 shadow hover:bg-gray-50 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
            <a
              href="/signup"
              className="flex-1 text-center bg-white rounded-full px-4 py-3 text-sm font-medium text-indigo-900 shadow hover:bg-indigo-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
