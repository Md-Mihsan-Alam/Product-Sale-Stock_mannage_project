import React, { useState } from 'react';
import './MobileMenu.css';

const MobileMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`}>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <button 
            className="mobile-close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;