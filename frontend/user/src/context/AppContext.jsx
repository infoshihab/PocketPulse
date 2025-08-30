import axios from "axios";
import { useEffect, createContext, useState, useMemo } from "react";
import dayjs from "dayjs";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dashboardItems, setDashboardItems] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Set authorization header if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Login
  const login = async (loginData) => {
    try {
      const res = await axios.post(`${API}/user/login`, loginData);
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
      }
      return res.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Register
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API}/user/signup`, formData);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      if (!user?._id) return { success: false, message: "User not logged in" };

      const formData = new FormData();
      formData.append("userId", user._id);

      if (profileData.firstName)
        formData.append("firstName", profileData.firstName);
      if (profileData.lastName)
        formData.append("lastName", profileData.lastName);
      if (profileData.phone) formData.append("phone", profileData.phone);
      if (profileData.email) formData.append("email", profileData.email);

      if (profileData.current && profileData.newPass && profileData.confirm) {
        formData.append("current", profileData.current);
        formData.append("newPass", profileData.newPass);
        formData.append("confirm", profileData.confirm);
      }

      if (profileData.imageFile)
        formData.append("image", profileData.imageFile);

      const res = await axios.put(`${API}/user/update-profile`, formData, {
        headers: { "Content-Type": "multipart.form-data" },
      });
      if (res.data.success) {
        setUser(res.data.userData || user);
      }
      return res.data;
    } catch (error) {
      console.error("Update Profile Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Fetch dashboard items
  const fetchDashboardItems = async () => {
    if (!user) return;
    const res = await axios.post(`${API}/user/dashboard/my-items`);
    if (res.data.success) setDashboardItems(res.data.items);
  };

  const fetchItemCount = async () => {
    if (!user) return;
    const res = await axios.post(`${API}/user/dashboard/my`);
    if (res.data.success) setCategoryTotals(res.data.data);
  };

  const addToDashboard = async (data) => {
    const res = await axios.post(`${API}/user/dashboard/add`, data);
    if (res.data.success) {
      fetchDashboardItems();
      fetchItemCount();
    }
    return res.data;
  };

  const deleteDashboardItem = async (id) => {
    const res = await axios.delete(`${API}/user/dashboard/${id}`);
    if (res.data.success) {
      fetchDashboardItems();
      fetchItemCount();
    }
  };
  const submitReport = async (description, contact, file) => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("contact", contact);
      if (file) formData.append("file", file);

      const res = await axios.post(`${API}/user/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (error) {
      console.error("Submit Report Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  const fetchMyReports = async () => {
    try {
      const res = await axios.get(`${API}/reports/myreports`);
      if (res.data.success) {
        setReports(res.data.reports);
      }
      return res.data;
    } catch (error) {
      console.error("Fetch Reports Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  // Fetch items & totals when user logs in
  useEffect(() => {
    if (token && user?._id) {
      fetchDashboardItems(user._id);
      fetchItemCount(user._id);
      fetchMyReports();
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        dashboardItems,
        categoryTotals,
        loading,
        submitReport,
        addToDashboard,
        login,
        register,
        logout,
        updateProfile,
        deleteDashboardItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
