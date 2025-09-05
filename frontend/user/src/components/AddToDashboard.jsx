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
  const [formData, setFormData] = useState({
    summary: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please Login First");

    const dataToSend = { ...formData, userId: user._id };
    const res = await addToDashboard(dataToSend);

    if (res.success) {
      alert(res.message);
      setFormData({ summary: "", category: "", amount: "", date: "" });
    } else {
      alert("Error: " + res.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[100vh] flex flex-col items-center pt-10 pb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add Transaction
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Quickly add income or expenses
        </p>

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <FaDollarSign />
          </span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <FaAlignLeft />
          </span>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Summary"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <FaListAlt />
          </span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="income">Income</option>
            <option value="health&food">Health & Food</option>
            <option value="rent">Rent</option>
            <option value="utility">Utility</option>
            <option value="expense">Expense</option>
            <option value="recivable">Receivable</option>
            <option value="payable">Payable</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <FaCalendarAlt />
          </span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-shadow shadow"
        >
          + Add to Dashboard
        </button>
      </form>
    </div>
  );
}
