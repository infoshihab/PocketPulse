import React, { useContext, useMemo, useState } from "react";
import { FaCalendarAlt, FaListAlt, FaTrash } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

export default function History() {
  // value = what your DB actually stores, label = what users see
  const CATEGORY_OPTIONS = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expenses" },
    { value: "utility", label: "Utility" },
    { value: "rent", label: "Rent" },
    { value: "health&food", label: "Health & Food" },
    { value: "recivable", label: "Receivable" }, // note your key is "recivable"
    { value: "payable", label: "Payable" },
    { value: "other", label: "Others" },
  ];

  const { dashboardItems, deleteDashboardItem } = useContext(AppContext);

  const [filters, setFilters] = useState({
    category: "", // stores the lowercase value (e.g. "income")
    from: "", // YYYY-MM-DD
    to: "", // YYYY-MM-DD
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const labelForCategory = (value) =>
    CATEGORY_OPTIONS.find((c) => c.value === value)?.label || value || "-";

  const formatTk = (n = 0) =>
    `Tk. ${Number(n || 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  // Clean base array
  const baseData = useMemo(
    () => (Array.isArray(dashboardItems) ? dashboardItems : []),
    [dashboardItems]
  );

  // Filter + sort (newest first)
  const filteredSorted = useMemo(() => {
    const fromDate = filters.from ? new Date(`${filters.from}T00:00:00`) : null;
    const toDate = filters.to ? new Date(`${filters.to}T23:59:59.999`) : null;
    const wantCategory = filters.category; // already lowercase value

    const pass = baseData.filter((item) => {
      // category check (stored as lowercase keys in your DB)
      const cat = (item.category || "").toString().trim().toLowerCase();
      const matchCategory = wantCategory ? cat === wantCategory : true;

      // date check (prefer item.date; fallback to createdAt if provided by backend)
      const rawDate = item.date || item.createdAt || null;
      const itemDate = rawDate ? new Date(rawDate) : null;

      // If there are date filters but the item has no date, exclude it.
      if ((fromDate || toDate) && !itemDate) return false;

      const matchFrom = fromDate ? itemDate >= fromDate : true;
      const matchTo = toDate ? itemDate <= toDate : true;

      return matchCategory && matchFrom && matchTo;
    });

    // sort newest → oldest by date/createdAt
    return pass.sort((a, b) => {
      const aDate = new Date(a.date || a.createdAt || 0).getTime();
      const bDate = new Date(b.date || b.createdAt || 0).getTime();
      return bDate - aDate;
    });
  }, [baseData, filters]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredSorted.length / itemsPerPage)
  );
  const paginated = useMemo(
    () => filteredSorted.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredSorted, page]
  );

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteDashboardItem(itemId);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-6xl space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Filter History
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <div className="relative">
                <FaListAlt className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">All Categories</option>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* From */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                From
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="from"
                  value={filters.from}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                To
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="to"
                  value={filters.to}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 px-6 py-4 border-b">
            Recent Added to Dashboard
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Summary</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Date</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((item, idx) => {
                    const dateStr = item.date || item.createdAt || "";
                    return (
                      <tr
                        key={`${item._id || idx}`}
                        className={`border-b ${
                          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-indigo-50 transition`}
                      >
                        <td className="py-2 px-4">{item.summary}</td>
                        <td className="py-2 px-4 text-right font-semibold">
                          {formatTk(item.amount)}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {dateStr
                            ? new Date(dateStr).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="py-2 px-4 italic">
                          {labelForCategory(item.category)}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-500 hover:text-red-700 transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 flex justify-between items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-6 py-2 rounded-lg font-medium shadow transition-colors ${
                page === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
            >
              Back
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={`px-6 py-2 rounded-lg font-medium shadow transition-colors ${
                page >= totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
