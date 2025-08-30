import React from "react";
import { assets } from "../assets/assets";

export const Contact = () => {
  const services = [
    {
      title: "Expense Tracking",
      desc: "Monitor food, utilities, rent, and health costs with ease.",
      icon: "💰",
    },
    {
      title: "Budgeting Tools",
      desc: "Manage your income and savings with smart budgeting features.",
      icon: "📊",
    },
    {
      title: "Receivables & Payables",
      desc: "Track what you owe and what’s owed to you effortlessly.",
      icon: "📜",
    },
  ];

  return (
    <section
      id="contact"
      className="px-6 sm:px-12 lg:px-20 py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Our Core Services
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Tools and features designed to give you total control over your
            finances.
          </p>
        </header>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{service.icon}</div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>

              {/* Decorative Underline */}
              <div className="mt-4 w-10 h-1 bg-primary rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-800 text-2xl text-center p-8 rounded-2xl mt-8 text-white">
          <div>
            <h3>Ready to experience of PocketPulse?</h3>
          </div>
          <button className="mt-6 coursor-pointer hover:scale-110 transition-transform hover:bg-cream hover:text-black bg-secondary shadow px-8 py-1 rounded-2xl ">
            Get Start
          </button>
        </div>
      </div>
    </section>
  );
};
