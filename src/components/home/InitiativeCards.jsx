// src/components/home/InitiativeCards.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMobile, FaTruck, FaShieldAlt, FaSolarPanel } from 'react-icons/fa';

const InitiativeCards = () => {
  const initiatives = [
    {
      icon: <FaMobile className="text-3xl text-green-600" />,
      title: "Mobile App Launch",
      description: "Launched mobile app with tracking and easy ordering, setting new standards for public service",
      stats: "85,000+ orders delivered"
    },
    {
      icon: <FaTruck className="text-3xl text-yellow-500" />,
      title: "Free Home Delivery",
      description: "Free delivery service across 36 Model Bazaars with 10-15% lower prices than market rates",
      stats: "12,000+ monthly deliveries"
    },
    {
      icon: <FaShieldAlt className="text-3xl text-blue-500" />,
      title: "Enhanced Security",
      description: "CCTV systems installed in each bazaar for live monitoring and enhanced safety",
      stats: "100% bazaars covered"
    },
    {
      icon: <FaSolarPanel className="text-3xl text-orange-500" />,
      title: "Solar Energy Initiative",
      description: "Solarization reducing electricity costs by PKR 1 million/month at Township Model Bazaar",
      stats: "10% energy cost reduction"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Key Initiatives
          </h2>
          <p className="text-lg text-green-800 max-w-3xl mx-auto">
            Transforming public service through innovative solutions and sustainable practices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100"
            >
              <div className="p-2 bg-green-100 flex justify-center">
                {initiative.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {initiative.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {initiative.description}
                </p>
                <div className="mt-4 px-3 py-2 bg-green-50 text-green-800 rounded-lg text-sm font-medium">
                  {initiative.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativeCards;