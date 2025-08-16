// src/pages/Home.jsx
import Hero from '../home/HeroCarousel';
import InitiativeCards from '../home/InitiativeCards';
import BazaarLocator from '../home/BazaarLocator';
import NewsSection from '../home/NewsSection';
import GallerySlider from '../home/GallerySlider';
import StatsSection from '../home/StatsSection'
import BazaarMarquee from "../bazaar/BazaarMarquee"
import PriceList from '../home/PriceList';
// import PriceDashboard from "../common/PriceDashboard"


const Home = () => {
  return (
    <div>
      <Hero />
      <InitiativeCards />
      <StatsSection />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Daily Price Comparison</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how PSBA prices compare to market rates for essential commodities
            </p>
          </div>
          <PriceList />
          {/* <PriceDashboard /> */}
        </div>
      </section>
      
      <BazaarLocator />
      <NewsSection />
      <GallerySlider />
    </div>
  );
};

export default Home;