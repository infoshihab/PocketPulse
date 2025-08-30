import React from "react";
import {
  FaMoneyBillWave,
  FaUtensils,
  FaHome,
  FaBolt,
  FaHeartbeat,
  FaCar,
  FaGift,
  FaFilm,
} from "react-icons/fa";

export default function Notification() {
  const demoData = [
    {
      summary: "Salary",
      amount: "$5,000",
      date: "2025-08-01",
      category: "Income",
    },
    {
      summary: "Groceries",
      amount: "$150",
      date: "2025-08-03",
      category: "Food",
    },
    {
      summary: "Rent",
      amount: "$1,200",
      date: "2025-08-05",
      category: "Housing",
    },
    {
      summary: "Electricity Bill",
      amount: "$90",
      date: "2025-08-07",
      category: "Utility",
    },
    {
      summary: "Dining Out",
      amount: "$60",
      date: "2025-08-09",
      category: "Food",
    },
    {
      summary: "Internet",
      amount: "$40",
      date: "2025-08-10",
      category: "Utility",
    },
    {
      summary: "Gym Membership",
      amount: "$30",
      date: "2025-08-12",
      category: "Health",
    },
    {
      summary: "Car Maintenance",
      amount: "$300",
      date: "2025-08-13",
      category: "Transport",
    },
    {
      summary: "Bonus",
      amount: "$500",
      date: "2025-08-15",
      category: "Income",
    },
    {
      summary: "Movie Tickets",
      amount: "$25",
      date: "2025-08-17",
      category: "Entertainment",
    },
  ];

  const categoryIcons = {
    Income: <FaMoneyBillWave className="text-green-500" />,
    Food: <FaUtensils className="text-orange-500" />,
    Housing: <FaHome className="text-blue-500" />,
    Utility: <FaBolt className="text-yellow-500" />,
    Health: <FaHeartbeat className="text-red-500" />,
    Transport: <FaCar className="text-gray-500" />,
    Entertainment: <FaFilm className="text-purple-500" />,
    Bonus: <FaGift className="text-pink-500" />,
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-full sm:max-w-[calc(100vw-64px)] md:max-w-[calc(100vw-256px)] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3">
          {demoData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="text-2xl flex-shrink-0">
                {categoryIcons[item.category] || (
                  <FaGift className="text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium truncate">
                  {item.summary}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {item.date} • {item.category}
                </p>
              </div>

              <div className="text-right font-semibold text-gray-700 min-w-[80px]">
                {item.amount}
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">
                  Clear
                </button>
                <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition">
                  Not Clear
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
