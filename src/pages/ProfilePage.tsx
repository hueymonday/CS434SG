import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPinIcon, EditIcon, ShareIcon } from 'lucide-react';
import { UserRole } from '../App';
import { usePostContext } from '../components/context/PostContext';
import { Post } from '../components/feed/Post';
interface ProfilePageProps {
  userRole: UserRole;
}
export const ProfilePage = ({
  userRole
}: ProfilePageProps) => {
  const {
    username
  } = useParams<{
    username: string;
  }>();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'checkins' | 'achievements'>('posts');
  const {
    userPosts
  } = usePostContext();
  // Mock user data
  const user = {
    name: username === 'me' ? 'Jane Doe' : 'Alex Johnson',
    username: username === 'me' ? 'janedoe' : 'alexjourneys',
    avatar: username === 'me' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    bio: 'Travel enthusiast | Photographer | 25 countries and counting ✈️',
    location: 'New York, USA',
    stats: {
      posts: username === 'me' ? userPosts.length : 42,
      followers: 1250,
      following: 350
    }
  };
  // Use userPosts from context if viewing own profile, otherwise use mock posts
  const posts = username === 'me' || username === 'janedoe' ? userPosts : [{
    id: 1,
    user: {
      name: 'Alex Johnson',
      username: 'alexjourneys',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Bali, Indonesia',
    caption: 'Found this hidden beach today!',
    media: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    likes: 248,
    comments: 42,
    shares: 3,
    timestamp: '3 hours ago'
  }
  // ...other mock posts
  ];
  // Mock achievements data
  const achievements = [{
    id: 1,
    title: 'Globetrotter',
    icon: '🌎',
    description: 'Visited 10+ countries',
    date: 'Earned 3 months ago'
  }, {
    id: 2,
    title: 'Beach Lover',
    icon: '🏖️',
    description: 'Checked in at 15 beaches',
    date: 'Earned 1 month ago'
  }, {
    id: 3,
    title: 'Mountain Climber',
    icon: '⛰️',
    description: 'Hiked 5 mountain trails',
    date: 'Earned 2 weeks ago'
  }, {
    id: 4,
    title: 'Cultural Explorer',
    icon: '🏛️',
    description: 'Visited 20 historical sites',
    date: 'Earned 5 months ago'
  }];
  const isOwnProfile = username === 'me' || username === 'janedoe';
  // Convert posts to grid format for the grid view
  const gridPosts = posts.map(post => ({
    id: post.id,
    media: post.isShared ? post.originalPost?.media : post.media,
    location: post.isShared ? post.originalPost?.location : post.location,
    isShared: post.isShared,
    originalUsername: post.isShared ? post.originalPost?.user.username : undefined
  }));
  return <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              {isOwnProfile && <button className="mt-2 sm:mt-0 px-4 py-2 flex items-center justify-center bg-[#0077B6] text-white rounded-full text-sm font-medium hover:bg-[#00B4D8] transition-colors">
                  <EditIcon className="w-4 h-4 mr-1" />
                  Edit Profile
                </button>}
            </div>
            <p className="text-gray-500 mt-1">@{user.username}</p>
            <div className="flex items-center justify-center sm:justify-start mt-2 text-sm text-gray-500">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <span>{user.location}</span>
            </div>
            <p className="mt-3 text-gray-800">{user.bio}</p>
            {/* Profile Stats */}
            
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-100 mb-6">
        <div className="flex border-b border-gray-100">
          <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'posts' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500'}`} onClick={() => setActiveTab('posts')}>
            Posts
          </button>
          <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'saved' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500'}`} onClick={() => setActiveTab('saved')}>
            Saved
          </button>
          <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'checkins' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500'}`} onClick={() => setActiveTab('checkins')}>
            Check-ins
          </button>
          <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'achievements' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500'}`} onClick={() => setActiveTab('achievements')}>
            Achievements
          </button>
        </div>
        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'posts' && <div>
              {/* Full post view for own profile */}
              {isOwnProfile ? <div className="space-y-6">
                  {posts.map(post => <Post key={post.id} post={post} currentUsername={user.username} />)}
                </div> /* Grid view for other profiles */ : <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gridPosts.map(post => <Link key={post.id} to={`/post/${post.id}`} className="relative group">
                      <img src={post.media} alt={post.location} className="w-full h-40 object-cover rounded-lg" />
                      {post.isShared && <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <ShareIcon className="w-3 h-3 mr-1" />
                          <span>Shared</span>
                        </div>}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-end transition-all duration-200 rounded-lg">
                        <div className="p-2 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex items-center">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            <span className="text-xs">{post.location}</span>
                          </div>
                        </div>
                      </div>
                    </Link>)}
                </div>}
            </div>}
          {activeTab === 'saved' && <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gridPosts.slice(0, 3).map(post => <Link key={post.id} to={`/post/${post.id}`} className="relative group">
                  <img src={post.media} alt={post.location} className="w-full h-40 object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-end transition-all duration-200 rounded-lg">
                    <div className="p-2 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center">
                        <MapPinIcon className="w-3 h-3 mr-1" />
                        <span className="text-xs">{post.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>)}
            </div>}
          {activeTab === 'checkins' && <div className="space-y-4">
              {gridPosts.slice(0, 4).map(post => <div key={post.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <img src={post.media} alt={post.location} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="ml-4">
                    <h3 className="font-medium">{post.location}</h3>
                    <p className="text-sm text-gray-500">
                      Checked in 2 weeks ago
                    </p>
                  </div>
                </div>)}
            </div>}
          {activeTab === 'achievements' && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map(achievement => <div key={achievement.id} className="bg-gray-50 p-4 rounded-lg flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0077B6] bg-opacity-10 rounded-full text-2xl">
                    {achievement.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {achievement.date}
                    </p>
                  </div>
                </div>)}
            </div>}
        </div>
      </div>
    </div>;
};