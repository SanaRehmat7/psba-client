// src/components/common/PriceDashboard.jsx
import { useState } from 'react';
import { Tab } from '@headlessui/react';

const PriceDashboard = () => {
  const [categories] = useState([
    { name: 'Vegetables', items: ['Potato', 'Tomato', 'Onion', 'Cabbage', 'Carrot'] },
    { name: 'Fruits', items: ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'] },
    { name: 'Pulses', items: ['Chickpeas', 'Lentils', 'Kidney Beans', 'Green Gram', 'Black Gram'] },
    { name: 'Spices', items: ['Turmeric', 'Red Chili', 'Coriander', 'Cumin', 'Cloves'] },
    { name: 'Meat', items: ['Chicken', 'Beef', 'Mutton', 'Fish', 'Eggs (Dozen)'] }
  ]);

  // Generate mock prices
  const generatePrices = () => {
    return categories.map(category => ({
      ...category,
      prices: category.items.map(item => ({
        item,
        marketPrice: (Math.random() * 100 + 50).toFixed(2),
        psbaPrice: (Math.random() * 80 + 30).toFixed(2),
        difference: `-${Math.floor(Math.random() * 30 + 10)}%`
      }))
    }));
  };

  const [priceData] = useState(generatePrices());

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Today's Price Dashboard</h2>
        <div className="flex items-center">
          <span className="mr-3 text-gray-600">Last updated:</span>
          <span className="font-medium">Today, 8:00 AM</span>
        </div>
      </div>
      
      <Tab.Group>
        <Tab.List className="flex flex-wrap gap-1 rounded-xl bg-green-100 p-1 mb-6">
          {priceData.map((category) => (
            <Tab
              key={category.name}
              className={({ selected }) =>
                `flex-1 min-w-[120px] text-center rounded-lg py-3 text-sm font-medium leading-5
                 ${selected
                   ? 'bg-green-600 text-white shadow'
                   : 'text-green-700 hover:bg-green-200'}`
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        
        <Tab.Panels>
          {priceData.map((category, idx) => (
            <Tab.Panel key={idx} className="rounded-xl bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Market Price (Rs)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PSBA Price (Rs)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {category.prices.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.marketPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                          {item.psbaPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                          {item.difference}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      
      <div className="mt-6 text-center">
        <button className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
          Download Full Price List (PDF)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PriceDashboard;