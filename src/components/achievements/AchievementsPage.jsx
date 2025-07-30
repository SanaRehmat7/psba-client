import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, FaShieldAlt, FaFingerprint, FaVideo, 
  FaWifi, FaSeedling, FaChartLine, FaTshirt, 
  FaHeadset, FaPhoneAlt, FaBuilding, FaExpandAlt, FaStore
} from 'react-icons/fa';

const AchievementsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const achievements = [
    // ... previous achievements data remains the same
  ];

  const modelBazaars = [
    { id: 1, name: "Chakwal" },
    { id: 2, name: "Farooqabad" },
    { id: 3, name: "Lodhran" },
    { id: 4, name: "Jhang" },
    { id: 5, name: "Pakpattan" },
    { id: 6, name: "Bhakkar" },
    { id: 7, name: "Mianwali" },
    { id: 8, name: "Taunsa Shareef" }
  ];

  const expansions = [
    { id: 1, name: "Model Bazaar Kasur", existing: 152, new: 164, additional: 12 },
    { id: 2, name: "Model Bazaar Gujranwala", existing: 555, new: 652, additional: 98 },
    { id: 3, name: "Model Bazaar Sargodha", existing: 137, new: 186, additional: 49 },
    { id: 4, name: "Model Bazaar Sahiwal", existing: 205, new: 221, additional: 16 },
    { id: 5, name: "Model Bazaar Jampur", existing: 135, new: 192, additional: 57 },
    { id: 6, name: "Model Bazaar Faisalabad", existing: 240, new: 268, additional: 28 },
    { id: 7, name: "Model Bazaar Raiwind, Lahore", existing: 172, new: 249, additional: 77 },
    { id: 8, name: "Model Bazaar DG Khan", existing: 160, new: 171, additional: 11 },
    { id: 9, name: "Model Bazaar Shershah Colony, Lahore", existing: 169, new: 204, additional: 36 },
    { id: 10, name: "Model Bazaar Sialkot", existing: 44, new: 47, additional: 3 },
    { id: 11, name: "Model Bazaar Gujrat", existing: 242, new: 253, additional: 11 },
  ];

  const categories = [
    { id: 'all', name: 'All Achievements' },
    { id: 'certification', name: 'Certifications' },
    { id: 'technology', name: 'Technology' },
    { id: 'governance', name: 'Governance' },
    { id: 'customer', name: 'Customer Service' },
    { id: 'community', name: 'Community' },
    { id: 'operations', name: 'Operations' },
    { id: 'expansion', name: 'Expansion' }
  ];

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-green-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our Achievements
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-yellow-500 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p 
            className="text-xl text-green-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Celebrating milestones and successes in transforming public services
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'bg-white text-green-800 border border-green-300 hover:bg-green-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-green-100"
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="text-3xl mr-4">{achievement.icon}</div>
                  <h3 className="text-xl font-bold text-green-900">{achievement.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{achievement.content}</p>
              </div>
              <div className="px-6 py-3 bg-green-50 border-t border-green-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700 font-medium capitalize">
                    {achievement.category.replace(/-/g, ' ')}
                  </span>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    Achievement
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Model Bazaars Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <FaBuilding className="text-3xl text-green-700 mr-3" />
                <h2 className="text-3xl font-bold text-green-900">Model Bazaars Since Incorporation</h2>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Since incorporation, the Punjab Model Bazaars Management Company (PMBMC) has achieved great success by building and establishing many Model Bazaars across Punjab. This effort brought a big change, moving away from the old-style GI sheet structures to modern and efficient Pre-Engineered Building Structure.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                PMBMC's forward-thinking approach has completely transformed how these bazaars look and function. Before PMBMC, model bazaars were built using outdated materials, but the company introduced better, more advanced solutions, making bazaars stronger, more organized, and more welcoming for everyone.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {modelBazaars.map((bazaar, index) => (
                  <div key={bazaar.id} className="flex items-center bg-green-50 p-3 rounded-lg">
                    <span className="text-green-700 font-bold mr-3">{bazaar.id}.</span>
                    <span className="text-green-800">{bazaar.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden h-64">
                  <img 
                    src="https://psba.gop.pk/wp-content/uploads/2025/01/Artboard-1-1-1-1024x921-1-1.png" 
                    alt="Modern Bazaar Structure" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden h-64">
                  <img 
                    src="https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-60-370x470.png" 
                    alt="Bazaar Interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 rounded-xl overflow-hidden h-80">
                  <img 
                    src="https://psba.gop.pk/wp-content/uploads/2025/01/sahulat.jpg" 
                    alt="Bazaar Exterior" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expansion Section */}
        <motion.div 
          className="mt-20 bg-green-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-8">
            <FaExpandAlt className="text-3xl text-green-700 mr-3" />
            <h2 className="text-3xl font-bold text-green-900">Expansion of Existing Model Bazaars</h2>
          </div>
          
          <p className="text-gray-700 mb-8 max-w-4xl leading-relaxed">
            Due to the growing demand for outlets, PMBMC has undertaken the expansion of existing Model Bazaars to accommodate more businesses and better serve the community. These expansions have not only increased the capacity of the bazaars but also enhanced their infrastructure, providing improved facilities for both shopkeepers and visitors. By addressing the rising needs of local entrepreneurs and consumers, PMBMC continues to strengthen its commitment to fostering economic growth and creating well-organized, accessible marketplaces.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Sr. No.</th>
                  <th className="py-3 px-4 text-left">Model Bazaar</th>
                  <th className="py-3 px-4 text-left">Existing Outlets</th>
                  <th className="py-3 px-4 text-left">New Outlets</th>
                  <th className="py-3 px-4 text-left">Additional Outlets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {expansions.map((expansion) => (
                  <tr key={expansion.id} className="hover:bg-green-50 transition-colors">
                    <td className="py-3 px-4 font-medium">{expansion.id}</td>
                    <td className="py-3 px-4">{expansion.name}</td>
                    <td className="py-3 px-4">{expansion.existing}</td>
                    <td className="py-3 px-4">{expansion.new}</td>
                    <td className="py-3 px-4 font-bold text-green-700">{expansion.additional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">Impact of Expansion</h3>
              <p className="text-gray-700">
                The expansion projects have increased overall capacity by 38% across all model bazaars, creating space for 398 new businesses. This has generated approximately 1,200 new jobs in local communities and increased daily customer visits by an average of 27% at expanded locations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">Future Plans</h3>
              <p className="text-gray-700">
                PMBMC plans to expand 5 additional bazaars in the next fiscal year, with a focus on underserved regions. The expansion blueprint includes dedicated zones for farmers' markets and craft vendors, along with improved accessibility features for differently-abled visitors.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sahulat Stalls Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <FaStore className="text-3xl text-green-700 mr-3" />
                <h2 className="text-3xl font-bold text-green-900">Establishment of Sahulat Stalls</h2>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                PMBMC provides up to 15% price reductions on essential goods to offer relief to the general public without any subsidies from government. The Company's management took a significant initiative by establishing Sahulat stalls with a pilot project in Lahore.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
                <p className="text-yellow-800">
                  In Sahulat stalls, daily usage items/commodities are available at prices less than the DC Rates. Vegetable Sahulat Stalls, Fruit Sahulat Stalls, Karyana Sahulat Stalls and Chicken Sahulat Stalls have been operational in Model Bazaars throughout the year.
                </p>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                The main concept behind Sahulat Stalls is to ensure provision of daily usage items of good quality at less than DC notified rates. This initiative has been expanded to all model bazaars of Punjab, creating significant savings for consumers.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-700 mb-2">Price Reduction</h4>
                  <div className="text-3xl font-bold text-yellow-600">15%</div>
                  <p className="text-sm text-gray-600">Average savings on essential goods</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-700 mb-2">Stalls Established</h4>
                  <div className="text-3xl font-bold text-yellow-600">127+</div>
                  <p className="text-sm text-gray-600">Across all model bazaars</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden h-64">
                  <img 
                    src="https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-57-370x470.png" 
                    alt="Sahulat Stall" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden h-64">
                  <img 
                    src="https://psba.gop.pk/wp-content/uploads/2025/01/mobile-3.jpeg" 
                    alt="Fresh Produce" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 rounded-xl overflow-hidden h-64">
                  <img 
                    src="https://psba.gop.pk/wp-content/uploads/2025/01/free-home-delivery.jpg" 
                    alt="Customer at Stall" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-8 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '84%', label: 'PCP Rating' },
                { value: '12M', label: 'Annual Savings (PKR)' },
                { value: '500+', label: 'Farmers Empowered' },
                { value: '100%', label: 'Bazaars Covered' },
                { value: '38%', label: 'Capacity Increase' },
                { value: '398', label: 'New Businesses' },
                { value: '1,200+', label: 'Jobs Created' },
                { value: '15%', label: 'Price Reduction' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-green-800/30 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                  <div className="text-green-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-green-900 mb-6">Proud of Our Journey</h2>
          <p className="text-xl text-green-700 max-w-3xl mx-auto mb-8">
            We continue to innovate and improve our services to better serve the community
          </p>
          <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            Learn More About Our Initiatives
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;