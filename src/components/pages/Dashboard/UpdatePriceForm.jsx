import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePriceForm = () => {
  const { bazaarId } = useParams();
  const navigate = useNavigate();
  const [bazaar, setBazaar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [formData, setFormData] = useState({
    item: '',
    price: '',
    unit: ''
  });

  useEffect(() => {
    const fetchBazaarData = async () => {
      try {
        const response = await axios.get(`/api/bazaars/detail/${bazaarId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBazaar(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bazaar data. Please try again.');
        setLoading(false);
        console.error('Bazaar load error:', err);
      }
    };

    fetchBazaarData();
  }, [bazaarId]);

  const handleEditClick = (index, price) => {
    setEditingIndex(index);
    setFormData({
      item: price.item,
      price: price.price,
      unit: price.unit
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/api/bazaars/update-price/${bazaarId}/${editingIndex}`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Update local state
      const updatedPrices = [...bazaar.prices];
      updatedPrices[editingIndex] = {
        ...formData,
        approved: false // Reset approval status
      };
      
      setBazaar({
        ...bazaar,
        prices: updatedPrices,
        status: 'pending'
      });
      
      setEditingIndex(null);
      
      // Show success message
      setError('');
      alert('Price updated successfully! Waiting for approval.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating price');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading bazaar details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-medium mt-4 mb-2">Error Loading Data</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/update-prices')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
        >
          Back to Bazaars
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!bazaar) return null;

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Update Prices</h1>
          <h2 className="text-xl text-gray-600">{bazaar.name}, {bazaar.district} District</h2>
        </div>
        <button 
          onClick={() => navigate('/update-prices')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to all bazaars
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              bazaar.status === 'approved' 
                ? 'bg-green-100 text-green-800' 
                : bazaar.status === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              Status: {bazaar.status}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date(bazaar.updatedAt).toLocaleDateString()}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bazaar.prices.map((price, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="item"
                          value={formData.item}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      ) : (
                        price.item
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      ) : (
                        `Rs. ${price.price}`
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                          required
                        >
                          <option value="kg">kg</option>
                          <option value="liter">Liter</option>
                          <option value="piece">Piece</option>
                          <option value="dozen">Dozen</option>
                          <option value="pack">Pack</option>
                        </select>
                      ) : (
                        price.unit
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        price.approved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {price.approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(index, price)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {bazaar.prices.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No price entries found for this bazaar</p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default UpdatePriceForm;