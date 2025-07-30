// src/components/layout/LanguageSwitcher.jsx
import { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'UR', name: 'اردو' },
    { code: 'PA', name: 'ਪੰਜਾਬੀ' }
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center text-gray-700 hover:text-green-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaGlobe className="mr-1" />
        <span>{currentLanguage}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                currentLanguage === lang.code
                  ? 'bg-green-100 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setCurrentLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;