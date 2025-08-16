import React, { useState, useEffect, useRef } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';

// Custom hook for fetching price data
const usePriceData = (district) => {
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date()); // Default to current date
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log(`Sending request to: http://localhost:5000/api/bazaars/prices/${district}?t=${Date.now()}`);
        const res = await axios.get(`http://localhost:5000/api/bazaars/prices/${district}?t=${Date.now()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` || undefined },
          timeout: 15000, // Increased to 15 seconds
        });
        console.log('Raw API Response (full):', res.data);

        if (!res.data || !Array.isArray(res.data.prices)) {
          throw new Error('Invalid API response structure: ' + JSON.stringify(res.data));
        }

        console.log('Raw Prices (sample):', res.data.prices.slice(0, 5));
        const approvedPrices = res.data.prices.filter(price => 
          price?.approved === true && price?.date && !isNaN(new Date(price.date).getTime())
        );

        console.log('Approved Prices (sample):', approvedPrices.slice(0, 5));

        const latestUpdate = approvedPrices.length > 0
          ? approvedPrices.reduce((latest, price) => {
              const priceDate = new Date(price.date);
              console.log('Reducing date:', price.date, '->', priceDate, 'Current latest:', latest);
              return !isNaN(priceDate.getTime()) && priceDate > new Date(latest) ? price.date : latest;
            }, new Date(0).toISOString())
          : new Date().toISOString(); // Fallback to current date

        console.log('Latest Update (before conversion):', latestUpdate);

        const uniquePrices = approvedPrices.reduce((acc, price) => {
          const existing = acc.find(p => p.item.toLowerCase() === price.item.toLowerCase());
          if (!existing || new Date(price.date) > new Date(existing.date)) {
            acc = acc.filter(p => p.item.toLowerCase() !== price.item.toLowerCase());
            acc.push(price);
          }
          return acc;
        }, []);

        console.log('Unique Prices (full):', uniquePrices);

        const updatedPriceData = CATEGORIES.map(category => ({
          ...category,
          prices: category.items.map(item => {
            const matchedPrice = uniquePrices.find(p => p.item.toLowerCase() === item.toLowerCase());
            console.log(`Matching ${item} ->`, matchedPrice);
            if (matchedPrice) {
              return {
                item,
                marketPrice: matchedPrice.marketPrice !== undefined ? matchedPrice.marketPrice.toFixed(2) : 'N/A',
                psbaPrice: matchedPrice.psbaPrice !== undefined ? matchedPrice.psbaPrice.toFixed(2) : 'N/A',
                difference: matchedPrice.difference || `-${Math.floor(Math.random() * 20 + 10)}%`
              };
            }
            return {
              item,
              marketPrice: 'N/A',
              psbaPrice: 'N/A',
              difference: 'N/A'
            };
          })
        }));
        setPriceData(updatedPriceData);
        setLastUpdate(new Date(latestUpdate)); // Always set a Date object
      } catch (err) {
        console.error('Error fetching prices:', err.message, 'Stack:', err.stack);
        setError(`Failed to load prices: ${err.message}`);
        const fallbackData = CATEGORIES.map(category => ({
          ...category,
          prices: category.items.map(item => ({
            item,
            marketPrice: 'N/A',
            psbaPrice: 'N/A',
            difference: 'N/A'
          }))
        }));
        setPriceData(fallbackData);
        setLastUpdate(new Date()); // Fallback to current date on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrices();
  }, [district]);

  return { priceData, isLoading, lastUpdate, error };
};

// Custom hook for fetching districts with fallback
const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('http://localhost:5000/api/districts');
        setDistricts(res.data.length > 0 ? res.data : FALLBACK_DISTRICTS);
      } catch (err) {
        console.error('Error fetching districts:', err);
        setDistricts(FALLBACK_DISTRICTS); // Use fallback if API fails
      } finally {
        setIsLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  return { districts, isLoading };
};

// Constants
const CATEGORIES = [
  {
    name: 'Vegetables',
    items: ['Tomato', 'Onion', 'Potato', 'Cabbage', 'Carrot']
  },
  {
    name: 'Fruits',
    items: ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes']
  },
  {
    name: 'Pulses & Grains',
    items: ['Chickpeas', 'Lentils', 'Kidney Beans', 'Green Gram', 'Black Gram']
  },
  {
    name: 'Spices',
    items: ['Turmeric', 'Red Chili', 'Coriander', 'Cumin', 'Cloves']
  },
  {
    name: 'Meat & Eggs',
    items: ['Chicken', 'Beef', 'Mutton', 'Fish', 'Eggs (Dozen)']
  }
];

const FALLBACK_DISTRICTS = [
  'lahore', 'bahawalpur', 'chakwal', 'sargodha', 'faisalabad', 'gujrat', 'gujranwala',
  'hafizabad', 'jhang', 'kasur', 'khushab', 'layyah', 'rawalpindi', 'lodhran',
  'rajanpur', 'toba-tek-singh', 'sahiwal', 'dg-khan', 'sheikhupura', 'sialkot',
  'vehari', 'mianwali', 'pakpattan', 'bhakkar', 'taunsa-sharif', 'chung', 'china-scheme',
  'mian-plaza-johar-town', 'harbanspura', 'raiwind', 'sabzazaar', 'thokar-niaz-baig',
  'sher-shah-colony', 'township', 'wahdat-colony'
].map(name => ({ name, id: name }));

// Reusable PriceRow component
const PriceRow = ({ item, marketPrice, psbaPrice, difference }) => (
  <tr className="even:bg-white odd:bg-green-50">
    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item}</td>
    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{marketPrice !== null ? marketPrice : 'N/A'}</td>
    <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600 font-semibold">{psbaPrice !== null ? psbaPrice : 'N/A'}</td>
    <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600 font-medium">{difference || 'N/A'}</td>
  </tr>
);

// Main PriceList component
const PriceList = () => {
  const [district, setDistrict] = useState('lahore');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { districts, isLoading: isDistrictsLoading } = useDistricts();
  const { priceData, isLoading, lastUpdate, error } = usePriceData(district);
  const [showChart, setShowChart] = useState(false);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // For click details

 // Format date for display
const formatUpdateTime = (date) => {
  console.log('formatUpdateTime input:', date); // Debug input
  try {
    if (!date || isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.toLocaleString('en-PK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    console.error('Date formatting error:', e.message, 'Input was:', date);
    return 'Not available';
  }
}; 
  // Handle chart rendering
  const handleChartConfirm = (categoryIndex) => {
    setShowChart(true);
    if (chartInstance) chartInstance.destroy();

    const category = priceData[categoryIndex];
    const canvas = chartRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      console.log('Creating chart for category:', category.name, 'Canvas:', canvas, 'Context:', ctx);
      canvas.style.display = 'block';
      canvas.height = 300;
      canvas.width = 600;
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: category.prices.map(p => p.item),
          datasets: [
            {
              label: 'Market Price',
              data: category.prices.map(p => parseFloat(p.marketPrice) || 0),
              backgroundColor: '#EF4444',
              borderColor: '#DC2626',
              borderWidth: 1
            },
            {
              label: 'PSBA Price',
              data: category.prices.map(p => parseFloat(p.psbaPrice) || 0),
              backgroundColor: '#10B981',
              borderColor: '#047857',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } },
          plugins: { 
            legend: { position: 'top' },
            title: { display: true, text: `Price Comparison - ${category.name}` },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const item = category.prices[tooltipItem.dataIndex];
                  return [
                    `Item: ${item.item}`,
                    `Market: Rs ${item.marketPrice || 'N/A'}`,
                    `PSBA: Rs ${item.psbaPrice || 'N/A'}`,
                    `Savings: ${item.difference || 'N/A'}`
                  ];
                }
              }
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              setSelectedItem(category.prices[index]);
            }
          }
        }
      });
      setChartInstance(newChartInstance);
      console.log('Chart instance created:', newChartInstance);
    } else {
      console.error('Canvas element not found. ChartRef:', chartRef.current);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Price List - ${district.charAt(0).toUpperCase() + district.slice(1)}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Last Updated: ${formatUpdateTime(lastUpdate)}`, 10, 20);

    priceData.forEach((category, index) => {
      doc.addPage();
      doc.text(category.name, 10, 10);
      let y = 20;
      category.prices.forEach(price => {
        doc.text(`${price.item}: Market Rs ${price.marketPrice || 'N/A'}, PSBA Rs ${price.psbaPrice || 'N/A'} (Savings: ${price.difference || 'N/A'})`, 10, y += 10);
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });
    });

    doc.save(`price-list-${district}.pdf`);
  };

  // Handle refresh
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    lastUpdate(new Date());
    console.log('Refresh triggered, new trigger:', refreshTrigger + 1, 'New lastUpdate:', new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Price Dashboard</h1>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Mobile Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            {isSidebarOpen ? 'Close Districts' : 'Select District'}
          </button>
        </div>

        {/* District Sidebar */}
        <aside
          className={`w-full lg:w-72 bg-white rounded-lg shadow-lg p-5 transition-all duration-300 ${
            isSidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <h3 className="text-lg font-semibold text-green-700 mb-4">Select District</h3>
          {isDistrictsLoading ? (
            <div className="text-center py-2 text-gray-600">Loading districts...</div>
          ) : (
            <div className="space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {districts.map((dist) => (
                <button
                  key={dist.id}
                  onClick={() => {
                    setDistrict(dist.name);
                    setIsSidebarOpen(false);
                    if (chartInstance) chartInstance.destroy();
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
                    district === dist.name
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-green-50 hover:shadow'
                  }`}
                >
                  {dist.name.charAt(0).toUpperCase() + dist.name.slice(1).replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Price Dashboard */}
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-0">Today's Price List</h2>
              <div className="flex items-center text-gray-600 space-x-4">
                <span className="mr-2">Last updated:</span>
                <span className="font-medium">{formatUpdateTime(lastUpdate)}</span>
                {/* <button
                  onClick={handleRefresh}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  Refresh
                </button> */}
              </div>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}
            {isLoading ? (
              <div className="text-center py-4 text-gray-600">Loading prices...</div>
            ) : (
              <>
                <Tab.Group>
                  <Tab.List className="flex flex-wrap gap-2 bg-green-50 p-2 rounded-lg mb-6">
                    {priceData.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            selected
                              ? 'bg-green-600 text-white shadow-md'
                              : 'text-green-700 hover:bg-green-100'
                          }`
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    {priceData.map((category, idx) => (
                      <Tab.Panel key={idx} className="rounded-lg bg-white">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Item
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Market Price (Rs)
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  PSBA Price (Rs)
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Savings
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {category.prices.map((price, i) => (
                                <PriceRow key={i} {...price} />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="mt-6 text-center space-x-4">
                  <button
                    onClick={() => setShowChart(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 font-medium rounded-md hover:bg-green-100 transition-colors duration-200"
                  >
                    Show Price Comparison Chart
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 font-medium rounded-md hover:bg-green-100 transition-colors duration-200"
                  >
                    Download Full Price List (PDF)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {showChart && priceData.length > 0 && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-2">Would you like to see a price comparison chart for the selected category?</p>
                <div className="space-x-4">
                  {priceData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChartConfirm(idx)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                      {priceData[idx].name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowChart(false);
                      if (chartInstance) chartInstance.destroy();
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
                <div className="mt-4" style={{ maxHeight: '400px', overflow: 'auto', position: 'relative' }}>
                  <canvas
                    ref={chartRef}
                    height="300"
                    width="600"
                    style={{ 
                      maxWidth: '100%', 
                      height: '300px', 
                      display: 'block', 
                      border: '1px solid #ccc'
                    }}
                  />
                  {chartInstance && (
                    <p className="text-green-600 mt-2">Chart loaded. Click a bar for details.</p>
                  )}
                  {!chartInstance && (
                    <p className="text-gray-500">Chart will appear after selecting a category.</p>
                  )}
                  {selectedItem && (
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800">Item Details</h3>
                      <p>Item: {selectedItem.item}</p>
                      <p>Market Price: Rs {selectedItem.marketPrice || 'N/A'}</p>
                      <p>PSBA Price: Rs {selectedItem.psbaPrice || 'N/A'}</p>
                      <p>Savings: {selectedItem.difference || 'N/A'}</p>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="mt-2 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PriceList;

// import React, { useState, useEffect, useRef } from 'react';
// import { Tab } from '@headlessui/react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';
// import jsPDF from 'jspdf';

// // Custom hook for fetching price data
// const usePriceData = (district, refreshTrigger) => {
//   const [priceData, setPriceData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [lastUpdate, setLastUpdate] = useState(new Date());
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         console.log(`Fetching prices for district: ${district} with trigger: ${refreshTrigger}`);
//         const res = await axios.get(`http://localhost:5000/api/bazaars/prices/${district}` , {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` || undefined },
//           timeout: 5000,
//         });
//         console.log('Raw API Response:', res.data);

//         const approvedPrices = res.data.flatMap(bazaar =>
//           (bazaar.prices || []).filter(price => 
//             price?.approved && price?.date && !isNaN(new Date(price.date).getTime())
//           )
//         );
//         const latestUpdate = approvedPrices.length > 0
//           ? approvedPrices.reduce((latest, price) => {
//               const priceDate = new Date(price.date);
//               return !isNaN(priceDate.getTime()) && priceDate > new Date(latest) ? price.date : latest;
//             }, new Date(0))
//           : new Date();

//           // Use the latest price for each item
//         const uniquePrices = approvedPrices.reduce((acc, price) => {
//           const existing = acc.find(p => p.item.toLowerCase() === price.item.toLowerCase());
//           if (!existing || new Date(price.date) > new Date(existing.date)) {
//             acc = acc.filter(p => p.item.toLowerCase() !== price.item.toLowerCase());
//             acc.push(price);
//           }
//           return acc;
//         }, []);
//         console.log('Unique prices available:', uniquePrices.map(p => p.item));

//         const updatedPriceData = CATEGORIES.map(category => ({
//           ...category,
//           prices: category.items.map(item => {
//             const price = approvedPrices.find(p => p.item === item);
//             const basePrice = price ? parseFloat(price.price) : Math.random() * 100 + 50;
//             return {
//               item,
//               marketPrice: (basePrice * 1.2).toFixed(2),
//               psbaPrice: basePrice.toFixed(2),
//               difference: `-${Math.floor(Math.random() * 20 + 10)}%`
//             };
//           })
//         }));
//         setPriceData(updatedPriceData);
//         setLastUpdate(new Date(latestUpdate));
//       } catch (err) {
//         console.error('Error fetching prices:', err);
//         setError('Failed to load prices. Using fallback data.');
//         const fallbackData = CATEGORIES.map(category => ({
//           ...category,
//           prices: category.items.map(item => {
//             const basePrice = Math.random() * 100 + 50;
//             return {
//               item,
//               marketPrice: (basePrice * 1.2).toFixed(2),
//               psbaPrice: basePrice.toFixed(2),
//               difference: `-${Math.floor(Math.random() * 20 + 10)}%`
//             };
//           })
//         }));
//         setPriceData(fallbackData);
//         setLastUpdate(new Date());
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPrices();
//   }, [district, refreshTrigger]);

//   return { priceData, isLoading, lastUpdate, error };
// };

// // Custom hook for fetching districts with fallback
// const useDistricts = () => {
//   const [districts, setDistricts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDistricts = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get('http://localhost:5000/api/districts');
//         setDistricts(res.data.length > 0 ? res.data : FALLBACK_DISTRICTS);
//       } catch (err) {
//         console.error('Error fetching districts:', err);
//         setDistricts(FALLBACK_DISTRICTS); // Use fallback if API fails
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDistricts();
//   }, []);

//   return { districts, isLoading };
// };

// // Constants
// const CATEGORIES = [
//   { name: 'Vegetables', items: ['Potato', 'Onion', 'Tomato', 'Garlic', 'Lemon', 'Pumpkin'] },
//   { name: 'Fruits', items: ['Banana (Per Dozen)', 'Apple', 'Guava', 'Melon', 'Dates (Khajur)'] },
//   { name: 'Meat & Eggs', items: ['Chicken', 'Eggs (Dzn)'] },
//   { name: 'Grains & Flour', items: ['Atta (10 KG)', 'Sugar', 'Gram Flour', 'Gram Pulse (Dall Chana)'] }
// ];

// const FALLBACK_DISTRICTS = [
//   'lahore', 'bahawalpur', 'chakwal', 'sargodha', 'faisalabad', 'gujrat', 'gujranwala',
//   'hafizabad', 'jhang', 'kasur', 'khushab', 'layyah', 'rawalpindi', 'lodhran',
//   'rajanpur', 'toba-tek-singh', 'sahiwal', 'dg-khan', 'sheikhupura', 'sialkot',
//   'vehari', 'mianwali', 'pakpattan', 'bhakkar', 'taunsa-sharif', 'chung', 'china-scheme',
//   'mian-plaza-johar-town', 'harbanspura', 'raiwind', 'sabzazaar', 'thokar-niaz-baig',
//   'sher-shah-colony', 'township', 'wahdat-colony'
// ].map(name => ({ name, id: name }));

// // Reusable PriceRow component
// const PriceRow = ({ item, marketPrice, psbaPrice, difference }) => (
//   <tr className="even:bg-white odd:bg-green-50">
//     <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item}</td>
//     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{marketPrice}</td>
//     <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600 font-semibold">{psbaPrice}</td>
//     <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600 font-medium">{difference}</td>
//   </tr>
// );

// // Main PriceList component
// const PriceList = () => {
//   const [district, setDistrict] = useState('lahore');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const { districts, isLoading: isDistrictsLoading } = useDistricts();
//   const { priceData, isLoading, lastUpdate, error } = usePriceData(district, refreshTrigger);
//   const [showChart, setShowChart] = useState(false);
//   const chartRef = useRef(null);
//   const [chartInstance, setChartInstance] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null); // For click details

//   // Format date for display
//   const formatUpdateTime = (date) => {
//     try {
//       if (isNaN(date.getTime())) throw new Error('Invalid date');
//       return date.toLocaleString('en-PK', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     } catch (e) {
//       console.error('Date formatting error:', e);
//       return new Date().toLocaleString();
//     }
//   };

//   // Handle chart rendering
//   const handleChartConfirm = (categoryIndex) => {
//     setShowChart(true);
//     if (chartInstance) chartInstance.destroy();

//     const category = priceData[categoryIndex];
//     const canvas = chartRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       console.log('Creating chart for category:', category.name, 'Canvas:', canvas, 'Context:', ctx);
//       canvas.style.display = 'block';
//       canvas.height = 300;
//       canvas.width = 600;
//       const newChartInstance = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: category.prices.map(p => p.item),
//           datasets: [
//             {
//               label: 'Market Price',
//               data: category.prices.map(p => parseFloat(p.marketPrice)),
//               backgroundColor: '#EF4444',
//               borderColor: '#DC2626',
//               borderWidth: 1
//             },
//             {
//               label: 'PSBA Price',
//               data: category.prices.map(p => parseFloat(p.psbaPrice)),
//               backgroundColor: '#10B981',
//               borderColor: '#047857',
//               borderWidth: 1
//             }
//           ]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: { y: { beginAtZero: true } },
//           plugins: { 
//             legend: { position: 'top' },
//             title: { display: true, text: `Price Comparison - ${category.name}` },
//             tooltip: {
//               callbacks: {
//                 label: (tooltipItem) => {
//                   const item = category.prices[tooltipItem.dataIndex];
//                   return [
//                     `Item: ${item.item}`,
//                     `Market: Rs ${item.marketPrice}`,
//                     `PSBA: Rs ${item.psbaPrice}`,
//                     `Savings: ${item.difference}`
//                   ];
//                 }
//               }
//             }
//           },
//           onClick: (event, elements) => {
//             if (elements.length > 0) {
//               const index = elements[0].index;
//               setSelectedItem(category.prices[index]);
//             }
//           }
//         }
//       });
//       setChartInstance(newChartInstance);
//       console.log('Chart instance created:', newChartInstance);
//     } else {
//       console.error('Canvas element not found. ChartRef:', chartRef.current);
//     }
//   };

//   // Handle PDF download
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text(`Price List - ${district.charAt(0).toUpperCase() + district.slice(1)}`, 10, 10);
//     doc.setFontSize(12);
//     doc.text(`Last Updated: ${formatUpdateTime(lastUpdate)}`, 10, 20);

//     priceData.forEach((category, index) => {
//       doc.addPage();
//       doc.text(category.name, 10, 10);
//       let y = 20;
//       category.prices.forEach(price => {
//         doc.text(`${price.item}: Market Rs ${price.marketPrice}, PSBA Rs ${price.psbaPrice} (Savings: ${price.difference})`, 10, y += 10);
//         if (y > 280) {
//           doc.addPage();
//           y = 10;
//         }
//       });
//     });

//     doc.save(`price-list-${district}.pdf`);
//   };

//   const handleRefresh = () => {
//     setRefreshTrigger(prev => prev + 1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Header */}
//       <header className="bg-green-700 text-white py-4 px-6 shadow-md">
//         <h1 className="text-2xl font-bold">PSBA Price Dashboard</h1>
//       </header>

//       {/* Main Layout */}
//       <div className="flex flex-col lg:flex-row gap-6 p-6">
//         {/* Mobile Toggle Button */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200"
//           >
//             {isSidebarOpen ? 'Close Districts' : 'Select District'}
//           </button>
//         </div>

//         {/* District Sidebar */}
//         <aside
//           className={`w-full lg:w-72 bg-white rounded-lg shadow-lg p-5 transition-all duration-300 ${
//             isSidebarOpen ? 'block' : 'hidden lg:block'
//           }`}
//         >
//           <h3 className="text-lg font-semibold text-green-700 mb-4">Select District</h3>
//           {isDistrictsLoading ? (
//             <div className="text-center py-2 text-gray-600">Loading districts...</div>
//           ) : (
//             <div className="space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
//               {districts.map((dist) => (
//                 <button
//                   key={dist.id}
//                   onClick={() => {
//                     setDistrict(dist.name);
//                     setIsSidebarOpen(false);
//                     if (chartInstance) chartInstance.destroy();
//                   }}
//                   className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
//                     district === dist.name
//                       ? 'bg-green-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-green-50 hover:shadow'
//                   }`}
//                 >
//                   {dist.name.charAt(0).toUpperCase() + dist.name.slice(1).replace(/-/g, ' ')}
//                 </button>
//               ))}
//             </div>
//           )}
//         </aside>

//         {/* Price Dashboard */}
//         <main className="flex-1">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
//               <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-0">Today's Price List</h2>
//               <div className="flex items-center text-gray-600 space-x-4">
//                 <span className="mr-2">Last updated:</span>
//                 <span className="font-medium">{formatUpdateTime(lastUpdate)}</span>
//                 <button
//                   onClick={handleRefresh}
//                   className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>

//             {error && <div className="text-red-600 mb-4">{error}</div>}
//             {isLoading ? (
//               <div className="text-center py-4 text-gray-600">Loading prices...</div>
//             ) : (
//               <>
//                 <Tab.Group>
//                   <Tab.List className="flex flex-wrap gap-2 bg-green-50 p-2 rounded-lg mb-6">
//                     {priceData.map((category) => (
//                       <Tab
//                         key={category.name}
//                         className={({ selected }) =>
//                           `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
//                             selected
//                               ? 'bg-green-600 text-white shadow-md'
//                               : 'text-green-700 hover:bg-green-100'
//                           }`
//                         }
//                       >
//                         {category.name}
//                       </Tab>
//                     ))}
//                   </Tab.List>
//                   <Tab.Panels>
//                     {priceData.map((category, idx) => (
//                       <Tab.Panel key={idx} className="rounded-lg bg-white">
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                               <tr>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   Item
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   Market Price (Rs)
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   PSBA Price (Rs)
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   Savings
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-100">
//                               {category.prices.map((price, i) => (
//                                 <PriceRow key={i} {...price} />
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </Tab.Panel>
//                     ))}
//                   </Tab.Panels>
//                 </Tab.Group>

//                 <div className="mt-6 text-center space-x-4">
//                   <button
//                     onClick={() => setShowChart(true)}
//                     className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 font-medium rounded-md hover:bg-green-100 transition-colors duration-200"
//                   >
//                     Show Price Comparison Chart
//                   </button>
//                   <button
//                     onClick={handleDownloadPDF}
//                     className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 font-medium rounded-md hover:bg-green-100 transition-colors duration-200"
//                   >
//                     Download Full Price List (PDF)
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 ml-2"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </>
//             )}

//             {showChart && priceData.length > 0 && (
//               <div className="mt-6 text-center">
//                 <p className="text-gray-600 mb-2">Would you like to see a price comparison chart for the selected category?</p>
//                 <div className="space-x-4">
//                   {priceData.map((_, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handleChartConfirm(idx)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
//                     >
//                       {priceData[idx].name}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => {
//                       setShowChart(false);
//                       if (chartInstance) chartInstance.destroy();
//                       setSelectedItem(null);
//                     }}
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//                 <div className="mt-4" style={{ maxHeight: '400px', overflow: 'auto', position: 'relative' }}>
//                   <canvas
//                     ref={chartRef}
//                     height="300"
//                     width="600"
//                     style={{ 
//                       maxWidth: '100%', 
//                       height: '300px', 
//                       display: 'block', 
//                       border: '1px solid #ccc'
//                     }}
//                   />
//                   {chartInstance && (
//                     <p className="text-green-600 mt-2">Chart loaded. Click a bar for details.</p>
//                   )}
//                   {!chartInstance && (
//                     <p className="text-gray-500">Chart will appear after selecting a category.</p>
//                   )}
//                   {selectedItem && (
//                     <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
//                       <h3 className="text-lg font-semibold text-gray-800">Item Details</h3>
//                       <p>Item: {selectedItem.item}</p>
//                       <p>Market Price: Rs {selectedItem.marketPrice}</p>
//                       <p>PSBA Price: Rs {selectedItem.psbaPrice}</p>
//                       <p>Savings: {selectedItem.difference}</p>
//                       <button
//                         onClick={() => setSelectedItem(null)}
//                         className="mt-2 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PriceList;




// import React, { useState, useEffect, useRef } from 'react';
// import { Tab } from '@headlessui/react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';
// import jsPDF from 'jspdf';

// // Custom hook for fetching price data
// const usePriceData = (district, refreshTrigger) => {
//   const [priceData, setPriceData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [lastUpdate, setLastUpdate] = useState(new Date());
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
//         console.log(`Fetching approved prices for district: ${district} with trigger: ${refreshTrigger} from ${apiUrl}/api/bazaars/prices/${district}`);
//         const res = await axios.get(`${apiUrl}/api/bazaars/prices/${district}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` || undefined },
//           timeout: 5000,
//         });
//         console.log('Raw API Response:', res.data);
//         console.log('All prices with details:', res.data.prices.map(p => ({ item: p.item, marketPrice: p.marketPrice, psbaPrice: p.psbaPrice, approved: p.approved })));

//         const approvedPrices = res.data.prices || [];
//         if (!Array.isArray(approvedPrices)) {
//           throw new Error('Invalid response format: expected an array of prices');
//         }

//         const latestUpdate = approvedPrices.length > 0
//           ? approvedPrices.reduce((latest, price) => {
//               const priceDate = new Date(price.date);
//               return !isNaN(priceDate.getTime()) && priceDate > new Date(latest) ? price.date : latest;
//             }, new Date(0))
//           : new Date();

//         // Use the latest price for each item
//         const uniquePrices = approvedPrices.reduce((acc, price) => {
//           const existing = acc.find(p => p.item.toLowerCase() === price.item.toLowerCase());
//           if (!existing || new Date(price.date) > new Date(existing.date)) {
//             acc = acc.filter(p => p.item.toLowerCase() !== price.item.toLowerCase());
//             acc.push(price);
//           }
//           return acc;
//         }, []);

//         console.log('Unique prices available:', uniquePrices.map(p => p.item));

//         const updatedPriceData = CATEGORIES.map(category => ({
//           ...category,
//           prices: category.items.map(item => {
//             const matchedPrice = uniquePrices.find(p => p.item && p.item.toLowerCase() === item.toLowerCase());
//             console.log(`Mapping item: ${item}, matched price:`, matchedPrice ? { item: matchedPrice.item, marketPrice: matchedPrice.marketPrice, psbaPrice: matchedPrice.psbaPrice } : 'Not found');
//             return matchedPrice ? {
//               item,
//               marketPrice: typeof matchedPrice.marketPrice === 'number' ? matchedPrice.marketPrice.toFixed(2) : null,
//               psbaPrice: typeof matchedPrice.psbaPrice === 'number' ? matchedPrice.psbaPrice.toFixed(2) : null,
//               difference: matchedPrice.difference || (matchedPrice.marketPrice && matchedPrice.psbaPrice ? `-${Math.floor(Math.abs((matchedPrice.marketPrice - matchedPrice.psbaPrice) / matchedPrice.marketPrice * 100))}%` : null)
//             } : {
//               item,
//               marketPrice: null,
//               psbaPrice: null,
//               difference: null
//             };
//           })
//         }));
//         console.log('Mapped priceData for category:', updatedPriceData);
//         setPriceData(updatedPriceData);
//         setLastUpdate(new Date(latestUpdate));
//       } catch (err) {
//         console.error('Error fetching approved prices:', err.response?.data || err.message);
//         setError(`Failed to load approved prices. Server returned ${err.response?.status || 'unknown'} error. Check backend.`);
//         const fallbackData = CATEGORIES.map(category => ({
//           ...category,
//           prices: category.items.map(item => ({
//             item,
//             marketPrice: null,
//             psbaPrice: null,
//             difference: null
//           }))
//         }));
//         setPriceData(fallbackData);
//         setLastUpdate(new Date());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPrices();
//   }, [district, refreshTrigger]);

//   return { priceData, isLoading, lastUpdate, error };
// };

// const useDistricts = () => {
//   const [districts, setDistricts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDistricts = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get('http://localhost:5000/api/districts');
//         setDistricts(res.data.length > 0 ? res.data : FALLBACK_DISTRICTS);
//       } catch (err) {
//         console.error('Error fetching districts:', err);
//         setDistricts(FALLBACK_DISTRICTS); // Use fallback if API fails
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDistricts();
//   }, []);

//   return { districts, isLoading };
// };

// // Constants
// const CATEGORIES = [
//   { name: 'Vegetables', items: ['Potato', 'Onion', 'Tomato', 'Garlic', 'Lemon', 'Pumpkin'] },
//   { name: 'Fruits', items: ['Banana (Per Dozen)', 'Apple', 'Guava', 'Melon', 'Dates (Khajur)'] },
//   { name: 'Meat & Eggs', items: ['Chicken', 'Eggs (Dozen)'] }, // Changed to match "Eggs (Dozen)"
//   { name: 'Grains & Flour', items: ['Atta (10 KG)', 'Sugar', 'Gram Flour', 'Gram Pulse (Dall Chana)'] }
// ];

// const formatUpdateTime = (date) => {
//   return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
// };

// const FALLBACK_DISTRICTS = [
//   'lahore', 'bahawalpur', 'chakwal', 'sargodha', 'faisalabad', 'gujrat', 'gujranwala',
//   'hafizabad', 'jhang', 'kasur', 'khushab', 'layyah', 'rawalpindi', 'lodhran',
//   'rajanpur', 'toba-tek-singh', 'sahiwal', 'dg-khan', 'sheikhupura', 'sialkot',
//   'vehari', 'mianwali', 'pakpattan', 'bhakkar', 'taunsa-sharif', 'chung', 'china-scheme',
//   'mian-plaza-johar-town', 'harbanspura', 'raiwind', 'sabzazaar', 'thokar-niaz-baig',
//   'sher-shah-colony', 'township', 'wahdat-colony'
// ].map(name => ({ name, id: name }));

// // Reusable PriceRow component
// const PriceRow = ({ item, marketPrice, psbaPrice, difference }) => (
//   <tr className="even:bg-white odd:bg-green-50">
//     <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item}</td>
//     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{marketPrice}</td>
//     <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600 font-semibold">{psbaPrice}</td>
//     <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600 font-medium">{difference}</td>
//   </tr>
// );

// // Main PriceList component
// const PriceList = () => {
//   const [district, setDistrict] = useState('lahore');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const { districts, isLoading: isDistrictsLoading } = useDistricts();
//   const { priceData, isLoading, lastUpdate, error } = usePriceData(district, refreshTrigger);
//   const [showChart, setShowChart] = useState(false);
//   const chartRef = useRef(null);
//   const [chartInstance, setChartInstance] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null); // For click details

//   // Format date for display
//   const formatUpdateTime = (date) => {
//     try {
//       if (isNaN(date.getTime())) throw new Error('Invalid date');
//       return date.toLocaleString('en-PK', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     } catch (e) {
//       console.error('Date formatting error:', e);
//       return new Date().toLocaleString();
//     }
//   };

//   // Handle chart rendering
//   const handleChartConfirm = (categoryIndex) => {
//     setShowChart(true);
//     if (chartInstance) chartInstance.destroy();

//     const category = priceData[categoryIndex];
//     const canvas = chartRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       console.log('Creating chart for category:', category.name, 'Canvas:', canvas, 'Context:', ctx);
//       canvas.style.display = 'block';
//       canvas.height = 300;
//       canvas.width = 600;
//       const newChartInstance = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: category.prices.map(p => p.item),
//           datasets: [
//             {
//               label: 'Market Price',
//               data: category.prices.map(p => parseFloat(p.marketPrice)),
//               backgroundColor: '#EF4444',
//               borderColor: '#DC2626',
//               borderWidth: 1
//             },
//             {
//               label: 'PSBA Price',
//               data: category.prices.map(p => parseFloat(p.psbaPrice)),
//               backgroundColor: '#10B981',
//               borderColor: '#047857',
//               borderWidth: 1
//             }
//           ]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: { y: { beginAtZero: true } },
//           plugins: { 
//             legend: { position: 'top' },
//             title: { display: true, text: `Price Comparison - ${category.name}` },
//             tooltip: {
//               callbacks: {
//                 label: (tooltipItem) => {
//                   const item = category.prices[tooltipItem.dataIndex];
//                   return [
//                     `Item: ${item.item}`,
//                     `Market: Rs ${item.marketPrice}`,
//                     `PSBA: Rs ${item.psbaPrice}`,
//                     `Savings: ${item.difference}`
//                   ];
//                 }
//               }
//             }
//           },
//           onClick: (event, elements) => {
//             if (elements.length > 0) {
//               const index = elements[0].index;
//               setSelectedItem(category.prices[index]);
//             }
//           }
//         }
//       });
//       setChartInstance(newChartInstance);
//       console.log('Chart instance created:', newChartInstance);
//     } else {
//       console.error('Canvas element not found. ChartRef:', chartRef.current);
//     }
//   };

//   // Handle PDF download
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text(`Price List - ${district.charAt(0).toUpperCase() + district.slice(1)}`, 10, 10);
//     doc.setFontSize(12);
//     doc.text(`Last Updated: ${formatUpdateTime(lastUpdate)}`, 10, 20);

//     priceData.forEach((category, index) => {
//       doc.addPage();
//       doc.text(category.name, 10, 10);
//       let y = 20;
//       category.prices.forEach(price => {
//         doc.text(`${price.item}: Market Rs ${price.marketPrice}, PSBA Rs ${price.psbaPrice} (Savings: ${price.difference})`, 10, y += 10);
//         if (y > 280) {
//           doc.addPage();
//           y = 10;
//         }
//       });
//     });

//     doc.save(`price-list-${district}.pdf`);
//   };

//   const handleRefresh = () => {
//     setRefreshTrigger(prev => prev + 1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Header */}
//       <header className="bg-green-700 text-white py-4 px-6 shadow-md">
//         <h1 className="text-2xl font-bold">PSBA Price Dashboard</h1>
//       </header>

//       {/* Main Layout */}
//       <div className="flex flex-col lg:flex-row gap-6 p-6">
//         {/* Mobile Toggle Button */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200"
//           >
//             {isSidebarOpen ? 'Close Districts' : 'Select District'}
//           </button>
//         </div>

//         {/* District Sidebar */}
//         <aside
//           className={`w-full lg:w-72 bg-white rounded-lg shadow-lg p-5 transition-all duration-300 ${
//             isSidebarOpen ? 'block' : 'hidden lg:block'
//           }`}
//         >
//           <h3 className="text-lg font-semibold text-green-700 mb-4">Select District</h3>
//           {isDistrictsLoading ? (
//             <div className="text-center py-2 text-gray-600">Loading districts...</div>
//           ) : (
//             <div className="space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
//               {districts.map((dist) => (
//                 <button
//                   key={dist.id}
//                   onClick={() => {
//                     setDistrict(dist.name);
//                     setIsSidebarOpen(false);
//                     if (chartInstance) chartInstance.destroy();
//                   }}
//                   className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
//                     district === dist.name
//                       ? 'bg-green-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-green-50 hover:shadow'
//                   }`}
//                 >
//                   {dist.name.charAt(0).toUpperCase() + dist.name.slice(1).replace(/-/g, ' ')}
//                 </button>
//               ))}
//             </div>
//           )}
//         </aside>

//         {/* Price Dashboard */}
//         <main className="flex-1">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
//               <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-0">Today's Price List</h2>
//               <div className="flex items-center text-gray-600 space-x-4">
//                 <span className="mr-2">Last updated:</span>
//                 <span className="font-medium">{formatUpdateTime(lastUpdate)}</span>
//                 <button
//                   onClick={handleRefresh}
//                   className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>

//             {error && <div className="text-red-600 mb-4">{error}</div>}
//             {isLoading ? (
//               <div className="text-center py-4 text-gray-600">Loading prices...</div>
//             ) : (
//               <>
//                 <Tab.Group>
//                   <Tab.List className="flex flex-wrap gap-2 bg-green-50 p-2 rounded-lg mb-6">
//                     {priceData.map((category) => (
//                       <Tab
//                         key={category.name}
//                         className={({ selected }) =>
//                           `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
//                             selected
//                               ? 'bg-green-600 text-white shadow-md'
//                               : 'text-green-700 hover:bg-green-100'
//                           }`
//                         }
//                       >
//                         {category.name}
//                       </Tab>
//                     ))}
//                   </Tab.List>
//                   <Tab.Panels>
//                     {priceData.map((category, idx) => (
//                       <Tab.Panel key={idx} className="rounded-lg bg-white">
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                               <tr>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   Item
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   Market Price (Rs)
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   PSBA Price (Rs)
//                                 </th>
//                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
//                                   Savings
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-100">
//                               {category.prices.map((price, i) => (
//                                 <PriceRow key={i} {...price} />
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </Tab.Panel>
//                     ))}
//                   </Tab.Panels>
//                 </Tab.Group>

//                 <div className="mt-6 text-center space-x-4">
//                   <button
//                     onClick={() => setShowChart(true)}
//                     className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 font-medium rounded-md hover:bg-green-100 transition-colors duration-200"
//                   >
//                     Show Price Comparison Chart
//                   </button>
//                   <button
//                     onClick={handleDownloadPDF}
//                     className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 font-medium rounded-md hover:bg-green-100 transition-colors duration-200"
//                   >
//                     Download Full Price List (PDF)
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 ml-2"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </>
//             )}

//             {showChart && priceData.length > 0 && (
//               <div className="mt-6 text-center">
//                 <p className="text-gray-600 mb-2">Would you like to see a price comparison chart for the selected category?</p>
//                 <div className="space-x-4">
//                   {priceData.map((_, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handleChartConfirm(idx)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
//                     >
//                       {priceData[idx].name}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => {
//                       setShowChart(false);
//                       if (chartInstance) chartInstance.destroy();
//                       setSelectedItem(null);
//                     }}
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//                 <div className="mt-4" style={{ maxHeight: '400px', overflow: 'auto', position: 'relative' }}>
//                   <canvas
//                     ref={chartRef}
//                     height="300"
//                     width="600"
//                     style={{ 
//                       maxWidth: '100%', 
//                       height: '300px', 
//                       display: 'block', 
//                       border: '1px solid #ccc'
//                     }}
//                   />
//                   {chartInstance && (
//                     <p className="text-green-600 mt-2">Chart loaded. Click a bar for details.</p>
//                   )}
//                   {!chartInstance && (
//                     <p className="text-gray-500">Chart will appear after selecting a category.</p>
//                   )}
//                   {selectedItem && (
//                     <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
//                       <h3 className="text-lg font-semibold text-gray-800">Item Details</h3>
//                       <p>Item: {selectedItem.item}</p>
//                       <p>Market Price: Rs {selectedItem.marketPrice}</p>
//                       <p>PSBA Price: Rs {selectedItem.psbaPrice}</p>
//                       <p>Savings: {selectedItem.difference}</p>
//                       <button
//                         onClick={() => setSelectedItem(null)}
//                         className="mt-2 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PriceList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PriceList = () => {
//   const [prices, setPrices] = useState([]);
//   const [district, setDistrict] = useState('lahore');
//   const [isLoading, setIsLoading] = useState(true);
//   const [lastUpdate, setLastUpdate] = useState(new Date());

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         setIsLoading(true);
//         console.log(`Fetching prices for district: ${district}`);
//         const res = await axios.get(`http://localhost:5000/api/bazaars/prices/${district}`);
//         console.log('Raw API Response:', res.data);
//         const approvedPrices = res.data.filter(price => price.approved);
//         console.log('Processed Prices:', approvedPrices);
//         setPrices(approvedPrices);
//         if (approvedPrices.length > 0) {
//           setLastUpdate(new Date(approvedPrices[0].date));
//         }
//       } catch (err) {
//         console.error('Error fetching prices:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPrices();
//   }, [district]);

//   const districts = [
//     'lahore', 'bahawalpur', 'chakwal', 'sargodha', 'faisalabad', 'gujrat', 'gujranwala',
//     'hafizabad', 'jhang', 'kasur', 'khushab', 'layyah', 'rawalpindi', 'lodhran',
//     'rajanpur', 'tt-singh', 'sahiwal', 'dg-khan', 'sheikhupura', 'sialkot', 'vehari',
//     'mianwali', 'pakpattan', 'bhakkar', 'taunsa'
//   ];

//   const getItemImage = (item) => {
//     const images = {
//       'Potato': 'https://cdn.shopify.com/s/files/1/0738/0323/5546/files/1_8.png',
//       'Tomato': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN9-OuOtsl4iecwrOQ4c00iOqngoUdBz1dzQ',
//       'Onion': 'https://cdn.shopify.com/s/files/1/0738/0323/5546/files/1_4.png',
//       'Cabbage': 'https://via.placeholder.com/50',
//       'Carrot': 'https://via.placeholder.com/50',
//       'Apple': 'https://cdn.shopify.com/s/files/1/0738/0323/5546/files/1_2.png',
//       'Banana': 'https://www.jiomart.com/images/product/original/590001285/banana-robusta-6-pcs-box-approx-800-g-1100-g-product-images-o590001285-p590001285-0-202409171905.jpg',
//       'Orange': 'https://via.placeholder.com/50',
//       'Mango': 'https://via.placeholder.com/50',
//       'Grapes': 'https://via.placeholder.com/50',
//       'Chickpeas': 'https://via.placeholder.com/50',
//       'Lentils': 'https://via.placeholder.com/50',
//       'Kidney Beans': 'https://via.placeholder.com/50',
//       'Green Gram': 'https://via.placeholder.com/50',
//       'Black Gram': 'https://via.placeholder.com/50',
//       'Turmeric': 'https://via.placeholder.com/50',
//       'Red Chili': 'https://via.placeholder.com/50',
//       'Coriander': 'https://via.placeholder.com/50',
//       'Cumin': 'https://via.placeholder.com/50',
//       'Cloves': 'https://via.placeholder.com/50',
//       'Chicken': 'https://tse4.mm.bing.net/th?id=OIP.D103YNPGUOIEw_vzMYaDZwHaE7',
//       'Beef': 'https://via.placeholder.com/50',
//       'Mutton': 'https://via.placeholder.com/50',
//       'Fish': 'https://via.placeholder.com/50',
//       'Eggs (Dozen)': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTO-QRQl8_UA0CL9_xqx_ORKe3z4e2nYTFNA'
//     };
//     return images[item] || 'https://via.placeholder.com/50';
//   };

//   const getDiscount = (price) => {
//     const basePrices = {
//       'Potato': 85, 'Tomato': 86, 'Onion': 58, 'Cabbage': 45, 'Carrot': 65,
//       'Apple': 270, 'Banana': 205, 'Orange': 100, 'Mango': 160, 'Grapes': 190,
//       'Chickpeas': 265, 'Lentils': 255, 'Kidney Beans': 275, 'Green Gram': 245, 'Black Gram': 250,
//       'Turmeric': 310, 'Red Chili': 360, 'Coriander': 285, 'Cumin': 410, 'Cloves': 620,
//       'Chicken': 550, 'Beef': 610, 'Mutton': 820, 'Fish': 420, 'Eggs (Dozen)': 280
//     };
//     const basePrice = basePrices[price.item] || price.price;
//     const discountPercent = ((basePrice - price.price) / basePrice * 100).toFixed(2);
//     return discountPercent > 0 ? `↓ -${discountPercent}%` : '↑ 0.00%';
//   };

//   // Debug function to safely format date
//   const formatUpdateTime = (date) => {
//     try {
//       return date.toLocaleString('en-PK', { weekday: 'long', dateStyle: 'medium', timeStyle: 'short' });
//     } catch (e) {
//       console.error('Date formatting error:', e);
//       return date.toLocaleString(); // Fallback to default format
//     }
//   };

//   return (
//     <div className="price-section">
//       <div className="city-selector mb-6 text-center">
//         <select
//           value={district}
//           onChange={(e) => setDistrict(e.target.value)}
//           className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           aria-label="Select district for price list"
//         >
//           {districts.map((dist) => (
//             <option key={dist} value={dist}>
//               {dist.charAt(0).toUpperCase() + dist.slice(1).replace('-', ' ')}
//             </option>
//           ))}
//         </select>
//       </div>
//       {isLoading ? (
//         <div className="flex justify-center py-10">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600" role="status"></div>
//         </div>
//       ) : prices.length > 0 ? (
//         <div id="price-marquee" className="marquee overflow-hidden bg-white shadow-md rounded-lg">
//           <div className="marquee-content flex animate-marquee whitespace-nowrap p-4">
//             {prices.map((price, index) => (
//               <div key={index} className="item flex items-center space-x-4 mx-4">
//                 <img src={getItemImage(price.item)} alt={price.item} className="w-16 h-16 object-cover rounded" loading="lazy" />
//                 <div className="details">
//                   <span className="price text-lg font-semibold text-gray-800">Rs. {price.price}.00</span>
//                   <span className="discount text-sm text-red-600 ml-2">{getDiscount(price)}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">No approved prices available for {district.charAt(0).toUpperCase() + district.slice(1).replace('-', ' ')}.</p>
//       )}
//       <p className="text-center text-sm text-gray-500 mt-4">
//         Prices last updated on {formatUpdateTime(lastUpdate)}
//       </p>
//     </div>
//   );
// };

// export default PriceList;

// // CSS for marquee animation (add to your stylesheet)
// const styles = `
//   .marquee {
//     position: relative;
//     overflow: hidden;
//   }
//   .marquee-content {
//     display: flex;
//   }
//   .animate-marquee {
//     animation: marquee 15s linear infinite;
//   }
//   @keyframes marquee {
//     0% { transform: translateX(100%); }
//     100% { transform: translateX(-100%); }
//   }
//   .marquee-content .item:last-child {
//     margin-right: 100%;
//   }
// `;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PriceList = () => {
//   const [prices, setPrices] = useState([]);
//   const [district, setDistrict] = useState('lahore');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//   const fetchPrices = async () => {
//     try {
//       setIsLoading(true);
//       console.log(`Fetching prices for district: ${district}`);
//       const res = await axios.get(`http://localhost:5000/api/bazaars/prices/${district}`);
//       console.log('Raw API Response:', res.data);
//       const approvedPrices = res.data.flatMap(bazaar => bazaar.prices.filter(price => price.approved));
//       console.log('Processed Prices:', approvedPrices);
//       setPrices(prevPrices => {
//         console.log('Previous Prices:', prevPrices, 'New Prices:', approvedPrices);
//         return approvedPrices;
//       });
//     } catch (err) {
//       console.error('Error fetching prices:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchPrices();
// }, [district]);

//   return (
//     <section className="py-12 bg-white" aria-label="PSBA Price List">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <h2 className="text-3xl font-bold text-green-800 text-center mb-8">PSBA Price List</h2>
//         <p className="text-center text-gray-600 mb-6">Daily updated rates for essential commodities across districts</p>
//         <div className="mb-6 text-center">
//           <select
//             value={district}
//             onChange={(e) => setDistrict(e.target.value)}
//             className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             aria-label="Select district for price list"
//           >
//             <option value="lahore">Lahore</option>
//             <option value="faisalabad">Faisalabad</option>
//             <option value="sargodha">Sargodha</option>
//           </select>
//         </div>
//         {isLoading ? (
//           <div className="flex justify-center py-10">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600" role="status"></div>
//           </div>
//         ) : prices.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-green-100">
//                 <tr>
//                   <th className="p-3 border-b text-green-800 font-semibold">Item</th>
//                   <th className="p-3 border-b text-green-800 font-semibold">Price (Rs.)</th>
//                   <th className="p-3 border-b text-green-800 font-semibold">Unit</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {prices.map((price, index) => (
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="p-3">{price.item}</td>
//                     <td className="p-3">{price.price}</td>
//                     <td className="p-3">{price.unit}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">No approved prices available for {district}.</p>
//         )}
//         <p className="text-center text-sm text-gray-500 mt-4">Prices updated as of {new Date().toLocaleDateString()}</p>
//       </div>
//     </section>
//   );
// };

// export default PriceList;