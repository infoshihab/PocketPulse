import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export default function Settings() {
  const { user, updateProfile } = useContext(AppContext);

  // Local states for form
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

  // Load initial user data
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password validation
    if (formData.newPass && formData.newPass !== formData.confirm) {
      alert("New password and confirm password do not match.");
      setLoading(false);
      return;
    }

    const result = await updateProfile({ ...formData, imageFile: profileFile });
    setLoading(false);

    if (result.success) {
      alert("Profile updated successfully!");
      setFormData((prev) => ({
        ...prev,
        current: "",
        newPass: "",
        confirm: "",
      }));
    } else {
      alert(result.message || "Update failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-xl mt-12 mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-wide">
        Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-14">
        {/* Profile Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b border-gray-200 pb-3">
            Profile Information
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Profile Picture */}
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
                className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Upload Profile Picture
              </label>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-7">
              {[
                { id: "firstName", label: "First Name" },
                { id: "lastName", label: "Last Name" },
                { id: "phone", label: "Phone Number", type: "tel" },
              ].map(({ id, label, type = "text" }) => (
                <div key={id} className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-700 tracking-wide">
                    {label}
                  </label>
                  <input
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

        {/* Password Section */}
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

        {/* Save Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-12 rounded-lg shadow-lg transition transform hover:-translate-y-0.5 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
