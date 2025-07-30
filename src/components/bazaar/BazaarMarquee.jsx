// src/components/BazaarMarquee.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BazaarMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const locations = [
    { name: "Chung", style: "filled" },
    { name: "China Scheme", style: "outline" },
    { name: "Sabzazaar", style: "outline" },
    { name: "Raiwind", style: "filled" },
    { name: "Shershah Colony", style: "outline" },
    { name: "Harbanspura", style: "filled" },
    { name: "Wahdat Colony", style: "filled" },
    { name: "Thokar", style: "outline" },
    { name: "Township", style: "outline" },
    { name: "Mianplaza", style: "outline" },
    { name: "Mianwali", style: "filled" },
    { name: "Bhakkar", style: "filled" },
    { name: "Bahawalpur", style: "outline" },
    { name: "Lodhran", style: "filled" },
    { name: "Pakpattan", style: "outline" },
    { name: "Vehari", style: "outline" },
    { name: "DG Khan", style: "filled" },
    { name: "Jampur", style: "outline" },
    { name: "Taunsa Sharif", style: "filled" },
    { name: "Layyah", style: "outline" },
    { name: "Jhang", style: "filled" },
    { name: "TT Singh", style: "outline" },
    { name: "Khushab", style: "outline" },
    { name: "Sialkot", style: "filled" },
    { name: "Gujranwala", style: "outline" },
    { name: "Jhang Road", style: "filled" },
    { name: "Kasur", style: "outline" },
    { name: "Gujrat", style: "filled" }
  ];

  // Duplicate locations for seamless looping
  const allLocations = [...locations, ...locations, ...locations];

  return (
    <section className="py-2 bg-[#227020] relative overflow-hidden">
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* First row - moving right to left */}
        <motion.div
          className="flex whitespace-nowrap py-2"
          animate={{ 
            x: ["0%", "-100%"]
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            paused: isPaused
          }}
        >
          {allLocations.map((location, index) => (
            <LocationTag 
              key={`first-${index}`} 
              location={location} 
              index={index} 
            />
          ))}
        </motion.div>
        
        {/* Second row - moving left to right */}
        <motion.div
          className="flex whitespace-nowrap py-2"
          animate={{ 
            x: ["-100%", "0%"]
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            paused: isPaused
          }}
        >
          {allLocations.map((location, index) => (
            <LocationTag 
              key={`second-${index}`} 
              location={location} 
              index={index} 
              reverse 
            />
          ))}
        </motion.div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="bg-gradient-to-r from-[#044C3C] via-transparent to-[#044C3C] w-full h-full" />
      </div>
    </section>
  );
};

const LocationTag = ({ location, index, reverse = false }) => {
  return (
    <motion.div
      className={`mx-2 px-4 py-1 rounded-full font-bold text-sm md:text-base 
        ${location.style === "filled" 
          ? "bg-[#183404] border-2 border-black text-white" 
          : "border-2 border-white text-white"}
        ${reverse ? "animate-pulse-slow" : ""}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.02
      }}
      whileHover={{ 
        scale: 1.1,
        backgroundColor: location.style === "filled" ? "#0c6a55" : "#183404",
        transition: { duration: 0.2 }
      }}
    >
      {location.name}
    </motion.div>
  );
};

export default BazaarMarquee;