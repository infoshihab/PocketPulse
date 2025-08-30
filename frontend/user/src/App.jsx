import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MainDashboard from "./components/MainDashboard";
import Profile from "./components/Profile";
import AddToDashboard from "./components/AddToDashboard";
import History from "./components/History";
import Notification from "./components/Notification";
import Report from "./components/Report";
import Settings from "./components/Setting";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="my" index element={<MainDashboard />} />

        <Route path="profile" element={<Profile />} />
        <Route path="add" element={<AddToDashboard />} />
        <Route path="history" element={<History />} />
        {/* <Route path="notification" element={<Notification />} /> */}
        <Route path="report" element={<Report />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="signup" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
