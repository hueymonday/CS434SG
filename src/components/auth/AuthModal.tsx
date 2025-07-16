import React, { useState } from 'react';
import { X as CloseIcon } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
interface AuthModalProps {
  onClose: () => void;
  onLogin: () => void;
}
export const AuthModal = ({
  onClose,
  onLogin
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#0077B6]">Welcome to Shalo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex border-b border-gray-100">
          <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'login' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500'}`} onClick={() => setActiveTab('login')}>
            Log In
          </button>
          <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'signup' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500'}`} onClick={() => setActiveTab('signup')}>
            Sign Up
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'login' ? <LoginForm onLogin={onLogin} /> : <SignupForm onSignup={onLogin} />}
        </div>
      </div>
    </div>;
};