import React from "react";
import { assets } from "../assets/assets";

export const About = () => {
  const reviews = [
    {
      title: "AsadKalam",
      img: assets.rp1,
      desc: "PocketPulse has completely changed the way I see my spending. The insights are crystal clear and easy to follow.",
      review: "★★★★★",
    },
    {
      title: "Shihab",
      img: assets.rp2,
      desc: "I can now track my rent, groceries, and health expenses without a single headache. Highly recommended!",
      review: "★★★★★",
    },
    {
      title: "KalamHasan",
      img: assets.rp3,
      desc: "The app feels intuitive and lightweight. It's like having a personal financial assistant in my pocket.",
      review: "★★★★★",
    },
    {
      title: "Rafiul",
      img: assets.rp4,
      desc: "Finally an app that makes budgeting feel less stressful and more empowering. I love the clean design.",
      review: "★★★★★",
    },
    {
      title: "Samir",
      img: assets.rp5,
      desc: "I used to avoid tracking my expenses, but PocketPulse made it fun and simple. Now I actually enjoy checking it.",
      review: "★★★★★",
    },
    {
      title: "Naeem",
      img: assets.rp6,
      desc: "The detailed breakdown of my spending habits has helped me save more every month without much effort.",
      review: "★★★★★",
    },
  ];

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
        {/* Header */}
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

        {/* Image + Features */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center mb-20">
          {/* Image Grid */}
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

          {/* Features */}
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

        {/* Services Intro */}
        <section className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            PocketPulse Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Discover the powerful features that make financial management simple
            and effective.
          </p>
        </section>

        {/* Highlight Banner */}
        <div className="px-0 sm:px-4 relative">
          <div className="bg-gradient-to-r from-primary to-indigo-600 text-white text-center px-6 py-10 rounded-xl shadow-lg">
            <p className="text-xl sm:text-2xl font-semibold mb-1">
              Awesome Feature To Track Your Money
            </p>
            <p className="text-sm sm:text-base opacity-90">
              View exactly where your money is headed
            </p>
          </div>

          {/* Review Section (kept original) */}
          <div className="mt-[-40px] relative z-10 px-2 sm:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.map((item, index) => (
                <article
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <img
                    className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-primary/20"
                    src={item.img}
                    alt={item.title}
                  />
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    @{item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <p className="text-yellow-400 text-lg font-bold tracking-wide">
                    {item.review}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
