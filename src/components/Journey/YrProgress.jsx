import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const progressData = {
  "2017-2018": {
    points: [
      "SOPs & Governance Reforms for Enhanced Accountability",
      "Software-based collection system implemented, ensuring automated tracking of all rent payments, reducing fraud risks, and improving efficiency",
      "Strengthening Financial Reforms & Revenue Diversification",
      "Cash Management System introduced, enabling real-time monitoring of revenues and financial flows",
      "Feasibility Studies for Further Expansion & Development",
    ],
    image:
      "https://psba.gop.pk/wp-content/uploads/2025/02/New-Project-1008x1024.png",
  },
  "2018-2019": {
    points: [
      "Launch of Kisaan Platform - Direct Market Access for Farmers",
      "Launch of a Dedicated Complaint Management System",
      "Establishment of a CCTV Monitoring System for Enhanced Security",
      "Strengthening Financial Monitoring & Compliance",
      "Infrastructure & Service Upgrades",
    ],
    image:
      "https://psba.gop.pk/wp-content/uploads/2025/02/year-wise-data-1-2048x1453.png",
  },
  "2019-2020": {
    points: [
      "Launch of Sahulat Stall Concept - Affordable Essentials for All",
      "Expansion of Stalls in Existing Model Bazaars",
      "Addressing Underutilized Assets & Reviving Stalled Expansion Plans",
      "Financial Impact of Expansion - Revenue Growth",
      "Launch of Joyland Initiative - Affordable Entertainment for Families",
    ],
    image:
      "https://psba.gop.pk/wp-content/uploads/2025/02/year-wise-data-2048x1453.png",
  },
  "2020-2021": {
    points: [
      "Strengthening Financial Transparency & Revenue Optimization",
      "Strengthened Security & Surveillance Systems in Model Bazaars",
      "COVID-19 Crisis Management - Ensuring Market Stability & Public Relief",
      "Introduction of Model Bazaar Facilitation Centers & Expansion of Sahulat Stalls",
      "Launch of Model Dastarkhwan - Free Meals for the Underprivileged",
      "Land Acquisition & Expansion Planning - Future Growth Strategy",
    ],
    image:
      "https://psba.gop.pk/wp-content/uploads/2025/02/New-Project-1008x1024-3.png",
  },
  "2022-2023": {
    points: [
      "Financial Independence & Strong Government Endorsement",
      "Strengthening Market Monitoring & Security Systems",
      "Construction of Multi-Story PMBMC Head Office - A PKR 450 Million Landmark Project",
      "Identification of New Sites for Future Model Bazaars (Completed in 2023)",
      "PCP Certification - Achieving 84% Score in Governance & Transparency",
      "Sahulat Stalls Expansion - Ensuring Public Relief Amid Inflation",
    ],
    image:
      "https://psba.gop.pk/wp-content/uploads/2025/02/New-Project-1008x1024-4.png",
  },
  "2023-2024": {
    points: [
      "Conversion from Company Mode to Authority Mode - A Landmark Recognition by the Government",
      "Digital Innovation - Free Home Delivery Mobile App Launched",
      "Solarization Initiative - Energy Efficiency & Cost Reduction",
      "Securing PKR 3.4 Billion in Government Funding - The Largest Grant-in-Aid",
      "Transition from Site Identification to Actual Construction - Expanding Model Bazaars",
      "Completion of Multi-Story PMBMC Head Office - PKR 450 Million Project Finalized",
    ],
    image:
      "https://psba.gop.pk/wp-content/uploads/2025/02/New-Project-1008x1024-1.png",
  },
};

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function YearlyProgressTabs() {
  const [activeYear, setActiveYear] = useState("2017-2018");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handler for mouse movement inside image container
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  }
  function handleMouseLeave() {
    setMousePos({ x: 0, y: 0 });
  }

  return (
    <section className="py-4 px-4 w-full bg-green-50 rounded-none shadow-2xl">
      <h2 className="text-4xl font-bold text-green-700 text-center mb-8 mt-8">
        Yearly Progress
      </h2>
      {/* Header above points */}
      <div className="w-full max-w-2xl mx-auto mb-6">
        <div className="bg-green-700 rounded-2xl px-8 py-4 shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-2">
            Key Achievements by Year
          </h3>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(progressData).map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-5 py-2 rounded-full border text-sm md:text-base transition-all duration-300 font-semibold shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
              ${
                activeYear === year
                  ? "bg-yellow-300 text-green-900 border-yellow-200 scale-105"
                  : "bg-white text-green-800 border-green-300 hover:bg-green-100 hover:text-yellow-700"
              }
            `}
            style={{
              boxShadow:
                activeYear === year ? "0 4px 24px 0 #fde68a" : undefined,
            }}
          >
            {year}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-green-50 via-yellow-50 to-white p-8 rounded-3xl shadow-2xl border border-yellow-200 relative"
        >
          {/* Smooth, creative animation for circles */}
          <motion.div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
            animate={{
              x: mousePos.x + Math.sin(mousePos.y / 60) * 40,
              y: mousePos.y + Math.cos(mousePos.x / 60) * 20,
              scale: 1 + Math.abs(mousePos.x + mousePos.y) / 600,
              rotate: mousePos.x / 10,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 18 }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(254, 243, 199, 0.9)", // light yellow, 90% transparent
                position: "absolute",
                left: -40,
                top: -40,
                filter: "blur(2px)",
                boxShadow: "0 0 32px 0 #fde68a",
                transition: "box-shadow 0.3s",
              }}
            />
          </motion.div>
          <motion.div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
            animate={{
              x: -mousePos.x * 0.7 + Math.cos(mousePos.y / 40) * 30,
              y: -mousePos.y * 0.7 + Math.sin(mousePos.x / 40) * 30,
              scale: 1 + Math.abs(mousePos.x + mousePos.y) / 800,
              rotate: -mousePos.y / 10,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 18 }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(209, 250, 229, 0.9)", // light green, 90% transparent
                position: "absolute",
                left: -30,
                top: -30,
                filter: "blur(3px)",
                boxShadow: "0 0 24px 0 #6ee7b7",
                transition: "box-shadow 0.3s",
              }}
            />
          </motion.div>
          <div className="space-y-4 relative z-10">
            {progressData[activeYear].points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-gradient-to-r from-white via-yellow-50 to-green-50 text-green-900 p-4 rounded-xl shadow-lg border-l-4 border-yellow-400"
              >
                {point}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ height: "420px", alignItems: "center", display: "flex" }}
          >
            <motion.img
              src={progressData[activeYear].image}
              alt={`Progress ${activeYear}`}
              className="max-h-[400px] object-contain drop-shadow-2xl rounded-xl"
              style={{ background: "none" }}
              animate={{
                x: mousePos.x * 0.12,
                y: mousePos.y * 0.12,
                scale: 1.05,
                filter: "brightness(1.08) saturate(1.1)",
              }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}