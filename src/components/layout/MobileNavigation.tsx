import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MapIcon, PlusSquareIcon, BookmarkIcon, UserIcon, LogInIcon, ShieldIcon, TrendingUpIcon, UsersIcon, FileTextIcon, FlagIcon, SettingsIcon } from 'lucide-react';
import { UserRole } from '../../App';
interface MobileNavigationProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  onLoginClick: () => void;
}
export const MobileNavigation = ({
  isLoggedIn,
  userRole,
  onLoginClick
}: MobileNavigationProps) => {
  const location = useLocation();
  // Effect to show toast notification when role changes
  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'admin') {
        window.showToast('Switched to admin role', 'success');
      } else if (userRole === 'member') {
        window.showToast('Switched to member role', 'success');
      }
    }
  }, [userRole, isLoggedIn]);
  if (!isLoggedIn) {
    return <div className="bg-white border-t border-gray-200 p-2">
        <button onClick={onLoginClick} className="w-full flex items-center justify-center p-3 bg-[#0077B6] text-white rounded-lg">
          <LogInIcon className="w-5 h-5 mr-2" />
          <span>Log In / Sign Up</span>
        </button>
      </div>;
  }
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  // Show different navigation based on user role
  return userRole === 'admin' ?
  // Admin Mobile Navigation - Updated with direct links
  <nav className="bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around">
        <Link to="/admin" className={`flex flex-col items-center p-2 ${isActive('/admin') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <TrendingUpIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Overview</span>
        </Link>
        <Link to="/admin/users" className={`flex flex-col items-center p-2 ${isActive('/admin/users') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <UsersIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Users</span>
        </Link>
        <Link to="/admin/reports" className={`flex flex-col items-center p-2 ${isActive('/admin/reports') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <FlagIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Reports</span>
        </Link>
        <Link to="/admin/settings" className={`flex flex-col items-center p-2 ${isActive('/admin/settings') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <SettingsIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav> :
  // Regular User Mobile Navigation
  <nav className="bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/explore" className={`flex flex-col items-center p-2 ${isActive('/explore') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <MapIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link to="/create" className={`flex flex-col items-center p-2 ${isActive('/create') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <PlusSquareIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Create</span>
        </Link>
        <Link to="/saved" className={`flex flex-col items-center p-2 ${isActive('/saved') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <BookmarkIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Saved</span>
        </Link>
        <Link to="/profile/me" className={`flex flex-col items-center p-2 ${location.pathname.startsWith('/profile') ? 'text-[#0077B6]' : 'text-gray-600'}`}>
          <UserIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>;
};