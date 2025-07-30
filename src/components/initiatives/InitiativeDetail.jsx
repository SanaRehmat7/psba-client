// src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, FaTags, FaMobileAlt, FaAward, FaCertificate, 
  FaVideo, FaFingerprint, FaTractor, FaWifi, FaHeadset, 
  FaPhoneAlt, FaBalanceScale, FaShoppingBag, FaUserTie, 
  FaBuilding, FaMoneyBillWave, FaSolarPanel, FaCity, FaGraduationCap, 
  FaLeaf, FaRupeeSign, FaSun, FaTruck, FaUsers, FaSeedling
} from 'react-icons/fa';
import InitiativeCards from '../home/InitiativeCards';

function InitiativeDetails() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredInitiatives, setFilteredInitiatives] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  
  // Initiative categories
  const categories = [
    { id: 'all', name: 'All Initiatives', icon: <FaChartLine /> },
    { id: 'governance', name: 'Governance', icon: <FaBalanceScale /> },
    { id: 'technology', name: 'Technology', icon: <FaMobileAlt /> },
    { id: 'sustainability', name: 'Sustainability', icon: <FaLeaf /> },
    { id: 'finance', name: 'Finance', icon: <FaMoneyBillWave /> },
    { id: 'recognition', name: 'Recognition', icon: <FaAward /> }
  ];
  
  // Initiatives data
  const initiatives = [
    {
      id: 1,
      title: "Monitoring Wing Establishment",
      category: "governance",
      icon: <FaChartLine />,
      description: "PMBMC set up a Monitoring Wing to oversee bazaar operations and resolve issues through regular reports and staff communication.",
      impact: "Strengthened internal controls, boosting management confidence and service quality for the public.",
      stats: [{ label: "Coverage", value: "100% Bazaars" }],
      color: "from-green-500 to-green-700"
    },
    {
      id: 2,
      title: "Sahulat Stalls",
      category: "finance",
      icon: <FaTags />,
      description: "PMBMC provides up to 15% price reductions on essential goods to offer relief to the general public without any government subsidies.",
      impact: "Direct savings for low-income families on essential goods.",
      stats: [{ label: "Discount", value: "15%" }],
      color: "from-amber-500 to-amber-700"
    },
    {
      id: 3,
      title: "Free Home Delivery & Mobile App",
      category: "technology",
      icon: <FaMobileAlt />,
      description: "PMBMC launched a Free Home Delivery service across 36 Model Bazaars, averaging 12,000 deliveries monthly with a dedicated mobile app.",
      impact: "Set a new standard for public service with convenient shopping experience.",
      stats: [
        { label: "Bazaars", value: "36" },
        { label: "Monthly Deliveries", value: "12,000" }
      ],
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 4,
      title: "Chief Minister Recognition",
      category: "recognition",
      icon: <FaAward />,
      description: "Received appreciation letter from Chief Minister Punjab in December 2021 for 'Outstanding Performance'.",
      impact: "Enhanced PMBMC credibility and reputation across Punjab.",
      stats: [{ label: "Year", value: "2021" }],
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 5,
      title: "PCP Certification (84% Rating)",
      category: "recognition",
      icon: <FaCertificate />,
      description: "Earned 84% rating from Pakistan Centre for Philanthropy for excellence in governance and financial management.",
      impact: "Secured tax exemption status from Federal Board of Revenue (FBR).",
      stats: [{ label: "Rating", value: "84%" }],
      color: "from-indigo-500 to-indigo-700"
    },
    {
      id: 6,
      title: "CCTV Surveillance",
      category: "technology",
      icon: <FaVideo />,
      description: "CCTV systems installed in each bazaar for live monitoring and enhanced security.",
      impact: "Improved safety for customers and stallholders across all locations.",
      stats: [{ label: "Coverage", value: "100%" }],
      color: "from-gray-500 to-gray-700"
    },
    {
      id: 7,
      title: "Biometric Attendance",
      category: "governance",
      icon: <FaFingerprint />,
      description: "Biometric devices installed in all model bazaars to improve attendance accuracy and accountability.",
      impact: "Enhanced workforce management efficiency and reduced absenteeism.",
      stats: [{ label: "Implementation", value: "All Bazaars" }],
      color: "from-green-600 to-green-800"
    },
    {
      id: 8,
      title: "Kisan Platform",
      category: "sustainability",
      icon: <FaTractor />,
      description: "Directly connects over 500 farmers to consumers, eliminating middlemen.",
      impact: "Provides fresh, affordable produce while increasing farmer incomes.",
      stats: [{ label: "Farmers", value: "500+" }],
      color: "from-lime-500 to-lime-700"
    },
    {
      id: 9,
      title: "NTC Internet Installation",
      category: "technology",
      icon: <FaWifi />,
      description: "Dedicated NTC internet connections installed at model bazaars.",
      impact: "Ensures seamless and high-speed connectivity for uninterrupted operations.",
      stats: [{ label: "Reliability", value: "99.9%" }],
      color: "from-cyan-500 to-cyan-700"
    },
    {
      id: 10,
      title: "Customer Support Enhancement",
      category: "governance",
      icon: <FaHeadset />,
      description: "Dedicated customer care cells and complaint desks established across all model bazaars.",
      impact: "Enhanced issue resolution and boosted public satisfaction.",
      stats: [{ label: "Response Time", value: "<24 hours" }],
      color: "from-teal-500 to-teal-700"
    },
    {
      id: 11,
      title: "Central Complaint Helpline",
      category: "governance",
      icon: <FaPhoneAlt />,
      description: "Central Complaint Cell with dedicated helpline for visitors and vendors.",
      impact: "Ensures transparent and efficient service resolution across Punjab.",
      stats: [{ label: "Resolution Rate", value: "95%" }],
      color: "from-emerald-500 to-emerald-700"
    },
    {
      id: 12,
      title: "PwC Partnership for Transparency",
      category: "governance",
      icon: <FaBalanceScale />,
      description: "Partnered with PwC for third-party verification of fixed assets and recruitment.",
      impact: "Enhanced transparency and established best governance practices.",
      stats: [{ label: "Audit Coverage", value: "100%" }],
      color: "from-cyan-600 to-cyan-800"
    },
    {
      id: 13,
      title: "Plastic Bag Free Zones",
      category: "sustainability",
      icon: <FaShoppingBag />,
      description: "Introduced Plastic Bag Free Zones to promote sustainability.",
      impact: "Reduces waste and encourages eco-friendly shopping habits.",
      stats: [{ label: "Reduction", value: "60% plastic use" }],
      color: "from-green-600 to-green-800"
    },
    {
      id: 14,
      title: "Professional Staff Uniforms",
      category: "governance",
      icon: <FaUserTie />,
      description: "Introduced dedicated uniforms for all model bazaar staff.",
      impact: "Enhances professionalism and ensures presentable service experience.",
      stats: [{ label: "Staff Covered", value: "100%" }],
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 15,
      title: "State-of-the-Art Headquarters",
      category: "governance",
      icon: <FaBuilding />,
      description: "New multi-story head office building completed in 2024 with focus on innovation.",
      impact: "Modern workspace enhancing operational efficiency and collaboration.",
      stats: [{ label: "Completion", value: "2024" }],
      color: "from-violet-500 to-violet-700"
    },
    {
      id: 16,
      title: "Financial Independence",
      category: "finance",
      icon: <FaMoneyBillWave />,
      description: "Transformed from PKR 14.31M deficit (2015-16) to PKR 14.63M surplus (2023-24).",
      impact: "Achieved financial independence and eliminated reliance on government subsidies.",
      stats: [
        { label: "Revenue (2023)", value: "PKR 745.82M" },
        { label: "Net Surplus", value: "PKR 5.51M" }
      ],
      color: "from-yellow-500 to-yellow-700"
    },
    {
      id: 17,
      title: "Solar Energy Implementation",
      category: "sustainability",
      icon: <FaSolarPanel />,
      description: "Solarization at Township Model Bazaar cutting electricity costs up to PKR 1M per month.",
      impact: "Reduced overall energy expenses by 10% with plans to save PKR 12M annually.",
      stats: [{ label: "Monthly Savings", value: "PKR 1M" }],
      color: "from-orange-500 to-orange-700"
    },
    {
      id: 18,
      title: "Infrastructure Modernization",
      category: "governance",
      icon: <FaCity />,
      description: "Upgraded bazaar infrastructure with modern tensile fabric reducing maintenance costs.",
      impact: "Increased footfall and enhanced government initiatives reputation.",
      stats: [{ label: "Cost Reduction", value: "30%" }],
      color: "from-stone-500 to-stone-700"
    },
    {
      id: 19,
      title: "TEVTA Skill Enhancement",
      category: "governance",
      icon: <FaGraduationCap />,
      description: "Training sessions for 40 PMBMC staff members in collaboration with TEVTA.",
      impact: "Enhanced skills and knowledge for more effective bazaar management.",
      stats: [{ label: "Staff Trained", value: "40" }],
      color: "from-sky-500 to-sky-700"
    }
  ];

  // Filter initiatives based on selected category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredInitiatives(initiatives);
    } else {
      setFilteredInitiatives(initiatives.filter(initiative => initiative.category === activeCategory));
    }
  }, [activeCategory]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="bg-white p-4 rounded-full shadow-xl">
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center">
                  <FaSeedling className="text-white text-3xl" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">PMBMC Initiatives Dashboard</h1>
                <p className="mt-2 text-green-200">Transforming Punjab's Model Bazaars through Innovation and Excellence</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">PKR 745.82M</div>
                  <div className="text-green-200 text-sm">2023 Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">36</div>
                  <div className="text-green-200 text-sm">Model Bazaars</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-green-200 text-sm">Farmers Empowered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-full flex items-center gap-2 font-medium ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg'
                  : 'bg-white text-green-800 border border-green-300 hover:bg-green-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Initiatives Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredInitiatives.map((initiative) => (
              <motion.div
                key={initiative.id}
                variants={item}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-green-100 flex flex-col h-full"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                layout
              >
                <div className={`bg-gradient-to-r ${initiative.color} p-5 flex items-center gap-4`}>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <div className="text-white text-2xl">{initiative.icon}</div>
                  </div>
                  <h2 className="text-xl font-bold text-white">{initiative.title}</h2>
                </div>
                
                <div className="p-5 flex-grow">
                  <p className="text-gray-700 mb-4">{initiative.description}</p>
                  <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-100">
                    <p className="font-medium text-green-800">Impact:</p>
                    <p className="text-green-700">{initiative.impact}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {initiative.stats.map((stat, index) => (
                      <div key={index} className="bg-amber-50 px-3 py-1 rounded-full text-amber-800 text-sm font-medium">
                        {stat.label}: <span className="font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <button 
                    className="text-green-700 font-medium hover:text-green-900 flex items-center gap-2"
                    onClick={() => setSelectedInitiative(initiative)}
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Financial Transformation Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white py-12 mt-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Financial Transformation</h2>
              <p className="text-amber-100 mb-6">
                From a deficit of PKR 14.31 million in 2015-16 to a surplus of PKR 14.628 million in 2023-24, 
                PMBMC has achieved remarkable financial independence.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                  <div className="text-2xl font-bold">PKR 745.82M</div>
                  <div className="text-amber-100 text-sm">2023 Revenue</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                  <div className="text-2xl font-bold">PKR 14.63M</div>
                  <div className="text-amber-100 text-sm">2023-24 Surplus</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-amber-100 text-sm">Govt Subsidies</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                  <div className="text-2xl font-bold">10%</div>
                  <div className="text-amber-100 text-sm">Energy Cost Reduction</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">↑ 102%</div>
                  <div className="text-amber-100">Revenue Growth (2015-2023)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Initiative Detail Modal */}
      <AnimatePresence>
        {selectedInitiative && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className={`bg-gradient-to-r ${selectedInitiative.color} p-5 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <div className="text-white text-2xl">{selectedInitiative.icon}</div>
                  </div>
                  <h2 className="text-xl font-bold text-white">{selectedInitiative.title}</h2>
                </div>
                <button 
                  className="text-white hover:text-amber-200 text-2xl"
                  onClick={() => setSelectedInitiative(null)}
                >
                  &times;
                </button>
              </div>
              
              <div className="p-6 overflow-auto flex-grow">
                <p className="text-gray-700 mb-4">{selectedInitiative.description}</p>
                
                <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-100">
                  <h3 className="font-bold text-green-800 mb-2">Impact:</h3>
                  <p className="text-green-700">{selectedInitiative.impact}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Key Statistics:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedInitiative.stats.map((stat, index) => (
                      <div key={index} className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <div className="font-bold text-amber-800">{stat.label}</div>
                        <div className="text-lg font-bold text-amber-900">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Implementation Details:</h3>
                  <p className="text-gray-700">
                    This initiative was implemented across all PMBMC model bazaars in Punjab, 
                    with comprehensive training provided to all relevant staff members. 
                    The solution has been integrated into our standard operating procedures 
                    to ensure sustainability and long-term impact.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t flex justify-end">
                <button 
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-3 hover:bg-gray-400"
                  onClick={() => setSelectedInitiative(null)}
                >
                  Close
                </button>
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg hover:opacity-90"
                  onClick={() => alert(`Downloading report for ${selectedInitiative.title}`)}
                >
                  Download Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12 mt-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <FaSeedling className="text-white text-xl" />
                </div>
                <div className="text-xl font-bold">PMBMC</div>
              </div>
              <p className="text-green-200">
                Punjab Model Bazaars Management Company is committed to excellence in public service, 
                innovation, and sustainable development across Punjab.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <ul className="space-y-2 text-green-200">
                <li className="flex items-center gap-2">
                  <FaPhoneAlt className="text-amber-400" />
                  <span>+92 42 111 111 111</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaWifi className="text-amber-400" />
                  <span>www.pmbmc.punjab.gov.pk</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaBuilding className="text-amber-400" />
                  <span>Lahore, Punjab, Pakistan</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-amber-400">Home</a></li>
                <li><a href="#" className="text-green-200 hover:text-amber-400">About PMBMC</a></li>
                <li><a href="#" className="text-green-200 hover:text-amber-400">Model Bazaars</a></li>
                <li><a href="#" className="text-green-200 hover:text-amber-400">Reports & Publications</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-300">
            <p>© 2023 Punjab Model Bazaars Management Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InitiativeDetails;