import React, { useEffect, useState } from "react";

const FY2024 = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Financial Year 2024";
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
      } else {
        setTimeout(() => {
          setTypedText("");
          index = 0;
          typeWriter();
        }, pause);
      }
    };
    typeWriter();
    return () => clearTimeout(timeout);
  }, []);

  const icons = [
    {
      icon: "https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-2025-01-16T062726.418.png",
      text: "Free Home Delivery",
    },
    {
      icon: "https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-2025-01-16T062745.870.png",
      text: "Kiosks",
    },
    {
      icon: "https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-2025-01-16T062733.390.png",
      text: "Green Initiatives",
    },
    {
      icon: "https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-2025-01-16T062703.150.png",
      text: "Mobile App",
    },
  ];

  return (
    <div className="w-full space-y-6 px-4 py-6 box-border">
      {/* Typewriter Heading */}
      <div>
        <div className="relative inline-block text-2xl font-bold text-green-800">
          <h1 className="text-3xl  font-mono font-extrabold text-green-800 whitespace-nowrap overflow-hidden border-r-2 border-green-800 w-fit animate-blink  min-h-typewriter">
            {typedText}
          </h1>
          <span className="absolute top-[-20px] left-[-30px] animate-float text-xl">
            🌿
          </span>
          <span className="absolute bottom-[-10px] right-[-20px] animate-float-alt text-xl">
            🌿
          </span>
        </div>
      </div>

      {/* Paragraph */}
      <p className="text-gray-700 text-sm md:text-base">
        PMBMC has revolutionized public welfare with initiatives like Free Home
        Delivery, reaching 100,000 households and expanding to 13 districts with
        PKR 2.5 billion funding, creating 10,000 jobs. Revenue surged from PKR
        38.83M in 2015-16 to PKR 1.545B in 2023-24, achieving a PKR 14.63M
        surplus. Sustainability efforts include solarization, saving PKR 14M
        annually, and tree plantations enhancing green spaces. Innovations like
        a mobile app and kiosks improved service efficiency, while community
        programs like free piano classes and affordable Ramzan bazaars supported
        welfare. A PKR 450M head office reduced costs by 30%, and government
        support highlights PMBMC’s growing impact.
      </p>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {icons.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-full p-5 bg-gradient-to-br from-white via-gray-50 to-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            <img
              src={item.icon}
              alt={item.text}
              className="h-14 w-14 object-contain"
            />
            <p className="mt-3 text-sm text-center text-gray-800 font-medium">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Graph Images */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
        <img
          src="https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-1.png"
          alt="Graph 1"
          className="w-full sm:w-1/2 object-contain rounded-lg"
        />
        <img
          src="https://psba.gop.pk/wp-content/uploads/2025/01/New-Project-300x176.png"
          alt="Graph 2"
          className="w-full sm:w-1/2 object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default FY2024;