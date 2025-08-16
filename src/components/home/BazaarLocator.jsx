import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const BazaarLocator = () => {
  const [activeDistrict, setActiveDistrict] = useState('lahore');
  const [selectedBazaar, setSelectedBazaar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [bazaarsData, setBazaarsData] = useState([]);

  useEffect(() => {
    const fetchBazaars = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('http://localhost:5000/api/bazaars/public');
        // Filter for approved bazaars to match seeded data intent
        const approvedBazaars = res.data.filter(bazaar => bazaar.status === 'approved');
        setBazaarsData(approvedBazaars);
      } catch (err) {
        console.error('Error fetching bazaars:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBazaars();
  }, []);

  // Generate districts from fetched bazaar data (case-insensitive)
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(bazaarsData.map(b => b.district.toLowerCase()))];
    return ['all', ...uniqueDistricts].map(district => ({
      id: district,
      name: district === 'all' ? 'All' : district.charAt(0).toUpperCase() + district.slice(1)
    }));
  }, [bazaarsData]);

  // Filter bazaars with case-insensitive matching
  const filteredBazaars = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const districtFilter = activeDistrict.toLowerCase();
    
    return bazaarsData.filter(bazaar => {
      const matchesDistrict = districtFilter === 'all' || 
                             bazaar.district.toLowerCase() === districtFilter;
      
      const matchesSearch = !searchTerm || 
                           bazaar.name.toLowerCase().includes(term) ||
                           bazaar.location.toLowerCase().includes(term) ||
                           bazaar.district.toLowerCase().includes(term);
      
      return matchesDistrict && matchesSearch;
    });
  }, [bazaarsData, activeDistrict, searchTerm]);

  const handleGetDirections = (googleMapsUrl) => {
    window.open(googleMapsUrl, '_blank');
  };

  // Helper component for info cards
  const InfoCard = ({ label, value }) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100">
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-green-800 font-medium">{value || 'N/A'}</p>
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
            
            {selectedBazaar.Joyland_timings && (
              <div className="bg-blue-100 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Joyland Timings
                </h4>
                <p className="text-blue-700">{selectedBazaar.Joyland_timings}</p>
              </div>
            )}
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V7a2 2 0 012-2H5a2 2 0 012 2v12a2 2 0 002 2z" />
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
            Find Your Nearest Sahulat Bazaar
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover government-approved Sahulat Bazaars with essential commodities at controlled prices
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
                placeholder="Search bazaars by name, location, or district..."
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

// import React, { useState, useEffect, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import bazaarsData  from '../../../BazaarData';

// const BazaarLocator = () => {
//   const [activeDistrict, setActiveDistrict] = useState('lahore');
//   const [selectedBazaar, setSelectedBazaar] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   // Generate districts from bazaar data (case-insensitive)
//   const districts = useMemo(() => {
//     const uniqueDistricts = [...new Set(bazaarsData.map(b => b.district.toLowerCase()))];
//     return uniqueDistricts.map(district => ({
//       id: district,
//       name: district.charAt(0).toUpperCase() + district.slice(1)
//     }));
//   }, [bazaarsData]);

//   // Filter bazaars with case-insensitive matching
//   const filteredBazaars = useMemo(() => {
//     const term = searchTerm.toLowerCase();
//     const districtFilter = activeDistrict.toLowerCase();
    
//     return bazaarsData.filter(bazaar => {
//       const matchesDistrict = activeDistrict === 'all' || 
//                              bazaar.district.toLowerCase() === districtFilter;
      
//       const matchesSearch = !searchTerm || 
//                            bazaar.name.toLowerCase().includes(term) ||
//                            bazaar.location.toLowerCase().includes(term) ||
//                            bazaar.district.toLowerCase().includes(term);
      
//       return matchesDistrict && matchesSearch;
//     });
//   }, [bazaarsData, activeDistrict, searchTerm]);

//   // useEffect(() => {
//   //   if (selectedBazaar) {
//   //     window.scrollTo({ top: 0, behavior: 'smooth' });
//   //   }
//   // }, [selectedBazaar]);

//   const handleGetDirections = (googleMapsUrl) => {
//     window.open(googleMapsUrl, '_blank');
//   };

//   // Helper component for info cards
//   const InfoCard = ({ label, value }) => (
//     <div className="bg-white p-3 rounded-lg border border-gray-100">
//       <p className="text-gray-600 text-sm font-medium">{label}</p>
//       <p className="text-green-800 font-medium">{value}</p>
//     </div>
//   );

//   if (selectedBazaar) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
//         <button 
//           onClick={() => setSelectedBazaar(null)}
//           className="mb-6 flex items-center text-green-700 hover:text-green-900 font-medium"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back to Bazaars
//         </button>
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <div className="flex items-start justify-between mb-6">
//               <div>
//                 <h2 className="text-3xl font-bold text-green-900 mb-2">{selectedBazaar.name}</h2>
//                 <div className="flex items-center text-gray-600">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <span>{selectedBazaar.location}</span>
//                 </div>
//               </div>
//               <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
//                 Active
//               </div>
//             </div>
            
//             <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-100">
//               <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Bazaar Information
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InfoCard label="Established" value={selectedBazaar.established} />
//                 <InfoCard label="Operational Days" value={selectedBazaar.operational_days} />
//                 <InfoCard label="Timings" value={selectedBazaar.timings} />
//                 <InfoCard label="Number of Stalls" value={selectedBazaar.stalls} />
//                 <InfoCard label="Area" value={selectedBazaar.area} />
//                 <InfoCard label="Focal Person" value={selectedBazaar.focal_person} />
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 Facilities
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedBazaar.facilities.map((facility, index) => (
//                   <span key={index} className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm border border-green-100 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     {facility}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 Contact Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InfoCard label="Phone" value={selectedBazaar.contact.phone} />
//                 <InfoCard label="Email" value={selectedBazaar.contact.email} />
//                 <InfoCard label="Helpline" value={selectedBazaar.contact.helpline} />
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
//               <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 Location Map
//               </h3>
//               <div className="rounded-lg w-full h-64 overflow-hidden">
//                 <iframe
//                   src={selectedBazaar.google_maps}
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   title={`Map for ${selectedBazaar.name}`}
//                 ></iframe>
//               </div>
//             </div>
            
//             {selectedBazaar.special_days && selectedBazaar.special_days.length > 0 && (
//               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
//                 <h4 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Special Discount Days
//                 </h4>
//                 <p className="text-yellow-700">
//                   Special discounts available on: <span className="font-bold">{selectedBazaar.special_days.join(', ')}</span>
//                 </p>
//               </div>
//             )}
            
//             <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
//               <h4 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                 </svg>
//                 Description
//               </h4>
//               <p className="text-blue-700">{selectedBazaar.description}</p>
//             </div>
            
//             <div className="flex flex-wrap gap-3 mt-8">
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleGetDirections(selectedBazaar.google_maps)}
//                 className="flex items-center bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex-1 min-w-[200px] justify-center"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//                 Get Directions
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex items-center bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors flex-1 min-w-[200px] justify-center"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Contact Bazaar
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section id="bazaars" className="py-16 bg-gradient-to-b from-green-50 to-white">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="text-center max-w-4xl mx-auto mb-12">
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold text-green-900 mb-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Find Your Nearest Bazaar
//           </motion.h2>
//           <motion.p 
//             className="text-xl text-gray-700 mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             Discover government-approved bazaars with essential commodities at controlled prices
//           </motion.p>
          
//           <motion.div 
//             className="relative max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search bazaars by name, location or district..."
//                 className="w-full px-5 py-4 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pl-14"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 absolute left-5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </motion.div>
//         </div>

//         <div className="mb-10">
//           <h3 className="text-lg font-semibold text-gray-700 mb-3 px-2">Filter by District:</h3>
//           <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50">
//             {districts.map((district) => (
//               <motion.button
//                 key={district.id}
//                 className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-medium transition-all text-sm md:text-base mx-1 ${
//                   activeDistrict === district.id
//                     ? 'bg-green-700 text-white shadow-lg'
//                     : 'bg-white text-gray-700 hover:bg-green-50 shadow-sm border border-gray-200'
//                 }`}
//                 onClick={() => setActiveDistrict(district.id)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {district.name}
//               </motion.button>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
//           <div className="p-5 bg-gradient-to-r from-green-700 to-green-800 text-white">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-0">
//                 {districts.find(d => d.id === activeDistrict)?.name} Bazaars
//               </h3>
//               <span className="bg-green-600 px-4 py-1.5 rounded-lg text-sm">
//                 {filteredBazaars.length} {filteredBazaars.length === 1 ? 'Bazaar' : 'Bazaars'}
//               </span>
//             </div>
//           </div>
          
//           <div className="p-5">
//             {isLoading ? (
//               <div className="flex justify-center items-center py-20">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
//               </div>
//             ) : filteredBazaars.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {filteredBazaars.map((bazaar) => (
//                   <motion.div
//                     key={bazaar.id}
//                     className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-green-200 transition-all"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
//                   >
//                     <div className="p-5">
//                       <div className="flex justify-between items-start mb-4">
//                         <h4 className="text-xl font-bold text-green-900">{bazaar.name}</h4>
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
//                           Active
//                         </span>
//                       </div>
                      
//                       <div className="flex items-start text-gray-600 mb-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{bazaar.location}</span>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3 mb-5">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           {bazaar.established}
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                           </svg>
//                           {bazaar.stalls} stalls
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between gap-3">
//                         <motion.button
//                           className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleGetDirections(bazaar.google_maps)}
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                           </svg>
//                           Directions
//                         </motion.button>
//                         <motion.button
//                           className="flex-1 bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-2.5 rounded-lg text-sm"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => setSelectedBazaar(bazaar)}
//                         >
//                           View Details
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
//                   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h4 className="text-2xl font-bold text-gray-700 mb-3">No bazaars found</h4>
//                 <p className="text-gray-600 max-w-md mx-auto">
//                   {searchTerm 
//                     ? `No bazaars match your search for "${searchTerm}" in ${districts.find(d => d.id === activeDistrict)?.name}`
//                     : `Currently no bazaars are available in ${districts.find(d => d.id === activeDistrict)?.name}. Try selecting a different district.`}
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSearchTerm('');
//                     setActiveDistrict('lahore');
//                   }}
//                   className="mt-4 text-green-700 hover:text-green-900 font-medium underline"
//                 >
//                   Reset filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BazaarLocator;