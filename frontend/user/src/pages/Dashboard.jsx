import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200">
      <aside className="w-16 lg:w-64 bg-slate-900 text-white shadow-lg">
        <Sidebar />
      </aside>

      <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
        <div className="w-full max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <aside className="hidden lg:block lg:w-80 bg-white border-l shadow-md">
        <RightSidebar />
      </aside>
    </div>
  );
}

export default Dashboard;
