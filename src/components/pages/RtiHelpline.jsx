import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserTie, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaFileAlt, FaInfoCircle, FaHeadset, FaClock 
} from 'react-icons/fa';

function Rtihelpline() {
  const [activeTab, setActiveTab] = useState('rti');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    category: '',
    subject: '',
    description: ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('RTI request submitted successfully! We will respond within 14 working days.');
    setFormData({
      name: '',
      contact: '',
      email: '',
      address: '',
      category: '',
      subject: '',
      description: ''
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12 px-4 md:px-8 h-[150px]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <motion.div 
                className="bg-white p-4 rounded-full shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <FaInfoCircle className="text-white text-3xl" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">RTI & Helpline</h1>
                <p className="mt-2 text-green-200">Punjab Model Bazaars Management Company</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-center">
                <div className="text-xl font-bold">042-35401638-39</div>
                <div className="text-green-200 text-sm">Helpline</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="flex overflow-x-auto mb-8 bg-white rounded-xl shadow-md">
          <button
            className={`px-6 py-4 font-medium flex-1 whitespace-nowrap ${
              activeTab === 'rti' 
                ? 'bg-gradient-to-r from-green-600 to-green-800 text-white' 
                : 'text-gray-700 hover:bg-green-50'
            }`}
            onClick={() => handleTabChange('rti')}
          >
            RTI Contacts
          </button>
          <button
            className={`px-6 py-4 font-medium flex-1 whitespace-nowrap ${
              activeTab === 'form' 
                ? 'bg-gradient-to-r from-green-600 to-green-800 text-white' 
                : 'text-gray-700 hover:bg-green-50'
            }`}
            onClick={() => handleTabChange('form')}
          >
            RTI Request Form
          </button>
          <button
            className={`px-6 py-4 font-medium flex-1 whitespace-nowrap ${
              activeTab === 'helpline' 
                ? 'bg-gradient-to-r from-green-600 to-green-800 text-white' 
                : 'text-gray-700 hover:bg-green-50'
            }`}
            onClick={() => handleTabChange('helpline')}
          >
            Public Helpline
          </button>
        </div>

        {/* RTI Contacts Section */}
        {activeTab === 'rti' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-amber-400 inline-block">
                Right to Information Contacts
              </h2>
              <p className="text-gray-700 mb-8">
                The Punjab Model Bazaars Management Company is committed to transparency and accountability. 
                Below are the designated officers for handling Right to Information requests.
              </p>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* CPIO Card */}
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl overflow-hidden border border-green-200"
                  variants={itemVariants}
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-800 p-5 text-white">
                    <h3 className="text-xl font-bold">Chief Public Information Officer (CPIO)</h3>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center text-white">
                        <FaUserTie className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">Naveed Rafaqat Ahmad (ACA)</h4>
                        <p className="text-green-700 font-medium">Company Secretary</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FaPhone className="text-green-700 mt-1" />
                        <div>
                          <p className="font-medium text-gray-700">Phone Number</p>
                          <p>042-35401638-39</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaEnvelope className="text-green-700 mt-1" />
                        <div>
                          <p className="font-medium text-gray-700">Email</p>
                          <p>cfopmbmc@outlook.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-green-700 mt-1" />
                        <div>
                          <p className="font-medium text-gray-700">Office Address</p>
                          <p>18-D2, Johar Town, Lahore</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* PIO Card */}
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl overflow-hidden border border-green-200"
                  variants={itemVariants}
                >
                  <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-5 text-white">
                    <h3 className="text-xl font-bold">Public Information Officer (PIO)</h3>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-r from-green-500 to-green-700 w-16 h-16 rounded-full flex items-center justify-center text-white">
                        <FaUserTie className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">Mariya Iqbal</h4>
                        <p className="text-green-700 font-medium">Senior Manager HR</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FaPhone className="text-green-700 mt-1" />
                        <div>
                          <p className="font-medium text-gray-700">Phone Number</p>
                          <p>042-35401638-39</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaEnvelope className="text-green-700 mt-1" />
                        <div>
                          <p className="font-medium text-gray-700">Email</p>
                          <p>hrdept.pmbmc@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-green-700 mt-1" />
                        <div>
                          <p className="font-medium text-gray-700">Office Address</p>
                          <p>18-D2, Johar Town, Lahore</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-amber-100 rounded-xl p-6 border border-green-300">
              <h3 className="text-xl font-bold text-green-800 mb-3">About RTI at PMBMC</h3>
              <p className="mb-3 text-gray-700">
                The Right to Information Act empowers citizens to seek information from public authorities. 
                PMBMC is committed to transparency and timely response to all RTI requests.
              </p>
              <p className="text-gray-700">
                Requests can be submitted through the online form, via email, or in person at our office. 
                We aim to respond to all requests within 14 working days as per the Punjab Transparency 
                and Right to Information Act.
              </p>
            </div>
          </motion.div>
        )}
        
        {/* RTI Form Section */}
        {activeTab === 'form' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-amber-400 inline-block">
                Submit an RTI Request
              </h2>
              <p className="text-gray-700 mb-8">
                Please fill out the form below to submit a Right to Information request. 
                All fields are required.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="contact">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                      Postal Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                    Information Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="finance">Financial Information</option>
                    <option value="operations">Operational Details</option>
                    <option value="tenders">Tenders and Contracts</option>
                    <option value="personnel">Personnel Information</option>
                    <option value="other">Other Information</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                    Subject of Request
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter the subject of your request"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                    Detailed Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-40"
                    placeholder="Please describe the information you are seeking in detail"
                    required
                  ></textarea>
                </div>
                
                <div className="flex flex-wrap justify-between items-center gap-4 pt-4">
                  <p className="text-gray-600 text-sm max-w-md">
                    By submitting this form, you agree to the processing of your personal data for the 
                    purpose of handling your RTI request. We will respond within 14 working days as per 
                    the Punjab Transparency and Right to Information Act.
                  </p>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
        
        {/* Helpline Section */}
        {activeTab === 'helpline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-amber-400 inline-block">
                Public Helpline
              </h2>
              <p className="text-gray-700 mb-8">
                Contact our helpline for assistance with any inquiries, complaints, or feedback 
                regarding PMBMC operations and services.
              </p>
              
              <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-xl p-8 text-white mb-8">
                <div className="text-center max-w-2xl mx-auto">
                  <FaHeadset className="text-amber-400 text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">PMBMC Customer Support</h3>
                  <p className="mb-6 text-green-200">
                    Reach out to us for any assistance regarding model bazaars, vendor information, or service complaints
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <FaPhone className="text-amber-400 text-2xl" />
                    <div className="text-3xl font-bold">042-35401638-39</div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 text-green-200">
                    <FaClock className="text-amber-400" />
                    <p>Monday to Saturday: 9:00 AM to 5:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-6 border border-green-200">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FaEnvelope className="text-green-700 text-2xl" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Email Support</h4>
                  <p className="mb-2"><strong>General Inquiries:</strong> info@pmbmc.punjab.gov.pk</p>
                  <p><strong>Complaints:</strong> complaints@pmbmc.punjab.gov.pk</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-6 border border-green-200">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FaMapMarkerAlt className="text-green-700 text-2xl" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Visit Us</h4>
                  <p className="mb-2">18-D2, Johar Town, Lahore</p>
                  <p><strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-6 border border-green-200">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FaFileAlt className="text-green-700 text-2xl" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Online Support</h4>
                  <p className="mb-4">Submit your inquiries or complaints through our online portal</p>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg">
                    Visit Support Portal
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Rtihelpline;