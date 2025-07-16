import React from 'react';
interface SignupFormProps {
  onSignup: () => void;
}
export const SignupForm = ({
  onSignup
}: SignupFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
            First name
          </label>
          <input type="text" id="first-name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" required />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
            Last name
          </label>
          <input type="text" id="last-name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" required />
        </div>
      </div>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input type="text" id="username" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" placeholder="@yourname" required />
      </div>
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input type="email" id="signup-email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" placeholder="your@email.com" required />
      </div>
      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input type="password" id="signup-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" placeholder="••••••••" required />
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters
        </p>
      </div>
      <div className="flex items-center">
        <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-[#0077B6] focus:ring-[#0077B6] border-gray-300 rounded" required />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-[#0077B6] hover:text-[#00B4D8]">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#0077B6] hover:text-[#00B4D8]">
            Privacy Policy
          </a>
        </label>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#0077B6] hover:bg-[#00B4D8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6]">
          Create account
        </button>
      </div>
      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or sign up with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6]">
          Google
        </button>
        <button type="button" className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6]">
          Facebook
        </button>
      </div>
    </form>;
};