import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const PriceUpdateForm = () => {
  const { bazaarId } = useParams();
  const { user } = useAuth();
  const [bazaar, setBazaar] = useState(null);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    prices: [{
      item: '',
      price: '',
      unit: 'kg',
      date: new Date().toISOString().split('T')[0]
    }]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bazaar details
        const bazaarRes = await axios.get(`/api/bazaars/${bazaarId}`);
        setBazaar(bazaarRes.data);
        
        // Fetch available items
        const itemsRes = await axios.get('/api/items');
        setItems(itemsRes.data);
        
        // Pre-fill existing prices
        if (bazaarRes.data.prices && bazaarRes.data.prices.length > 0) {
          setFormData({
            prices: bazaarRes.data.prices.filter(p => !p.approved).map(p => ({
              item: p.item,
              price: p.price,
              unit: p.unit,
              date: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0]
            }))
          });
          
          // If no existing prices, add one row
          if (formData.prices.length === 0) {
            setFormData({
              prices: [{
                item: '',
                price: '',
                unit: 'kg',
                date: new Date().toISOString().split('T')[0]
              }]
            });
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to load bazaar data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [bazaarId]);

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...formData.prices];
    newPrices[index][field] = value;
    
    // Automatically set unit when item is selected
    if (field === 'item') {
      const selectedItem = items.find(i => i.name === value);
      if (selectedItem) {
        newPrices[index].unit = selectedItem.unit;
      }
    }
    
    setFormData({ prices: newPrices });
  };

  const addPriceRow = () => {
    setFormData({
      prices: [
        ...formData.prices,
        { item: '', price: '', unit: 'kg', date: new Date().toISOString().split('T')[0] }
      ]
    });
  };

  const removePriceRow = (index) => {
    if (formData.prices.length > 1) {
      const newPrices = [...formData.prices];
      newPrices.splice(index, 1);
      setFormData({ prices: newPrices });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`/api/bazaars/${bazaarId}/prices`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      toast.success('Prices submitted for approval!');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (err) {
      console.error('Price submission error:', err);
      toast.error('Failed to submit prices');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!bazaar) return <div>Bazaar not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Update Prices</h1>
      <h2 className="text-xl text-gray-700 mb-6">
        For: {bazaar.name} - {bazaar.district}
      </h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Current Market Prices</h3>
          
          {formData.prices.map((price, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end">
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item
                </label>
                <select
                  value={price.item}
                  onChange={(e) => handlePriceChange(index, 'item', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select an item</option>
                  {items.map((category, catIndex) => (
                    <optgroup key={catIndex} label={category.category}>
                      {category.items.map((item, itemIndex) => (
                        <option key={`${catIndex}-${itemIndex}`} value={item.name}>
                          {item.name} ({item.unit})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (PKR)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price.price}
                  onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={price.unit}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              
              <div className="md:col-span-1">
                <button
                  type="button"
                  onClick={() => removePriceRow(index)}
                  className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  disabled={formData.prices.length <= 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addPriceRow}
            className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            + Add Another Item
          </button>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit for Approval
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriceUpdateForm;
