import React from 'react';
import { useAuth } from '../components/AuthContext.jsx';
import { usePage } from '../components/PageContext.jsx';
import SearchIcon from '../components/SearchIcon.jsx';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const { navigateTo } = usePage();
  const navItems = ['Politics', 'World', 'Economy', 'Science & Tech', 'Business', 'Travel', 'Style', 'Lifestyle', 'Food', 'Sports'];

  const handleLogout = () => {
    logout();
    navigateTo('home');
  };

  return (
    <header className="bg-[#1a1a1a] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top part: Logo and Login/Search */}
        <div className="flex justify-between items-center py-4 border-b border-gray-700">
          <h1 className="text-3xl font-bold tracking-wider">NEWSLETTER</h1>
          <div className="flex items-center space-x-4">
            <form className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 text-white rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-2 text-gray-400"
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            </form>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded-md text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
        {/* Bottom part: Navigation */}
        <nav className="flex justify-start space-x-6 py-3 overflow-x-auto">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;