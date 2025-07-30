import React, { useEffect, useState } from "react";

const FYpage = ({ id, title, description, icons, graphs }) => {

  const [typedText, setTypedText] = useState("");
  const fullText = title;
  const speed = 100;
  const pause = 3000;
useEffect(() => { 
  let index = 0;
  let timeout;

  const typeWriter = () => {
    if (index <= fullText.length) {
      setTypedText(fullText.slice(0, index));
      index++;
      timeout = setTimeout(typeWriter, speed);
    }
  };

  typeWriter();

  return () => clearTimeout(timeout);
}, [title]); 


  return (
    <div className="w-full space-y-6 px-4 py-6 box-border">
      {/* Typewriter Heading */}
      <div>
        <div className="relative inline-block text-2xl font-bold text-green-900">
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
      </div>

      {/* Paragraph */}
      <p className="text-green-800 text-sm md:text-base">{description}</p>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {icons.map((item, i) => (
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

      {/* Graph Images */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
        {graphs.map((graph) => (
          <img
            key={graph.src}
            src={graph.src}
            alt={graph.alt}
            className="w-full sm:w-1/2 object-contain rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default FYpage;