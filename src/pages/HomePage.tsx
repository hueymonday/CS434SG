import React from 'react';
import { Feed } from '../components/feed/Feed';
interface HomePageProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}
export const HomePage = ({
  isLoggedIn,
  onLoginClick
}: HomePageProps) => {
  // This would typically come from user authentication state
  const currentUsername = isLoggedIn ? 'janedoe' : undefined;
  return <div className="max-w-2xl mx-auto px-4 py-6">
      {isLoggedIn ? <Feed currentUsername={currentUsername} /> : <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-[#0077B6] mb-4">
              Welcome to Shalo
            </h2>
            <p className="text-gray-600 mb-6">
              Share your travel experiences with fellow explorers
            </p>
            <button onClick={onLoginClick} className="px-6 py-3 bg-[#0077B6] text-white rounded-full font-medium hover:bg-[#00B4D8] transition-colors">
              Log in or Sign up
            </button>
          </div>
        </div>}
    </div>;
};