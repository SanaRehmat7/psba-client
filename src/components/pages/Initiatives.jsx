// src/pages/Initiatives.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaMobileAlt, FaChartLine, FaUserShield, FaVideo, FaDatabase, FaLightbulb, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const Initiatives = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PSBA Initiatives | Punjab Safe Cities Authority";
  }, []);

  const initiatives = [
    {
      title: "Safe City Project",
      description: "Advanced surveillance and monitoring system for urban safety with AI-powered threat detection and real-time response coordination.",
      icon: <FaShieldAlt />,
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-8.jpeg"
    },
    {
      title: "Digital Policing",
      description: "Technology-driven policing solutions for efficient law enforcement, including mobile apps for officers and digital evidence management.",
      icon: <FaMobileAlt />,
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-1.jpeg"
    },
    {
      title: "Data Analytics Hub",
      description: "Intelligent crime prediction and resource allocation systems using big data analytics and machine learning algorithms.",
      icon: <FaChartLine />,
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-3.jpeg"
    },
    {
      title: "Citizen Protection",
      description: "Community safety programs and rapid response initiatives with neighborhood watch apps and emergency alert systems.",
      icon: <FaUserShield />,
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-2.jpeg"
    },
    {
      title: "Smart Traffic Management",
      description: "AI-powered traffic control and violation detection systems to reduce accidents and improve urban mobility.",
      icon: <FaVideo />,
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-11.jpeg"
    },
    {
      title: "Centralized Intelligence",
      description: "Integrated criminal records and intelligence database connecting all law enforcement agencies across Punjab.",
      icon: <FaDatabase />,
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-5.jpeg"
    }
  ];

  const features = [
    {
      title: "AI-Powered Surveillance",
      description: "Intelligent camera systems with automatic threat detection",
      icon: <FaLightbulb />,
      color: "bg-yellow-500"
    },
    {
      title: "Real-Time Data Analytics",
      description: "Instant processing of security data for rapid response",
      icon: <FaChartLine />,
      color: "bg-green-500"
    },
    {
      title: "Mobile Integration",
      description: "Citizen safety apps and officer mobile solutions",
      icon: <FaMobileAlt />,
      color: "bg-yellow-500"
    },
    {
      title: "Community Engagement",
      description: "Programs to involve citizens in safety initiatives",
      icon: <FaUsers />,
      color: "bg-green-500"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-yellow-50">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-yellow-500 opacity-90 z-0" />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://psba.gop.pk/wp-content/uploads/2025/01/10.jpeg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Transforming Punjab with Technology
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Innovative initiatives for a safer, smarter Punjab
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="#initiatives" 
                className="inline-block bg-white text-green-700 hover:bg-yellow-100 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                Explore Our Initiatives
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-20"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-white"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-white"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-green-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Vision for a Safer Punjab
            </motion.h2>
            <motion.div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></motion.div>
            <motion.p 
              className="text-xl text-gray-700 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The Punjab Safe Cities Authority is leading the digital transformation of public safety and administration in Punjab. 
              Our initiatives leverage cutting-edge technology to create safer communities and more efficient public services.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="h-64 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-9.jpeg" 
                  alt="PSBA Operations" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-xl overflow-hidden shadow-lg mt-8">
                <img 
                  src="https://psba.gop.pk/wp-content/uploads/2025/01/mobile-1.jpeg" 
                  alt="Mobile Technology" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-xl overflow-hidden shadow-lg col-span-2">
                <img 
                  src="https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-11.jpeg" 
                  alt="Community Safety" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-8 rounded-2xl border border-green-200 shadow-sm">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Technology for Public Safety</h3>
                <p className="text-gray-700 mb-6">
                  PSBA integrates advanced technologies like artificial intelligence, big data analytics, 
                  and IoT to enhance public safety and streamline government services across Punjab.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={feature.title}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`${feature.color} w-10 h-10 rounded-full flex items-center justify-center mt-1 flex-shrink-0`}>
                        <div className="text-white text-lg">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-green-800">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section id="initiatives" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-green-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Key Initiatives
            </motion.h2>
            <motion.div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></motion.div>
            <motion.p 
              className="text-xl text-gray-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our technology-driven programs designed to enhance safety and security across Punjab
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center">
                    {initiative.icon}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-3">{initiative.title}</h3>
                  <p className="text-gray-600 mb-6">{initiative.description}</p>
                  <button className="text-green-700 font-medium flex items-center group">
                    Learn More
                    <svg 
                      className="ml-2 transition-transform group-hover:translate-x-1" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Impact Across Punjab
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Since its inception, PSBA has transformed public safety across Punjab, leveraging cutting-edge technology to create safer communities.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "45%", label: "Reduction in street crime", icon: <FaShieldAlt /> },
                  { value: "30%", label: "Faster emergency response", icon: <FaMobileAlt /> },
                  { value: "500k+", label: "Cameras deployed", icon: <FaVideo /> },
                  { value: "36", label: "Cities covered", icon: <FaMapMarkerAlt /> }
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="flex items-center">
                      <div className="text-yellow-400 mr-2">
                        {stat.icon}
                      </div>
                      <div>{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="h-64 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-5.jpeg" 
                  alt="PSBA Operations Center" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-xl overflow-hidden shadow-lg mt-8">
                <img 
                  src="https://psba.gop.pk/wp-content/uploads/2025/01/mobile-3.jpeg" 
                  alt="Mobile Technology" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-xl overflow-hidden shadow-lg col-span-2">
                <img 
                  src="https://psba.gop.pk/wp-content/uploads/2025/01/10.jpeg" 
                  alt="PSBA Initiatives" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-yellow-400 to-yellow-500 h-[80px]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-green-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Us in Building a Safer Punjab
          </motion.h2>
          <motion.p 
            className="text-xl text-green-900/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Partner with us or explore career opportunities to contribute to public safety initiatives
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Initiatives;
