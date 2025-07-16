import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MapIcon, PlusSquareIcon, BookmarkIcon, UserIcon, SettingsIcon, LogInIcon, LogOutIcon, BellIcon, AwardIcon, ShieldIcon, TrendingUpIcon, UsersIcon, FileTextIcon, FlagIcon } from 'lucide-react';
import { UserRole } from '../../App';
interface SidebarProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  onLoginClick: () => void;
  onLogout: () => void;
  toggleAdmin: () => void;
}
export const Sidebar = ({
  isLoggedIn,
  userRole,
  onLoginClick,
  onLogout,
  toggleAdmin
}: SidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
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
  return <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100">
        <Link to="/">
          <h1 className="text-2xl font-bold text-[#0077B6]">Shalo</h1>
          <p className="text-xs text-gray-500">Explore. Share. Connect.</p>
        </Link>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {isLoggedIn ? userRole === 'admin' ?
        // Admin Navigation - Flattened structure with direct links to admin pages
        <>
                <li>
                  <Link to="/admin" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/admin') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <TrendingUpIcon className={`w-5 h-5 mr-3 ${isActive('/admin') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Overview</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/admin/users') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <UsersIcon className={`w-5 h-5 mr-3 ${isActive('/admin/users') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/posts" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/admin/posts') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <FileTextIcon className={`w-5 h-5 mr-3 ${isActive('/admin/posts') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Posts</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/reports" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/admin/reports') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <FlagIcon className={`w-5 h-5 mr-3 ${isActive('/admin/reports') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Reports</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/settings" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/admin/settings') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <SettingsIcon className={`w-5 h-5 mr-3 ${isActive('/admin/settings') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="mt-4 pt-4 border-t border-gray-100">
                  <button onClick={onLogout} className="w-full flex items-center p-3 rounded-lg text-gray-800 hover:bg-gray-50">
                    <LogOutIcon className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Log Out</span>
                  </button>
                </li>
                <li>
                  <button onClick={toggleAdmin} className="w-full flex items-center p-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50">
                    <span>Toggle Admin Role</span>
                    <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">
                      {userRole}
                    </span>
                  </button>
                </li>
              </> :
        // Regular User Navigation
        <>
                <li>
                  <Link to="/" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <HomeIcon className={`w-5 h-5 mr-3 ${isActive('/') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/explore') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <MapIcon className={`w-5 h-5 mr-3 ${isActive('/explore') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Explore Map</span>
                  </Link>
                </li>
                <li>
                  <Link to="/create" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/create') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <PlusSquareIcon className={`w-5 h-5 mr-3 ${isActive('/create') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Create Post</span>
                  </Link>
                </li>
                <li>
                  <Link to="/saved" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/saved') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <BookmarkIcon className={`w-5 h-5 mr-3 ${isActive('/saved') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Saved Items</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile/me" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${location.pathname.startsWith('/profile') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <UserIcon className={`w-5 h-5 mr-3 ${location.pathname.startsWith('/profile') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/notifications') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <BellIcon className={`w-5 h-5 mr-3 ${isActive('/notifications') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Notifications</span>
                  </Link>
                </li>
                <li>
                  <Link to="/achievements" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/achievements') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <AwardIcon className={`w-5 h-5 mr-3 ${isActive('/achievements') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Achievements</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className={`flex items-center p-3 rounded-lg hover:bg-gray-50 ${isActive('/settings') ? 'bg-gray-50 text-[#0077B6] font-medium' : 'text-gray-800'}`}>
                    <SettingsIcon className={`w-5 h-5 mr-3 ${isActive('/settings') ? 'text-[#0077B6]' : 'text-gray-500'}`} />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <button onClick={onLogout} className="w-full flex items-center p-3 rounded-lg text-gray-800 hover:bg-gray-50">
                    <LogOutIcon className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Log Out</span>
                  </button>
                </li>
                {/* Dev toggle for admin role */}
                <li className="mt-8 pt-4 border-t border-gray-100">
                  <button onClick={toggleAdmin} className="w-full flex items-center p-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50">
                    <span>Toggle Admin Role</span>
                    <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">
                      {userRole}
                    </span>
                  </button>
                </li>
              </> :
        // Not logged in
        <li>
              <button onClick={onLoginClick} className="w-full flex items-center p-3 rounded-lg text-gray-800 hover:bg-gray-50">
                <LogInIcon className="w-5 h-5 text-[#0077B6] mr-3" />
                <span>Log In / Sign Up</span>
              </button>
            </li>}
        </ul>
      </nav>
      {/* User Profile - Only show if logged in and not in admin mode */}
      {isLoggedIn && userRole !== 'admin' && <div className="p-4 border-t border-gray-100">
          <Link to="/profile/me" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#00B4D8] flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="ml-3">
              <p className="font-medium">Jane Doe</p>
              <p className="text-xs text-gray-500">@janedoe</p>
            </div>
          </Link>
        </div>}
    </aside>;
};