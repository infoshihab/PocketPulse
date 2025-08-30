import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="bg-yellow-300 px-5 py-2 rounded-full font-bold text-lg shadow-sm cursor-pointer hover:scale-105 transition-transform">
          PocketPulse
        </div>

        {/* Desktop Menu */}
        <ul className="hidden rounded-full px-5 py-2 md:flex items-center bg-white shadow border border-gray-100">
          {menuItems.map((item, idx) => (
            <li key={idx} className="mx-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1 text-sm font-medium tracking-wide transition-colors border-b-2 ${
                    isActive
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-gray-700 hover:border-indigo-400 hover:text-indigo-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/login"
            className="px-5 py-2 rounded-full bg-white text-sm font-medium text-gray-800 shadow hover:bg-gray-50 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="px-5 py-2 rounded-full bg-cream text-sm font-medium text-indigo-900 shadow hover:bg-indigo-300 transition"
          >
            Sign Up
          </NavLink>
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
        <div className="md:hidden bg-indigo-700 p-4 space-y-3 animate-slideDown">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-full px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-200 hover:bg-indigo-300 text-indigo-900"
                    : "bg-white hover:bg-indigo-100 text-gray-800"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          <div className="flex gap-2 pt-3">
            <NavLink
              to="/login"
              className="flex-1 text-center bg-white rounded-full px-4 py-3 text-sm font-medium text-gray-800 shadow hover:bg-gray-50 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="flex-1 text-center bg-indigo-200 rounded-full px-4 py-3 text-sm font-medium text-indigo-900 shadow hover:bg-indigo-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
