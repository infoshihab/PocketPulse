import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaExclamationCircle,
  FaPlusSquare,
  FaList,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/dashboard/my" },
    { name: "Profile", icon: <FaUser />, link: "/dashboard/profile" },
    { name: "Add", icon: <FaPlusSquare />, link: "/dashboard/add" },
    { name: "History", icon: <FaList />, link: "/dashboard/history" },
    {
      name: "Report",
      icon: <FaExclamationCircle />,
      link: "/dashboard/report",
    },
    { name: "Settings", icon: <FaCog />, link: "/dashboard/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, link: "/" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className="bg-slate-900 text-slate-100 h-screen sticky top-0 shadow-xl z-40 w-16 lg:w-64 flex flex-col"
      aria-label="Sidebar Navigation"
    >
      <div className="flex items-center justify-center lg:justify-start px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={assets.plogo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="hidden lg:inline-block text-lg font-semibold tracking-wide">
            PocketPulse
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4 custom-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const isLogout = item.name === "Logout";

            const content = (
              <>
                <span className="text-xl mx-auto lg:mx-0">{item.icon}</span>
                <span className="hidden lg:inline-block text-sm font-medium">
                  {item.name}
                </span>
              </>
            );

            if (isLogout) {
              return (
                <li key={index}>
                  <button
                    onClick={handleLogout}
                    className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 w-full px-3 py-2 rounded-lg transition-all
                      text-red-400 hover:text-red-300 hover:bg-red-500/10 focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    {content}
                  </button>
                </li>
              );
            }

            return (
              <li key={index}>
                <NavLink
                  to={item.link}
                  title={item.name}
                  className={({ isActive }) =>
                    `flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-3 py-2 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-indigo-400
                     ${
                       isActive
                         ? "bg-indigo-600 text-white"
                         : "hover:bg-white/10 text-slate-300"
                     }`
                  }
                >
                  {content}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden lg:block px-4 py-3 border-t border-white/10 text-xs text-slate-500">
        © {new Date().getFullYear()} PocketPulse
      </div>
    </aside>
  );
};

export default Sidebar;
