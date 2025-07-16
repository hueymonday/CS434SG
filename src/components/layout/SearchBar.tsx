import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, BellIcon, MessageCircleIcon } from 'lucide-react';
interface SearchBarProps {
  isLoggedIn: boolean;
  onNotificationsClick: () => void;
}
export const SearchBar = ({
  isLoggedIn,
  onNotificationsClick
}: SearchBarProps) => {
  return <header className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Mobile Logo - Only visible on mobile */}
        <div className="md:hidden">
          <Link to="/">
            <h1 className="text-xl font-bold text-[#0077B6]">Shalo</h1>
          </Link>
        </div>
        {/* Search Bar - Centered both horizontally and vertically */}
        <div className="relative flex-1 max-w-xl mx-auto flex items-center justify-center">
          <div className="relative w-full">
            <input type="text" placeholder="Search users, posts, destinations..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#0077B6]" />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        {/* Notifications & Messages - Only show if logged in */}
        {isLoggedIn}
      </div>
    </header>;
};