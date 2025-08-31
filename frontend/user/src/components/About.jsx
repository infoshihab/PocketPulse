import React from "react";
import { assets } from "../assets/assets";

export const About = () => {
  const features = [
    {
      title: "Track Your Spending",
      desc: "Gain clear insights into your financial habits, from daily expenses like food and utilities to rent and health costs.",
    },
    {
      title: "Streamline Your Finances",
      desc: "Effortlessly monitor income, expenses, and payables to align your money with your goals using intuitive tools.",
    },
    {
      title: "Achieve Financial Clarity",
      desc: "Understand exactly where your money goes with PocketPulse’s simple, powerful tracking features in one app.",
    },
  ];

  return (
    <section id="about" className="mt-10 bg-white px-6 sm:px-10 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Take Control of Your Finances
          </h3>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            PocketPulse makes managing your income, expenses, rent, and
            utilities effortless, giving you the clarity to achieve your
            financial goals.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center mb-20">
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {[assets.about2img, assets.about4, assets.about6].map(
              (src, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={src}
                    alt={`PocketPulse showcase ${idx + 1}`}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )
            )}
          </div>

          <div className="md:w-1/2 space-y-6">
            {features.map((item, idx) => (
              <article
                key={idx}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
