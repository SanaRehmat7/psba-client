// src/components/home/GallerySlider.jsx
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const galleryItems = [
    { id: 1, title: 'Customer Experience at Model Town Bazaar' },
    { id: 2, title: 'Inauguration of New Sahulat Bazaar in Faisalabad' },
    { id: 3, title: 'Quality Check of Fresh Produce' },
    { id: 4, title: 'PSBA Leadership Visit to Rural Bazaar' },
    { id: 5, title: 'Mobile App Launch Event' }
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">PSBA in Action</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A visual journey through our bazaars and community initiatives
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryItems.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full flex-shrink-0"
                >
                  <div className="aspect-video bg-gray-200 border-2 border-dashed rounded-xl w-full" />
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-medium text-gray-800">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg text-gray-700 hover:text-green-600 transition-colors"
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg text-gray-700 hover:text-green-600 transition-colors"
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`mx-1 w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;