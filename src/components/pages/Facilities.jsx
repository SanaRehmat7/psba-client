import React, { useState, useRef } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Facilities = () => {
  const [activeTab, setActiveTab] = useState("customers");

  const swiperRef = useRef(null);

  const facilitiesData = {
    customers: [
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/trolley-cart.png",
        title: "Trolley System",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/playground.png",
        title: "Play Area",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/piano.png",
        title: "Piano Classes",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/parking.png",
        title: "Parking",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/food-court.png",
        title: "Food Courts",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/bench.png",
        title: "Senior Citizen Camp",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/quality.png",
        title: "Clean Environment",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/favorite.png",
        title: "Digital Rate List",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/first-aid-kit.png",
        title: "First Aid Boxes",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/basket.png",
        title: "Free Home Delievry",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/surveillance.png",
        title: "Survelliance",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/vegetable.png",
        title: "Discounted Rates",
      },
    ],
    stallholders: [
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/store.png",
        title: "Cheap Shop Rent",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/electrical-energy.png",
        title: "Free Electricity",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/free-parking.png",
        title: "Parking",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/prayer-rug.png",
        title: "Prayer Area",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/cyber-security.png",
        title: "Free Security",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/cleaning.png",
        title: "Free Cleanliness",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/helpline.png",
        title: "Dedicated HelpLine",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/cctv.png",
        title: "Survelliance 24/7",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/fire-extinguisher.png",
        title: "Fire Extinguishers",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/recycling-bag.png",
        title: "Trash Bins",
      },
      {
        emoji:
          "https://psba.gop.pk/wp-content/uploads/2025/01/first-aid-box.png",
        title: "First Aid Kit",
      },
      {
        emoji: "https://psba.gop.pk/wp-content/uploads/2025/01/cooler.png",
        title: "Water coolers",
      },
    ],
  };

  const images = [
    "https://pmbmc.punjab.gov.pk/system/files/A70P6595.JPG",
    "https://pmbmc.punjab.gov.pk/system/files/A70P6837.JPG",
    "https://pmbmc.punjab.gov.pk/system/files/IMG_3112.JPG",
    "https://pmbmc.punjab.gov.pk/system/files/A70P6618.JPG",
    "https://pmbmc.punjab.gov.pk/system/files/A70P6940.JPG",
    "https://pmbmc.punjab.gov.pk/system/files/IMG_3117.JPG",
  ];

  const tabs = [
    { id: "customers", label: "Customer Facilities" },
    { id: "stallholders", label: "Stall Holder Facilities" },
  ];

  return (
    <div className="bg-green-100 min-h-screen p-6 font-sans text-gray-800">
      {/* Header */}
      <header className="w-full mt-10 py-8 px-8 mb-8  bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white text-center relative overflow-hidden">
        {/* Geometric shapes and yellow sparkles */}
        <div className="absolute top-6 left-10 w-10 h-10 bg-yellow-400 rotate-12 rounded-lg opacity-70 z-0" />
        <div className="absolute top-20 right-24 w-8 h-8 bg-yellow-300 rotate-45 rounded-lg opacity-60 z-0" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full opacity-80 animate-pulse z-0" />
        <div className="absolute top-32 right-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-80 animate-pulse z-0" />
        {/* Layered gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-yellow-100/20 to-green-900/10 pointer-events-none z-0" />
        {/* Wavy SVG divider at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-8"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#facc15"
            fillOpacity="0.25"
            d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold tracking-wide drop-shadow-lg relative z-10"
        >
          Facilities
        </motion.h1>
      </header>

      {/* Tabs */}
      <LayoutGroup>
        <nav className="flex justify-center space-x-10 border-b border-green-300 mb-8 max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-3 px-1 font-semibold text-sm sm:text-base ${
                activeTab === tab.id
                  ? "text-green-700"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-1 bg-yellow-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </LayoutGroup>

      {/* Facilities Grid */}
      <section className="max-w-6xl mx-auto mb-12 px-4">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
          {facilitiesData[activeTab].map(({ emoji, title }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-5 cursor-pointer transition-shadow hover:shadow-xl"
              title={title}
            >
              <img
                src={emoji}
                alt={title}
                className="w-12 h-12 sm:w-14 sm:h-14 mb-3 object-contain"
              />
              <p className="text-[14px] font-medium text-center">{title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Swiper Slider */}
      <section className="max-w-6xl mx-auto px-4 relative">
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop
            spaceBetween={15}
            slidesPerView={3}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            className="rounded-lg"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-66 flex justify-center items-center overflow-hidden rounded-lg">
                  <img
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Arrows */}
            <div className="swiper-button-prev !text-yellow-400 !left-[-25px] !top-1/2 !transform !-translate-y-1/2 !z-10 hover:!text-yellow-500" />
            <div className="swiper-button-next !text-yellow-400 !right-[-25px] !top-1/2 !transform !-translate-y-1/2 !z-10 hover:!text-yellow-500" />
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
