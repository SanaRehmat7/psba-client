import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ApprovalMetricsChart = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/bazaars/reports/metrics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching approval metrics", err);
      }
    };
    fetchMetrics();
  }, []);

  if (!metrics) return <p>Loading approval metrics...</p>;

  const data = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Bazaars",
        data: [metrics.approvedBazaars, metrics.pendingBazaars, metrics.rejectedBazaars || 0],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"]
      },
      {
        label: "Price Updates",
        data: [metrics.approvedPrices, metrics.pendingPrices, metrics.rejectedPrices || 0],
        backgroundColor: ["#2196F3", "#FF9800", "#E91E63"]
      }
    ]
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Approval Metrics</h2>
      <Bar data={data} />
    </div>
  );
};

export default ApprovalMetricsChart;
