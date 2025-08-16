// Updated StatCard.jsx with icon support
import React from 'react';
import { 
  FaStore, 
  FaCheckCircle, 
  FaClock, 
  FaUserAlt 
} from 'react-icons/fa';

const iconMap = {
  total: <FaStore className="text-blue-500" />,
  approved: <FaCheckCircle className="text-green-500" />,
  pending: <FaClock className="text-yellow-500" />,
  user: <FaUserAlt className="text-purple-500" />
};

const StatCard = ({ title, value, bgColor = 'bg-white', iconType }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-3xl font-bold text-gray-800">
            {value !== null && value !== undefined ? value : '0'}
          </p>
        </div>
        {iconType && (
          <div className="p-3 rounded-full bg-opacity-20 bg-gray-300">
            {iconMap[iconType]}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;