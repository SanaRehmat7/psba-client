// components/dashboard/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-green-700 text-white flex flex-col p-4">
//       <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//       <NavLink to="/dashboard" className="mb-3 hover:underline">
//         Dashboard
//       </NavLink>
//       <NavLink to="/update-prices" className="mb-3 hover:underline">
//         Update Prices
//       </NavLink>
//       <NavLink to="/reports" className="mb-3 hover:underline">
//         Reports
//       </NavLink>
//       <NavLink
//         to="/pending-approvals"
//         className={({ isActive }) =>
//           isActive
//             ? "bg-red-100 text-red-700 font-semibold rounded px-3 py-2"
//             : "text-gray-700 hover:text-red-600 px-3 py-2"
//         }
//       >
//         Pending Approvals
//       </NavLink>
//     </div>
//   );
// };
const Sidebar = () => {
  return (
    <div className="w-64 bg-green-700 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <NavLink 
        to="/dashboard" 
        className={({isActive}) => 
          `mb-3 p-2 rounded ${isActive ? 'bg-green-800' : 'hover:bg-green-600'}`
        }
      >
        Dashboard
      </NavLink>
      <NavLink 
        to="/update-prices" 
        className={({isActive}) => 
          `mb-3 p-2 rounded ${isActive ? 'bg-green-800' : 'hover:bg-green-600'}`
        }
      >
        Update Prices
      </NavLink>
      <NavLink 
        to="/reports" 
        className={({isActive}) => 
          `mb-3 p-2 rounded ${isActive ? 'bg-green-800' : 'hover:bg-green-600'}`
        }
      >
        Reports
      </NavLink>
      <NavLink
        to="/pending-approvals"
        className={({ isActive }) =>
          `p-2 rounded ${
            isActive
              ? "bg-red-100 text-red-700 font-semibold"
              : "hover:bg-green-600"
          }`
        }
      >
        Pending Approvals
      </NavLink>
    </div>
  );
};

export default Sidebar;
