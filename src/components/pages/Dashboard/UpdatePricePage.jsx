import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePricesPage = () => {
  const [bazaars, setBazaars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBazaar, setSelectedBazaar] = useState(null);
  const [expandedForms, setExpandedForms] = useState({});
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchBazaars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/bazaars/district/mine`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBazaars(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bazaars');
        setLoading(false);
      }
    };

    fetchBazaars();
  }, []);

  const toggleEditForm = (index) => {
    setExpandedForms(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // const handlePriceSubmit = async (e, bazaarId, priceIndex) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const item = formData.get('item');
  //   const price = formData.get('price');
  //   const unit = formData.get('unit');

  //   try {
  //     await axios.post(
  //       `${BASE_URL}/api/bazaars/update-price/${bazaarId}/${priceIndex}`,
  //       { item, price, unit },
  //       { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  //     );
      
  //     // Refresh bazaar data
  //     const updatedBazaars = bazaars.map(b => 
  //       b._id === bazaarId ? { 
  //         ...b, 
  //         status: 'pending',
  //         prices: b.prices.map((p, i) => 
  //           i === priceIndex ? { ...p, item, price, unit, approved: false } : p
  //         )
  //       } : b
  //     );
      
  //     setBazaars(updatedBazaars);
      
  //     // Update selected bazaar if it's the current one
  //     if (selectedBazaar && selectedBazaar._id === bazaarId) {
  //       setSelectedBazaar(updatedBazaars.find(b => b._id === bazaarId));
  //     }
      
  //     // Close the form
  //     toggleEditForm(priceIndex);
      
  //     alert('Price updated successfully! Waiting for approval.');
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Error updating price');
  //   }
  // };
  const handlePriceSubmit = async (e, bazaarId, priceIndex) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const price = Number(formData.get('price')); // ensure number

  try {
    const res = await axios.post(
      `${BASE_URL}/api/bazaars/update-price/${bazaarId}/${priceIndex}`,
      { newPrice: price },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );

    const updatedBazaar = res.data.bazaar;

    // Update local state with updated prices including updatedAt
    setBazaars(prev => prev.map(b =>
      b._id === bazaarId ? updatedBazaar : b
    ));

    if (selectedBazaar && selectedBazaar._id === bazaarId) {
      setSelectedBazaar(updatedBazaar);
    }

    toggleEditForm(priceIndex);
    alert('Price updated successfully! Waiting for approval.');

  } catch (err) {
    setError(err.response?.data?.message || 'Error updating price');
  }
};


  if (loading) return <div className="p-6 text-center py-12">Loading bazaars...</div>;
  if (error) return <div className="p-6 text-red-600 py-12">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Update Market Prices</h1>
        {selectedBazaar && (
          <button 
            onClick={() => setSelectedBazaar(null)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to all bazaars
          </button>
        )}
      </div>
      
      {selectedBazaar ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">{selectedBazaar.name}</h2>
              <p className="text-gray-600">{selectedBazaar.district} District</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              selectedBazaar.status === 'approved' 
                ? 'bg-green-100 text-green-800' 
                : selectedBazaar.status === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              {selectedBazaar.status}
            </span>
          </div>
          
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Item</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Price</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Unit</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedBazaar.prices.map((price, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="py-3 px-4">{price.item}</td>
                      <td className="py-3 px-4">Rs. {price.price}</td>
                      <td className="py-3 px-4">{price.unit}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          price.approved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {price.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => toggleEditForm(index)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {expandedForms[index] ? 'Cancel' : 'Edit'}
                        </button>
                      </td>
                    </tr>
                    {expandedForms[index] && (
                      <tr>
                        <td colSpan="5" className="bg-gray-50 p-4">
                          <div className="max-w-3xl mx-auto">
                            <h3 className="text-lg font-medium mb-3">Edit Price Entry</h3>
                            <form onSubmit={(e) => handlePriceSubmit(e, selectedBazaar._id, index)}>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <label className="block mb-1 text-sm font-medium text-gray-700">Item Name</label>
                                  <input
                                    type="text"
                                    name="item"
                                    defaultValue={price.item}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block mb-1 text-sm font-medium text-gray-700">Price (Rs.)</label>
                                  <input
                                    type="number"
                                    name="price"
                                    defaultValue={price.price}
                                    min="0"
                                    step="0.01"
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block mb-1 text-sm font-medium text-gray-700">Unit</label>
                                  <select
                                    name="unit"
                                    defaultValue={price.unit}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                  >
                                    <option value="kg">kg</option>
                                    <option value="liter">Liter</option>
                                    <option value="piece">Piece</option>
                                    <option value="dozen">Dozen</option>
                                    <option value="pack">Pack</option>
                                  </select>
                                </div>
                              </div>
                              <div className="flex justify-end space-x-3">
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                  Update Price
                                </button>
                              </div>
                            </form>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bazaars.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-xl font-medium mt-4 mb-2">No bazaars found</h3>
                <p className="text-gray-600">You haven't created any bazaars yet.</p>
              </div>
            </div>
          ) : bazaars.map(bazaar => (
            <div 
              key={bazaar._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
              onClick={() => setSelectedBazaar(bazaar)}
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">{bazaar.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                    bazaar.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : bazaar.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {bazaar.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{bazaar.district} District</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>{bazaar.prices.length} items</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date(bazaar.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Click to view details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdatePricesPage;

// // src/pages/UpdatePricesPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdatePricesPage = () => {
//   const [bazaars, setBazaars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedBazaar, setSelectedBazaar] = useState(null);

//   useEffect(() => {
//     const fetchBazaars = useCallback(async () => {
//       try {
//         const response = await axios.get('/api/bazaars/district/mine', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setBazaars(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch bazaars');
//         setLoading(false);
//       }
//     }, []);

//     fetchBazaars();
//   }, []);


//   const handlePriceSubmit = async (e, bazaarId, priceIndex) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const item = formData.get('item');
//     const price = formData.get('price');
//     const unit = formData.get('unit');

//     try {
//       await axios.post(
//         `/api/bazaars/update-price/${bazaarId}/${priceIndex}`,
//         { item, price, unit },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
      
//       // Refresh bazaar data
//       const updated = bazaars.map(b => 
//         b._id === bazaarId ? { ...b, status: 'pending' } : b
//       );
//       setBazaars(updated);
//       setSelectedBazaar(null);
      
//       alert('Price updated successfully! Waiting for approval.');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error updating price');
//     }
//   };

//   if (loading) return <div className="p-6 text-center">Loading bazaars...</div>;
//   if (error) return <div className="p-6 text-red-600">{error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Update Market Prices</h1>
      
//       {selectedBazaar ? (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <button 
//             onClick={() => setSelectedBazaar(null)}
//             className="mb-4 text-blue-600 hover:underline"
//           >
//             &larr; Back to all bazaars
//           </button>
//           <h2 className="text-xl font-semibold mb-4">{selectedBazaar.name} Prices</h2>
          
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border p-2">Item</th>
//                   <th className="border p-2">Price</th>
//                   <th className="border p-2">Unit</th>
//                   <th className="border p-2">Status</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedBazaar.prices.map((price, index) => (
//                   <tr key={index}>
//                     <td className="border p-2">{price.item}</td>
//                     <td className="border p-2">{price.price}</td>
//                     <td className="border p-2">{price.unit}</td>
//                     <td className="border p-2">
//                       <span className={`px-2 py-1 rounded ${
//                         price.approved 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {price.approved ? 'Approved' : 'Pending'}
//                       </span>
//                     </td>
//                     <td className="border p-2">
//                       <button 
//                         onClick={() => {
//                           const bazaar = bazaars.find(b => b._id === selectedBazaar._id);
//                           setSelectedBazaar({...bazaar});
//                           document.getElementById(`edit-form-${index}`).classList.toggle('hidden');
//                         }}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {selectedBazaar.prices.map((price, index) => (
//             <div 
//               key={index} 
//               id={`edit-form-${index}`}
//               className="hidden mt-6 p-4 bg-gray-50 rounded-lg"
//             >
//               <h3 className="text-lg font-medium mb-3">Edit Price Entry</h3>
//               <form onSubmit={(e) => handlePriceSubmit(e, selectedBazaar._id, index)}>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div>
//                     <label className="block mb-1">Item Name</label>
//                     <input
//                       type="text"
//                       name="item"
//                       defaultValue={price.item}
//                       className="w-full p-2 border rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1">Price</label>
//                     <input
//                       type="number"
//                       name="price"
//                       defaultValue={price.price}
//                       min="0"
//                       step="0.01"
//                       className="w-full p-2 border rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1">Unit</label>
//                     <select
//                       name="unit"
//                       defaultValue={price.unit}
//                       className="w-full p-2 border rounded"
//                       required
//                     >
//                       <option value="kg">kg</option>
//                       <option value="liter">Liter</option>
//                       <option value="piece">Piece</option>
//                       <option value="dozen">Dozen</option>
//                       <option value="pack">Pack</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex space-x-3">
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     Update Price
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => document.getElementById(`edit-form-${index}`).classList.add('hidden')}
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {bazaars.map(bazaar => (
//             <div 
//               key={bazaar._id} 
//               className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//               onClick={() => setSelectedBazaar(bazaar)}
//             >
//               <div className="p-4">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-lg font-semibold">{bazaar.name}</h3>
//                   <span className={`px-2 py-1 text-xs rounded ${
//                     bazaar.status === 'approved' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {bazaar.status}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mt-2">{bazaar.district}</p>
//                 <div className="mt-4 flex justify-between text-sm">
//                   <span>Items: {bazaar.prices.length}</span>
//                   <span>Updated: {new Date(bazaar.updatedAt).toLocaleDateString()}</span>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 text-right">
//                 <button className="text-blue-600 hover:text-blue-800 font-medium">
//                   Update Prices →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdatePricesPage;