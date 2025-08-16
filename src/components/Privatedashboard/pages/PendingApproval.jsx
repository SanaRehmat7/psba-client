import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../api";

const PendingApprovalsPage = () => {
  const [activeTab, setActiveTab] = useState("bazaars");
  const [bazaars, setBazaars] = useState([]);
  const [priceUpdates, setPriceUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remarks, setRemarks] = useState({});
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        if (activeTab === "bazaars") {
          const response = await axios.get(
            `${BASE_URL}/api/bazaars/pending/list`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setBazaars(response.data);
        } else {
          const response = await axios.get(
            `${BASE_URL}/api/bazaars/pending/price-updates`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setPriceUpdates(response.data);
        }
      } catch (err) {
        setError(
          `Failed to fetch ${
            activeTab === "bazaars" ? "bazaars" : "price updates"
          }. Please try again later.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, BASE_URL]);

  // Handle bazaar and price approvals
  const handleBazaarApproval = async (bazaarId, approved) => {
    try {
      await api.post(`/bazaars/approve/${bazaarId}`, {
        approved,
        remarks: remarks[`bazaar-${bazaarId}`] || "",
      });

      setBazaars(bazaars.filter((b) => b._id !== bazaarId));
    } catch (err) {
      console.error("Bazaar approval error:", err.response?.data);
      setError(err.response?.data?.error || "Update failed");
    }
  };

  const handlePriceApproval = async (bazaarId, priceId, approved) => {
    try {
      await api.post(`/bazaars/approve/price/${bazaarId}/${priceId}`, {
        approved,
        remarks: remarks[`price-${bazaarId}-${priceId}`] || "",
      });

      // Optimistic UI update
      setPriceUpdates((prev) =>
        prev
          .map((bazaar) =>
            bazaar._id === bazaarId
              ? {
                  ...bazaar,
                  prices: bazaar.prices.filter(
                    (price) => price._id !== priceId
                  ),
                }
              : bazaar
          )
          .filter((b) => b.prices.length > 0)
      );
    } catch (err) {
      console.error("Price approval error:", err.response?.data);
      setError(err.response?.data?.error || "Price update failed");
    }
  };

  const handleRemarksChange = (e, id) => {
    setRemarks((prev) => ({ ...prev, [id]: e.target.value }));
  };

  // Safe date formatting function
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pending approvals...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-medium mt-4 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Pending Approvals
            </h1>
            <p className="text-gray-600 mt-2">
              Review and approve pending submissions
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "bazaars"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("bazaars")}
            >
              <div className="flex items-center">
                <span>Bazaars</span>
                {bazaars.length > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {bazaars.length}
                  </span>
                )}
              </div>
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "prices"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("prices")}
            >
              <div className="flex items-center">
                <span>Price Updates</span>
                {priceUpdates.length > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {priceUpdates.reduce(
                      (acc, curr) => acc + curr.prices.length,
                      0
                    )}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {activeTab === "bazaars" ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Pending Bazaar Approvals
              </h2>
              <span className="text-sm text-gray-500">
                Showing {bazaars.length} pending bazaars
              </span>
            </div>

            {bazaars.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-2xl mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-medium mt-4 mb-2">
                  No Pending Bazaars
                </h3>
                <p className="text-gray-600">
                  All bazaar submissions have been reviewed.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {bazaars.map((bazaar) => (
                  <div
                    key={bazaar._id}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="p-5 border-b border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {bazaar.name}
                            </h3>
                            <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs">
                              Pending
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">
                            {bazaar.district} District • {bazaar.prices.length}{" "}
                            items
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Submitted: {formatDate(bazaar.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="font-medium text-gray-700 mb-3">
                        Submitted Prices
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {bazaar.prices.map((price, idx) => (
                          <div
                            key={idx}
                            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
                          >
                            <div className="font-medium text-gray-800">
                              {price.item}
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-gray-600">
                                Rs. {price.price}
                              </span>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                per {price.unit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 border-t border-gray-100">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Remarks
                      </label>
                      <textarea
                        value={remarks[`bazaar-${bazaar._id}`] || ""}
                        onChange={(e) =>
                          handleRemarksChange(e, `bazaar-${bazaar._id}`)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows="2"
                        placeholder="Add your comments for the submitter..."
                      ></textarea>
                    </div>

                    <div className="p-5 bg-gray-50 flex justify-end space-x-3">
                      <button
                        onClick={() => handleBazaarApproval(bazaar._id, false)}
                        className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Reject
                      </button>
                      <button
                        onClick={() => handleBazaarApproval(bazaar._id, true)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Pending Price Updates
              </h2>
              <span className="text-sm text-gray-500">
                {priceUpdates.reduce(
                  (acc, curr) => acc + curr.prices.length,
                  0
                )}{" "}
                updates pending
              </span>
            </div>

            {priceUpdates.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-2xl mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-medium mt-4 mb-2">
                  No Pending Price Updates
                </h3>
                <p className="text-gray-600">
                  All price updates have been reviewed.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {priceUpdates.map((bazaar) => (
                  <div
                    key={bazaar._id}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="p-5 border-b border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {bazaar.name}
                            </h3>
                            <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs">
                              {bazaar.prices.length} updates pending
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">
                            {bazaar.district} District
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Last Updated:{" "}
                          {formatDate(bazaar.updatedAt || bazaar.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="p-1">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Old Price
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                New Price
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Unit
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Remarks
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {bazaar.prices.map((price, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="font-medium text-gray-900">
                                    {price.item}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span className="text-gray-600 line-through">
                                    Rs. {price.oldPrice || "-"}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span className="text-green-600 font-medium">
                                    Rs. {price.price}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                                  {price.unit}
                                </td>
                                <td className="px-4 py-4">
                                  <textarea
                                    value={
                                      remarks[`price-${bazaar._id}-${index}`] ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      handleRemarksChange(
                                        e,
                                        `price-${bazaar._id}-${index}`
                                      )
                                    }
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    rows="2"
                                    placeholder="Add remarks..."
                                  ></textarea>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        handlePriceApproval(
                                          bazaar._id,
                                          price._id,
                                          false
                                        )
                                      }
                                      className="flex items-center text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() =>
                                        handlePriceApproval(
                                          bazaar._id,
                                          price._id,
                                          true
                                        )
                                      }
                                      className="flex items-center text-green-600 hover:text-green-800 p-2 rounded hover:bg-green-50"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApprovalsPage;