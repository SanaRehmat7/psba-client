// src/components/home/NewsSection.jsx
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: 'PSBA Launches 10 New Sahulat Bazaars in Rural Areas',
      date: '2023-11-15',
      excerpt: 'The Punjab Sahulat Bazaars Authority has expanded its network with 10 new locations in underserved rural communities...'
    },
    {
      id: 2,
      title: 'Winter Vegetable Festival at All PSBA Bazaars',
      date: '2023-11-10',
      excerpt: 'Special discounts on seasonal vegetables throughout December to support nutrition during winter months...'
    },
    {
      id: 3,
      title: 'Mobile App Update: Now with Live Price Tracking',
      date: '2023-11-05',
      excerpt: 'The official PSBA mobile application has been updated with real-time price tracking and bazaar locator features...'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest News & Updates</h2>
            <p className="text-gray-600">Stay informed about PSBA initiatives and market updates</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
            View All News
            <FaArrowRight className="ml-2" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
              <div className="p-6">
                <div className="flex items-center text-gray-500 mb-3">
                  <FaCalendarAlt className="mr-2" />
                  <span>{news.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                  Read Full Story
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;