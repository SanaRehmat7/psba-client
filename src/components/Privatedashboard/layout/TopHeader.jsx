// components/dashboard/layout/TopHeader.jsx
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-6">District Admin Dashboard</h1>
      <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
    </div>
  );
};

export default TopHeader;
