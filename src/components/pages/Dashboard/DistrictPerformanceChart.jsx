import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const DistrictPerformanceChart = () => {
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/bazaars/reports/performance`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPerformance(res.data);
      } catch (err) {
        console.error("Error fetching district performance", err);
      }
    };
    fetchPerformance();
  }, []);

  if (!performance) return <p>Loading district performance...</p>;

  const data = {
    labels: performance.map((d) => d.districtName),
    datasets: [
      {
        label: "Submissions",
        data: performance.map((d) => d.submissionsCount),
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66,165,245,0.2)",
        fill: true
      }
    ]
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">District Performance</h2>
      <Line data={data} />
    </div>
  );
};

export default DistrictPerformanceChart;
