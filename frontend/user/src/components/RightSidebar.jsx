import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

export default function RightSidebar() {
  const { user, addToDashboard } = useContext(AppContext);
  const [formData, setFromData] = useState({
    summary: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please Login First");
    const dataToSend = { ...formData, userId: user._id };
    const res = await addToDashboard(dataToSend);

    if (res.success) {
      alert(res.message);
      setFromData({ summary: "", category: "", amount: "", date: "" });
    } else {
      alert("Error : " + res.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-20 w-full"></div>
        <div className="flex flex-col items-center -mt-12 pb-6 text-center">
          <img
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md hover:scale-105 transition-transform duration-300"
            src={user?.image}
            alt="Profile"
          />
          <h2 className="text-lg font-semibold mt-3">@{user?.username}</h2>
          <p className="text-gray-500 text-sm">Personal Bookkeeper</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Add To Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700"
            >
              <option value="">Choose a category</option>
              <option value="income">Income</option>
              <option value="health&food">Health&Food</option>
              <option value="rent">Rent</option>
              <option value="utility">Utility</option>
              <option value="expense">Expense</option>
              <option value="recivable">Recivable</option>
              <option value="payable">Payable</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Summary
            </label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Where you spend"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg text-base font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all"
        >
          Add Entry
        </button>
      </form>
    </div>
  );
}
