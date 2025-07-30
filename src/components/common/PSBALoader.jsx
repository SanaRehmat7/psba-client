// src/components/common/PSBALoader.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PSBALoader = ({ language = 'en' }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 5);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Logo with animation */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.8
          }}
          className="mb-8"
        >
          <div className="relative">
            <div className="bg-yellow-500 w-32 h-32 rounded-full flex items-center justify-center p-2">
              <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
                <div className="bg-green-800 w-25 h-25 rounded-full flex items-center justify-center">
                  <motion.span 
                    className="text-white text-4xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    PSBA
                  </motion.span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-2 -right-2 bg-green-600 w-10 h-10 rounded-full z-[-1]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            />
            <motion.div 
              className="absolute -bottom-2 -left-2 bg-yellow-400 w-8 h-8 rounded-full z-[-1]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            />
          </div>
        </motion.div>
        
        {/* Title with language support */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {language === "en" 
            ? "Punjab Sahulat Bazaar Authority" 
            : "پنجاب سہولت بازار اتھارٹی"}
        </motion.h1>
        
        {/* Progress bar */}
        <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
          <motion.div 
            className="h-full bg-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Progress percentage */}
        <motion.div 
          className="text-lg text-green-700 font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {progress}%
        </motion.div>
        
        {/* Loading message */}
        <motion.p 
          className="text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {language === "en" 
            ? "Loading essential commodities at fair prices..." 
            : "منصفانہ قیمتوں پر ضروری اشیاء لوڈ ہو رہی ہیں..."}
        </motion.p>
        
        {/* Decorative dots */}
        <div className="flex space-x-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-yellow-500 rounded-full"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Footer note */}
      <motion.div 
        className="absolute bottom-6 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {language === "en" 
          ? "A Government of Punjab Initiative" 
          : "پنجاب حکومت کی ایک پہل"}
      </motion.div>
    </motion.div>
  );
};

export default PSBALoader;