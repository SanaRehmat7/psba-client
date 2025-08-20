// src/components/home/StatsSection.jsx
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaShoppingCart,
  FaUsers,
  FaTruck,
  FaStore,
  FaUserFriends,
} from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      icon: <FaShoppingCart className="text-3xl" />,
      value: 150000,
      suffix: "+",
      label: "Total Orders Delivered",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      value: 40,
      suffix: "M",
      label: "Annual Bazaar Visitors",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaTruck className="text-3xl" />,
      value: 12000,
      label: "Monthly Free Deliveries",
      suffix: "",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaStore className="text-3xl" />,
      value: 36,
      label: "Model Bazaars in Punjab",
      suffix: "",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaUserFriends className="text-3xl" />,
      value: 20000,
      suffix: "+",
      label: "Stakeholders Supported",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <section className="py-16 bg-green-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Transforming Punjab's Marketplace
          </h2>
          <p className="max-w-2xl mx-auto opacity-90">
            PSBA's impact in numbers across the province of Punjab
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-6 bg-gradient-to-br ${stat.color} shadow-lg text-center`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-3 text-white">{stat.icon}</div>
              <div className="text-3xl font-bold">
                <CountUp
                  end={stat.value}
                  duration={2}
                  separator=","
                  suffix={stat.suffix || ""}
                />
              </div>
              <div className="mt-1 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
