import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaVideo, FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';

const StatsSection = () => {
  const stats = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      value: "45%",
      label: "Reduction in street crime",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaVideo className="text-3xl" />,
      value: "500k+",
      label: "Cameras deployed",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      value: "36",
      label: "Cities covered",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaUserFriends className="text-3xl" />,
      value: "95%",
      label: "Citizen satisfaction",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Making Punjab Safer
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our initiatives have transformed public safety across Punjab, leveraging cutting-edge technology to create safer communities.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className={`bg-gradient-to-r ${stat.color} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="h-64 rounded-2xl overflow-hidden">
              <img 
                src="https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-5.jpeg" 
                alt="PSBA Operations Center" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden">
              <img 
                src="https://psba.gop.pk/wp-content/uploads/2025/01/mobile-3.jpeg" 
                alt="Mobile Technology" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden col-span-2">
              <img 
                src="https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-11.jpeg" 
                alt="Community Safety" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;