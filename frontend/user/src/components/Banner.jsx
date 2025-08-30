import React from "react";
import { assets } from "../assets/assets.js";

export const Banner = () => {
  return (
    <section
      id="banner"
      className="
        bg-gradient-to-r from-indigo-500 to-purple-500
        relative 
        flex flex-col items-center justify-center text-center
        px-6 sm:px-12 lg:px-20
        py-28
        
        min-h-[70vh]
        overflow-hidden
      "
    >
      {/* Headline */}
      <h1
        className="
          text-white font-extrabold leading-tight
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
          max-w-4xl
          opacity-0 animate-fade-in-up
        "
        style={{ animationDelay: "0.2s" }}
      >
        Empowering You to <span className="text-cream">Save</span> & Spend
        Wisely
      </h1>

      {/* Subtext */}
      <p
        className="
          mt-6 
          text-gray-300 max-w-3xl 
          text-base sm:text-lg md:text-xl 
          tracking-wide
          leading-relaxed
          opacity-0 animate-fade-in-up
        "
        style={{ animationDelay: "0.5s" }}
      >
        Perfect for anyone seeking to master their finances with simple,
        powerful, and intuitive tracking.
      </p>

      {/* Banner Image */}
      <div
        className="
          mt-14 w-full max-w-[1100px] rounded-3xl shadow-2xl overflow-hidden
          opacity-0 animate-scale-in
        "
        style={{ animationDelay: "0.8s" }}
      >
        <img
          src={assets.banner}
          alt="Financial Tracker Banner"
          className="w-full h-auto object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};
