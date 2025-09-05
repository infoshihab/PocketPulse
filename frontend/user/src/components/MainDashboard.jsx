import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaLightbulb,
  FaHamburger,
  FaPodcast,
  FaWallet,
  FaPlus,
  FaExchangeAlt,
  FaCartPlus,
  FaTrash,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";

export default function MainDashboard() {
  const navigate = useNavigate();
  const { user, dashboardItems, deleteDashboardItem } = useContext(AppContext);

  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "long" });
  const currentYear = now.getFullYear();

  const thisMonthItems = useMemo(() => {
    return (dashboardItems || []).filter((item) => {
      if (!item.date) return false;
      const d = new Date(item.date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });
  }, [dashboardItems]);

  const cards = useMemo(
    () => [
      {
        key: "income",
        label: "Total Income",
        icon: <FaWallet />,
        color: "#2ed573",
      },
      {
        key: "health&food",
        label: "Health & Food",
        icon: <FaHamburger />,
        color: "#fa8231",
      },
      { key: "rent", label: "Rent", icon: <FaHome />, color: "#14b8a6" },
      {
        key: "utility",
        label: "Utility",
        icon: <FaLightbulb />,
        color: "#273c75",
      },
      {
        key: "expense",
        label: "Expense",
        icon: <FaCartPlus />,
        color: "#74b9ff",
      },
      {
        key: "recivable",
        label: "Receivable",
        icon: <FaPlus />,
        color: "#5f27cd",
      },
      {
        key: "payable",
        label: "Payable",
        icon: <FaExchangeAlt />,
        color: "#fc5c65",
      },
      { key: "other", label: "Others", icon: <FaPodcast />, color: "#a55eea" },
    ],
    []
  );

  const totalsByKey = useMemo(() => {
    const map = {};
    thisMonthItems.forEach((row) => {
      if (row?.category) {
        if (!map[row.category]) map[row.category] = 0;
        map[row.category] += row.amount || 0;
      }
    });
    return map;
  }, [thisMonthItems]);

  const formatShort = (num) => {
    if (!num) return "Tk.0";
    const abs = Math.abs(num);
    if (abs >= 1_000_000) return `Tk.${(num / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `Tk.${(num / 1_000).toFixed(1)}k`;
    return `Tk.${num.toLocaleString()}`;
  };

  if (!user) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Please log in first</h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your dashboard.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteDashboardItem(itemId);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {currentMonth} {currentYear}
        </h2>
        <p className="text-gray-500">Overview of this month</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cards.map((c, i) => (
          <article
            key={i}
            aria-label={c.label}
            className="relative flex flex-col justify-between p-6 h-44 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${c.color}, ${c.color}dd)`,
            }}
          >
            <div>
              <h2 className="text-white text-lg font-medium">{c.label}</h2>
              <p className="text-white text-2xl font-bold mt-1">
                {formatShort(totalsByKey[c.key])}
              </p>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow text-xl">
              {c.icon}
            </div>
          </article>
        ))}
      </div>

      <div>
        <h2 className="font-semibold text-gray-800 text-lg mb-4">
          Recent Dashboard Items
        </h2>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow overflow-hidden">
            <thead>
              <tr className="bg-indigo-600 text-white text-sm">
                {["Summary", "Amount", "Date", "Category", "Actions"].map(
                  (th, i) => (
                    <th
                      key={i}
                      className="py-3 px-4 text-center font-medium tracking-wide"
                    >
                      {th}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="text-sm">
              {thisMonthItems?.length ? (
                [...thisMonthItems]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 8)
                  .map((item, idx) => (
                    <tr
                      key={idx}
                      className={`border-b ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="py-3 px-4">{item.summary}</td>
                      <td
                        className={`py-3 px-4 font-semibold text-center ${
                          item.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {formatShort(item.amount)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No items found this month
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {thisMonthItems?.length > 8 && (
            <button
              onClick={() => navigate("/dashboard/history")}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              See All
            </button>
          )}
        </div>

        <div className="space-y-4 md:hidden">
          {thisMonthItems?.length ? (
            [...thisMonthItems]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.summary}</p>
                    <p className="text-sm text-gray-500">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "-"}
                    </p>
                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-200">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        item.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatShort(item.amount)}
                    </p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="mt-2 text-red-500 hover:text-red-700 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              No items found this month
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
