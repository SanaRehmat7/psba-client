import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaShoppingCart,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import ChungBazaar from "../BazaarDetails/ChungBazaar"

// Mock data for bazaars (in a real app, this would come from an API)
const bazaarData = [
  {
    id: 1,
    name: "Chung Model Bazaar",
    location: "Adalat Ali Shah Road, Lahore",
    area: "08 Kanals",
    stalls: 164,
    established: "June 2015",
    timing: "9:00 AM - 5:00 PM",
    facilities: [
      "Vegetables & fruits",
      "Grocery items",
      "Canteen",
      "Garments section",
    ],
    specialDays: "Monday & Friday",
    focalPerson: "Ahmad Mahi ud Din",
    phone: "0322-2211546",
    email: "chung@psba.gop.pk",
    description:
      "Situated near the shrine of Adalat Ali Shah in the heart of Chung area, serving communities of Mohlanwal, Maraka, Izmir Town, and Bahira Town. Features specialized engineered roofing and family-friendly environment.",
    image: "chung",
  },
  {
    id: 2,
    name: "Shahdara Model Bazaar",
    location: "Shahdara Town, Lahore",
    area: "10 Kanals",
    stalls: 192,
    established: "March 2016",
    timing: "8:00 AM - 6:00 PM",
    facilities: ["Fresh produce", "Household items", "Bakery", "Clothing"],
    specialDays: "Tuesday & Saturday",
    focalPerson: "Muhammad Ali",
    phone: "0321-4567890",
    email: "shahdara@psba.gop.pk",
    description:
      "One of the largest model bazaars in Lahore with dedicated sections for different product categories and ample parking space.",
    image: "shahdara",
  },
  {
    id: 3,
    name: "Gulshan-e-Ravi Bazaar",
    location: "Gulshan-e-Ravi, Lahore",
    area: "6 Kanals",
    stalls: 120,
    established: "August 2017",
    timing: "9:30 AM - 5:30 PM",
    facilities: ["Vegetables", "Groceries", "Dairy products", "Electronics"],
    specialDays: "Wednesday & Sunday",
    focalPerson: "Fatima Khan",
    phone: "0300-1234567",
    email: "gulshan@psba.gop.pk",
    description:
      "Popular bazaar in the heart of Gulshan-e-Ravi with competitive prices and quality products.",
    image: "gulshan",
  },
  {
    id: 4,
    name: "Johar Town Bazaar",
    location: "Johar Town, Lahore",
    area: "12 Kanals",
    stalls: 210,
    established: "January 2018",
    timing: "8:30 AM - 7:00 PM",
    facilities: [
      "Organic section",
      "International foods",
      "Craft stalls",
      "Kids area",
    ],
    specialDays: "Friday & Sunday",
    focalPerson: "Bilal Ahmed",
    phone: "0333-9876543",
    email: "johar@psba.gop.pk",
    description:
      "Modern bazaar with a focus on premium products and family-friendly shopping experience.",
    image: "johar",
  },
  // Additional bazaars would follow the same structure
];

// Bazaar Card Component
const BazaarCard = ({ bazaar, onClick }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-shadow cursor-pointer"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    onClick={() => onClick(bazaar)}
  >
    <div className="bg-gray-200 h-48 flex items-center justify-center">
      <div className="bg-gray-300 border-2 border-dashed rounded-xl w-16 h-16" />
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-green-800 mb-2">{bazaar.name}</h3>
      <div className="flex items-center text-gray-600 mb-3">
        <FaMapMarkerAlt className="mr-2 text-green-600" />
        <span>{bazaar.location}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <FaClock className="mr-1" />
          <span>{bazaar.timing}</span>
        </div>
        <span>{bazaar.stalls} stalls</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {bazaar.facilities.slice(0, 3).map((facility, index) => (
          <span
            key={index}
            className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs"
          >
            {facility}
          </span>
        ))}
        {bazaar.facilities.length > 3 && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
            +{bazaar.facilities.length - 3} more
          </span>
        )}
      </div>
      <div className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md flex items-center justify-center transition duration-200">
        View Details <FaArrowRight className="ml-2 text-sm" />
      </div>
    </div>
  </motion.div>
);

// Bazaar Detail Component
const BazaarDetail = ({ bazaar, onClose }) => {
  if (!bazaar) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-md"
          onClick={<ChungBazaar />}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-8 px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {bazaar.name}
            </h1>
            <p className="text-lg mb-4">{bazaar.location}</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-green-600 bg-opacity-70 px-3 py-1 rounded-full text-sm flex items-center">
                <FaClock className="mr-1" /> {bazaar.timing}
              </span>
              <span className="bg-green-600 bg-opacity-70 px-3 py-1 rounded-full text-sm flex items-center">
                Established: {bazaar.established}
              </span>
              <span className="bg-green-600 bg-opacity-70 px-3 py-1 rounded-full text-sm flex items-center">
                {bazaar.stalls} Stalls
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4 text-green-800">
                About {bazaar.name}
              </h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                {bazaar.description}
              </p>

              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-green-700">
                  Salient Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Specialized engineered roof structure
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Fresh fruits & vegetables at DC rate
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Good quality grocery items at competitive rates
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Conducive family and business environment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">
                    Operational Details
                  </h3>
                  <ul className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
                    <li className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Area</span>
                      <span className="font-semibold">{bazaar.area}</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Number of Stalls</span>
                      <span className="font-semibold">{bazaar.stalls}</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Established Year</span>
                      <span className="font-semibold">
                        {bazaar.established}
                      </span>
                    </li>
                    <li className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Operational Days</span>
                      <span className="font-semibold">7 days a week</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b">
                      <span className="text-gray-600">Timings</span>
                      <span className="font-semibold">{bazaar.timing}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Special Days</span>
                      <span className="font-semibold">
                        {bazaar.specialDays}
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">
                    Facilities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {bazaar.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg shadow-sm flex items-center"
                      >
                        <div className="bg-green-100 p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700">
                  * Bazaar timings may differ according to local requirements,
                  seasons, and weather conditions.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/3">
              {/* Map */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="bg-gray-300 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-2" />
                    <p className="font-semibold">{bazaar.name} Location</p>
                    <p className="text-sm text-gray-600">{bazaar.location}</p>
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition duration-200">
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold text-lg mb-4 text-green-800">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaUserFriends className="text-green-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Focal Person</p>
                      <p>{bazaar.focalPerson}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaPhone className="text-green-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Phone</p>
                      <p>{bazaar.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaEnvelope className="text-green-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <p>{bazaar.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Bazaars */}
              <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-green-800">
                  Nearby Bazaars
                </h3>
                <ul className="space-y-3">
                  {bazaarData
                    .filter((b) => b.id !== bazaar.id)
                    .slice(0, 3)
                    .map((b) => (
                      <li
                        key={b.id}
                        className="flex items-center border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                        <div>
                          <p className="font-medium text-green-700">{b.name}</p>
                          <p className="text-xs text-gray-600">{b.location}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Bazaar Directory Component
const BazaarDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedBazaar, setSelectedBazaar] = useState(null);

  const filteredBazaars = bazaarData.filter((bazaar) => {
    const matchesSearch =
      bazaar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bazaar.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "large" && bazaar.stalls > 150) ||
      (filter === "medium" && bazaar.stalls >= 100 && bazaar.stalls <= 150) ||
      (filter === "small" && bazaar.stalls < 100);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
              Punjab Model Bazaars
            </motion.h1>
            <motion.p
              className="text-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover affordable, quality goods at government-regulated prices
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <motion.h2
            className="text-3xl font-bold text-green-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Explore Our Network of Bazaars
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With 36 model bazaars across Punjab, we bring quality products at
            controlled prices to communities throughout the province.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search bazaars by name or location..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className={`px-4 py-2 rounded-lg flex items-center ${
                  filter === "all"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setFilter("all")}
              >
                <FaFilter className="mr-2" /> All Bazaars
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === "large"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setFilter("large")}
              >
                Large (150+ stalls)
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === "medium"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setFilter("medium")}
              >
                Medium
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === "small"
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setFilter("small")}
              >
                Small
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm text-center border-t-4 border-green-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-3xl font-bold text-green-700">36</h3>
            <p className="text-gray-600">Model Bazaars</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm text-center border-t-4 border-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-blue-700">5,000+</h3>
            <p className="text-gray-600">Stalls</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm text-center border-t-4 border-amber-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-amber-700">1.2M+</h3>
            <p className="text-gray-600">Weekly Visitors</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm text-center border-t-4 border-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-purple-700">2015</h3>
            <p className="text-gray-600">Established</p>
          </motion.div>
        </div>

        {/* Bazaar Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {filteredBazaars.map((bazaar) => (
            <BazaarCard
              key={bazaar.id}
              bazaar={bazaar}
              onClick={setSelectedBazaar}
            />
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
              2
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
              3
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Bazaar Detail Modal */}
      {selectedBazaar && (
        <BazaarDetail
          bazaar={selectedBazaar}
          onClose={() => setSelectedBazaar(null)}
        />
      )}
    </div>
  );
};

export default BazaarDirectory;

// // src/pages/Bazaars.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useLanguage } from '../context/LanguageContext';
// import BazaarCard from '../bazaar/BazaarCard';
// import DistrictFilter from '../bazaar/DistrictFilter';
// import SearchBar from '../common/SearchBar';
// import MapViewToggle from '../components/bazaar/MapViewToggle';
// import BazaarMap from '../components/bazaar/BazaarMap';
// import Loader from '../components/common/Loader';

// const Bazaars = ({ data }) => {
//   const { language } = useLanguage();
//   const [bazaars, setBazaars] = useState([]);
//   const [filteredBazaars, setFilteredBazaars] = useState([]);
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMapView, setIsMapView] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Extract unique districts for filter
//   const districts = [...new Set(bazaars.map(bazaar => bazaar.district))].sort();

//   useEffect(() => {
//     // Simulate data loading
//     const timer = setTimeout(() => {
//       if (data && data.length > 0) {
//         setBazaars(data);
//         setFilteredBazaars(data);
//         setLoading(false);
//       }
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [data]);

//   useEffect(() => {
//     // Filter bazaars based on district and search query
//     let result = bazaars;

//     if (selectedDistrict) {
//       result = result.filter(bazaar => bazaar.district === selectedDistrict);
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(bazaar =>
//         bazaar.name.toLowerCase().includes(query) ||
//         bazaar.address.toLowerCase().includes(query) ||
//         bazaar.district.toLowerCase().includes(query)
//       );
//     }

//     setFilteredBazaars(result);
//   }, [selectedDistrict, searchQuery, bazaars]);

//   const handleDistrictChange = (district) => {
//     setSelectedDistrict(district);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const toggleView = () => {
//     setIsMapView(!isMapView);
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gray-50"
//     >
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-green-700 to-emerald-800 py-16 md:py-24">
//         <div className="absolute inset-0 bg-black opacity-30"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.h1
//             className="text-3xl md:text-5xl font-bold text-white text-center mb-6"
//             initial={{ y: -30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {language === 'en' ? 'Our Bazaars' : 'ہمارے بازار'}
//           </motion.h1>
//           <motion.p
//             className="text-xl text-white text-center max-w-3xl mx-auto mb-8"
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             {language === 'en'
//               ? 'Find the nearest Sahulat Bazaar offering quality essentials at affordable prices'
//               : 'قریبی سہولت بازار تلاش کریں جو معیاری ضروریات کو مناسب قیمتوں پر فراہم کرتا ہے'}
//           </motion.p>
//         </div>
//       </div>

//       {/* Controls Section */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//           <div className="w-full md:w-1/3">
//             <SearchBar
//               placeholder={language === 'en'
//                 ? "Search bazaars by name or location..."
//                 : "بازار کا نام یا مقام تلاش کریں..."}
//               onSearch={handleSearch}
//             />
//           </div>

//           <div className="flex flex-wrap gap-4 w-full md:w-auto">
//             <DistrictFilter
//               districts={districts}
//               selectedDistrict={selectedDistrict}
//               onSelectDistrict={handleDistrictChange}
//               allText={language === 'en' ? 'All Districts' : 'تمام اضلاع'}
//             />

//             <MapViewToggle
//               isMapView={isMapView}
//               onToggle={toggleView}
//               mapText={language === 'en' ? 'Map View' : 'نقشہ دیکھیں'}
//               listText={language === 'en' ? 'List View' : 'فہرست دیکھیں'}
//             />
//           </div>
//         </div>

//         {/* Results Info */}
//         <motion.div
//           className="mb-6 flex justify-between items-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <p className="text-lg text-green-800">
//             {language === 'en'
//               ? `Showing ${filteredBazaars.length} bazaars`
//               : `${filteredBazaars.length} بازار دکھائے جا رہے ہیں`}
//           </p>

//           {selectedDistrict && (
//             <button
//               onClick={() => setSelectedDistrict('')}
//               className="text-green-700 hover:text-green-900 flex items-center"
//             >
//               <span>{language === 'en' ? 'Clear filter' : 'فلٹر صاف کریں'}</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </button>
//           )}
//         </motion.div>

//         {/* Bazaars List/Map */}
//         {isMapView ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//           >
//             <div className="h-[500px] w-full">
//               <BazaarMap bazaars={filteredBazaars} />
//             </div>
//           </motion.div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredBazaars.length > 0 ? (
//               filteredBazaars.map((bazaar, index) => (
//                 <motion.div
//                   key={bazaar.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <BazaarCard bazaar={bazaar} />
//                 </motion.div>
//               ))
//             ) : (
//               <motion.div
//                 className="col-span-full text-center py-16"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <div className="text-gray-500 mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                   {language === 'en' ? 'No bazaars found' : 'کوئی بازار نہیں ملا'}
//                 </h3>
//                 <p className="text-gray-600">
//                   {language === 'en'
//                     ? 'Try adjusting your search or filter criteria'
//                     : 'اپنی تلاش یا فلٹر معیار کو ایڈجسٹ کرنے کی کوشش کریں'}
//                 </p>
//               </motion.div>
//             )}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Bazaars;
