import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StatCard from './StatCard';

const DistrictDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [bazaars, setBazaars] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!user) {
      toast.error('User not authenticated');
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // console.log("Hello Dashborad")
        setLoading(true);
        const token = localStorage.getItem('token');
        console.log('Fetching dashboard data with token:', token); 

        const statsRes = await axios.get(`${BASE_URL}/api/bazaars/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Stats response:', statsRes.data); // Debug
        setStats(statsRes.data);

        const bazaarsRes = await axios.get(`${BASE_URL}/api/bazaars/district/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Bazaars response:', bazaarsRes.data); // Debug
        setBazaars(Array.isArray(bazaarsRes.data) ? bazaarsRes.data : []);
      } catch (err) {
        console.error('Dashboard error:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }
        toast.error('Failed to load dashboard data');
        setStats({
          totalBazaars: 0,
          approvedBazaars: 0,
          pendingApprovals: 0,
          userBazaars: 0,
        });
        setBazaars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate, BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">
          Failed to load dashboard statistics
        </div>
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || 'User'}</h1>
      <p className="text-gray-600 mb-6">
        District: {user?.district || 'N/A'} | Role: {user?.role || 'Unknown'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Bazaars" value={stats.totalBazaars} bgColor="bg-blue-100" />
        <StatCard title="Approved Bazaars" value={stats.approvedBazaars} bgColor="bg-green-100" />
        <StatCard title="Pending Approval" value={stats.pendingApprovals} bgColor="bg-yellow-100" />
        <StatCard title="Your Bazaars" value={stats.userBazaars} bgColor="bg-purple-100" />
      </div>

      <div className="mb-8">
        <Link
          to="/bazaars/new"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New Bazaar
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-4 bg-gray-50">Your Bazaars</h2>
        {bazaars.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No bazaars found. Create your first bazaar!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bazaars.map((bazaar) => (
                  <tr key={bazaar._id || bazaar.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{bazaar.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${bazaar.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          bazaar.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}
                      >
                        {bazaar.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/bazaars/${bazaar.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictDashboard;