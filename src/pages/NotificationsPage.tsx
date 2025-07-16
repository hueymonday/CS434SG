import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, MessageCircleIcon, UserPlusIcon, AwardIcon, BellIcon } from 'lucide-react';
export const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'interactions' | 'follows' | 'achievements'>('all');
  // Mock notifications data
  const notifications = [{
    id: 1,
    type: 'like',
    user: {
      name: 'Sarah Miller',
      username: 'sarahtravels',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    content: 'liked your post',
    postId: 1,
    postImage: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    time: '5 minutes ago',
    read: false
  }, {
    id: 2,
    type: 'comment',
    user: {
      name: 'Mike Chen',
      username: 'mikesadventures',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    content: 'commented on your post: "This place looks amazing! Where exactly in Bali is this?"',
    postId: 1,
    postImage: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    time: '1 hour ago',
    read: false
  }, {
    id: 3,
    type: 'follow',
    user: {
      name: 'Emma Wilson',
      username: 'emmawanders',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    content: 'started following you',
    time: '3 hours ago',
    read: true
  }, {
    id: 4,
    type: 'achievement',
    content: 'You earned the "Beach Lover" badge!',
    achievementIcon: '🏖️',
    time: '1 day ago',
    read: true
  }, {
    id: 5,
    type: 'like',
    user: {
      name: 'James Brown',
      username: 'jamesglobal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    content: 'liked your post',
    postId: 2,
    postImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
    time: '2 days ago',
    read: true
  }];
  const filteredNotifications = activeFilter === 'all' ? notifications : activeFilter === 'interactions' ? notifications.filter(n => n.type === 'like' || n.type === 'comment') : activeFilter === 'follows' ? notifications.filter(n => n.type === 'follow') : notifications.filter(n => n.type === 'achievement');
  return <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <button className="text-sm text-[#0077B6] hover:text-[#00B4D8]">
              Mark all as read
            </button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'all' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('all')}>
              All
            </button>
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'interactions' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('interactions')}>
              Interactions
            </button>
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'follows' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('follows')}>
              Follows
            </button>
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'achievements' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('achievements')}>
              Achievements
            </button>
          </div>
        </div>
        {filteredNotifications.length === 0 ? <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No notifications
            </h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div> : <div className="divide-y divide-gray-100">
            {filteredNotifications.map(notification => <div key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50 hover:bg-blue-50' : ''}`}>
                {notification.type === 'achievement' ? <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#0077B6] bg-opacity-10 flex items-center justify-center text-xl mr-3">
                      {notification.achievementIcon}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{notification.content}</p>
                      <Link to="/achievements" className="text-sm text-[#0077B6] hover:text-[#00B4D8]">
                        View your achievements
                      </Link>
                      <div className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </div>
                    </div>
                  </div> : <div className="flex items-start">
                    <Link to={`/profile/${notification.user.username}`} className="mr-3">
                      <img src={notification.user.avatar} alt={notification.user.name} className="w-10 h-10 rounded-full object-cover" />
                    </Link>
                    <div className="flex-1">
                      <p className="text-gray-800">
                        <Link to={`/profile/${notification.user.username}`} className="font-medium hover:text-[#0077B6]">
                          {notification.user.name}
                        </Link>{' '}
                        {notification.content}
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </div>
                    </div>
                    {notification.type !== 'follow' && <Link to={`/post/${notification.postId}`} className="ml-2">
                        <img src={notification.postImage} alt="Post" className="w-14 h-14 rounded-md object-cover" />
                      </Link>}
                    {notification.type === 'follow' && <button className="px-3 py-1 bg-[#0077B6] text-white text-sm rounded-full hover:bg-[#00B4D8]">
                        Follow
                      </button>}
                  </div>}
              </div>)}
          </div>}
      </div>
    </div>;
};