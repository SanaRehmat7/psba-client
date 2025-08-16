import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user"));
  

  const {user } = useAuth()
  console.log(token,user)

  if (!token || !user?.role || user.role !== "superadmin") {
    console.log('issue here')
  return <Navigate to="/login" replace />;
}

  return <Outlet/>

  return children;
};

export default AdminRoute;
