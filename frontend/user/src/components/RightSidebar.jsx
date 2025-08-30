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
      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
        <img
          className="w-24 h-24 object-cover rounded-full border-4 border-gray-100 shadow-sm"
          src={user?.image}
          alt="Profile"
        />
        <h2 className="text-xl font-semibold mt-4">@{user?.username}</h2>
        <p className="text-gray-500 text-sm">Personal Bookkeeper</p>
      </div>

      {/* Add to Dashboard Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add To Dashboard
        </h2>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Select Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
          >
            <option value="">Choose a category</option>
            <option value="income">Income</option>
            <option value="health&food">Health</option>
            <option value="rent">Rent</option>
            <option value="utility">Utility</option>
            <option value="expense">Expense</option>
            <option value="recivable">Recivable</option>
            <option value="payable">Payable</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Summary
          </label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Where you spend"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-base font-semibold hover:bg-blue-600 active:scale-95 transition-transform"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
