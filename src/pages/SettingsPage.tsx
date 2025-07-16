import React, { useState } from 'react';
import { UserIcon, LockIcon, BellIcon, GlobeIcon, ShieldIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react';
interface SettingsPageProps {
  onLogout: () => void;
}
export const SettingsPage = ({
  onLogout
}: SettingsPageProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'account'>('profile');
  return <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            </div>
            <nav className="p-2">
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center p-3 rounded-lg mb-1 text-left ${activeTab === 'profile' ? 'bg-[#0077B6] bg-opacity-10 text-[#0077B6]' : 'hover:bg-gray-50 text-gray-700'}`}>
                <UserIcon className="w-5 h-5 mr-3" />
                <span>Profile Settings</span>
              </button>
              <button onClick={() => setActiveTab('privacy')} className={`w-full flex items-center p-3 rounded-lg mb-1 text-left ${activeTab === 'privacy' ? 'bg-[#0077B6] bg-opacity-10 text-[#0077B6]' : 'hover:bg-gray-50 text-gray-700'}`}>
                <LockIcon className="w-5 h-5 mr-3" />
                <span>Privacy & Security</span>
              </button>
              <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center p-3 rounded-lg mb-1 text-left ${activeTab === 'notifications' ? 'bg-[#0077B6] bg-opacity-10 text-[#0077B6]' : 'hover:bg-gray-50 text-gray-700'}`}>
                <BellIcon className="w-5 h-5 mr-3" />
                <span>Notifications</span>
              </button>
              <button onClick={() => setActiveTab('account')} className={`w-full flex items-center p-3 rounded-lg mb-1 text-left ${activeTab === 'account' ? 'bg-[#0077B6] bg-opacity-10 text-[#0077B6]' : 'hover:bg-gray-50 text-gray-700'}`}>
                <ShieldIcon className="w-5 h-5 mr-3" />
                <span>Account</span>
              </button>
              <div className="border-t border-gray-100 my-2 pt-2">
                <button className="w-full flex items-center p-3 rounded-lg mb-1 text-left hover:bg-gray-50 text-gray-700">
                  <HelpCircleIcon className="w-5 h-5 mr-3" />
                  <span>Help Center</span>
                </button>
                <button onClick={onLogout} className="w-full flex items-center p-3 rounded-lg mb-1 text-left hover:bg-gray-50 text-red-600">
                  <LogOutIcon className="w-5 h-5 mr-3" />
                  <span>Log Out</span>
                </button>
              </div>
            </nav>
          </div>
          {/* Settings Content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' && <div>
                <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Profile Picture
                  </h3>
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-[#00B4D8] flex items-center justify-center text-white text-xl font-medium">
                      JD
                    </div>
                    <div className="ml-6">
                      <button className="px-4 py-2 bg-[#0077B6] text-white rounded-lg text-sm font-medium hover:bg-[#00B4D8] transition-colors">
                        Upload New Photo
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG or PNG, max 2MB
                      </p>
                    </div>
                  </div>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input type="text" id="fullName" defaultValue="Jane Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input type="text" id="username" defaultValue="janedoe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea id="bio" rows={4} defaultValue="Travel enthusiast | Photographer | 25 countries and counting ✈️" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" />
                    <p className="text-xs text-gray-500 mt-1">
                      Brief description for your profile
                    </p>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input type="text" id="location" defaultValue="New York, USA" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input type="url" id="website" placeholder="https://example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-[#0077B6] text-white rounded-lg font-medium hover:bg-[#00B4D8] transition-colors">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>}
            {activeTab === 'privacy' && <div>
                <h2 className="text-xl font-bold mb-6">Privacy & Security</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      Privacy Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Private Account</p>
                          <p className="text-sm text-gray-500">
                            Only approved followers can see your posts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Activity Status</p>
                          <p className="text-sm text-gray-500">
                            Show when you're active on Shalo
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Location Sharing</p>
                          <p className="text-sm text-gray-500">
                            Share your exact location in posts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-4">Security</h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <LockIcon className="w-5 h-5 mr-3 text-gray-500" />
                          <span>Change Password</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <ShieldIcon className="w-5 h-5 mr-3 text-gray-500" />
                          <span>Two-Factor Authentication</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <GlobeIcon className="w-5 h-5 mr-3 text-gray-500" />
                          <span>Login Activity</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
            {activeTab === 'notifications' && <div>
                <h2 className="text-xl font-bold mb-6">
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      Push Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Likes</p>
                          <p className="text-sm text-gray-500">
                            When someone likes your posts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Comments</p>
                          <p className="text-sm text-gray-500">
                            When someone comments on your posts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Followers</p>
                          <p className="text-sm text-gray-500">
                            When someone follows you
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Achievements</p>
                          <p className="text-sm text-gray-500">
                            When you earn new badges
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Product Updates</p>
                          <p className="text-sm text-gray-500">
                            News and announcements
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Account Activity</p>
                          <p className="text-sm text-gray-500">
                            Logins, security alerts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077B6]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {activeTab === 'account' && <div>
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      Account Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input type="email" id="email" defaultValue="jane.doe@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input type="tel" id="phone" placeholder="Add phone number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Language & Region
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <select id="language" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" defaultValue="en">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="ja">Japanese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-red-600 mb-4">
                      Danger Zone
                    </h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50 text-red-600">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Deactivate Account</span>
                        </div>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};