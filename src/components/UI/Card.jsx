import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-gray-lighter rounded-xl p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;