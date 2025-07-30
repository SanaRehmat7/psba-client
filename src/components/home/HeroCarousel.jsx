import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroCarousel = () => {
  const swiperRef = useRef();

  const images = [
    {
      src: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-3.jpeg",
      title: "Digital Transformation",
      description: "Revolutionizing public services with technology",
    },
    {
      src: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-1.jpeg",
      title: "Smart Governance",
      description: "Efficient systems for better citizen services",
    },
    {
      src: "https://psba.gop.pk/wp-content/uploads/2025/01/mobile-2.jpeg",
      title: "Innovative Solutions",
      description: "Cutting-edge approaches to public administration",
    },
    {
      src: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-9.jpeg",
      title: "Community Engagement",
      description: "Empowering citizens through participation",
    },
    {
      src: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-11.jpeg",
      title: "Sustainable Development",
      description: "Building a better future for all",
    },
    {
      src: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-5.jpeg",
      title: "Digital Literacy",
      description: "Bridging the technology gap in communities",
    },
    {
      src: "https://psba.gop.pk/wp-content/uploads/2025/01/PMBMC-_1-8.jpeg",
      title: "Transparent Governance",
      description: "Open systems for accountability and trust",
    },
  ];

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "w-3 h-3 bg-white/50 rounded-full mx-1 hover:bg-white",
          bulletActiveClass: "bg-white w-6 scale-125",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 max-w-7xl mx-auto text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                  {img.title}
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mb-6 drop-shadow-lg">
                  {img.description}
                </p>
                <a
                  href="/initiatives/"
                  className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Explore Initiatives
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all duration-300 transform -translate-y-1/2 shadow-lg"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all duration-300 transform -translate-y-1/2 shadow-lg"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Custom Pagination */}
      <div className="custom-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 flex z-30"></div>
    </div>
  );
};

export default HeroCarousel;




