// src/components/bazaar/BazaarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaShoppingCart } from 'react-icons/fa';

const BazaarCard = ({ bazaar }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
    >
      <div className="relative">
        <img 
          src={bazaar.image} 
          alt={bazaar.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {bazaar.discount} OFF
        </div>
      </div>
      
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <Link to={`/bazaars/${bazaar.id}`} className="group">
            <h3 className="text-xl font-bold text-green-800 group-hover:underline">
              {bazaar.name}
            </h3>
          </Link>
          
          <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-green-800 font-medium">{bazaar.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2 text-green-600" />
          <span>{bazaar.district}, Punjab</span>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">
          {bazaar.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {bazaar.categories.slice(0, 3).map((category, index) => (
            <span 
              key={index}
              className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded"
            >
              {category}
            </span>
          ))}
          {bazaar.categories.length > 3 && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              +{bazaar.categories.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="px-5 pb-5 mt-auto">
        <Link 
          to={`/bazaars/${bazaar.id}`}
          className="block w-full bg-green-700 hover:bg-green-800 text-white text-center font-medium py-2.5 rounded-lg transition duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default BazaarCard;