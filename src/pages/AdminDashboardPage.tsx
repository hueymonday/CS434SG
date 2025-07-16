import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, FileTextIcon, FlagIcon, SettingsIcon, UsersIcon, TrendingUpIcon, SearchIcon, CheckIcon, XIcon, TrashIcon } from 'lucide-react';
interface AdminDashboardPageProps {
  activeTab?: 'overview' | 'users' | 'posts' | 'reports' | 'settings';
}
export const AdminDashboardPage = ({
  activeTab = 'overview'
}: AdminDashboardPageProps) => {
  const [currentTab, setCurrentTab] = useState<'overview' | 'users' | 'posts' | 'reports' | 'settings'>(activeTab);
  // Update the current tab when the activeTab prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);
  // Mock data for admin dashboard
  const stats = {
    totalUsers: 12548,
    activeUsers: 8735,
    newUsersToday: 124,
    totalPosts: 87429,
    reportedPosts: 57,
    reportedUsers: 23
  };
  // Mock users data
  const users = [{
    id: 1,
    name: 'Alex Johnson',
    username: 'alexjourneys',
    email: 'alex@example.com',
    status: 'active',
    joined: '2022-05-12',
    posts: 42
  }, {
    id: 2,
    name: 'Sarah Miller',
    username: 'sarahtravels',
    email: 'sarah@example.com',
    status: 'active',
    joined: '2022-03-18',
    posts: 67
  }, {
    id: 3,
    name: 'Mike Chen',
    username: 'mikesadventures',
    email: 'mike@example.com',
    status: 'suspended',
    joined: '2022-06-30',
    posts: 24
  }, {
    id: 4,
    name: 'Emma Wilson',
    username: 'emmawanders',
    email: 'emma@example.com',
    status: 'active',
    joined: '2022-01-05',
    posts: 103
  }, {
    id: 5,
    name: 'James Brown',
    username: 'jamesglobal',
    email: 'james@example.com',
    status: 'inactive',
    joined: '2022-07-22',
    posts: 8
  }];
  // Mock reported content
  const reports = [{
    id: 1,
    type: 'post',
    content: 'Inappropriate content showing illegal activities at a protected beach.',
    reportedBy: 'user123',
    date: '2023-02-15',
    status: 'pending',
    user: {
      name: 'Mike Chen',
      username: 'mikesadventures'
    }
  }, {
    id: 2,
    type: 'user',
    content: 'User is spamming with fake travel posts and misleading information.',
    reportedBy: 'user456',
    date: '2023-02-14',
    status: 'reviewed',
    user: {
      name: 'Fake Account',
      username: 'notrealtravels'
    }
  }, {
    id: 3,
    type: 'post',
    content: 'Post contains hate speech and offensive language.',
    reportedBy: 'user789',
    date: '2023-02-13',
    status: 'pending',
    user: {
      name: 'Anonymous',
      username: 'anon_user'
    }
  }];
  return <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Main Content */}
      <div className="flex-1">
        {currentTab === 'overview' && <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0077B6] bg-opacity-5 p-6 rounded-lg">
                <div className="text-[#0077B6] text-lg font-medium mb-1">
                  Total Users
                </div>
                <div className="text-3xl font-bold">
                  {stats.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {stats.activeUsers.toLocaleString()} active users
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-green-600 text-lg font-medium mb-1">
                  New Users Today
                </div>
                <div className="text-3xl font-bold">
                  {stats.newUsersToday.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  +12% from yesterday
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-purple-600 text-lg font-medium mb-1">
                  Total Posts
                </div>
                <div className="text-3xl font-bold">
                  {stats.totalPosts.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  1,245 new this week
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-lg mb-8">
              <h2 className="text-red-600 text-lg font-medium mb-4">
                Attention Required
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <FlagIcon className="w-10 h-10 text-red-500 mr-4" />
                  <div>
                    <div className="text-xl font-bold">
                      {stats.reportedPosts}
                    </div>
                    <div className="text-gray-500">Reported posts</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <UserIcon className="w-10 h-10 text-red-500 mr-4" />
                  <div>
                    <div className="text-xl font-bold">
                      {stats.reportedUsers}
                    </div>
                    <div className="text-gray-500">Reported users</div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map(report => <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.type === 'post' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {report.content.substring(0, 50)}...
                        </div>
                        <div className="text-xs text-gray-500">
                          By: {report.user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#0077B6] hover:text-[#00B4D8] mr-3">
                          Review
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Dismiss
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>}
        {currentTab === 'users' && <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold mb-2 md:mb-0">Manage Users</h1>
              <div className="relative">
                <input type="text" placeholder="Search users..." className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0077B6]" />
                <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posts
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'suspended' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joined}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.posts}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-[#0077B6] hover:text-[#00B4D8]">
                            View
                          </button>
                          {user.status !== 'suspended' ? <button className="text-red-600 hover:text-red-800">
                              Suspend
                            </button> : <button className="text-green-600 hover:text-green-800">
                              Activate
                            </button>}
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">5</span> of{' '}
                <span className="font-medium">{stats.totalUsers}</span> users
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-[#0077B6] rounded-md text-sm bg-[#0077B6] text-white hover:bg-[#00B4D8]">
                  Next
                </button>
              </div>
            </div>
          </div>}
        {currentTab === 'reports' && <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Reported Content</h1>
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#0077B6] text-white whitespace-nowrap">
                All Reports
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 whitespace-nowrap">
                Pending
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 whitespace-nowrap">
                Reviewed
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 whitespace-nowrap">
                Posts
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 whitespace-nowrap">
                Users
              </button>
            </div>
            <div className="space-y-4">
              {reports.map(report => <div key={report.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full ${report.type === 'post' ? 'bg-yellow-100' : 'bg-purple-100'} flex items-center justify-center mr-3`}>
                        {report.type === 'post' ? <FileTextIcon className="w-5 h-5 text-yellow-800" /> : <UserIcon className="w-5 h-5 text-purple-800" />}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.type === 'post' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'} mr-2`}>
                            {report.type}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {report.status}
                          </span>
                        </div>
                        <h3 className="font-medium mt-1">
                          Reported {report.type} by @{report.user.username}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {report.content}
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                          Reported by @{report.reportedBy} on {report.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-green-500 text-white rounded-full">
                        <CheckIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-red-500 text-white rounded-full">
                        <XIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-200 text-gray-500 rounded-full">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {report.status === 'pending' && <div className="mt-4 flex space-x-2">
                      <button className="flex-1 py-2 bg-[#0077B6] text-white rounded-lg text-sm font-medium hover:bg-[#00B4D8] transition-colors">
                        Review Content
                      </button>
                      <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Dismiss Report
                      </button>
                      <button className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                        Delete Content
                      </button>
                    </div>}
                </div>)}
            </div>
          </div>}
        {currentTab === 'posts' && <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Posts</h1>
            <p className="text-gray-500">
              Content management interface would go here.
            </p>
          </div>}
        {currentTab === 'settings' && <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
            <p className="text-gray-500">
              Admin configuration settings would go here.
            </p>
          </div>}
      </div>
    </div>;
};