import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const MarketPrices = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [prices, setPrices] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get('/api/districts');
        setDistricts(res.data);
        if (res.data.length > 0) {
          setSelectedDistrict(res.data[0].name);
        }
      } catch (err) {
        console.error('District fetch error:', err);
      }
    };
    
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (!selectedDistrict) return;
    
    const fetchPrices = async () => {
      setLoading(true);
      try {
        // Fetch current prices
        const pricesRes = await axios.get(`/api/bazaars/prices/${selectedDistrict}`);
        setPrices(pricesRes.data.prices || []);
        
        // Fetch historical data for charts
        const historyRes = await axios.get(`/api/prices/history?district=${selectedDistrict}`);
        setPriceHistory(historyRes.data);
      } catch (err) {
        console.error('Price fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrices();
  }, [selectedDistrict]);

  // Prepare chart data
  const prepareChartData = () => {
    const chartData = [];
    const categories = [...new Set(priceHistory.map(item => item.date))].sort();
    
    // Group by item
    const items = [...new Set(priceHistory.map(item => item.item))];
    
    items.forEach(item => {
      const itemData = {
        name: item,
        data: []
      };
      
      categories.forEach(date => {
        const pricePoint = priceHistory.find(
          p => p.item === item && p.date === date
        );
        itemData.data.push(pricePoint ? pricePoint.marketPrice : null);
      });
      
      chartData.push(itemData);
    });
    
    return {
      options: {
        chart: {
          id: 'market-prices-chart',
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          }
        },
        xaxis: {
          categories,
          title: {
            text: 'Date'
          }
        },
        yaxis: {
          title: {
            text: 'Price (PKR)'
          }
        },
        stroke: {
          width: 3
        }
      },
      series: chartData
    };
  };

  const chartConfig = prepareChartData();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Market Prices</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select District
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-full md:w-64 p-2 border rounded-md"
        >
          {districts.map(district => (
            <option key={district.id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <p>Loading prices...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Current Prices in {selectedDistrict}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSBA Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prices.length > 0 ? (
                      prices.map((price, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">{price.item}</td>
                          <td className="px-4 py-3 whitespace-nowrap">PKR {price.marketPrice.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap font-semibold text-green-600">
                            PKR {price.psbaPrice.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">{price.unit}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                          No price data available for this district
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Savings Comparison</h2>
              <div className="h-64 flex items-center justify-center">
                {prices.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 w-full">
                    {prices.slice(0, 3).map((price, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{price.item}</span>
                          <span className="text-sm">
                            Save PKR {(price.marketPrice - price.psbaPrice).toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${(price.psbaPrice / price.marketPrice) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>PSBA Price: PKR {price.psbaPrice.toFixed(2)}</span>
                          <span>Market: PKR {price.marketPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No data for comparison</p>
                )}
              </div>
            </div>
          </div>
          
          {priceHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Price Trends (Last 30 Days)</h2>
              <Chart
                options={chartConfig.options}
                series={chartConfig.series}
                type="line"
                height={350}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MarketPrices;