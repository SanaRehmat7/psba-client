// src/components/Gallery.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import "./Gallery.css"

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // News data extracted from provided HTML
  const newsItems = [
    {
      id: 12019,
      title: "Benefits of seasonal fruits",
      date: "6 months ago",
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/Fruits-320x320.jpg",
      link: "https://psba.gop.pk/benefits-of-seasonal-fruits/"
    },
    {
      id: 12018,
      title: "Independence Day Special",
      date: "6 months ago",
      image: "https://psba.gop.pk/wp-content/uploads/2025/01/Independence-320x320.jpg",
      link: "https://psba.gop.pk/independence-day-special/"
    },
    {
      id: 3442,
      title: "Punjab Model Bazaars – Where Quality and Affordability Twins!",
      date: "5 years ago",
      image: "https://psba.gop.pk/wp-content/uploads/2021/01/New-Project-47-1024x1024-1-320x320.jpg",
      link: "https://psba.gop.pk/punjab-model-bazaars-where-quality-and-affordability-twins/"
    }
  ];

  // Video data extracted from provided HTML
  const videoItems = [
    { id: "t3ehMSbmlXQ", title: "Video 1" },
    { id: "2kPm2JrFIIc", title: "Video 2" },
    { id: "B1YdLXSYECQ", title: "Video 3" },
    { id: "jja7XZvQMcY", title: "Video 4" },
    { id: "V99p5hObsx0", title: "Video 5" },
    { id: "kK0PnAPQPBk", title: "Video 6" }
  ];

  const allItems = [
    ...newsItems.map(item => ({ ...item, type: 'news' })),
    ...videoItems.map(item => ({ ...item, type: 'video' }))
  ];

  const filteredItems = activeTab === 'all' 
    ? allItems 
    : activeTab === 'news' 
      ? newsItems.map(item => ({ ...item, type: 'news' }))
      : videoItems.map(item => ({ ...item, type: 'video' }));

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="gallery-container">
      {/* Header */}
      <header className="gallery-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="header-content"
        >
          <h1 className="gallery-title">Media Gallery</h1>
          <div className="breadcrumb">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">➔</span>
            <span className="breadcrumb-current">Gallery</span>
          </div>
        </motion.div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            News
          </button>
          <button 
            className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id || item.videoId}
            className={`gallery-item ${item.type}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (item.type === 'news') {
                openExternalLink(item.link);
              } else {
                setSelectedItem(item);
              }
            }}
          >
            {item.type === 'news' ? (
              <>
                <div className="image-container">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="item-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/320x320?text=Image+Not+Found";
                    }}
                  />
                </div>
                <div className="item-content">
                  <div className="item-meta">
                    <FaCalendarAlt className="icon" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="item-title">{item.title}</h3>
                </div>
              </>
            ) : (
              <>
                <div className="video-thumbnail">
                  <img 
                    src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`} 
                    alt={item.title}
                    className="item-image"
                  />
                  <div className="play-overlay">
                    <FaPlay className="play-icon" />
                  </div>
                </div>
                <div className="item-content">
                  <h3 className="item-title">{item.title}</h3>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedItem && (
        <motion.div 
          className="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-button"
              onClick={() => setSelectedItem(null)}
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedItem.id}?autoplay=1`}
              title={selectedItem.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}

      {/* View More Button */}
      <div className="view-more-container">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="view-more-button"
          onClick={() => openExternalLink("https://www.youtube.com/@punjabmodelbazaarsmanageme9341/videos")}
        >
          View More Videos
          <FaExternalLinkAlt className="external-icon" />
        </motion.button>
      </div>
    </div>
  );
};

export default Gallery;