import React, { useState } from "react";
import { motion } from "framer-motion";

const stallForms = [
  "https://psba.gop.pk/wp-content/uploads/2025/04/Wazirabad.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Sharaqpur-Sharif.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Pattoki.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Muzaffargarh.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Okara.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Mandi-Bahauddin.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Khanewal.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Jaranwala.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Chunian.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Chiniot.pdf",
  "https://psba.gop.pk/wp-content/uploads/2025/04/Bhawal.pdf",
];

const tabs = ["Apply for Stall", "Notices", "Notifications"];

const DocumentsTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const getFileName = (url) => {
    return decodeURIComponent(
      url.split("/").pop().replace(".pdf", "").replace(/-/g, " ")
    );
  };

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-white space-y-6">
      {/* Header */}
      <div className="bg-green-700 text-white py-5 px-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold tracking-wide">
          📁 Notices and Notifications
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all border-b-4 ${
              activeTab === tab
                ? "bg-green-900 text-white border-yellow-400"
                : "bg-yellow-50 text-green-800 border-transparent hover:border-yellow-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "Apply for Stall" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stallForms.map((url, index) => (
              <motion.div
                key={index}
                className="bg-yellow-50 border border-yellow-400 p-4 rounded-xl shadow hover:shadow-lg flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="text-green-900 font-medium text-sm mb-2">
                  {getFileName(url)}
                </h3>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-green-700 hover:bg-green-500 hover:text-black text-white px-4 py-2 text-sm rounded-lg font-semibold text-center transition-all"
                >
                  Download PDF
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "Notices" && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <motion.div
              className="bg-yellow-50 border border-yellow-400 p-4 rounded-xl shadow hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              
              <a
                href="https://psba.gop.pk/wp-content/uploads/2025/01/ChairmanBOD-Notification-1.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-green-900 font-medium text-sm mb-3">
                Chairman BOD Notification
              </h3>
              </a>
            </motion.div>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <motion.div
              className="bg-yellow-50 border border-yellow-400 p-4 rounded-xl shadow hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
             
              <a
                href="https://psba.gop.pk/wp-content/uploads/2025/01/Registratino_on_E-Procurement_System_of_PPRA_Page_3.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              > <h3 className="text-green-900 font-medium text-sm mb-3">
                E-Procurement System Notification
              </h3>
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsTabs;