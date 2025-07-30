import React from 'react';
import { motion } from 'framer-motion';

const TechnologyShowcase = () => {
  const technologies = [
    {
      title: "AI-Powered Surveillance",
      description: "Intelligent camera systems with automatic threat detection",
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-9.jpeg"
    },
    {
      title: "Real-Time Data Analytics",
      description: "Instant processing of security data for rapid response",
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-1.jpeg"
    },
    {
      title: "Mobile Integration",
      description: "Citizen safety apps and officer mobile solutions",
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-2.jpeg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Cutting-Edge Technology
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our initiatives leverage the latest technologies to enhance public safety
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              className="relative group overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <img 
                src={tech.image} 
                alt={tech.title} 
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tech.title}</h3>
                <p className="text-white/80">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;