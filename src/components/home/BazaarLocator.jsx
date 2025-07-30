// src/components/home/BazaarLocator.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import bazaarsData  from '../../../BazaarData';

const BazaarLocator = () => {
  const [activeDistrict, setActiveDistrict] = useState('lahore');
  const [selectedBazaar, setSelectedBazaar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Generate districts from bazaar data (case-insensitive)
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(bazaarsData.map(b => b.district.toLowerCase()))];
    return uniqueDistricts.map(district => ({
      id: district,
      name: district.charAt(0).toUpperCase() + district.slice(1)
    }));
  }, [bazaarsData]);

  // Filter bazaars with case-insensitive matching
  const filteredBazaars = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const districtFilter = activeDistrict.toLowerCase();
    
    return bazaarsData.filter(bazaar => {
      const matchesDistrict = activeDistrict === 'all' || 
                             bazaar.district.toLowerCase() === districtFilter;
      
      const matchesSearch = !searchTerm || 
                           bazaar.name.toLowerCase().includes(term) ||
                           bazaar.location.toLowerCase().includes(term) ||
                           bazaar.district.toLowerCase().includes(term);
      
      return matchesDistrict && matchesSearch;
    });
  }, [bazaarsData, activeDistrict, searchTerm]);

  // useEffect(() => {
  //   if (selectedBazaar) {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }, [selectedBazaar]);

  const handleGetDirections = (googleMapsUrl) => {
    window.open(googleMapsUrl, '_blank');
  };

  // Helper component for info cards
  const InfoCard = ({ label, value }) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100">
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-green-800 font-medium">{value}</p>
    </div>
  );

  if (selectedBazaar) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
        <button 
          onClick={() => setSelectedBazaar(null)}
          className="mb-6 flex items-center text-green-700 hover:text-green-900 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Bazaars
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-2">{selectedBazaar.name}</h2>
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedBazaar.location}</span>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                Active
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bazaar Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Established" value={selectedBazaar.established} />
                <InfoCard label="Operational Days" value={selectedBazaar.operational_days} />
                <InfoCard label="Timings" value={selectedBazaar.timings} />
                <InfoCard label="Number of Stalls" value={selectedBazaar.stalls} />
                <InfoCard label="Area" value={selectedBazaar.area} />
                <InfoCard label="Focal Person" value={selectedBazaar.focal_person} />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Facilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedBazaar.facilities.map((facility, index) => (
                  <span key={index} className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm border border-green-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {facility}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Phone" value={selectedBazaar.contact.phone} />
                <InfoCard label="Email" value={selectedBazaar.contact.email} />
                <InfoCard label="Helpline" value={selectedBazaar.contact.helpline} />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location Map
              </h3>
              <div className="rounded-lg w-full h-64 overflow-hidden">
                <iframe
                  src={selectedBazaar.google_maps}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title={`Map for ${selectedBazaar.name}`}
                ></iframe>
              </div>
            </div>
            
            {selectedBazaar.special_days && selectedBazaar.special_days.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Special Discount Days
                </h4>
                <p className="text-yellow-700">
                  Special discounts available on: <span className="font-bold">{selectedBazaar.special_days.join(', ')}</span>
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Description
              </h4>
              <p className="text-blue-700">{selectedBazaar.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGetDirections(selectedBazaar.google_maps)}
                className="flex items-center bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex-1 min-w-[200px] justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors flex-1 min-w-[200px] justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Bazaar
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="bazaars" className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-green-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Nearest Bazaar
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover government-approved bazaars with essential commodities at controlled prices
          </motion.p>
          
          <motion.div 
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search bazaars by name, location or district..."
                className="w-full px-5 py-4 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pl-14"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 absolute left-5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 px-2">Filter by District:</h3>
          <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50">
            {districts.map((district) => (
              <motion.button
                key={district.id}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-medium transition-all text-sm md:text-base mx-1 ${
                  activeDistrict === district.id
                    ? 'bg-green-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 shadow-sm border border-gray-200'
                }`}
                onClick={() => setActiveDistrict(district.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {district.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-5 bg-gradient-to-r from-green-700 to-green-800 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-0">
                {districts.find(d => d.id === activeDistrict)?.name} Bazaars
              </h3>
              <span className="bg-green-600 px-4 py-1.5 rounded-lg text-sm">
                {filteredBazaars.length} {filteredBazaars.length === 1 ? 'Bazaar' : 'Bazaars'}
              </span>
            </div>
          </div>
          
          <div className="p-5">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : filteredBazaars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBazaars.map((bazaar) => (
                  <motion.div
                    key={bazaar.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-green-200 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-green-900">{bazaar.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                          Active
                        </span>
                      </div>
                      
                      <div className="flex items-start text-gray-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{bazaar.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {bazaar.established}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {bazaar.stalls} stalls
                        </div>
                      </div>
                      
                      <div className="flex justify-between gap-3">
                        <motion.button
                          className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleGetDirections(bazaar.google_maps)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Directions
                        </motion.button>
                        <motion.button
                          className="flex-1 bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-2.5 rounded-lg text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedBazaar(bazaar)}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-700 mb-3">No bazaars found</h4>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchTerm 
                    ? `No bazaars match your search for "${searchTerm}" in ${districts.find(d => d.id === activeDistrict)?.name}`
                    : `Currently no bazaars are available in ${districts.find(d => d.id === activeDistrict)?.name}. Try selecting a different district.`}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveDistrict('lahore');
                  }}
                  className="mt-4 text-green-700 hover:text-green-900 font-medium underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BazaarLocator;

// // src/components/home/BazaarLocator.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import districts from '../data/districts';
// import bazaars from '../../../BazaarData';

// const BazaarLocator = () => {
//   const [activeDistrict, setActiveDistrict] = useState('lahore');
//   const [selectedBazaar, setSelectedBazaar] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOption, setSortOption] = useState('default');
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [filteredBazaars, setFilteredBazaars] = useState([]);

//   // Parse distance strings into comparable numbers (in meters)
//   const parseDistance = (distanceStr) => {
//     if (!distanceStr) return 0;
//     if (distanceStr.includes('km')) {
//       return parseFloat(distanceStr.replace('km', '')) * 1000;
//     }
//     return parseFloat(distanceStr.replace('m', ''));
//   };

//   // Parse commodity counts from strings
//   const parseCommodityCount = (commodityStr) => {
//     const match = commodityStr.match(/\d+/);
//     return match ? parseInt(match[0], 10) : 0;
//   };

//   // Apply filtering and sorting
//   useEffect(() => {
//     let results = bazaars.filter(bazaar => 
//       bazaar.district === activeDistrict && 
//       (
//         bazaar.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//         bazaar.address.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );

//     // Apply sorting
//     switch (sortOption) {
//       case 'distance':
//         results.sort((a, b) => {
//           const aDist = parseDistance(a.distance);
//           const bDist = parseDistance(b.distance);
//           return sortDirection === 'asc' ? aDist - bDist : bDist - aDist;
//         });
//         break;
//       case 'commodities':
//         results.sort((a, b) => {
//           const aCount = parseCommodityCount(a.commodities);
//           const bCount = parseCommodityCount(b.commodities);
//           return sortDirection === 'asc' ? aCount - bCount : bCount - aCount;
//         });
//         break;
//       case 'alphabetical':
//         results.sort((a, b) => {
//           const nameA = a.name.toLowerCase();
//           const nameB = b.name.toLowerCase();
//           return sortDirection === 'asc' 
//             ? nameA.localeCompare(nameB) 
//             : nameB.localeCompare(nameA);
//         });
//         break;
//       case 'status':
//         results.sort((a, b) => {
//           if (a.status === b.status) return 0;
//           return sortDirection === 'asc' 
//             ? (a.status === 'open' ? -1 : 1)
//             : (a.status === 'open' ? 1 : -1);
//         });
//         break;
//       default:
//         // Default sorting (original order)
//         break;
//     }

//     setFilteredBazaars(results);
//   }, [activeDistrict, searchTerm, sortOption, sortDirection]);

//   const handleGetDirections = (bazaar) => {
//     const { lat, lng } = bazaar.coordinates;
//     window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
//   };

//   const toggleSortDirection = () => {
//     setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//   };

//   // ... rest of the component remains the same until the bazaar list section ...

//   return (
//     <section id="bazaars" className="py-20 bg-gradient-to-b from-green-50 to-yellow-50">
//       <div className="container mx-auto px-4">
//         {/* ... (unchanged header and search section) ... */}

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 bg-green-800 text-white">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-0">
//                 {districts.find(d => d.id === activeDistrict)?.name} Bazaars
//               </h3>
//               <span className="bg-green-600 px-4 py-1 rounded-full">
//                 {filteredBazaars.length} {filteredBazaars.length === 1 ? 'Location' : 'Locations'}
//               </span>
//             </div>
//           </div>
          
//           <div className="p-6">
//             {/* Sorting Controls */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <p className="text-gray-700">
//                 Showing <span className="font-medium">{filteredBazaars.length}</span> bazaars
//               </p>
              
//               <div className="flex flex-wrap items-center gap-3">
//                 <div className="flex items-center">
//                   <label htmlFor="sort-options" className="text-gray-700 mr-2 whitespace-nowrap">
//                     Sort by:
//                   </label>
//                   <select 
//                     id="sort-options"
//                     value={sortOption}
//                     onChange={(e) => setSortOption(e.target.value)}
//                     className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   >
//                     <option value="default">Default</option>
//                     <option value="distance">Distance</option>
//                     <option value="commodities">Commodities</option>
//                     <option value="alphabetical">Name</option>
//                     <option value="status">Status</option>
//                   </select>
//                 </div>
                
//                 {sortOption !== 'default' && (
//                   <motion.button
//                     className="flex items-center text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-2 rounded-lg transition-colors"
//                     onClick={toggleSortDirection}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <span className="mr-1">{sortDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" : "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"} />
//                     </svg>
//                   </motion.button>
//                 )}
//               </div>
//             </div>

//             {filteredBazaars.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredBazaars.map((bazaar) => (
//                   <motion.div
//                     key={bazaar.id}
//                     className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
//                   >
//                     {/* ... (unchanged bazaar card content) ... */}
//                   </motion.div>
//                 ))}
//               </div>
//             ) : (
//               // ... (unchanged no results section)
//               <p className="text-gray-600 max-w-md mx-auto">
//                   {searchTerm 
//                     ? `No bazaars match your search for "${searchTerm}" in ${districts.find(d => d.id === activeDistrict)?.name}`
//                     : `Currently no bazaars are available in ${districts.find(d => d.id === activeDistrict)?.name}. Try selecting a different district.`}
//                 </p>
//               )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BazaarLocator;

// src/components/BazaarLocator.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const BazaarLocator = () => {
//   const [activeDistrict, setActiveDistrict] = useState('lahore');
//   const [selectedBazaar, setSelectedBazaar] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  
//   const districts = [
//     { id: 'lahore', name: 'Lahore' },
//     { id: 'faisalabad', name: 'Faisalabad' },
//     { id: 'rawalpindi', name: 'Rawalpindi' },
//     { id: 'multan', name: 'Multan' },
//     { id: 'gujranwala', name: 'Gujranwala' },
//     { id: 'bahawalpur', name: 'Bahawalpur' },
//     { id: 'sialkot', name: 'Sialkot' },
//     { id: 'sargodha', name: 'Sargodha' },
//     { id: 'dgkhan', name: 'D.G. Khan' }
//   ];
  
//   // Sample bazaar data (36 items)
//   const bazaars = [
//     { 
//       id: 1,
//       name: 'Gulberg Sahulat Bazaar', 
//       district: 'lahore',
//       address: 'Main Boulevard, Gulberg III, Lahore',
//       timings: '8:00 AM - 8:00 PM',
//       status: 'open',
//       commodities: 35,
//       distance: '2.5 km',
//       description: 'One of the largest bazaars in Lahore offering a wide variety of daily essentials at government-controlled prices. Features dedicated sections for fruits, vegetables, and household items.',
//       manager: 'Ali Raza Khan',
//       contact: '042-37895421',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Drinking Water'],
//       coordinates: { lat: 31.5204, lng: 74.3587 }
//     },
//     { 
//       id: 2,
//       name: 'Model Town Bazaar', 
//       district: 'lahore',
//       address: 'Block H, Model Town, Lahore',
//       timings: '7:00 AM - 9:00 PM',
//       status: 'open',
//       commodities: 42,
//       distance: '5.1 km',
//       description: 'Established in 2010, this bazaar serves the Model Town community with fresh produce and essential commodities. Known for its cleanliness and organized layout.',
//       manager: 'Fatima Hassan',
//       contact: '042-37895422',
//       facilities: ['Parking', 'Restrooms', 'Security', 'ATM', 'Prayer Area'],
//       coordinates: { lat: 31.4901, lng: 74.3002 }
//     },
//     { 
//       id: 3,
//       name: 'Liberty Market Point', 
//       district: 'lahore',
//       address: 'Near Liberty Market, Gulberg, Lahore',
//       timings: '9:00 AM - 7:00 PM',
//       status: 'open',
//       commodities: 28,
//       distance: '3.2 km',
//       description: 'Conveniently located in the heart of Gulberg, this bazaar offers premium quality products at affordable prices. Specializes in imported fruits and organic vegetables.',
//       manager: 'Bilal Ahmed',
//       contact: '042-37895423',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Food Court'],
//       coordinates: { lat: 31.5158, lng: 74.3451 }
//     },
//     { 
//       id: 4,
//       name: 'Faisalabad Central', 
//       district: 'faisalabad',
//       address: 'Clock Tower, Faisalabad',
//       timings: '8:00 AM - 8:00 PM',
//       status: 'open',
//       commodities: 38,
//       distance: '12.3 km',
//       description: 'The main bazaar in Faisalabad serving the entire district. Features over 100 stalls with diverse products from local farmers and manufacturers.',
//       manager: 'Usman Malik',
//       contact: '041-27895424',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Drinking Water', 'ATM'],
//       coordinates: { lat: 31.4180, lng: 73.0770 }
//     },
//     { 
//       id: 5,
//       name: 'Rawalpindi Saddar', 
//       district: 'rawalpindi',
//       address: 'Bank Road, Saddar, Rawalpindi',
//       timings: '8:00 AM - 8:00 PM',
//       status: 'open',
//       commodities: 40,
//       distance: '18.7 km',
//       description: 'Historical bazaar established in 1985, known for its traditional products and cultural significance. Offers special discounts on weekends.',
//       manager: 'Sara Khan',
//       contact: '051-47895425',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Prayer Area', 'Food Court'],
//       coordinates: { lat: 33.5952, lng: 73.0428 }
//     },
//     { 
//       id: 6,
//       name: 'Multan Ghanta Ghar', 
//       district: 'multan',
//       address: 'Near Ghanta Ghar, Multan',
//       timings: '7:30 AM - 9:30 PM',
//       status: 'open',
//       commodities: 36,
//       distance: '42.5 km',
//       description: 'Famous for Multani specialties including dates, handicrafts, and traditional sweets. Features a dedicated section for local artisans.',
//       manager: 'Zainab Ali',
//       contact: '061-57895426',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Tourist Information'],
//       coordinates: { lat: 30.1984, lng: 71.4687 }
//     },
//     { 
//       id: 7,
//       name: 'Gujranwala Food Street', 
//       district: 'gujranwala',
//       address: 'GT Road, Gujranwala',
//       timings: '8:00 AM - 10:00 PM',
//       status: 'open',
//       commodities: 33,
//       distance: '35.8 km',
//       description: 'Specializes in Punjabi cuisine ingredients and local delicacies. Known for its vibrant atmosphere and cultural events.',
//       manager: 'Omar Farooq',
//       contact: '055-37895427',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Food Court', 'Cultural Stage'],
//       coordinates: { lat: 32.1617, lng: 74.1883 }
//     },
//     { 
//       id: 8,
//       name: 'Bahawalpur Darbar', 
//       district: 'bahawalpur',
//       address: 'Near Darbar Mahal, Bahawalpur',
//       timings: '9:00 AM - 8:00 PM',
//       status: 'open',
//       commodities: 29,
//       distance: '68.9 km',
//       description: 'Royal bazaar with traditional architecture offering premium quality products. Features handicrafts from Cholistan desert.',
//       manager: 'Hassan Shah',
//       contact: '062-27895428',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Tourist Information', 'ATM'],
//       coordinates: { lat: 29.3952, lng: 71.6700 }
//     },
//     { id: 9, name: 'Johar Town Bazaar', district: 'lahore', address: 'Block D, Johar Town', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 31, distance: '4.2 km', coordinates: { lat: 31.4680, lng: 74.2679 } },
//     { id: 10, name: 'Wapda Town Market', district: 'lahore', address: 'Wapda Town, Lahore', timings: '7:30 AM - 9:00 PM', status: 'open', commodities: 27, distance: '6.8 km', coordinates: { lat: 31.4778, lng: 74.3309 } },
//     { id: 11, name: 'DHA Phase 5', district: 'lahore', address: 'Phase 5, DHA Lahore', timings: '9:00 AM - 8:00 PM', status: 'open', commodities: 25, distance: '7.5 km', coordinates: { lat: 31.4795, lng: 74.3668 } },
//     { id: 12, name: 'Ichhra Bazaar', district: 'lahore', address: 'Main Ichhra Road', timings: '7:00 AM - 10:00 PM', status: 'open', commodities: 45, distance: '3.8 km', coordinates: { lat: 31.4808, lng: 74.2632 } },
//     { id: 13, name: 'Township Market', district: 'lahore', address: 'Township Sector B', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 32, distance: '5.6 km', coordinates: { lat: 31.4945, lng: 74.2817 } },
//     { id: 14, name: 'Cantt Bazaar', district: 'lahore', address: 'Lahore Cantonment', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 28, distance: '4.9 km', coordinates: { lat: 31.5240, lng: 74.3678 } },
//     { id: 15, name: 'Shadman Market', district: 'lahore', address: 'Shadman Colony', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 30, distance: '3.1 km', coordinates: { lat: 31.5379, lng: 74.3154 } },
//     { id: 16, name: 'Samnabad Bazaar', district: 'lahore', address: 'Main Samnabad Road', timings: '7:00 AM - 10:00 PM', status: 'open', commodities: 40, distance: '8.2 km', coordinates: { lat: 31.5320, lng: 74.3010 } },
//     { id: 17, name: 'Faisal Town Market', district: 'lahore', address: 'Faisal Town Block A', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 26, distance: '6.7 km', coordinates: { lat: 31.4980, lng: 74.2510 } },
//     { id: 18, name: 'Garden Town Bazaar', district: 'lahore', address: 'Garden Town Main Blvd', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 29, distance: '5.3 km', coordinates: { lat: 31.4880, lng: 74.2800 } },
//     { id: 19, name: 'Faisalabad Ghulam Muhammad Abad', district: 'faisalabad', address: 'Ghulam Muhammad Abad', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 34, distance: '13.5 km', coordinates: { lat: 31.3800, lng: 73.0800 } },
//     { id: 20, name: 'Faisalabad Peoples Colony', district: 'faisalabad', address: 'Peoples Colony', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 31, distance: '14.2 km', coordinates: { lat: 31.4300, lng: 73.1100 } },
//     { id: 21, name: 'Rawalpindi Raja Bazaar', district: 'rawalpindi', address: 'Raja Bazaar Main', timings: '7:30 AM - 9:30 PM', status: 'open', commodities: 48, distance: '19.3 km', coordinates: { lat: 33.6000, lng: 73.0500 } },
//     { id: 22, name: 'Rawalpindi Satellite Town', district: 'rawalpindi', address: 'Satellite Town Market', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 33, distance: '20.1 km', coordinates: { lat: 33.6200, lng: 73.0800 } },
//     { id: 23, name: 'Multan Chowk Bazaar', district: 'multan', address: 'Chowk Bazaar', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 37, distance: '43.2 km', coordinates: { lat: 30.2000, lng: 71.4700 } },
//     { id: 24, name: 'Multan Shah Rukn-e-Alam', district: 'multan', address: 'Near Shah Rukn-e-Alam', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 32, distance: '44.0 km', coordinates: { lat: 30.1900, lng: 71.4600 } },
//     { id: 25, name: 'Gujranwala Sialkot Bypass', district: 'gujranwala', address: 'Sialkot Bypass Road', timings: '8:00 AM - 10:00 PM', status: 'open', commodities: 35, distance: '36.5 km', coordinates: { lat: 32.1700, lng: 74.2000 } },
//     { id: 26, name: 'Gujranwala Chenab Nagar', district: 'gujranwala', address: 'Chenab Nagar Market', timings: '7:30 AM - 9:30 PM', status: 'open', commodities: 30, distance: '37.2 km', coordinates: { lat: 32.1500, lng: 74.1800 } },
//     { id: 27, name: 'Bahawalpur Model Town', district: 'bahawalpur', address: 'Model Town A Block', timings: '9:00 AM - 9:00 PM', status: 'open', commodities: 28, distance: '69.5 km', coordinates: { lat: 29.4000, lng: 71.6800 } },
//     { id: 28, name: 'Bahawalpur Satellite Town', district: 'bahawalpur', address: 'Satellite Town Market', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 26, distance: '70.2 km', coordinates: { lat: 29.3900, lng: 71.6600 } },
//     { id: 29, name: 'Sialkot Cantt Bazaar', district: 'sialkot', address: 'Cantt Area', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 31, distance: '52.3 km', coordinates: { lat: 32.5000, lng: 74.5300 } },
//     { id: 30, name: 'Sialkot Allama Iqbal Road', district: 'sialkot', address: 'Allama Iqbal Road', timings: '8:30 AM - 9:30 PM', status: 'open', commodities: 34, distance: '53.1 km', coordinates: { lat: 32.4900, lng: 74.5100 } },
//     { id: 31, name: 'Sargodha Satellite Town', district: 'sargodha', address: 'Satellite Town Market', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 29, distance: '62.4 km', coordinates: { lat: 32.0800, lng: 72.6700 } },
//     { id: 32, name: 'Sargodha Jinnah Road', district: 'sargodha', address: 'Jinnah Road', timings: '7:30 AM - 9:30 PM', status: 'open', commodities: 33, distance: '63.2 km', coordinates: { lat: 32.0700, lng: 72.6900 } },
//     { id: 33, name: 'DG Khan Ghazi Road', district: 'dgkhan', address: 'Ghazi Road', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 27, distance: '85.7 km', coordinates: { lat: 30.0500, lng: 70.6300 } },
//     { id: 34, name: 'DG Khan Fort Road', district: 'dgkhan', address: 'Near Fort', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 25, distance: '86.5 km', coordinates: { lat: 30.0400, lng: 70.6500 } },
//     { id: 35, name: 'Rawalpindi Commercial Market', district: 'rawalpindi', address: 'Commercial Area', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 36, distance: '21.3 km', coordinates: { lat: 33.6100, lng: 73.0600 } },
//     { id: 36, name: 'Multan Bosan Road', district: 'multan', address: 'Bosan Road', timings: '8:00 AM - 10:00 PM', status: 'open', commodities: 39, distance: '45.1 km', coordinates: { lat: 30.2100, lng: 71.4800 } }
//   ];

//   // Filter bazaars based on district and search term
//   const filteredBazaars = bazaars.filter(bazaar => 
//     bazaar.district === activeDistrict && 
//     (bazaar.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//      bazaar.address.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // Sort bazaars
//   const sortedBazaars = [...filteredBazaars].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleGetDirections = (bazaar) => {
//     const { lat, lng } = bazaar.coordinates;
//     window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
//   };

//   if (selectedBazaar) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
//         <button 
//           onClick={() => setSelectedBazaar(null)}
//           className="mb-6 flex items-center text-green-700 hover:text-green-900"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back to Bazaars
//         </button>
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-3xl font-bold text-green-900 mb-4">{selectedBazaar.name}</h2>
//             <div className="flex items-center text-gray-600 mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               <span>{selectedBazaar.address}</span>
//             </div>
            
//             <div className="bg-gray-50 rounded-xl p-5 mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-3">Bazaar Information</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-gray-700 font-medium">Operating Hours</p>
//                   <p className="text-green-800">{selectedBazaar.timings}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-medium">Contact</p>
//                   <p className="text-green-800">{selectedBazaar.contact}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-medium">Manager</p>
//                   <p className="text-green-800">{selectedBazaar.manager}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-medium">Commodities Available</p>
//                   <p className="text-green-800">{selectedBazaar.commodities}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-3">Facilities</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedBazaar.facilities.map((facility, index) => (
//                   <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                     {facility}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold text-green-800 mb-3">About This Bazaar</h3>
//               <p className="text-gray-700">{selectedBazaar.description}</p>
//             </div>
//           </div>
          
//           <div>
//             <div className="bg-gray-100 rounded-xl p-4 mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-3">Location Map</h3>
//               <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center">
//                 <div className="text-center text-gray-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                   </svg>
//                   Interactive Google Map
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
//               <h4 className="text-lg font-bold text-yellow-800 mb-2">Important Notice</h4>
//               <p className="text-yellow-700">
//                 This bazaar follows all government SOPs for COVID-19. Please wear a mask and maintain social distancing during your visit.
//               </p>
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => handleGetDirections(selectedBazaar)}
//                 className="flex items-center bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//                 Get Directions
//               </button>
              
//               <button className="bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors">
//                 Share This Bazaar
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section id="bazaars" className="py-16 bg-gradient-to-b from-green-50 to-yellow-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center max-w-4xl mx-auto mb-12">
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold text-green-900 mb-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Punjab Bazaars Directory
//           </motion.h2>
//           <motion.p 
//             className="text-lg text-green-800 mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             Find your nearest Sahulat Bazaar with all essential commodities at government rates
//           </motion.p>
          
//           <div className="relative max-w-2xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search bazaars by name or location..."
//               className="w-full px-5 py-4 bg-white rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pl-12"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-center gap-3 mb-8">
//           {districts.map((district) => (
//             <motion.button
//               key={district.id}
//               className={`px-5 py-2.5 rounded-full font-medium transition-all ${
//                 activeDistrict === district.id
//                   ? 'bg-green-700 text-white shadow-lg'
//                   : 'bg-white text-green-800 hover:bg-green-100 shadow-md'
//               }`}
//               onClick={() => setActiveDistrict(district.id)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {district.name}
//             </motion.button>
//           ))}
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 bg-green-800 text-white">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div>
//                 <h3 className="text-xl md:text-2xl font-bold mb-1">
//                   {districts.find(d => d.id === activeDistrict)?.name} District
//                 </h3>
//                 <p className="text-green-200">
//                   Showing {filteredBazaars.length} of {bazaars.filter(b => b.district === activeDistrict).length} bazaars
//                 </p>
//               </div>
//               <span className="bg-green-600 px-4 py-1.5 rounded-full text-sm mt-3 md:mt-0">
//                 {filteredBazaars.length} {filteredBazaars.length === 1 ? 'Bazaar' : 'Bazaars'}
//               </span>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-green-50">
//                 <tr>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort('name')}
//                   >
//                     <div className="flex items-center">
//                       Bazaar Name
//                       {sortConfig.key === 'name' && (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.direction === 'ascending' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//                         </svg>
//                       )}
//                     </div>
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort('distance')}
//                   >
//                     <div className="flex items-center">
//                       Distance
//                       {sortConfig.key === 'distance' && (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.direction === 'ascending' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//                         </svg>
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort('commodities')}
//                   >
//                     <div className="flex items-center">
//                       Commodities
//                       {sortConfig.key === 'commodities' && (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortConfig.direction === 'ascending' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//                         </svg>
//                       )}
//                     </div>
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {sortedBazaars.length > 0 ? (
//                   sortedBazaars.map((bazaar) => (
//                     <motion.tr 
//                       key={bazaar.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       whileHover={{ backgroundColor: '#f0fdf4' }}
//                       className="border-b border-gray-100"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium text-green-900">{bazaar.name}</div>
//                         <div className="text-sm text-gray-500 mt-1">{bazaar.timings}</div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <span className="text-sm">{bazaar.address}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {bazaar.distance}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           {bazaar.commodities} items
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
//                           bazaar.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {bazaar.status === 'open' ? 'Open' : 'Closed'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <motion.button
//                             className="text-green-700 hover:text-green-900"
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => handleGetDirections(bazaar)}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                             </svg>
//                           </motion.button>
//                           <motion.button
//                             className="text-blue-700 hover:text-blue-900"
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => setSelectedBazaar(bazaar)}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                           </motion.button>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-16 text-center">
//                       <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                       </svg>
//                       <h4 className="text-xl font-bold text-gray-700 mb-2">No bazaars found</h4>
//                       <p className="text-gray-600">
//                         {searchTerm 
//                           ? `No bazaars match your search for "${searchTerm}" in ${districts.find(d => d.id === activeDistrict)?.name}`
//                           : `Currently no bazaars are available in ${districts.find(d => d.id === activeDistrict)?.name}. Try selecting a different district.`}
//                       </p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           <div className="p-4 bg-green-50 border-t border-green-100">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p className="text-sm text-green-800 mb-2 md:mb-0">
//                 Showing <span className="font-medium">{filteredBazaars.length}</span> of <span className="font-medium">{bazaars.filter(b => b.district === activeDistrict).length}</span> bazaars
//               </p>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1.5 bg-white border border-green-300 rounded text-green-700 text-sm">
//                   Previous
//                 </button>
//                 <button className="px-3 py-1.5 bg-green-700 text-white rounded text-sm">
//                   1
//                 </button>
//                 <button className="px-3 py-1.5 bg-white border border-green-300 rounded text-green-700 text-sm">
//                   2
//                 </button>
//                 <button className="px-3 py-1.5 bg-white border border-green-300 rounded text-green-700 text-sm">
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BazaarLocator;

// // // // src/components/home/BazaarLocator.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const BazaarLocator = () => {
//   const [activeDistrict, setActiveDistrict] = useState('lahore');
//   const [selectedBazaar, setSelectedBazaar] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const districts = [
//     { id: 'lahore', name: 'Lahore' },
//     { id: 'faisalabad', name: 'Faisalabad' },
//     { id: 'rawalpindi', name: 'Rawalpindi' },
//     { id: 'multan', name: 'Multan' },
//     { id: 'gujranwala', name: 'Gujranwala' },
//     { id: 'bahawalpur', name: 'Bahawalpur' },
//     { id: 'sialkot', name: 'Sialkot' },
//     { id: 'sargodha', name: 'Sargodha' },
//     { id: 'dgkhan', name: 'D.G. Khan' }
//   ];
  
//   const bazaars = [
//     { 
//       id: 1,
//       name: 'Chung', 
//       district: 'lahore',
//       location: "Adda #63, Gujjar Pura, China Scheme Lahore",
//     google_maps: "https://maps.google.com/maps?q=Model%20Bazaar%20China%20Scheme&t=m&z=10&output=embed&iwloc=near",
//     area: "32 Kanals",
//     stalls: 479,
//     established: "May 2015",
//     operational_days: "7 days a week (as per local requirement)",
//     timings: "09:00 am – 07:00 pm",
//     facilities: [
//       "Specialized engineered roof structure",
//       "Fresh fruits & vegetables at DC rate",
//       "Quality grocery items at competitive rates",
//       "Family-friendly environment",
//       "Sanitized washrooms",
//       "Shopping trolleys",
//       "CCTV surveillance",
//       "24/7 security personnel",
//       "Complaint resolution center"
//     ],
//     special_days: ["Tuesday"],
//     focal_person: "Muhammad Usman",
//     contact: {
//       phone: "042-37330254",
//       email: "chinascheme@psba.gop.pk",
//       helpline: "(042) 111-176-262"
//     },
//     description: "Situated near sports complex in Gujjar Pura area, serving Gujjar Pura, Kot Khawaja Saeed, Shad Bagh & Baghbanpura. Offers daily commodities at economical rates with family-friendly environment and shaded roofing structure. Weekly footfall exceeds 25,000 visitors.",
//     image: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-out-stores-2.png"
//     },
//     { 
//       id: 2,
//       name: 'Model Town Bazaar', 
//       district: 'lahore',
//       address: 'Block H, Model Town, Lahore',
//       timings: '7:00 AM - 9:00 PM',
//       status: 'open',
//       commodities: 42,
//       distance: '5.1 km',
//       description: 'Established in 2010, this bazaar serves the Model Town community with fresh produce and essential commodities. Known for its cleanliness and organized layout.',
//       manager: 'Fatima Hassan',
//       contact: '042-37895422',
//       facilities: ['Parking', 'Restrooms', 'Security', 'ATM', 'Prayer Area'],
//       coordinates: { lat: 31.4901, lng: 74.3002 }
//     },
//     { 
//       id: 3,
//       name: 'Liberty Market Point', 
//       district: 'lahore',
//       address: 'Near Liberty Market, Gulberg, Lahore',
//       timings: '9:00 AM - 7:00 PM',
//       status: 'open',
//       commodities: 28,
//       distance: '3.2 km',
//       description: 'Conveniently located in the heart of Gulberg, this bazaar offers premium quality products at affordable prices. Specializes in imported fruits and organic vegetables.',
//       manager: 'Bilal Ahmed',
//       contact: '042-37895423',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Food Court'],
//       coordinates: { lat: 31.5158, lng: 74.3451 }
//     },
//     { 
//       id: 4,
//       name: 'Faisalabad Central', 
//       district: 'faisalabad',
//       address: 'Clock Tower, Faisalabad',
//       timings: '8:00 AM - 8:00 PM',
//       status: 'open',
//       commodities: 38,
//       distance: '12.3 km',
//       description: 'The main bazaar in Faisalabad serving the entire district. Features over 100 stalls with diverse products from local farmers and manufacturers.',
//       manager: 'Usman Malik',
//       contact: '041-27895424',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Drinking Water', 'ATM'],
//       coordinates: { lat: 31.4180, lng: 73.0770 }
//     },
//     { 
//       id: 5,
//       name: 'Rawalpindi Saddar', 
//       district: 'rawalpindi',
//       address: 'Bank Road, Saddar, Rawalpindi',
//       timings: '8:00 AM - 8:00 PM',
//       status: 'open',
//       commodities: 40,
//       distance: '18.7 km',
//       description: 'Historical bazaar established in 1985, known for its traditional products and cultural significance. Offers special discounts on weekends.',
//       manager: 'Sara Khan',
//       contact: '051-47895425',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Prayer Area', 'Food Court'],
//       coordinates: { lat: 33.5952, lng: 73.0428 }
//     },
//     { 
//       id: 6,
//       name: 'Multan Ghanta Ghar', 
//       district: 'multan',
//       address: 'Near Ghanta Ghar, Multan',
//       timings: '7:30 AM - 9:30 PM',
//       status: 'open',
//       commodities: 36,
//       distance: '42.5 km',
//       description: 'Famous for Multani specialties including dates, handicrafts, and traditional sweets. Features a dedicated section for local artisans.',
//       manager: 'Zainab Ali',
//       contact: '061-57895426',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Tourist Information'],
//       coordinates: { lat: 30.1984, lng: 71.4687 }
//     },
//     { 
//       id: 7,
//       name: 'Gujranwala Food Street', 
//       district: 'gujranwala',
//       address: 'GT Road, Gujranwala',
//       timings: '8:00 AM - 10:00 PM',
//       status: 'open',
//       commodities: 33,
//       distance: '35.8 km',
//       description: 'Specializes in Punjabi cuisine ingredients and local delicacies. Known for its vibrant atmosphere and cultural events.',
//       manager: 'Omar Farooq',
//       contact: '055-37895427',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Food Court', 'Cultural Stage'],
//       coordinates: { lat: 32.1617, lng: 74.1883 }
//     },
//     { 
//       id: 8,
//       name: 'Bahawalpur Darbar', 
//       district: 'bahawalpur',
//       address: 'Near Darbar Mahal, Bahawalpur',
//       timings: '9:00 AM - 8:00 PM',
//       status: 'open',
//       commodities: 29,
//       distance: '68.9 km',
//       description: 'Royal bazaar with traditional architecture offering premium quality products. Features handicrafts from Cholistan desert.',
//       manager: 'Hassan Shah',
//       contact: '062-27895428',
//       facilities: ['Parking', 'Restrooms', 'Security', 'Tourist Information', 'ATM'],
//       coordinates: { lat: 29.3952, lng: 71.6700 }
//     },
//     // Additional bazaars to reach 36
//     { id: 9, name: 'Johar Town Bazaar', district: 'lahore', address: 'Block D, Johar Town', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 31, distance: '4.2 km', coordinates: { lat: 31.4680, lng: 74.2679 } },
//     { id: 10, name: 'Wapda Town Market', district: 'lahore', address: 'Wapda Town, Lahore', timings: '7:30 AM - 9:00 PM', status: 'open', commodities: 27, distance: '6.8 km', coordinates: { lat: 31.4778, lng: 74.3309 } },
//     { id: 11, name: 'DHA Phase 5', district: 'lahore', address: 'Phase 5, DHA Lahore', timings: '9:00 AM - 8:00 PM', status: 'open', commodities: 25, distance: '7.5 km', coordinates: { lat: 31.4795, lng: 74.3668 } },
//     { id: 12, name: 'Ichhra Bazaar', district: 'lahore', address: 'Main Ichhra Road', timings: '7:00 AM - 10:00 PM', status: 'open', commodities: 45, distance: '3.8 km', coordinates: { lat: 31.4808, lng: 74.2632 } },
//     { id: 13, name: 'Township Market', district: 'lahore', address: 'Township Sector B', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 32, distance: '5.6 km', coordinates: { lat: 31.4945, lng: 74.2817 } },
//     { id: 14, name: 'Cantt Bazaar', district: 'lahore', address: 'Lahore Cantonment', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 28, distance: '4.9 km', coordinates: { lat: 31.5240, lng: 74.3678 } },
//     { id: 15, name: 'Shadman Market', district: 'lahore', address: 'Shadman Colony', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 30, distance: '3.1 km', coordinates: { lat: 31.5379, lng: 74.3154 } },
//     { id: 16, name: 'Samnabad Bazaar', district: 'lahore', address: 'Main Samnabad Road', timings: '7:00 AM - 10:00 PM', status: 'open', commodities: 40, distance: '8.2 km', coordinates: { lat: 31.5320, lng: 74.3010 } },
//     { id: 17, name: 'Faisal Town Market', district: 'lahore', address: 'Faisal Town Block A', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 26, distance: '6.7 km', coordinates: { lat: 31.4980, lng: 74.2510 } },
//     { id: 18, name: 'Garden Town Bazaar', district: 'lahore', address: 'Garden Town Main Blvd', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 29, distance: '5.3 km', coordinates: { lat: 31.4880, lng: 74.2800 } },
//     { id: 19, name: 'Faisalabad Ghulam Muhammad Abad', district: 'faisalabad', address: 'Ghulam Muhammad Abad', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 34, distance: '13.5 km', coordinates: { lat: 31.3800, lng: 73.0800 } },
//     { id: 20, name: 'Faisalabad Peoples Colony', district: 'faisalabad', address: 'Peoples Colony', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 31, distance: '14.2 km', coordinates: { lat: 31.4300, lng: 73.1100 } },
//     { id: 21, name: 'Rawalpindi Raja Bazaar', district: 'rawalpindi', address: 'Raja Bazaar Main', timings: '7:30 AM - 9:30 PM', status: 'open', commodities: 48, distance: '19.3 km', coordinates: { lat: 33.6000, lng: 73.0500 } },
//     { id: 22, name: 'Rawalpindi Satellite Town', district: 'rawalpindi', address: 'Satellite Town Market', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 33, distance: '20.1 km', coordinates: { lat: 33.6200, lng: 73.0800 } },
//     { id: 23, name: 'Multan Chowk Bazaar', district: 'multan', address: 'Chowk Bazaar', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 37, distance: '43.2 km', coordinates: { lat: 30.2000, lng: 71.4700 } },
//     { id: 24, name: 'Multan Shah Rukn-e-Alam', district: 'multan', address: 'Near Shah Rukn-e-Alam', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 32, distance: '44.0 km', coordinates: { lat: 30.1900, lng: 71.4600 } },
//     { id: 25, name: 'Gujranwala Sialkot Bypass', district: 'gujranwala', address: 'Sialkot Bypass Road', timings: '8:00 AM - 10:00 PM', status: 'open', commodities: 35, distance: '36.5 km', coordinates: { lat: 32.1700, lng: 74.2000 } },
//     { id: 26, name: 'Gujranwala Chenab Nagar', district: 'gujranwala', address: 'Chenab Nagar Market', timings: '7:30 AM - 9:30 PM', status: 'open', commodities: 30, distance: '37.2 km', coordinates: { lat: 32.1500, lng: 74.1800 } },
//     { id: 27, name: 'Bahawalpur Model Town', district: 'bahawalpur', address: 'Model Town A Block', timings: '9:00 AM - 9:00 PM', status: 'open', commodities: 28, distance: '69.5 km', coordinates: { lat: 29.4000, lng: 71.6800 } },
//     { id: 28, name: 'Bahawalpur Satellite Town', district: 'bahawalpur', address: 'Satellite Town Market', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 26, distance: '70.2 km', coordinates: { lat: 29.3900, lng: 71.6600 } },
//     { id: 29, name: 'Sialkot Cantt Bazaar', district: 'sialkot', address: 'Cantt Area', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 31, distance: '52.3 km', coordinates: { lat: 32.5000, lng: 74.5300 } },
//     { id: 30, name: 'Sialkot Allama Iqbal Road', district: 'sialkot', address: 'Allama Iqbal Road', timings: '8:30 AM - 9:30 PM', status: 'open', commodities: 34, distance: '53.1 km', coordinates: { lat: 32.4900, lng: 74.5100 } },
//     { id: 31, name: 'Sargodha Satellite Town', district: 'sargodha', address: 'Satellite Town Market', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 29, distance: '62.4 km', coordinates: { lat: 32.0800, lng: 72.6700 } },
//     { id: 32, name: 'Sargodha Jinnah Road', district: 'sargodha', address: 'Jinnah Road', timings: '7:30 AM - 9:30 PM', status: 'open', commodities: 33, distance: '63.2 km', coordinates: { lat: 32.0700, lng: 72.6900 } },
//     { id: 33, name: 'DG Khan Ghazi Road', district: 'dgkhan', address: 'Ghazi Road', timings: '8:00 AM - 8:00 PM', status: 'open', commodities: 27, distance: '85.7 km', coordinates: { lat: 30.0500, lng: 70.6300 } },
//     { id: 34, name: 'DG Khan Fort Road', district: 'dgkhan', address: 'Near Fort', timings: '8:30 AM - 8:30 PM', status: 'open', commodities: 25, distance: '86.5 km', coordinates: { lat: 30.0400, lng: 70.6500 } },
//     { id: 35, name: 'Rawalpindi Commercial Market', district: 'rawalpindi', address: 'Commercial Area', timings: '8:00 AM - 9:00 PM', status: 'open', commodities: 36, distance: '21.3 km', coordinates: { lat: 33.6100, lng: 73.0600 } },
//     { id: 36, name: 'Multan Bosan Road', district: 'multan', address: 'Bosan Road', timings: '8:00 AM - 10:00 PM', status: 'open', commodities: 39, distance: '45.1 km', coordinates: { lat: 30.2100, lng: 71.4800 } }
//   ];

//   const filteredBazaars = bazaars.filter(bazaar => 
//     bazaar.district === activeDistrict && 
//     (bazaar.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//      bazaar.address.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleGetDirections = (bazaar) => {
//     const { lat, lng } = bazaar.coordinates;
//     window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
//   };

//   if (selectedBazaar) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
//         <button 
//           onClick={() => setSelectedBazaar(null)}
//           className="mb-6 flex items-center text-green-700 hover:text-green-900"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back to Bazaars
//         </button>
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-3xl font-bold text-green-900 mb-4">{selectedBazaar.name}</h2>
//             <div className="flex items-center text-gray-600 mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               <span>{selectedBazaar.address}</span>
//             </div>
            
//             <div className="bg-gray-50 rounded-xl p-5 mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-3">Bazaar Information</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-gray-700 font-medium">Operating Hours</p>
//                   <p className="text-green-800">{selectedBazaar.timings}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-medium">Contact</p>
//                   <p className="text-green-800">{selectedBazaar.contact}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-medium">Manager</p>
//                   <p className="text-green-800">{selectedBazaar.manager}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-700 font-medium">Commodities Available</p>
//                   <p className="text-green-800">{selectedBazaar.commodities}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-3">Facilities</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedBazaar.facilities.map((facility, index) => (
//                   <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                     {facility}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold text-green-800 mb-3">About This Bazaar</h3>
//               <p className="text-gray-700">{selectedBazaar.description}</p>
//             </div>
//           </div>
          
//           <div>
//             <div className="bg-gray-100 rounded-xl p-4 mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-3">Location Map</h3>
//               <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
//             </div>
            
//             <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
//               <h4 className="text-lg font-bold text-yellow-800 mb-2">Important Notice</h4>
//               <p className="text-yellow-700">
//                 This bazaar follows all government SOPs for COVID-19. Please wear a mask and maintain social distancing during your visit.
//               </p>
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => handleGetDirections(selectedBazaar)}
//                 className="flex items-center bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//                 Get Directions
//               </button>
              
//               <button className="bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors">
//                 Share This Bazaar
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section id="bazaars" className="py-20 bg-gradient-to-b from-green-50 to-yellow-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center max-w-4xl mx-auto mb-16">
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold text-green-900 mb-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Our Bazaars
//           </motion.h2>
//           <motion.p 
//             className="text-xl text-green-800 mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             Find your nearest Sahulat Bazaar with all essential commodities at government rates
//           </motion.p>
          
//           <div className="relative max-w-2xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search bazaars by name or location..."
//               className="w-full px-5 py-4 bg-white rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pl-12"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-center gap-3 mb-10">
//           {districts.map((district) => (
//             <motion.button
//               key={district.id}
//               className={`px-5 py-3 rounded-full font-medium transition-all ${
//                 activeDistrict === district.id
//                   ? 'bg-green-700 text-white shadow-lg'
//                   : 'bg-white text-green-800 hover:bg-green-100 shadow-md'
//               }`}
//               onClick={() => setActiveDistrict(district.id)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {district.name}
//             </motion.button>
//           ))}
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 bg-green-800 text-white">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-0">
//                 {districts.find(d => d.id === activeDistrict)?.name} Bazaars
//               </h3>
//               <span className="bg-green-600 px-4 py-1 rounded-full">
//                 {filteredBazaars.length} {filteredBazaars.length === 1 ? 'Location' : 'Locations'}
//               </span>
//             </div>
//           </div>
          
//           <div className="p-6">
//             {filteredBazaars.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredBazaars.map((bazaar) => (
//                   <motion.div
//                     key={bazaar.id}
//                     className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
//                   >
//                     <div className="p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <h4 className="text-xl font-bold text-green-900">{bazaar.name}</h4>
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           bazaar.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {bazaar.status === 'open' ? 'Open' : 'Closed'}
//                         </span>
//                       </div>
                      
//                       <div className="flex items-center text-gray-600 mb-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{bazaar.address}</span>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3 mb-4">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           {bazaar.timings}
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           {bazaar.distance}
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                           </svg>
//                           {bazaar.commodities} commodities
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between gap-3">
//                         <motion.button
//                           className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleGetDirections(bazaar)}
//                         >
//                           Directions
//                         </motion.button>
//                         <motion.button
//                           className="flex-1 bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-2.5 rounded-lg text-sm"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => setSelectedBazaar(bazaar)}
//                         >
//                           Details
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <svg className="w-20 h-20 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//                 <h4 className="text-2xl font-bold text-gray-700 mb-3">No bazaars found</h4>
//                 <p className="text-gray-600 max-w-md mx-auto">
//                   {searchTerm 
//                     ? `No bazaars match your search for "${searchTerm}" in ${districts.find(d => d.id === activeDistrict)?.name}`
//                     : `Currently no bazaars are available in ${districts.find(d => d.id === activeDistrict)?.name}. Try selecting a different district.`}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BazaarLocator;