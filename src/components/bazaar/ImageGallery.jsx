import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          key={selectedImage}
          src={images[selectedImage]}
          alt={`Gallery ${selectedImage + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Thumbnails */}
      <div className="p-4 flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${
              selectedImage === index ? 'border-green-600' : 'border-transparent'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-20 h-20 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;