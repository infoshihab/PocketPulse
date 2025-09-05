import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Report() {
  const { submitReport } = useContext(AppContext);

  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const filePreview = file ? URL.createObjectURL(file) : null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await submitReport(description, contact, file);

    if (res.success) {
      setMessage({
        type: "success",
        text: "✅ Report submitted successfully!",
      });
      setDescription("");
      setContact("");
      setFile(null);
    } else {
      setMessage({
        type: "error",
        text: res.message || "❌ Something went wrong. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg mt-10 border border-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Submit a Report
      </h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-center font-medium transition ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="description"
            className="block text-gray-800 font-semibold mb-2"
          >
            Describe the issue
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide a detailed description..."
            required
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-gray-800 font-semibold mb-2"
          >
            Your Email or Phone
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. your.email@example.com or +1234567890"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="file-upload"
            className="block text-gray-800 font-semibold mb-2"
          >
            Attach Screenshot <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
          />
          {filePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={filePreview}
                alt="Screenshot preview"
                className="max-w-full max-h-64 rounded-lg shadow-md border"
                onLoad={() => URL.revokeObjectURL(filePreview)}
              />
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center px-8 py-3 rounded-lg text-white font-semibold shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Sending..." : "Send Report"}
          </button>
        </div>
      </form>
    </div>
  );
}
