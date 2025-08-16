


//src/pages/SuperAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import PendingApprovals from "../../Privatedashboard/pages/PendingApproval";
import StatCard from './StatCard';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard stats
        const statsRes = await axios.get(`${BASE_URL}/api/bazaars/dashboard/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStats(statsRes.data);
        
      } catch (err) {
        console.error('Dashboard error:', err);
        toast.error('Failed to load dashboard data');
        setStats({
          totalBazaars: 0,
          approvedBazaars: 0,
          pendingApprovals: 0,
          userBazaars: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome, {user?.name} | Role: {user?.role}
      </p>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Bazaars" 
            value={stats.totalBazaars} 
            bgColor="bg-blue-100"
          />
          <StatCard 
            title="Approved Bazaars" 
            value={stats.approvedBazaars} 
            bgColor="bg-green-100"
          />
          <StatCard 
            title="Pending Approval" 
            value={stats.pendingApprovals} 
            bgColor="bg-yellow-100"
          />
          <StatCard 
            title="Active Users" 
            value={stats.activeUsers || 0} 
            bgColor="bg-purple-100"
          />
        </div>
      )}

      {/* Pending Approvals Section */}
      <div className="mt-8">
        {/* <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2> */}
        <PendingApprovals />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;