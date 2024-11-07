import React from 'react';

interface SidebarProps {
  loggedIn: boolean;
  handleLoginToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ loggedIn, handleLoginToggle }) => {
  return (
    <aside className="w-64 bg-white mt-10 text-blue-800 p-6 space-y-4 min-h-screen rounded-lg shadow-lg">
      <nav className="space-y-2">
        <a
          href="/"
          className=" mt-5 block py-2 px-4 rounded hover:bg-blue-100"
        >
          Home
        </a>
        <a
          href="/about/"
          className="block py-2 px-4 rounded hover:bg-blue-100"
        >
          About
        </a>
        <a
          href="#"
          onClick={handleLoginToggle}
          className="block py-2 px-4 rounded hover:bg-blue-100"
        >
          {loggedIn ? "Logout" : "Login"}
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
