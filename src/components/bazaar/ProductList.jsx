// src/components/bazaar/ProductList.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProductList = ({ products }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-green-800 mb-4">Available Products</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Market Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                PSBA Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Savings
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 line-through">
                  Rs. {product.marketPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                  Rs. {product.psbaPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Save Rs. {product.marketPrice - product.psbaPrice}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;