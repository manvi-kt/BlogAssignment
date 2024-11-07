import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-blue-800">Blog Website</h1>
    </header>
  );
};

export default Header;
