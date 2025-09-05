import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export default function Settings() {
  const { user, updateProfile } = useContext(AppContext);

  const [profileFile, setProfileFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    current: "",
    newPass: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      }));
      setPreview(user.image || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setProfileFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPass && formData.newPass !== formData.confirm) {
      alert("New password and confirm password do not match.");
      setLoading(false);
      return;
    }

    const result = await updateProfile({ ...formData, imageFile: profileFile });
    setLoading(false);

    if (result.success) {
      alert("✅ Profile updated successfully!");
      setFormData((prev) => ({
        ...prev,
        current: "",
        newPass: "",
        confirm: "",
      }));
    } else {
      alert(result.message || "❌ Update failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-xl mt-12 mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-wide">
        Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-14">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b border-gray-200 pb-3">
            Profile Information
          </h2>

          <div className="flex flex-col md:flex-row md:items-start gap-10">
            <div className="flex flex-col items-center md:items-start gap-5">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold select-none">
                  No Image
                </div>
              )}

              <label
                htmlFor="profilePicInput"
                className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm"
              >
                Change Picture
              </label>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-7">
              {[
                { id: "firstName", label: "First Name" },
                { id: "lastName", label: "Last Name" },
                { id: "phone", label: "Phone Number", type: "tel" },
              ].map(({ id, label, type = "text" }) => (
                <div key={id} className="flex flex-col">
                  <label
                    htmlFor={id}
                    className="mb-2 font-semibold text-gray-700 tracking-wide"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b border-gray-200 pb-3">
            Change Password
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 max-w-4xl mx-auto">
            {[
              { name: "current", placeholder: "Current Password" },
              { name: "newPass", placeholder: "New Password" },
              { name: "confirm", placeholder: "Confirm New Password" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                name={name}
                type="password"
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            ))}
          </div>
        </section>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-12 rounded-lg shadow-lg transition transform hover:-translate-y-0.5 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
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
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
