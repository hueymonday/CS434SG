import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, TagIcon, UserIcon, ClockIcon, CompassIcon } from 'lucide-react';
import { usePostContext } from '../components/context/PostContext';
export const SavedItemsPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'posts' | 'locations'>('all');
  const {
    savedPosts,
    savedLocations
  } = usePostContext();
  // Combine and sort all saved items by savedTimestamp
  const allSavedItems = [...savedPosts, ...savedLocations].sort((a, b) => {
    // Simple sorting logic - newer items first
    // In a real app, we would parse the timestamps properly
    return (a.savedTimestamp || '').localeCompare(b.savedTimestamp || '');
  });
  // Filter items based on activeFilter
  const filteredItems = activeFilter === 'all' ? allSavedItems : activeFilter === 'posts' ? savedPosts : savedLocations;
  return <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
        </div>
        {/* Filter Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex -mb-px">
            <button className={`mr-8 py-4 text-sm font-medium ${activeFilter === 'all' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveFilter('all')}>
              All
            </button>
            <button className={`mr-8 py-4 text-sm font-medium ${activeFilter === 'posts' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveFilter('posts')}>
              Posts
            </button>
            <button className={`mr-8 py-4 text-sm font-medium ${activeFilter === 'locations' ? 'text-[#0077B6] border-b-2 border-[#0077B6]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveFilter('locations')}>
              Locations
            </button>
          </div>
        </div>
        {/* Saved Items Content */}
        {filteredItems.length === 0 ? <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No saved {activeFilter === 'all' ? 'items' : activeFilter}
            </h3>
            <p className="text-gray-500">
              {activeFilter === 'all' ? 'Items you save will appear here' : activeFilter === 'posts' ? 'Posts you save will appear here' : 'Locations you save will appear here'}
            </p>
          </div> : <div className="space-y-4">
            {filteredItems.map(item => <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <Link to={item.itemType === 'post' ? `/post/${item.id}` : `/explore?location=${item.id}`} className="block">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/3 relative">
                      <img src={item.itemType === 'post' ? item.media : item.image} alt={item.itemType === 'post' ? item.caption : item.name} className="w-full h-48 md:h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0077B6] fill-[#0077B6]" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="p-4 md:w-2/3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            <span>
                              {item.itemType === 'post' ? item.location : item.name}
                            </span>
                          </div>
                          <h3 className="font-medium text-lg mb-2">
                            {item.itemType === 'post' ? item.title || item.caption.substring(0, 60) + (item.caption.length > 60 ? '...' : '') : item.description.substring(0, 60) + (item.description.length > 60 ? '...' : '')}
                          </h3>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.itemType === 'post' ? <>
                              <TagIcon className="w-3 h-3 mr-1" />
                              Post
                            </> : <>
                              <CompassIcon className="w-3 h-3 mr-1" />
                              Location
                            </>}
                        </span>
                        {item.itemType === 'location' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <TagIcon className="w-3 h-3 mr-1" />
                            {(item as any).type}
                          </span>}
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          {item.itemType === 'post' ? <>
                              <UserIcon className="w-3 h-3 mr-1" />
                              <span>by @{(item as any).user.username}</span>
                            </> : <>
                              <MapPinIcon className="w-3 h-3 mr-1" />
                              <span>{(item as any).country}</span>
                            </>}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          <span>Saved {item.savedTimestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>)}
          </div>}
      </div>
    </div>;
};