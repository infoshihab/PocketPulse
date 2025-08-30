import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Profile() {
  const { user, categoryTotals } = useContext(AppContext);

  const totalsByKey = useMemo(() => {
    const map = {};
    (categoryTotals || []).forEach((row) => {
      if (row?.category) map[row.category.toLowerCase()] = row.totalAmount || 0;
    });
    return map;
  }, [categoryTotals]);

  const formatTk = (n = 0) =>
    `Tk.${Number(n || 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  const chartData = [
    { name: "Health & Food", value: totalsByKey["health&food"] || 0 },
    { name: "Rent", value: totalsByKey["rent"] || 0 },
    { name: "Utility", value: totalsByKey["utility"] || 0 },
    { name: "Receivable", value: totalsByKey["recivable"] || 0 },
    { name: "Payable", value: totalsByKey["payable"] || 0 },
    { name: "Other", value: totalsByKey["other"] || 0 },
  ];

  // const totalExpense = useMemo(
  //   () => chartData.reduce((sum, item) => sum + item.value, 0),
  //   [chartData]
  // );

  const COLORS = [
    "#4F46E5",
    "#7300ffff",
    "#60A5FA",
    "#34D399",
    "#FBBF24",
    "#F87171",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-screen-xl">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <img
            src={
              user?.image ||
              "https://res.cloudinary.com/your_cloud_name/image/upload/v123456/defaults/user.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover -mt-16"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-indigo-100">@{user?.username}</p>
          {/* <p className="mt-2 text-lg font-semibold text-yellow-200">
            Lifetime Spend: {formatTk(totalExpense)}
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {[
            { label: "Total Income", value: totalsByKey["income"] },
            { label: "Payable", value: totalsByKey["payable"] },
            { label: "Receivable", value: totalsByKey["recivable"] },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="text-gray-500 mb-2">{item.label}</h3>
              <p className="text-xl font-bold text-gray-800">
                {formatTk(item.value)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Spending Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => formatTk(val)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
