import React from "react";
import { assets } from "../assets/assets";

export const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div className="text-center  sm:text-left">
          <h1 className="text-xl font-semibold mb-4 relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:bg-warm after:mt-1 after:mx-auto sm:after:mx-0">
            About
          </h1>
          <p className="text-warm text-sm leading-relaxed">
            PocketPulse reveals your spending patterns and financial story,
            helping you manage health, rent, and more with confidence. Simplify
            your money management today.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-xl  font-semibold mb-4 relative inline-block after:content-[''] after:block after:w-25 after:h-1 after:bg-warm after:mt-1 after:mx-auto sm:after:mx-0">
            Contact Info
          </h1>
          <ul className="space-y-1 text-warm text-sm">
            <li>Address: k2/banani jowar shara</li>
            <li>Email: pocketpulse0@gmail.com</li>
            <li>Phone: +8801986605293</li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-xl font-semibold mb-4 relative inline-block after:content-[''] after:block after:w-25 after:h-1 after:bg-warm after:mt-1 after:mx-auto sm:after:mx-0">
            Subscribe
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="px-3 py-2 rounded-lg text-sm text-gray-800 focus:outline-none w-48 sm:w-56"
            />
            <button className="bg-cream hover:bg-warm/90 px-4 py-2 rounded-lg text-sm font-medium text-primary transition-colors">
              Send
            </button>
          </div>
          <div className="flex justify-center sm:justify-start gap-4">
            <img
              className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform"
              src={assets.facebook}
              alt="Facebook"
            />
            <img
              className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform"
              src={assets.insta}
              alt="Instagram"
            />
            <img
              className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform"
              src={assets.telegram}
              alt="Telegram"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-cream pt-4 text-center text-white text-xs">
        &copy; 2025 PocketPulse. All rights reserved.
      </div>
    </footer>
  );
};
