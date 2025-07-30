// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BazaarMarquee from "../bazaar/BazaarMarquee"
import MobileMenu from './MobileMenu';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24"> {/* Adjust for header height */}
        {children}
      </main>
      <BazaarMarquee />
      <Footer />
      <MobileMenu />
    </div>
  );
};

export default Layout;