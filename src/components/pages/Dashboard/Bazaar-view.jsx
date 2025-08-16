// src/pages/ViewBazaar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaPhone, 
  FaEnvelope, 
  FaInfoCircle,
  FaShoppingCart,
  FaArrowLeft,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const ViewBazaar = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bazaar, setBazaar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPrice, setUpdatingPrice] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchBazaar = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/bazaars/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBazaar(response.data);
      } catch (err) {
        setError('Failed to load bazaar details');
        console.error('Error fetching bazaar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBazaar();
  }, [id]);

  const handleApproveBazaar = async () => {
    try {
      setUpdatingStatus(true);
      const token = localStorage.getItem('token');
      await axios.post(`/api/bazaars/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh bazaar data
      const response = await axios.get(`/api/bazaars/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBazaar(response.data);
      setUpdatingStatus(false);
    } catch (err) {
      setError('Failed to approve bazaar');
      setUpdatingStatus(false);
      console.error('Error approving bazaar:', err);
    }
  };

  const handleApprovePrice = async (priceIndex) => {
    try {
      setUpdatingPrice(priceIndex);
      const token = localStorage.getItem('token');
      await axios.post(`/api/bazaars/approve/price/${id}/${priceIndex}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh bazaar data
      const response = await axios.get(`/api/bazaars/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBazaar(response.data);
      setUpdatingPrice(null);
    } catch (err) {
      setError('Failed to approve price');
      setUpdatingPrice(null);
      console.error('Error approving price:', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <FaCheck className="inline mr-1" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            <FaTimes className="inline mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            <FaClock className="inline mr-1" /> Pending Review
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate('/bazaars')}
        >
          Back to Bazaars
        </button>
      </div>
    );
  }

  if (!bazaar) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>Bazaar not found.</p>
        <button 
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate('/bazaars')}
        >
          Back to Bazaars
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/bazaars')} 
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Bazaars
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{bazaar.name}</h1>
                <div className="mt-2 flex items-center">
                  {getStatusBadge(bazaar.status)}
                  <span className="ml-3 text-gray-500 text-sm">
                    Submitted on {new Date(bazaar.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {user.role === 'superadmin' && bazaar.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleApproveBazaar}
                    disabled={updatingStatus}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      updatingStatus
                        ? 'bg-green-300 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <FaCheck className="mr-1" /> 
                    {updatingStatus ? 'Approving...' : 'Approve Bazaar'}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Location Details</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">District</p>
                        <p className="mt-1 text-gray-900">{bazaar.district}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="mt-1 text-gray-900">{bazaar.location}</p>
                      </div>
                    </li>
                    {bazaar.google_maps && (
                      <li className="flex items-start">
                        <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Google Maps</p>
                          <a 
                            href={bazaar.google_maps} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-1 text-blue-600 hover:underline"
                          >
                            View on Map
                          </a>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Operational Information</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaCalendarAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Operational Days</p>
                        <p className="mt-1 text-gray-900">
                          {bazaar.operational_days.join(', ')}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Timings</p>
                        <p className="mt-1 text-gray-900">{bazaar.timings}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Joyland Timings</p>
                        <p className="mt-1 text-gray-900">{bazaar.Joyland_timings || 'N/A'}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaInfoCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Focal Person</p>
                        <p className="mt-1 text-gray-900">{bazaar.focal_person || 'N/A'}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaPhone className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="mt-1 text-gray-900">{bazaar.contact.phone || 'N/A'}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaEnvelope className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1 text-gray-900">{bazaar.contact.email || 'N/A'}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Market Details</h3>
                  <ul className="space-y-3">
                    <li>
                      <p className="text-sm font-medium text-gray-500">Established</p>
                      <p className="mt-1 text-gray-900">{bazaar.established || 'N/A'}</p>
                    </li>
                    <li>
                      <p className="text-sm font-medium text-gray-500">Area</p>
                      <p className="mt-1 text-gray-900">{bazaar.area || 'N/A'}</p>
                    </li>
                    <li>
                      <p className="text-sm font-medium text-gray-500">Number of Stalls</p>
                      <p className="mt-1 text-gray-900">{bazaar.stalls || 'N/A'}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Price List</h2>
                {bazaar.status === 'pending' && user.role === 'superadmin' && (
                  <span className="text-sm text-gray-500">Approve individual prices</span>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (PKR)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      {bazaar.status === 'pending' && user.role === 'superadmin' && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bazaar.prices.map((price, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.item}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{price.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{price.unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {price.approved ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              Approved
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                              Pending
                            </span>
                          )}
                        </td>
                        {bazaar.status === 'pending' && user.role === 'superadmin' && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {!price.approved && (
                              <button
                                onClick={() => handleApprovePrice(index)}
                                disabled={updatingPrice === index}
                                className={`text-blue-600 hover:text-blue-800 ${
                                  updatingPrice === index ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              >
                                {updatingPrice === index ? 'Approving...' : 'Approve'}
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {bazaar.facilities.length > 0 ? (
                      bazaar.facilities.map((facility, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {facility}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No facilities listed</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Special Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {bazaar.special_days.length > 0 ? (
                      bazaar.special_days.map((day, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {day}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No special days listed</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{bazaar.description}</p>
              </div>
            </div>
            
            {/* Submitted by */}
            {bazaar.createdBy && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Submitted By</h3>
                <p className="text-gray-600">
                  {bazaar.createdBy.name} ({bazaar.createdBy.email})
                  {bazaar.createdBy.district && ` - ${bazaar.createdBy.district} District`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBazaar;