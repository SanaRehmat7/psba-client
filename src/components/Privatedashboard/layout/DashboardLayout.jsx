import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen mt-4">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <TopHeader />
        <main className="p-4 overflow-y-auto flex-1 bg-gray-50">
          <Outlet /> {/* Renders DistrictDashboard or other child pages */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

