// src/pages/BazaarDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhone, FaShoppingCart, FaStar, FaDirections } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import ImageGallery from '../components/bazaar/ImageGallery';
import ProductList from '../components/bazaar/ProductList';
import OpeningHours from '../components/bazaar/OpeningHours';
import ContactCard from '../components/common/ContactCard';
import ReviewCard from '../components/bazaar/ReviewCard';
import SimilarBazaars from '../components/bazaar/SimilarBazaars';
import Loader from '../components/common/Loader';

const BazaarDetail = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [bazaar, setBazaar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [similarBazaars, setSimilarBazaars] = useState([]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      if (data && data.length > 0) {
        const foundBazaar = data.find(b => b.id.toString() === id);
        
        if (foundBazaar) {
          setBazaar(foundBazaar);
          
          // Find similar bazaars in the same district
          const similar = data
            .filter(b => b.district === foundBazaar.district && b.id !== foundBazaar.id)
            .slice(0, 3);
          setSimilarBazaars(similar);
          
          setLoading(false);
        } else {
          navigate('/bazaars');
        }
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id, data, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!bazaar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            {language === 'en' ? 'Bazaar not found' : 'بازار نہیں ملا'}
          </h2>
          <button 
            onClick={() => navigate('/bazaars')}
            className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            {language === 'en' ? 'Back to Bazaars' : 'بازاروں کی طرف واپس جائیں'}
          </button>
        </div>
      </div>
    );
  }

  // Calculate average rating
  const avgRating = bazaar.reviews.length > 0 
    ? (bazaar.reviews.reduce((sum, review) => sum + review.rating, 0) / bazaar.reviews.length).toFixed(1)
    : '0.0';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-emerald-800 py-16 md:py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={() => navigate('/bazaars')}
            className="flex items-center text-white mb-8 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {language === 'en' ? 'Back to Bazaars' : 'بازاروں کی طرف واپس جائیں'}
          </button>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {bazaar.name}
          </motion.h1>
          
          <motion.div 
            className="flex flex-wrap items-center gap-4"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center bg-green-900 bg-opacity-50 px-3 py-1 rounded-full text-white">
              <FaMapMarkerAlt className="mr-2" />
              <span>{bazaar.district}, Punjab</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(avgRating) ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-white font-medium">{avgRating} ({bazaar.reviews.length} {language === 'en' ? 'reviews' : 'جائزے'})</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <ImageGallery images={bazaar.images} />
            </motion.div>
            
            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                {language === 'en' ? 'About This Bazaar' : 'اس بازار کے بارے میں'}
              </h2>
              
              <p className="text-gray-700 mb-6">
                {bazaar.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaShoppingCart className="text-green-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {language === 'en' ? 'Products Available' : 'دستیاب مصنوعات'}
                    </h3>
                    <p className="text-gray-600">
                      {bazaar.categories.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaClock className="text-green-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {language === 'en' ? 'Opening Hours' : 'کھلنے کے اوقات'}
                    </h3>
                    <OpeningHours hours={bazaar.hours} />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaPhone className="text-green-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {language === 'en' ? 'Contact Information' : 'رابطے کی معلومات'}
                    </h3>
                    <p className="text-gray-600">
                      {bazaar.contactPerson}: {bazaar.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaDirections className="text-green-700 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {language === 'en' ? 'Address' : 'پتہ'}
                    </h3>
                    <p className="text-gray-600">
                      {bazaar.address}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Tabs Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    className={`py-4 px-6 font-medium text-center w-1/2 ${
                      activeTab === 'products'
                        ? 'text-green-700 border-b-2 border-green-700'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                    onClick={() => setActiveTab('products')}
                  >
                    {language === 'en' ? 'Products & Prices' : 'مصنوعات اور قیمتیں'}
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-center w-1/2 ${
                      activeTab === 'reviews'
                        ? 'text-green-700 border-b-2 border-green-700'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    {language === 'en' ? `Reviews (${bazaar.reviews.length})` : `جائزے (${bazaar.reviews.length})`}
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'products' ? (
                  <ProductList products={bazaar.products} />
                ) : (
                  <div>
                    {bazaar.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {bazaar.reviews.map((review, index) => (
                          <ReviewCard key={index} review={review} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          {language === 'en' ? 'No reviews yet' : 'ابھی تک کوئی جائزہ نہیں'}
                        </h3>
                        <p className="text-gray-600">
                          {language === 'en' 
                            ? 'Be the first to share your experience' 
                            : 'اپنے تجربے کو شیئر کرنے والے پہلے بنیں'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div>
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="sticky top-8 mb-8"
            >
              <ContactCard 
                title={language === 'en' ? 'Bazaar Information' : 'بازار کی معلومات'}
                items={[
                  { icon: <FaMapMarkerAlt />, label: language === 'en' ? 'Address' : 'پتہ', value: bazaar.address },
                  { icon: <FaClock />, label: language === 'en' ? 'Opening Hours' : 'کھلنے کے اوقات', value: bazaar.hours },
                  { icon: <FaPhone />, label: language === 'en' ? 'Phone' : 'فون', value: bazaar.phone },
                  { icon: <FaShoppingCart />, label: language === 'en' ? 'Categories' : 'اقسام', value: bazaar.categories.join(', ') },
                ]}
              />
            </motion.div>
            
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
            >
              <div className="h-64 w-full">
                {/* Simplified map representation */}
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">{bazaar.name}</p>
                    <p className="text-gray-600 text-sm">{bazaar.district}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-lg flex items-center justify-center">
                  <FaDirections className="mr-2" />
                  {language === 'en' ? 'Get Directions' : 'سمت حاصل کریں'}
                </button>
              </div>
            </motion.div>
            
            {/* Similar Bazaars */}
            {similarBazaars.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  {language === 'en' ? 'Similar Bazaars' : 'اسی طرح کے بازار'}
                </h3>
                <SimilarBazaars bazaars={similarBazaars} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BazaarDetail;