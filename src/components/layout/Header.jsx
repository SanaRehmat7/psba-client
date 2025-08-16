import React, { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaSearch,
  FaGlobe,
  FaBars,
  FaTimes,
  FaDownload,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/images/psbLogo.png"; // Import the logo correctly
import SearchOverlay from "../common/SearchOverlay"

const PSBAHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const searchRef = useRef(null);

  // Navigation items in English and Urdu
  const navItems = {
    en: [
      {
        label: "HOME",
        path: "/",
      },
      {
        label: "DISCOVER PSBA",
        path: "/about-us",
        dropdown: [
          { name: "About Us", path: "/about-us" },
          { name: "Our Bazaars", path: "/our-bazaars" },
          { name: "Yearly Progress", path: "/yearly-progress" },
          { name: "Facilities", path: "/facilities" },
          { name: "Initiatives", path: "/initiatives" },
          { name: "Achievements", path: "/achievements" },
        ],
      },
      {
        label: "JOURNEY",
        path: "/journey",
        // dropdown: Array.from({ length: 8 }, (_, i) => ({
        //   name: `Financial Year ${2017 + i}`,
        //   path: `/financial-year-${2017 + i}`,
        // })),
      },
      {
        label: "RESOURCE CENTER",
        dropdown: [
          { name: "FAQs", path: "/faqs" },
          { name: "Procurement", path: "/procurement" },
          { name: "Districtwise Rate", path: "/districtwise-rate" },
          { name: "Annual Accounts", path: "/annual-accounts" },
          { name: "Code of Conduct", path: "/code-of-conduct" },
          { name: "Helping & RTI", path: "/helping-rti" },
        ],
      },
       {
        label: "GALLERY",
        path: "/psba-gallery",
      },
      {
        label: "NOTICES",
        path: "/notices-notifications",
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
          { name: "ہمارے بارے میں", path: "/about-us" },
          // { name: "حکمرانی", path: "/governance" },
          // { name: "ہماری قیادت", path: "/our-leadership" },
          { name: "ہمارے بازار", path: "/our-bazaars" },
          { name: "سالانہ ترقی", path: "/yearly-progress" },
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
          { name: "ضلع وار شرح", path: "/districtwise-rate" },
          { name: "سالانہ اکاؤنٹس", path: "/annual-accounts" },
          { name: "آداب ضابطہ", path: "/code-of-conduct" },
          { name: "مدد اور آر ٹی آئی", path: "/helping-rti" },
        ],
      },
      {
        label: "میڈیا گیلری",
        // dropdown: [
        //   { name: "خبریں", path: "/news" },
        //   { name: "ویڈیو", path: "/video" },
        // ],
      },
      {
        label: "رابطہ",
        path: "/contact",
      },
    ],
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change (simulated)
  const handleNavClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (itemLabel) => {
    if (activeDropdown === itemLabel) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(itemLabel);
    }
  };

  const makePhoneCall = () => {
    window.location.href = "tel:+92123456789";
  };

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === "en" ? "ur" : "en"));
  };

  const currentNavItems = navItems[language];

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Top bar */}
      <div className="bg-green-800 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm md:text-base">
              <FaPhone className="mr-2 text-green-300" />
              <a
                href="tel:(042) 111-176-262"
                className="hover:text-green-300 transition-colors"
              >
                {language === "en"
                  ? "Helpline: (042) 111-176-262"
                  : "ہیلپ لائن: (042) 111-176-262"}
              </a>
            </div>
            <div className="hidden md:flex items-center text-sm md:text-base">
              <a
                href="/download-app"
                className="flex items-center text-sm md:text-base hover:text-green-300 transition-colors"
              >
                <FaDownload className="mr-1" />
                <span>
                  {language === "en" ? "Download App" : "ایپ ڈاؤن لوڈ کریں"}
                </span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center text-sm md:text-base hover:text-green-300 transition-colors"
              onClick={toggleLanguage}
            >
              <FaGlobe className="mr-1" />
              <span>{language === "en" ? "اردو" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <motion.div
        className={`bg-white shadow-md transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                {/* Updated logo with circular background */}
                <div className="bg-yellow-500 rounded-full p-2 mr-2">
                  <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                    {/* Use imported logo */}
                    <img 
                      src={Logo} 
                      alt="PSBA Logo" 
                      className="h-11 w-12 object-contain" 
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-800">PSBA</h1>
                  <p className="text-xs text-green-600">
                    {language === "en"
                      ? "Punjab Sahulat Bazaar Authority"
                      : "پنجاب سہولت بازار اتھارٹی"}
                  </p>
                </div>
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {currentNavItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.path}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                      window.location.pathname === item.path
                        ? "text-white bg-green-700"
                        : "text-green-800 hover:bg-green-100"
                    }`}
                  >
                    {item.label}
                    {item.dropdown &&
                      (activeDropdown === item.label ? (
                        <FaAngleUp className="ml-1" />
                      ) : (
                        <FaAngleDown className="ml-1" />
                      ))}
                  </a>

                  {/* Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 mt-1 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50"
                    >
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          className="block px-4 py-3 text-green-800 hover:bg-green-50"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-green-100 text-green-800 relative"
                onClick={() => setIsSearchOpen(true)}
              >
                <FaSearch />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-green-100 text-green-800 hidden md:flex items-center"
                onClick={makePhoneCall}
              >
                <FaPhone />
              </motion.button>

              {/* <motion.a
                whileHover={{ scale: 1.05 }}
                href="/download-app"
                className="hidden md:flex items-center px-3 py-2 bg-yellow-500 text-white rounded-lg font-medium"
              >
                <FaDownload className="mr-2" />
                <span>{language === "en" ? "Download App" : "ایپ ڈاؤن لوڈ کریں"}</span>
              </motion.a> */}

              <button
                className="lg:hidden text-green-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <SearchOverlay 
        isSearchOpen={isSearchOpen} 
        setIsSearchOpen={setIsSearchOpen}
        language={language}
      />

      {/* Search Overlay */}
      {/* <AnimatePresence>
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
              className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl"
            >
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
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  {language === "en" ? "Popular Searches" : "مقبول تلاش"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    language === "en" ? "Vegetable Prices" : "سبزیوں کی قیمتیں",
                    language === "en" ? "Bazaar Lahore" : "بازار لاہور",
                    language === "en" ? "Complaint Portal" : "شکایت پورٹل",
                    language === "en"
                      ? "Daily Price List"
                      : "روزانہ قیمتوں کی فہرست",
                    language === "en" ? "Bazaar Timings" : "بازار کے اوقات",
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-green-50 text-green-800 rounded-full text-sm hover:bg-green-100"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}



      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-40 lg:hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Mobile Logo with circular background */}
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
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto h-[calc(100vh-100px)]">
              <div className="mb-8">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder={
                      language === "en" ? "Search..." : "تلاش کریں..."
                    }
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <button
                  onClick={makePhoneCall}
                  className="w-full flex items-center justify-center py-3 bg-green-700 text-white rounded-lg mb-4"
                >
                  <FaPhone className="mr-2" />
                  {language === "en"
                    ? "Call Helpline: (042) 111-176-262"
                    : "ہیلپ لائن پر کال کریں: (042) 111-176-262"}
                </button>
              </div>

              <nav className="space-y-2">
                {currentNavItems.map((item) => (
                  <div key={item.label} className="mb-2">
                    <div
                      className={`flex justify-between items-center py-3 px-4 rounded-lg font-medium ${
                        window.location.pathname === item.path
                          ? "text-white bg-green-700"
                          : "text-green-800 hover:bg-green-100"
                      }`}
                      onClick={() =>
                        item.dropdown
                          ? toggleDropdown(item.label)
                          : handleNavClick()
                      }
                    >
                      <span>{item.label}</span>
                      {item.dropdown &&
                        (activeDropdown === item.label ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        ))}
                    </div>

                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="pl-6 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.path}
                            className="block py-2 px-4 rounded-lg text-green-700 hover:bg-green-50"
                            onClick={handleNavClick}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>

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
                
                {/* Replaced Vendor Login with Download App */}
                <a 
                  href="/download-app" 
                  className="block w-full text-center py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 items-center justify-center"
                >
                  <FaDownload className="mr-2" />
                  {language === "en" ? "Download App" : "ایپ ڈاؤن لوڈ کریں"}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default PSBAHeader;
