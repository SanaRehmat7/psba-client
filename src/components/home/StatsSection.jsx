// src/components/home/StatsSection.jsx
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatsSection = () => {
  const stats = [
    { value: 35, label: 'Bazaars', suffix: '+' },
    { value: 25, label: 'Districts', suffix: '' },
    { value: 2.5, label: 'Daily Customers', suffix: 'M' },
    { value: 15, label: 'Essential Items', suffix: '+' },
    { value: 30, label: 'Price Reduction', suffix: '%' }
  ];

  return (
    <section className="py-16 bg-green-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Transforming Punjab's Marketplace</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            PSBA's impact in numbers across the province of Punjab
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp 
                  end={stat.value} 
                  duration={2} 
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;