import React from 'react';

const Header = ({ title, showBack = false, onBack }) => {
  return (
    <header className="bg-white border-b border-gray-lighter px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {showBack && (
          <button onClick={onBack} className="text-primary hover:text-primary-light">
            ← Retour
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-darkest flex-1 text-center">
          {title}
        </h1>
        {!showBack && <div className="w-16" />}
      </div>
    </header>
  );
};

export default Header;