import React, { useContext, useState } from "react";
import {
  FaDollarSign,
  FaAlignLeft,
  FaListAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";

export default function AddToDashboard() {
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
      alert("Error: " + res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 sm:p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add to Dashboard
        </h2>

        {/* Amount */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaDollarSign />
            </span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter the amount"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Summary
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaAlignLeft />
            </span>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Enter the summary"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaListAlt />
            </span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        {/* Date */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Date
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaCalendarAlt />
            </span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Add to Dashboard
        </button>
      </form>
    </div>
  );
}
