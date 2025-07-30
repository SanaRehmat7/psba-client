import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

// Sample search data - in a real app this would come from an API or context
const searchData = [
  { id: 1, type: 'bazaar', name: 'Chung Bazaar', location: 'Lahore', category: 'Bazaars' },
  { id: 2, type: 'commodity', name: 'Wheat Flour', price: 'Rs. 120/kg', category: 'Commodities' },
  { id: 3, type: 'price', name: 'Tomato Price List', date: 'Today', category: 'Price Lists' },
  { id: 4, type: 'bazaar', name: 'China Scheme Bazaar', location: 'Lahore', category: 'Bazaars' },
  { id: 5, type: 'commodity', name: 'Sugar', price: 'Rs. 90/kg', category: 'Commodities' },
  { id: 6, type: 'complaint', name: 'Complaint Portal', category: 'Services' },
  { id: 7, type: 'bazaar', name: 'Sabzazaar', location: 'Lahore', category: 'Bazaars' },
  { id: 8, type: 'price', name: 'Fruit Prices', date: 'Weekly', category: 'Price Lists' },
  { id: 9, type: 'commodity', name: 'Cooking Oil', price: 'Rs. 450/liter', category: 'Commodities' },
  { id: 10, type: 'bazaar', name: 'Raiwind Bazaar', location: 'Lahore', category: 'Bazaars' },
];

const SearchModal = ({ isSearchOpen, setIsSearchOpen, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Load recent searches from localStorage
      const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      setRecentSearches(savedSearches);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, setIsSearchOpen]);
  
  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Filter search results
    const filteredResults = searchData.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(query.toLowerCase()))
    );
    
    setSearchResults(filteredResults);
  };
  
  // Handle search submission
  const handleSearchSubmit = (query = searchQuery) => {
    if (query.trim() === '') return;
    
    // Save to recent searches
    const newRecentSearches = [
      query,
      ...recentSearches.filter(item => item !== query).slice(0, 4)
    ];
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    
    // In a real app, you would navigate to search results page
    console.log('Searching for:', query);
    alert(`Searching for: ${query}`);
    
    // Reset and close modal
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };
  
  // Handle popular search click
  const handlePopularSearchClick = (term) => {
    setSearchQuery(term);
    handleSearchSubmit(term);
  };
  
  // Handle recent search click
  const handleRecentSearchClick = (term) => {
    setSearchQuery(term);
    handleSearchSubmit(term);
  };
  
  // Clear recent searches
  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={searchRef}
            initial={{ y: -20, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    language === "en"
                      ? "Search for bazaars, prices, commodities..."
                      : "بازار، قیمتیں، اشیاء تلاش کریں..."
                  }
                  className="w-full px-4 py-4 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {searchResults.length > 0 ? (
                // Search Results
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-800">
                    {language === "en" ? "Search Results" : "تلاش کے نتائج"}
                  </h3>
                  
                  {searchResults.map((result) => (
                    <motion.div
                      key={result.id}
                      whileHover={{ backgroundColor: '#f0fdf4' }}
                      className="p-3 rounded-lg border border-gray-200 cursor-pointer flex items-start"
                      onClick={() => handleSearchSubmit(result.name)}
                    >
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        {result.type === 'bazaar' && <FaSearch className="text-green-600" />}
                        {result.type === 'commodity' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-gray-500">
                          {result.location && `${result.location} • `}
                          {result.price && `${result.price} • `}
                          {result.category}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : searchQuery ? (
                // No Results Found
                <div className="text-center py-8">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    {language === "en" ? "No results found" : "کوئی نتیجہ نہیں ملا"}
                  </h3>
                  <p className="text-gray-500">
                    {language === "en" 
                      ? "Try different keywords or browse our popular searches" 
                      : "مختلف الفاظ آزمائیں یا ہماری مقبول تلاشوں کو براؤز کریں"}
                  </p>
                </div>
              ) : (
                // Popular Searches and Recent Searches
                <>
                  {recentSearches.length > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold text-gray-500">
                          {language === "en" ? "Recent Searches" : "حالیہ تلاش"}
                        </h3>
                        <button 
                          onClick={handleClearRecent}
                          className="text-xs text-green-600 hover:text-green-800"
                        >
                          {language === "en" ? "Clear all" : "سب صاف کریں"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 flex items-center"
                            onClick={() => handleRecentSearchClick(search)}
                          >
                            <FaSearch className="mr-2 text-sm" />
                            {search}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {language === "en" ? "Popular Searches" : "مقبول تلاش"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        language === "en" ? "Vegetable Prices" : "سبزیوں کی قیمتیں",
                        language === "en" ? "Bazaar Lahore" : "بازار لاہور",
                        language === "en" ? "Complaint Portal" : "شکایت پورٹل",
                        language === "en" ? "Daily Price List" : "روزانہ قیمتوں کی فہرست",
                        language === "en" ? "Bazaar Timings" : "بازار کے اوقات",
                        language === "en" ? "Sugar Price Today" : "آج چینی کی قیمت",
                        language === "en" ? "Sahulat Bazaar Locations" : "سہولت بازار مقامات",
                        language === "en" ? "Wheat Flour Rate" : "گندم کے آٹے کی قیمت",
                      ].map((item, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 bg-green-50 text-green-800 rounded-full text-sm hover:bg-green-100"
                          onClick={() => handlePopularSearchClick(item)}
                        >
                          {item}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {language === "en" ? "Browse Categories" : "زمرے براؤز کریں"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { 
                          name: language === "en" ? "Bazaars" : "بازار", 
                          icon: <FaSearch className="text-xl text-green-600" /> 
                        },
                        { 
                          name: language === "en" ? "Commodity Prices" : "اشیاء کی قیمتیں", 
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) 
                        },
                        { 
                          name: language === "en" ? "Complaints" : "شکایات", 
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ) 
                        },
                        { 
                          name: language === "en" ? "Locations" : "مقامات", 
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          ) 
                        },
                      ].map((category, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ y: -3 }}
                          className="p-4 bg-gray-50 rounded-lg flex flex-col items-center justify-center hover:bg-green-50 border border-gray-200"
                          onClick={() => handlePopularSearchClick(category.name)}
                        >
                          <div className="mb-2">{category.icon}</div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {searchResults.length > 0 && (
              <div className="p-4 border-t text-center">
                <button
                  onClick={() => handleSearchSubmit()}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {language === "en" ? "View All Results" : "تمام نتائج دیکھیں"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;