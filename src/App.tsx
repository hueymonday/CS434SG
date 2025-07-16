import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { SearchBar } from './components/layout/SearchBar';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { AuthModal } from './components/auth/AuthModal';
import { PostProvider } from './components/context/PostContext';
import { ToastContainer } from './components/ui/Toast';
// Pages
import { HomePage } from './pages/HomePage';
import { PostDetailPage } from './pages/PostDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { ExploreMapPage } from './pages/ExploreMapPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { SavedItemsPage } from './pages/SavedItemsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
// User role types
export type UserRole = 'guest' | 'member' | 'admin';
export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setUserRole('member'); // Default to member role when logging in
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('guest');
  };
  const toggleAdmin = () => {
    setUserRole(userRole === 'admin' ? 'member' : 'admin');
  };
  // Protected route component
  const ProtectedRoute = ({
    children,
    requiredRole
  }: {
    children: React.ReactNode;
    requiredRole: UserRole[];
  }) => {
    if (!isLoggedIn && requiredRole.includes('guest')) {
      return <>{children}</>;
    }
    if (isLoggedIn && requiredRole.includes(userRole)) {
      return <>{children}</>;
    }
    return <Navigate to="/" replace />;
  };
  return <PostProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-white text-gray-800">
          {/* Left Sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <Sidebar isLoggedIn={isLoggedIn} userRole={userRole} onLoginClick={() => setShowAuthModal(true)} onLogout={handleLogout} toggleAdmin={toggleAdmin} />
          </div>
          {/* Main Content Area */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top Search Bar */}
            <SearchBar isLoggedIn={isLoggedIn} onNotificationsClick={() => {}} />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLoginClick={() => setShowAuthModal(true)} />} />
                <Route path="/post/:id" element={<PostDetailPage isLoggedIn={isLoggedIn} userRole={userRole} onLoginClick={() => setShowAuthModal(true)} />} />
                <Route path="/profile/:username" element={<ProtectedRoute requiredRole={['member', 'admin']}>
                      <ProfilePage userRole={userRole} />
                    </ProtectedRoute>} />
                <Route path="/explore" element={<ExploreMapPage isLoggedIn={isLoggedIn} />} />
                {/* Admin routes - updated for direct navigation */}
                <Route path="/admin" element={<ProtectedRoute requiredRole={['admin']}>
                      <AdminDashboardPage activeTab="overview" />
                    </ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute requiredRole={['admin']}>
                      <AdminDashboardPage activeTab="users" />
                    </ProtectedRoute>} />
                <Route path="/admin/posts" element={<ProtectedRoute requiredRole={['admin']}>
                      <AdminDashboardPage activeTab="posts" />
                    </ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute requiredRole={['admin']}>
                      <AdminDashboardPage activeTab="reports" />
                    </ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute requiredRole={['admin']}>
                      <AdminDashboardPage activeTab="settings" />
                    </ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute requiredRole={['member', 'admin']}>
                      <CreatePostPage />
                    </ProtectedRoute>} />
                <Route path="/saved" element={<ProtectedRoute requiredRole={['member', 'admin']}>
                      <SavedItemsPage />
                    </ProtectedRoute>} />
                <Route path="/achievements" element={<ProtectedRoute requiredRole={['member', 'admin']}>
                      <AchievementsPage />
                    </ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute requiredRole={['member', 'admin']}>
                      <NotificationsPage />
                    </ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute requiredRole={['member', 'admin']}>
                      <SettingsPage onLogout={handleLogout} />
                    </ProtectedRoute>} />
              </Routes>
            </main>
          </div>
          {/* Mobile Navigation - visible only on mobile */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
            <MobileNavigation isLoggedIn={isLoggedIn} userRole={userRole} onLoginClick={() => setShowAuthModal(true)} />
          </div>
          {/* Auth Modal */}
          {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}
          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </BrowserRouter>
    </PostProvider>;
}