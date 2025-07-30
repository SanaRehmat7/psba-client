// src/components/achievements/ExpansionTable.jsx
import React, { useState } from 'react';

const ExpansionTable = () => {
  const [sortField, setSortField] = useState('newOutlets');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const expansions = [
    { bazaar: "Kasur", existing: 152, new: 164, additional: 12 },
    { bazaar: "Gujranwala", existing: 555, new: 652, additional: 98 },
    { bazaar: "Sargodha", existing: 137, new: 186, additional: 49 },
    // ... other data
  ];

  const sortedData = [...expansions].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-800 text-white">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer"
              onClick={() => handleSort('bazaar')}
            >
              Model Bazaar
              {sortField === 'bazaar' && (
                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th 
              className="px-6 py-3 text-right text-xs font-medium uppercase cursor-pointer"
              onClick={() => handleSort('existing')}
            >
              Existing Outlets
              {sortField === 'existing' && (
                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th 
              className="px-6 py-3 text-right text-xs font-medium uppercase cursor-pointer"
              onClick={() => handleSort('new')}
            >
              New Outlets
              {sortField === 'new' && (
                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th 
              className="px-6 py-3 text-right text-xs font-medium uppercase cursor-pointer"
              onClick={() => handleSort('additional')}
            >
              Additional Outlets
              {sortField === 'additional' && (
                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.bazaar}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                {row.existing}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                {row.new}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold text-right">
                +{row.additional}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-green-100">
          <tr>
            <td className="px-6 py-3 text-sm font-bold">Total</td>
            <td className="px-6 py-3 text-sm font-bold text-right">
              {expansions.reduce((sum, row) => sum + row.existing, 0)}
            </td>
            <td className="px-6 py-3 text-sm font-bold text-right">
              {expansions.reduce((sum, row) => sum + row.new, 0)}
            </td>
            <td className="px-6 py-3 text-sm font-bold text-green-700 text-right">
              +{expansions.reduce((sum, row) => sum + row.additional, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpansionTable;