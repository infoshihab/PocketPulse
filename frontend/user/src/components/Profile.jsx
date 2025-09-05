import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Profile() {
  const { user, categoryTotals } = useContext(AppContext);

  const totalsByKey = useMemo(() => {
    const map = {};
    (categoryTotals || []).forEach((row) => {
      if (row?.category) {
        map[row.category.toLowerCase()] = row.totalAmount || 0;
      }
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

  const COLORS = [
    "#4F46E5",
    "#7C3AED",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-screen-xl space-y-8">
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <img
            src={user?.image || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover -mt-16 bg-gray-100"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-indigo-100 text-sm">@{user?.username}</p>
          <p className="mt-1 text-indigo-200 text-xs">Personal Bookkeeper</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { label: "Total Income", value: totalsByKey["income"] },
            { label: "Payable", value: totalsByKey["payable"] },
            { label: "Receivable", value: totalsByKey["recivable"] },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="text-gray-500 mb-2 text-sm font-medium">
                {item.label}
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatTk(item.value)}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Spending Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
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
