import React, { useState } from 'react';
import { AwardIcon } from 'lucide-react';
export const AchievementsPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'earned' | 'unearned'>('all');
  // Mock achievements data
  const achievements = [{
    id: 1,
    title: 'Globetrotter',
    icon: '🌎',
    description: 'Visited 10+ countries',
    earnedDate: '3 months ago',
    progress: 100,
    earned: true
  }, {
    id: 2,
    title: 'Beach Lover',
    icon: '🏖️',
    description: 'Checked in at 15 beaches',
    earnedDate: '1 month ago',
    progress: 100,
    earned: true
  }, {
    id: 3,
    title: 'Mountain Climber',
    icon: '⛰️',
    description: 'Hiked 5 mountain trails',
    earnedDate: '2 weeks ago',
    progress: 100,
    earned: true
  }, {
    id: 4,
    title: 'Cultural Explorer',
    icon: '🏛️',
    description: 'Visited 20 historical sites',
    earnedDate: '5 months ago',
    progress: 100,
    earned: true
  }, {
    id: 5,
    title: 'Island Hopper',
    icon: '🏝️',
    description: 'Visit 5 different islands',
    earnedDate: null,
    progress: 60,
    earned: false
  }, {
    id: 6,
    title: 'City Slicker',
    icon: '🏙️',
    description: 'Check in at 25 major cities',
    earnedDate: null,
    progress: 72,
    earned: false
  }, {
    id: 7,
    title: 'Road Tripper',
    icon: '🚗',
    description: 'Document a journey across 3+ countries',
    earnedDate: null,
    progress: 33,
    earned: false
  }, {
    id: 8,
    title: 'Photo Master',
    icon: '📸',
    description: 'Get 1000+ likes on a single photo',
    earnedDate: null,
    progress: 45,
    earned: false
  }];
  const filteredAchievements = activeFilter === 'all' ? achievements : activeFilter === 'earned' ? achievements.filter(a => a.earned) : achievements.filter(a => !a.earned);
  return <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Your Achievements
            </h1>
            <p className="text-gray-500 mt-1">
              Track your travel milestones and earn badges
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex rounded-lg border border-gray-200 overflow-hidden">
            <button className={`px-4 py-1.5 text-sm font-medium ${activeFilter === 'all' ? 'bg-[#0077B6] text-white' : 'bg-white text-gray-700'}`} onClick={() => setActiveFilter('all')}>
              All
            </button>
            <button className={`px-4 py-1.5 text-sm font-medium ${activeFilter === 'earned' ? 'bg-[#0077B6] text-white' : 'bg-white text-gray-700'}`} onClick={() => setActiveFilter('earned')}>
              Earned
            </button>
            <button className={`px-4 py-1.5 text-sm font-medium ${activeFilter === 'unearned' ? 'bg-[#0077B6] text-white' : 'bg-white text-gray-700'}`} onClick={() => setActiveFilter('unearned')}>
              In Progress
            </button>
          </div>
        </div>
        {/* Achievement Stats */}
        <div className="bg-[#0077B6] bg-opacity-5 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-16 h-16 bg-[#0077B6] bg-opacity-10 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
              <AwardIcon className="w-8 h-8 text-[#0077B6]" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg">
                {achievements.filter(a => a.earned).length} of{' '}
                {achievements.length} Achievements Earned
              </h3>
              <p className="text-gray-500">
                Keep exploring to unlock more achievements!
              </p>
            </div>
          </div>
        </div>
        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {filteredAchievements.map(achievement => <div key={achievement.id} className={`border rounded-lg p-4 ${achievement.earned ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="flex items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${achievement.earned ? 'bg-[#0077B6] bg-opacity-10' : 'bg-gray-200'}`}>
                  {achievement.icon}
                </div>
                <div className="ml-4">
                  <h3 className={`font-bold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {achievement.description}
                  </p>
                  {achievement.earned ? <div className="flex items-center mt-1">
                      <AwardIcon className="w-4 h-4 text-[#0077B6] mr-1" />
                      <span className="text-xs text-[#0077B6]">
                        Earned {achievement.earnedDate}
                      </span>
                    </div> : <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0077B6]" style={{
                    width: `${achievement.progress}%`
                  }}></div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};