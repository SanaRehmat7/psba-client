// src/components/layout/NavItem.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const NavItem = ({ item, currentPath }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.path ? (
        <Link
          to={item.path}
          className={`px-4 py-2 font-medium transition-colors ${
            currentPath === item.path
              ? 'text-green-600'
              : 'text-gray-700 hover:text-green-600'
          }`}
        >
          {item.label}
        </Link>
      ) : (
        <>
          <button 
            className={`px-4 py-2 flex items-center font-medium transition-colors ${
              isHovered ? 'text-green-600' : 'text-gray-700'
            }`}
          >
            <span>{item.label}</span>
            <FaChevronDown className="ml-1.5 mt-0.5" size={12} />
          </button>
          
          {isHovered && (
            <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50">
              {item.dropdown.map((subItem, index) => (
                <Link
                  key={index}
                  to={subItem.path}
                  className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NavItem;