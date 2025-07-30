// src/components/FAQs.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      id: 'general',
      title: "General Queries",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        {
          question: "What is the concept behind establishment of Model Bazaars (MBs)?",
          answer: "Model Bazaars is an initiative of the Government of the Punjab to provide essential and other daily use commodities on notified rates in a hygienic and family shopping environment. At the same time, MBs also target on providing business opportunities in a respectable environment to the entrepreneurs having less business capital."
        },
        {
          question: "Where is the Model Bazaar located?",
          answer: "Model Bazaars have been established in different districts of the Punjab i.e. Township Lahore, Mian Plaza Lahore, Shershah Lahore, Harbanspura Lahore, Wahdat Colony Lahore, Sabzazaar Lahore, Thokar Lahore, China Scheme Lahore, Chung Lahore, Raiwind Lahore, Kasur, Gujranwala, Gujrat, Hafizabad, Sialkot, Khushab, Sargodha, Mianwali, Bhakkar, Faisalabad, Jhang, Toba Tek Singh, Sahiwal, Pakpattan, Chakwal, Rawalpindi, Lodhran, Vehari, Bahawalpur, Dera Ghazi Khan, Layyah, and Jaampur. The government aims to establish MBs at Tehsil level throughout the Punjab."
        },
        {
          question: "What kind of facilities are provided for customers and vendors?",
          answer: "For customers: Daily usage quality items at DC notified rates, shopping trolleys, clean drinking water, washrooms, food courts, joylands, security services, and prayer areas. For vendors: Free electricity (up to limit), free security, cleanliness services, prayer areas, washrooms, parking, and other facilities under a conducive business environment for a nominal monthly rent."
        },
        {
          question: "What products or services can I expect in the Model Bazaars?",
          answer: "Essential daily usage commodities including fruits & vegetables, karyana, meat, chicken, trendy clothing, jewelry, shoes, handmade crafts, home accessories, delicious food stalls, play areas for kids, and joylands - all at notified rates where applicable."
        }
      ]
    },
    {
      id: 'vendor',
      title: "Vendor Information",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      items: [
        {
          question: "How can I become a vendor in any Model Bazaar?",
          answer: "Visit the respective Model Bazaar Manager Office and submit a written application with required documentation. Our team will guide you through the process and requirements for setting up your stall."
        },
        {
          question: "What types of vendors are allowed?",
          answer: "We welcome vendors offering essential commodities like fruits, vegetables, karyana, meat, chicken, clothing, accessories, home décor, handmade goods, food, and other daily use items. All products must meet our quality standards."
        }
      ]
    },
    {
      id: 'delivery',
      title: "Home Delivery",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      items: [
        {
          question: "What are your delivery timings?",
          answer: "We deliver from 9:30 AM till 3:30 PM, seven days a week. Orders placed after 2:30 PM will be delivered the next day."
        },
        {
          question: "Can I schedule my order?",
          answer: "Yes! Our app offers multiple delivery slots. You can schedule orders up to 3 days in advance for convenient planning."
        },
        {
          question: "Are there any delivery charges?",
          answer: "Enjoy free delivery within a 5 KM radius of any Model Bazaar. For areas beyond 5 KM, a nominal delivery fee applies based on distance."
        },
        {
          question: "Can I place my order via call?",
          answer: "Absolutely! Call us at 0322-0800222 between 9:30am to 3:30pm any day of the week. Note: Phone orders are currently available in Lahore only."
        },
        {
          question: "What if the delivered product is defective?",
          answer: "We offer hassle-free returns. You can reject defective items upon delivery or contact us at 0322-0800222 within 2 hours of delivery for a refund or replacement."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Model Bazaar FAQs
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-teal-500 to-green-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Find answers to common questions about our services, vendor opportunities, and delivery options.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {faqData.map((category, index) => (
            <motion.button
              key={category.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === index 
                  ? "bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(index);
                setActiveIndex(null);
              }}
            >
              <span className={`${activeCategory === index ? 'text-white' : 'text-teal-500'}`}>
                {category.icon}
              </span>
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Content */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4">
              {faqData[activeCategory].items.map((item, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.div 
                    key={index}
                    className={`overflow-hidden rounded-xl border ${
                      isActive ? 'border-teal-200 bg-teal-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                    whileHover={{ y: -3 }}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full flex justify-between items-center text-left p-5 transition-colors duration-300 ${
                        isActive ? 'bg-teal-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive 
                              ? 'bg-teal-500 text-white' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            <svg 
                              className="h-4 w-4" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d={isActive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                              />
                            </svg>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-800 text-left">{item.question}</span>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto",
                            opacity: 1,
                            transition: { 
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: { 
                              opacity: { duration: 0.1 },
                              height: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 ml-12 text-gray-600 border-l-2 border-teal-400">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-teal-700 to-green-700 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:mr-8 mb-6 md:mb-0">
              <div className="bg-white/20 p-5 rounded-full backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
              <p className="text-teal-100 mb-6 max-w-lg">
                Our customer support team is ready to assist you with any questions or concerns about Model Bazaars.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href="tel:03220800222" 
                  className="bg-white text-teal-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call: 0322-0800222
                </a>
                
                <a 
                  href="mailto:support@modelbazaar.pk" 
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          © {new Date().getFullYear()} Model Bazaars Punjab. All rights reserved.
        </motion.div>
      </div>
    </div>
  );
};

export default FAQs;
