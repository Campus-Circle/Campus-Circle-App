import React from 'react';

function PrimaryButton({ children, onClick = () => {}, className }) {
  return (
    <button
      className={`flex bg-primary p-4 mt-4 rounded-lg shadow-md
          shadow-primary/20 hover:shadow-primary/30
           hover:shadow-xl hover:-translate-y-2 transition-all focus:outline-black ${className}`}
      onClick={() => {
        onClick();
      }}>
      {children}
    </button>
  );
}

export default PrimaryButton;
