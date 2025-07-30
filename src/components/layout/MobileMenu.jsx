// src/components/layout/MobileMenu.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaPhone, FaDownload, FaGlobe, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../../assets/images/psbLogo.png';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const { language, toggleLanguage } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Navigation items in English and Urdu
  const navItems = {
    en: [
      {
        label: "HOME",
        path: "/",
      },
      {
        label: "DISCOVER PSBA",
        dropdown: [
          { name: "About Us", path: "/about" },
          { name: "Governance", path: "/governance" },
          { name: "Our Leadership", path: "/leadership" },
          { name: "Our Bazaars", path: "/bazaars" },
          { name: "Yearly Progress", path: "/progress" },
          { name: "Facilities", path: "/facilities" },
          { name: "Initiatives", path: "/initiatives" },
          { name: "Achievements", path: "/achievements" },
        ],
      },
      {
        label: "JOURNEY",
        dropdown: Array.from({ length: 8 }, (_, i) => ({
          name: `Financial Year ${2017 + i}`,
          path: `/financial-year-${2017 + i}`,
        })),
      },
      {
        label: "RESOURCE CENTER",
        dropdown: [
          { name: "FAQs", path: "/faqs" },
          { name: "Procurement", path: "/procurement" },
          { name: "Districtwise Rate", path: "/rates" },
          { name: "Annual Accounts", path: "/accounts" },
          { name: "Code of Conduct", path: "/conduct" },
          { name: "Helping & RTI", path: "/rti" },
          { name: "Lodge Complaints", path: "/complaints" },
        ],
      },
      {
        label: "GALLERY",
        dropdown: [
          { name: "News", path: "/news" },
          { name: "Video", path: "/video" },
        ],
      },
      {
        label: "CONTACT",
        path: "/contact",
      },
    ],
    ur: [
      {
        label: "ہوم",
        path: "/",
      },
      {
        label: "پی ایس بی اے دریافت کریں",
        dropdown: [
          { name: "ہمارے بارے میں", path: "/about" },
          { name: "حکمرانی", path: "/governance" },
          { name: "ہماری قیادت", path: "/leadership" },
          { name: "ہمارے بازار", path: "/bazaars" },
          { name: "سالانہ ترقی", path: "/progress" },
          { name: "سہولیات", path: "/facilities" },
          { name: "اقدامات", path: "/initiatives" },
          { name: "کامیابیاں", path: "/achievements" },
        ],
      },
      {
        label: "سفر",
        dropdown: Array.from({ length: 8 }, (_, i) => ({
          name: `مالی سال ${2017 + i}`,
          path: `/financial-year-${2017 + i}`,
        })),
      },
      {
        label: "وسائل کا مرکز",
        dropdown: [
          { name: "عمومی سوالات", path: "/faqs" },
          { name: "خریداری", path: "/procurement" },
          { name: "ضلع وار شرح", path: "/rates" },
          { name: "سالانہ اکاؤنٹس", path: "/accounts" },
          { name: "آداب ضابطہ", path: "/conduct" },
          { name: "مدد اور آر ٹی آئی", path: "/rti" },
          { name: "شکایات درج کروائیں", path: "/complaints" },
        ],
      },
      {
        label: "میڈیا گیلری",
        dropdown: [
          { name: "خبریں", path: "/news" },
          { name: "ویڈیو", path: "/video" },
        ],
      },
      {
        label: "رابطہ",
        path: "/contact",
      },
    ],
  };

  const currentNavItems = navItems[language];
  
  // Toggle dropdown for mobile
  const toggleDropdown = (itemLabel) => {
    if (activeDropdown === itemLabel) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(itemLabel);
    }
  };
  
  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      // In a real app, this would be API call or search through data
      const results = [
        language === 'en' ? 'Vegetable Prices' : 'سبزیوں کی قیمتیں',
        language === 'en' ? 'Bazaar Lahore' : 'بازار لاہور',
        language === 'en' ? 'Complaint Portal' : 'شکایت پورٹل',
        language === 'en' ? 'Daily Price List' : 'روزانہ قیمتوں کی فہرست',
        language === 'en' ? 'Bazaar Timings' : 'بازار کے اوقات'
      ].filter(item => 
        language === 'en' ? 
        item.toLowerCase().includes(term.toLowerCase()) : 
        item.includes(term)
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu-content')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, setIsMenuOpen]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 mobile-menu-content"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-500 rounded-full p-2 mr-3">
                    <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                      <img 
                        src={Logo} 
                        alt="PSBA Logo" 
                        className="h-5 w-5 object-contain" 
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-green-800">PSBA</h2>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-700 p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto h-[calc(100vh-100px)]">
              {/* Search Section */}
              <div className="mb-8">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder={
                      language === "en" 
                        ? "Search bazaars, prices, commodities..." 
                        : "بازار، قیمتیں، اشیاء تلاش کریں..."
                    }
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Search results */}
                {searchResults.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div 
                        key={index}
                        className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
                
                <button 
                  onClick={() => window.location.href = "tel:(042) 111-176-262"}
                  className="w-full flex items-center justify-center py-3 bg-green-700 text-white rounded-lg mb-4"
                >
                  <FaPhone className="mr-2" />
                  {language === "en"
                    ? "Call Helpline: (042) 111-176-262"
                    : "ہیلپ لائن پر کال کریں: (042) 111-176-262"}
                </button>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-2 mb-8">
                {currentNavItems.map((item) => (
                  <div key={item.label} className="mb-2">
                    <div
                      className={`flex justify-between items-center py-3 px-4 rounded-lg font-medium cursor-pointer ${
                        activeDropdown === item.label
                          ? 'bg-green-700 text-white'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                      onClick={() => item.dropdown ? toggleDropdown(item.label) : setIsMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {item.dropdown && (
                        activeDropdown === item.label ? 
                        <span className="text-lg">−</span> : 
                        <span className="text-lg">+</span>
                      )}
                    </div>
                    
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="pl-6 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block py-2 px-4 rounded-lg text-green-700 hover:bg-green-50"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                <button
                  className="w-full flex items-center justify-center py-3 border border-green-700 text-green-700 rounded-lg"
                  onClick={toggleLanguage}
                >
                  <FaGlobe className="mr-2" />
                  {language === "en"
                    ? "Switch to اردو"
                    : "انگریزی پر تبدیل کریں"}
                </button>
                
                <Link 
                  to="/download-app"
                  className="block w-full text-center py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaDownload className="mr-2" />
                  {language === "en" ? "Download App" : "ایپ ڈاؤن لوڈ کریں"}
                </Link>
              </div>
              
              {/* Footer */}
              <div className="mt-8 text-center text-gray-500 text-sm">
                <p>
                  {language === "en" 
                    ? "© 2023 Punjab Sahulat Bazaar Authority" 
                    : "© 2023 پنجاب سہولت بازار اتھارٹی"}
                </p>
                <p className="mt-1">
                  {language === "en" 
                    ? "All rights reserved" 
                    : "تمام حقوق محفوظ ہیں"}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;