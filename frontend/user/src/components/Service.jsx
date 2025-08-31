import React from "react";
import { assets } from "../assets/assets";
export const Service = () => {
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

  return (
    <section
      id="service"
      className="mt-10 bg-white px-6 sm:px-10 lg:px-20 py-16"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          PocketPulse Services
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Discover the powerful features that make financial management simple
          and effective.
        </p>
      </div>
      <div className="px-0 sm:px-4 relative">
        <div className="bg-gradient-to-r from-primary to-indigo-600 text-white text-center px-6 py-10 rounded-xl shadow-lg">
          <p className="text-xl sm:text-2xl font-semibold mb-1">
            Awesome Feature To Track Your Money
          </p>
          <p className="text-sm sm:text-base opacity-90">
            View exactly where your money is headed
          </p>
        </div>

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
    </section>
  );
};
