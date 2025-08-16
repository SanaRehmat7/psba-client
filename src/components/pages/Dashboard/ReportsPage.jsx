import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('trends');
  const [trendsData, setTrendsData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [metricsData, setMetricsData] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    district: '',
    item: 'Rice',
    days: 30
  });

  useEffect(() => {
    if (activeTab === 'trends' && filters.district) {
      fetchPriceTrends();
    } else if (activeTab === 'comparison') {
      fetchDistrictComparison();
    } else if (activeTab === 'metrics') {
      fetchApprovalMetrics();
    } else if (activeTab === 'performance') {
      fetchDistrictPerformance();
    }
  }, [activeTab, filters]);

  const fetchPriceTrends = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/bazaars/reports/trends/${filters.district}?days=${filters.days}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTrendsData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch price trends');
      setLoading(false);
    }
  };

  const fetchDistrictComparison = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/bazaars/reports/comparison/${filters.item}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComparisonData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch district comparison');
      setLoading(false);
    }
  };

  const fetchApprovalMetrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/bazaars/reports/metrics', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMetricsData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch approval metrics');
      setLoading(false);
    }
  };

  const fetchDistrictPerformance = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/bazaars/reports/performance', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPerformanceData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch district performance');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const renderTrendsChart = (item) => {
    const chartData = trendsData.map(bazaar => {
      const priceEntry = bazaar.prices.find(p => p.item === item);
      return {
        name: bazaar.name,
        date: new Date(bazaar.date).toLocaleDateString(),
        price: priceEntry ? priceEntry.price : 0
      };
    });

    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">{item} Price Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#10B981" name={`Price (per ${chartData[0]?.unit || 'unit'})`} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderComparisonChart = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">{filters.item} Price Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgPrice" fill="#3B82F6" name="Average Price" />
              <Bar dataKey="minPrice" fill="#10B981" name="Minimum Price" />
              <Bar dataKey="maxPrice" fill="#EF4444" name="Maximum Price" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderMetrics = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Bazaar Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Approved:</span>
              <span className="font-semibold">{metricsData.bazaars?.approved || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending:</span>
              <span className="font-semibold">{metricsData.bazaars?.pending || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Rejected:</span>
              <span className="font-semibold">{metricsData.bazaars?.rejected || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Price Approvals</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Approved:</span>
              <span className="font-semibold">{metricsData.prices?.approved || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending:</span>
              <span className="font-semibold">{metricsData.prices?.pending || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Users</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>District Admins:</span>
              <span className="font-semibold">{metricsData.districtAdmins || 0}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceTable = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bazaars</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Entries</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {performanceData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">{item.district}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.adminName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.bazaarCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.priceUpdateCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.lastActivity).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Market Reports & Analytics</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'trends'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('trends')}
        >
          Price Trends
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'comparison'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('comparison')}
        >
          District Comparison
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'metrics'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('metrics')}
        >
          Approval Metrics
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'performance'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('performance')}
        >
          Admin Performance
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading ? (
        <div className="text-center py-8">Loading report data...</div>
      ) : (
        <>
          {activeTab === 'trends' && (
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                  <div className="w-full md:w-1/3">
                    <label className="block mb-1">Select District</label>
                    <select
                      name="district"
                      value={filters.district}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select district</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Lalitpur">Lalitpur</option>
                      <option value="Bhaktapur">Bhaktapur</option>
                      {/* Add more districts as needed */}
                    </select>
                  </div>
                  <div className="w-full md:w-1/3 mt-2 md:mt-0">
                    <label className="block mb-1">Time Period (days)</label>
                    <select
                      name="days"
                      value={filters.days}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {filters.district && trendsData.length > 0 ? (
                <>
                  {renderTrendsChart('Rice')}
                  {renderTrendsChart('Wheat')}
                  {renderTrendsChart('Oil')}
                </>
              ) : (
                <div className="bg-white p-8 text-center rounded-lg shadow-md">
                  <p className="text-gray-600">
                    {filters.district 
                      ? 'No price trend data available for the selected district' 
                      : 'Please select a district to view price trends'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'comparison' && (
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="w-full md:w-1/3">
                  <label className="block mb-1">Select Item</label>
                  <select
                    name="item"
                    value={filters.item}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Rice">Rice</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Oil">Oil</option>
                    <option value="Salt">Salt</option>
                    <option value="Sugar">Sugar</option>
                  </select>
                </div>
              </div>
              
              {comparisonData.length > 0 ? (
                renderComparisonChart()
              ) : (
                <div className="bg-white p-8 text-center rounded-lg shadow-md">
                  <p className="text-gray-600">No comparison data available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'metrics' && (
            <div>
              {metricsData.bazaars ? renderMetrics() : (
                <div className="bg-white p-8 text-center rounded-lg shadow-md">
                  <p className="text-gray-600">No metrics data available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && (
            <div>
              {performanceData.length > 0 ? (
                renderPerformanceTable()
              ) : (
                <div className="bg-white p-8 text-center rounded-lg shadow-md">
                  <p className="text-gray-600">No performance data available</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportsPage;