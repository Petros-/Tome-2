import React from 'react';

function Button({ children, onClick, variant = 'primary', size = 'medium', disabled }) {
  const buttonClasses = `
    ${variant === 'primary' ? 'bg-green-600 hover:bg-blue-700 text-white' : ''}
    ${variant === 'secondary' ? 'bg-gray-100 border border-gray-300 hover:bg-gray-300 text-gray-800' : ''}
    ${size === 'small' ? 'px-2 py-1 text-sm' : ''}
    ${size === 'medium' ? 'px-4 py-2 text-base' : ''}
    ${size === 'large' ? 'px-6 py-3 text-lg' : ''}
    font-semibold rounded
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;