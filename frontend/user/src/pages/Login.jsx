import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login, sendResetCode, verifyResetCode, resetPassword } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // forgot password states
  const [forgotStep, setForgotStep] = useState(0);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(form);
    setLoading(false);

    if (res.success) {
      toast.success("Login successful");
      navigate("/dashboard/my");
    } else {
      setError(res.message || "Login failed, please try again");
    }
  };

  // forgot password handlers
  const handleSendEmail = async () => {
    const res = await sendResetCode(forgotEmail);
    if (res.success) {
      toast.success("OTP sent to your email");
      setForgotStep(2);
    } else toast.error(res.message);
  };

  const handleVerifyOtp = async () => {
    const res = await verifyResetCode(forgotEmail, otp);
    if (res.success) {
      toast.success("OTP verified");
      setForgotStep(3);
    } else toast.error(res.message);
  };

  const handleResetPassword = async () => {
    const res = await resetPassword(forgotEmail, newPassword);
    if (res.success) {
      toast.success("Password reset successful");
      setForgotStep(0);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
    } else toast.error(res.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center text-sm text-red-500 mb-4">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setForgotStep(1)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {forgotStep > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 relative">
            <button
              onClick={() => setForgotStep(0)}
              className="absolute top-2 right-3 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
              Forgot Password
            </h3>

            {forgotStep === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button
                  onClick={handleSendEmail}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition"
                >
                  Send OTP
                </button>
              </>
            )}

            {forgotStep === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition"
                >
                  Verify OTP
                </button>
              </>
            )}

            {forgotStep === 3 && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition"
                >
                  Reset Password
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
