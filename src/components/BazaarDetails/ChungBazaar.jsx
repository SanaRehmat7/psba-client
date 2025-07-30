import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaShoppingCart, FaPhone, FaEnvelope, FaShieldAlt, FaShoppingBasket, FaLeaf, FaTshirt, FaUtensils, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ChungBazaar = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const salientFeatures = [
    { icon: <FaShieldAlt className="text-blue-600" />, text: 'Specialized engineered roof structure' },
    { icon: <FaLeaf className="text-green-600" />, text: 'Fresh fruits & vegetables at DC rate' },
    { icon: <FaShoppingBasket className="text-amber-600" />, text: 'Good quality grocery items at competitive rates' },
    { icon: <FaUserFriends className="text-purple-600" />, text: 'Conducive family and business environment' },
    { icon: <FaShieldAlt className="text-teal-600" />, text: 'Neat and clean washroom facility' },
    { icon: <FaShoppingCart className="text-red-600" />, text: 'Availability of shopping trolleys' },
    { icon: <FaShieldAlt className="text-indigo-600" />, text: 'CCTV secured' },
    { icon: <FaShieldAlt className="text-orange-600" />, text: 'Security guards available 24/7' },
    { icon: <FaShieldAlt className="text-pink-600" />, text: 'Active Complaint Cell in the market center' }
  ];
  
  const facilities = [
    { icon: <FaLeaf className="text-green-500" />, name: 'Fruits & Vegetables' },
    { icon: <FaShoppingBasket className="text-amber-500" />, name: 'Grocery Items' },
    { icon: <FaUtensils className="text-red-500" />, name: 'Canteen' },
    { icon: <FaTshirt className="text-blue-500" />, name: 'Garments Section' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div>
              <h1 className="text-xl font-bold">Punjab Model Bazars Authority</h1>
              <p className="text-green-200 text-sm">Government of Punjab</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-green-300">Home</a>
            <a href="#" className="hover:text-green-300">Bazaars</a>
            <a href="#" className="hover:text-green-300">Facilities</a>
            <a href="#" className="hover:text-green-300">Contact</a>
          </nav>
          <button className="md:hidden text-2xl">☰</button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-green-700 text-white py-2">
        <div className="container mx-auto px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-sm font-medium hover:text-green-200">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <a href="#" className="ml-1 text-sm font-medium hover:text-green-200 md:ml-2">Bazaars</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="ml-1 text-sm font-medium md:ml-2 text-green-200">Chung</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Chung Model Bazaar
            </motion.h1>
            <motion.p 
              className="text-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Where Quality & Affordability Twines
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-green-600 bg-opacity-70 px-3 py-1 rounded-full text-sm flex items-center">
                <FaMapMarkerAlt className="mr-1" /> Adalat Ali Shah Road, Lahore
              </span>
              <span className="bg-green-600 bg-opacity-70 px-3 py-1 rounded-full text-sm flex items-center">
                <FaClock className="mr-1" /> 9:00 AM - 5:00 PM
              </span>
              <span className="bg-green-600 bg-opacity-70 px-3 py-1 rounded-full text-sm flex items-center">
                Established: June 2015
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'overview' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'facilities' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                onClick={() => setActiveTab('facilities')}
              >
                Facilities
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'gallery' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                onClick={() => setActiveTab('gallery')}
              >
                Gallery
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'contact' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-green-800">About Chung Bazaar</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Situated near the shrine of Adalat Ali Shah in the heart of Chung area, the Chung Bazaar serves the 
                  communities of Mohlanwal, Maraka, Izmir Town, and Bahira Town. Our defining trait is providing a 
                  conducive and family-friendly environment for both business owners and customers.
                </p>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    The bazaar features a specialized engineered roofing structure that provides protection against 
                    the scorching sun, especially during summers. With activated fans during hot months and beautiful 
                    plantation throughout, the bazaar offers an attractive and scenic shopping experience.
                  </p>
                </div>
                
                <p className="mb-6 text-gray-700 leading-relaxed">
                  With over 100 stalls, Chung Bazaar is fully secured by CCTV cameras and security guards. Our 
                  dedicated Complaint Cell ensures product quality, timely supply of goods at DC rates, and prompt 
                  resolution of customer concerns. We provide a refined business platform for lower and middle-class 
                  families at affordable monthly rates, with additional benefits including free electricity, water, 
                  sanitation, and security services.
                </p>
                
                <p className="font-semibold text-gray-700">
                  On average, more than 20,000 people visit Chung Bazaar weekly, attracted by our affable environment 
                  and quality goods and services.
                </p>
              </motion.div>
            )}
            
            {activeTab === 'facilities' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-green-800">Facilities at Chung Bazaar</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {facilities.map((facility, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl mr-4">{facility.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{facility.name}</h3>
                        <p className="text-sm text-gray-600">Available daily</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-green-700">Salient Features</h3>
                <ul className="space-y-3">
                  {salientFeatures.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-lg mr-3 mt-1">{feature.icon}</span>
                      <span className="text-gray-700">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-green-800">Contact Information</h2>
                
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-green-700">Bazaar Details</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <FaUserFriends className="text-green-600 mt-1 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800">Focal Person</p>
                            <p>Ahmad Mahi ud Din</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaPhone className="text-green-600 mt-1 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800">Phone</p>
                            <p>0322-2211546</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaEnvelope className="text-green-600 mt-1 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800">Email</p>
                            <p>chung@psba.gop.pk</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-green-600 mt-1 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800">Address</p>
                            <p>Adalat Ali Shah Road, Multan Road Chung, Lahore</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-6">
                      <h3 className="text-lg font-semibold mb-4 text-green-700">Operational Details</h3>
                      <div className="space-y-3">
                        <p><span className="font-medium">Area:</span> 08 Kanals</p>
                        <p><span className="font-medium">Number of Stalls:</span> 164</p>
                        <p><span className="font-medium">Established Year:</span> June 2015</p>
                        <p><span className="font-medium">Operational Days:</span> 7 days a week</p>
                        <p><span className="font-medium">Timings:</span> 9:00 AM - 5:00 PM</p>
                        <p><span className="font-medium">Special Days:</span> Monday & Friday</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-700">
                    * Bazaar timings may differ according to local requirements, seasons, and weather conditions.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-4">
              {/* Map */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="bg-gray-300 h-48 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-2" />
                      <p className="font-semibold">Chung Bazaar Location</p>
                      <p className="text-sm text-gray-600">Adalat Ali Shah Road, Lahore</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-green-800">Location Map</h3>
                  <p className="text-gray-600 mb-4">Situated near the shrine of Adalat Ali Shah</p>
                  <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition duration-200">
                    Get Directions
                  </button>
                </div>
              </div>
              
              {/* Quick Facts */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold text-lg mb-4 text-green-800">Quick Facts</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Weekly Visitors</span>
                    <span className="font-semibold">20,000+</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Total Stalls</span>
                    <span className="font-semibold">164</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Established</span>
                    <span className="font-semibold">June 2015</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Area</span>
                    <span className="font-semibold">8 Kanals</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Special Days</span>
                    <span className="font-semibold">Monday & Friday</span>
                  </li>
                </ul>
              </div>
              
              {/* Customer Support */}
              <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                <h3 className="font-bold text-lg mb-3 text-green-800">Need Assistance?</h3>
                <p className="text-gray-700 mb-4">Our complaint cell is ready to help with any issues or inquiries.</p>
                <div className="flex items-center mb-3">
                  <FaPhone className="text-green-600 mr-3" />
                  <span className="font-medium">(042) 111-176-262</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-green-600 mr-3" />
                  <span className="font-medium">info@psba.gop.pk</span>
                </div>
                <button className="mt-4 w-full bg-white border border-green-600 text-green-700 hover:bg-green-600 hover:text-white py-2 rounded-md transition duration-200">
                  Lodge a Complaint
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChungBazaar;