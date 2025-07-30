// src/components/ComplaintPortal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ComplaintPortal = () => {
  const [activeTab, setActiveTab] = useState('file');
  const [complaintData, setComplaintData] = useState({
    name: '',
    phone: '',
    email: '',
    bazaar: '',
    category: '',
    description: '',
    evidence: null
  });
  
  const complaintCategories = [
    'Overcharging',
    'Quality Issues',
    'Short Measurement',
    'Unhygienic Conditions',
    'Behavior of Staff',
    'Other'
  ];
  
  const complaintStatus = [
    { id: 'COMP001', date: '2023-06-15', bazaar: 'Gulberg Sahulat Bazaar', category: 'Overcharging', status: 'Resolved' },
    { id: 'COMP002', date: '2023-06-18', bazaar: 'Model Town Bazaar', category: 'Quality Issues', status: 'In Progress' },
    { id: 'COMP003', date: '2023-06-20', bazaar: 'Liberty Market Point', category: 'Short Measurement', status: 'Pending' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setComplaintData(prev => ({ ...prev, evidence: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    alert('Complaint submitted successfully!');
    setComplaintData({
      name: '',
      phone: '',
      email: '',
      bazaar: '',
      category: '',
      description: '',
      evidence: null
    });
  };

  return (
    <section id="complaints" className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-green-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Complaint Portal
          </motion.h2>
          <motion.p 
            className="text-lg text-green-800 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Report issues and track resolution progress in real-time
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-6 py-4 font-medium text-lg ${
                  activeTab === 'file' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-500 hover:text-green-600'
                }`}
                onClick={() => setActiveTab('file')}
              >
                File Complaint
              </button>
              <button
                className={`px-6 py-4 font-medium text-lg ${
                  activeTab === 'track' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-500 hover:text-green-600'
                }`}
                onClick={() => setActiveTab('track')}
              >
                Track Status
              </button>
              <button
                className={`px-6 py-4 font-medium text-lg ${
                  activeTab === 'guidelines' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-500 hover:text-green-600'
                }`}
                onClick={() => setActiveTab('guidelines')}
              >
                Guidelines
              </button>
            </div>
          </div>
          
          <div className="p-8">
            {activeTab === 'file' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={complaintData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={complaintData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={complaintData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Bazaar Name</label>
                      <input
                        type="text"
                        name="bazaar"
                        value={complaintData.bazaar}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Complaint Category</label>
                      <select
                        name="category"
                        value={complaintData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="">Select Category</option>
                        {complaintCategories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Evidence (Photo/Video)</label>
                      <div className="flex items-center">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-sm text-gray-500">
                              {complaintData.evidence ? complaintData.evidence.name : 'Click to upload'}
                            </p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Complaint Description</label>
                    <textarea
                      name="description"
                      value={complaintData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe your complaint in detail..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      className="px-8 py-4 bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:bg-green-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Complaint
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {activeTab === 'track' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter Complaint ID..." 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button className="absolute right-3 top-3 text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Your Recent Complaints</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bazaar</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {complaintStatus.map((complaint, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-700">{complaint.id}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{complaint.date}</td>
                            <td className="px-4 py-4 text-sm text-gray-700">{complaint.bazaar}</td>
                            <td className="px-4 py-4 text-sm text-gray-700">{complaint.category}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {complaint.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Don't have a Complaint ID? Contact our helpline</p>
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span className="font-semibold">Helpline: 0800-12345</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'guidelines' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Complaint Filing Guidelines</h3>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Please read these guidelines carefully before filing a complaint to ensure it's processed efficiently.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <ol className="list-decimal pl-5 space-y-4">
                    <li className="pl-2">
                      <strong>Valid Complaints:</strong> Complaints must be related to PSBA bazaars only. We don't handle complaints about private markets or shops.
                    </li>
                    <li className="pl-2">
                      <strong>Required Information:</strong> Provide complete and accurate details including bazaar name, vendor details (if possible), date and time of incident.
                    </li>
                    <li className="pl-2">
                      <strong>Evidence:</strong> Upload clear photos or videos as evidence. Blurry or irrelevant media will not be accepted.
                    </li>
                    <li className="pl-2">
                      <strong>Response Time:</strong> We aim to respond to all complaints within 48 hours. Complex cases may take longer.
                    </li>
                    <li className="pl-2">
                      <strong>False Complaints:</strong> Filing false or misleading complaints may result in legal action under Punjab Consumer Protection Act.
                    </li>
                    <li className="pl-2">
                      <strong>Confidentiality:</strong> Your personal information will be kept confidential and only used for complaint resolution purposes.
                    </li>
                  </ol>
                  
                  <div className="mt-8 p-6 bg-green-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">What Happens After You File a Complaint?</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>You'll receive a confirmation SMS with your complaint ID</li>
                      <li>Our team will verify the details within 24 hours</li>
                      <li>Field officers will visit the bazaar for investigation</li>
                      <li>You'll receive updates via SMS at each stage</li>
                      <li>Final resolution will be communicated within 7 working days</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintPortal;