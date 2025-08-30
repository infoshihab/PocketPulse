import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Report() {
  const { submitReport } = useContext(AppContext);

  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // For previewing uploaded image
  const filePreview = file ? URL.createObjectURL(file) : null;

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await submitReport(description, contact, file);

    if (res.success) {
      setMessage({ type: "success", text: "Report submitted successfully!" });
      setDescription("");
      setContact("");
      setFile(null);
    } else {
      setMessage({
        type: "error",
        text: res.message || "Something went wrong.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Submit a Report
      </h1>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-md text-center font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Problem Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Describe the issue you are facing
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide a detailed description..."
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
        </div>

        {/* Contact Info */}
        <div>
          <label
            htmlFor="contact"
            className="block text-gray-700 font-medium mb-2"
          >
            Your Email or Phone Number
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. your.email@example.com or +1234567890"
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
        </div>

        {/* Screenshot Upload */}
        <div>
          <label
            htmlFor="file-upload"
            className="block text-gray-700 font-medium mb-2"
          >
            Attach Screenshot (optional)
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-gray-600"
          />
          {filePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={filePreview}
                alt="Screenshot preview"
                className="max-w-full max-h-60 rounded-md shadow-md"
                onLoad={() => URL.revokeObjectURL(filePreview)}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-3 px-8 rounded-md shadow-md transition`}
          >
            {loading ? "Sending..." : "Send Report"}
          </button>
        </div>
      </form>
    </div>
  );
}
