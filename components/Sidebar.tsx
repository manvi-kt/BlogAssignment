import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  loggedIn: boolean;
  handleLoginToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ loggedIn, handleLoginToggle }) => {
  return (
    <aside className="w-64 bg-white mt-10 text-blue-800 p-6 space-y-4 min-h-screen rounded-lg shadow-lg">
      <nav className="space-y-2">
        <Link href="/" className="mt-5 block py-2 px-4 rounded hover:bg-blue-100">
          Home
        </Link>
        <Link href="/about/" className="block py-2 px-4 rounded hover:bg-blue-100">
          About
        </Link>
        <button
          onClick={handleLoginToggle}
          className="block w-full text-left py-2 px-4 rounded hover:bg-blue-100"
        >
          {loggedIn ? 'Logout' : 'Login'}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
