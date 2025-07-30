import React, { useState } from "react";
import journey from "../data/Journey";
import { motion } from "framer-motion";

const JourneyTabs = () => {
  const [selectedYear, setSelectedYear] = useState(journey[0].id);
  const fyData = journey.find((item) => item.id === selectedYear);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="bg-green-700 text-white py-10 flex items-center justify-center shadow">
        <h2 className="text-3xl font-bold tracking-wide text-center">
          Financial Years
        </h2>
      </div>

      {/* Year Tabs */}
      <div className="w-full overflow-x-auto no-scrollbar flex justify-center mt-6">
        <div className="flex gap-3 px-4 py-2 min-w-fit">
          {journey.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedYear(item.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold text-center transition-all duration-300 border whitespace-nowrap
              ${
                selectedYear === item.id
                  ? "bg-green-900 text-white border-green-800 shadow"
                  : "bg-yellow-50 text-green-900 border-green-200 hover:bg-green-100"
              }`}
            >
              {item.id}
              {selectedYear === item.id && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-10 rounded-full bg-yellow-300"></span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* FY Content */}
      {fyData && (
        <div className="px-4 py-6 space-y-6 box-border">
          {/* Centered Typewriter Heading */}
          <div className="flex justify-center">
            <TypewriterHeading text={fyData.title} />
          </div>

          {/* Description */}
          <p className="text-green-800 text-sm md:text-base text-justify">
            {fyData.description}
          </p>

          {/* Icons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fyData.icons.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center w-full p-5 bg-gradient-to-br from-yellow-50 via-white to-green-50 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 border border-yellow-300"
              >
                <img
                  src={item.icon}
                  alt={item.text}
                  className="h-14 w-14 object-contain"
                />
                <p className="mt-3 text-sm text-center text-green-900 font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Graphs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
            {fyData.graphs.map((graph) => (
              <img
                key={graph.src}
                src={graph.src}
                alt={graph.alt}
                className="w-full sm:w-1/2 object-contain rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Typewriter effect heading component
const TypewriterHeading = ({ text }) => {
  const [typedText, setTypedText] = React.useState("");
  const speed = 100;

  React.useEffect(() => {
    let index = 0;
    let timeout;

    const typeWriter = () => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
        timeout = setTimeout(typeWriter, speed);
      }
    };

    typeWriter();

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="relative inline-block text-2xl font-bold text-green-900 text-center">
      <h1 className="text-3xl font-mono font-extrabold text-green-900 whitespace-nowrap overflow-hidden border-r-2 border-green-900 w-fit animate-blink min-h-typewriter">
        {typedText}
      </h1>
      <span className="absolute top-[-20px] left-[-30px] animate-float text-xl text-yellow-400">
        🌿
      </span>
      <span className="absolute bottom-[-10px] right-[-20px] animate-float-alt text-xl text-yellow-400">
        🌿
      </span>
    </div>
  );
};

export default JourneyTabs;