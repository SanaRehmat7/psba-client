// src/components/PSBAAppDownloadPage.js
import React from "react";
import { motion } from "framer-motion";
import {
  FaApple,
  FaGooglePlay,
  FaTruck,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaLeaf,
  FaShoppingCart,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const PSBAAppDownloadPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const featureVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 8px 20px rgba(4, 76, 60, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const handleIOSDownload = () => {
    window.open(
      "https://apps.apple.com/pk/app/sahulat-bazaar/id6632214960",
      "_blank"
    );
  };

  const handleAndroidDownload = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.aqib_ali.model_bazar&hl=en",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="py-10 md:py-24 px-4 md:px-8 bg-gradient-to-r from-white to-yellow-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Section: Text and Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
              Download the App Today!
            </h2>

            <p className="text-xl text-gray-800 mb-10 max-w-xl mx-auto md:mx-0">
              Join thousands of satisfied customers enjoying quality products at
              DC rates with free delivery.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-4">
              {/* App Store Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleIOSDownload}
                className="bg-white hover:bg-gray-100 text-[#044C3C] font-bold py-4 px-6 rounded-xl flex items-center gap-3 shadow-lg"
              >
                <FaApple className="text-xl" />
                <div className="text-left">
                  <span className="text-xs block">Download on the</span>
                  <span className="text-lg block">App Store</span>
                </div>
              </motion.button>

              {/* Google Play Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAndroidDownload}
                className="bg-[#faf3d1] hover:bg-[#f5e8a1] text-[#044C3C] font-bold py-4 px-6 rounded-xl flex items-center gap-3 shadow-lg"
              >
                <FaGooglePlay className="text-xl" />
                <div className="text-left">
                  <span className="text-xs block">GET IT ON</span>
                  <span className="text-lg block">Google Play</span>
                </div>
              </motion.button>
            </div>

            <p className="mt-4 text-gray-600 text-sm">
              Available on iOS and Android devices
            </p>
          </motion.div>

          {/* Right Section: Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://psba.gop.pk/wp-content/uploads/2025/01/Mobile-1.png"
              alt="Mobile App Display"
              className="w-full max-w-sm md:max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PSBA App?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best of Punjab Model Bazaars right at your
              fingertips
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white rounded-2xl p-8 flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-all"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div className="bg-[#e6f5f0] p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center">
                <FaTruck className="text-2xl text-[#044C3C]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Free Delivery & Returns
              </h3>
              <p className="mb-6 text-gray-600">
                Enjoy free delivery on all orders and hassle-free returns within
                7 days
              </p>
              <div className="mt-auto">
                <a
                  href="#"
                  className="inline-flex items-center text-[#044C3C] font-medium group"
                >
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white rounded-2xl p-8 flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-all"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div className="bg-[#faf3d1] p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center">
                <FaMoneyBillWave className="text-2xl text-[#044C3C]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                DC Rate Prices
              </h3>
              <p className="mb-6 text-gray-600">
                Get essential goods at unbeatable government-approved DC rates
              </p>
              <div className="mt-auto">
                <a
                  href="#"
                  className="inline-flex items-center text-[#044C3C] font-medium group"
                >
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white rounded-2xl p-8 flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-all"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div className="bg-[#e6f5f0] p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center">
                <FaExchangeAlt className="text-2xl text-[#044C3C]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Fast Delivery
              </h3>
              <p className="mb-6 text-gray-600">
                Receive your orders quickly with our efficient delivery system
              </p>
              <div className="mt-auto">
                <a
                  href="#"
                  className="inline-flex items-center text-[#044C3C] font-medium group"
                >
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers across Punjab
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "The PSBA app has made grocery shopping so convenient. I get fresh produce at DC rates delivered right to my doorstep. The free delivery is a game-changer!",
                name: "Ayesha Khan",
                role: "Regular User from Lahore",
              },
              {
                text: "I've been using the PSBA app for 6 months now. The quality is always excellent, and the prices are unbeatable. The return policy gives me peace of mind.",
                name: "Imran Ahmed",
                role: "PSBA Customer since 2023",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
                <p className="italic mb-6 text-gray-600">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSBAAppDownloadPage;
