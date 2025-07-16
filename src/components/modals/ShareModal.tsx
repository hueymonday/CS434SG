import React, { useState } from 'react';
import { XIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePostContext } from '../context/PostContext';
interface ShareModalProps {
  post: {
    id: number;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    location: string;
    caption: string;
    media: string;
    timestamp: string;
    likes?: number;
    comments?: number;
    shares?: number;
  };
  onClose: () => void;
  onShare: (caption: string) => void;
}
export const ShareModal = ({
  post,
  onClose,
  onShare
}: ShareModalProps) => {
  const [caption, setCaption] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const {
    addSharedPost
  } = usePostContext();
  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);
    // Add the post to the user's profile
    addSharedPost(post, caption);
    // Call the onShare callback to update the share count
    onShare(caption);
    // Show success toast and close modal
    window.showToast('Post shared successfully', 'success');
    // Close the modal after a short delay
    setTimeout(() => {
      setIsSharing(false);
      onClose();
    }, 500);
  };
  const handleCancel = () => {
    window.showToast('Share canceled', 'error');
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={handleCancel}>
      <div className="bg-white rounded-lg max-w-md w-full max-h-[85vh] flex flex-col shadow-xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="font-bold text-xl text-gray-900">Share Post</h2>
          <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors" aria-label="Close">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleShare} className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Caption Input */}
            <div className="p-4 border-b border-gray-200">
              <label htmlFor="share-caption" className="block text-sm font-medium text-gray-700 mb-2">
                Add a caption (optional)
              </label>
              <textarea id="share-caption" placeholder="Write something about this post..." className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent resize-none" value={caption} onChange={e => setCaption(e.target.value)} rows={3} />
            </div>
            {/* Post Preview */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Preview
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Original Post Header */}
                <div className="p-3 flex items-center bg-gray-50">
                  <Link to={`/profile/${post.user.username}`} className="flex items-center" onClick={e => e.stopPropagation()}>
                    <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="ml-2">
                      <h3 className="font-medium text-sm text-gray-900">
                        {post.user.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPinIcon className="w-3 h-3 mr-1" />
                        <span>{post.location}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Original Post Media */}
                <div className="relative">
                  <img src={post.media} alt="Post content" className="w-full h-auto object-cover" style={{
                  maxHeight: '240px'
                }} />
                </div>
                {/* Original Post Caption */}
                <div className="p-3">
                  <p className="text-gray-800 text-sm line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex space-x-3">
            <button type="button" onClick={handleCancel} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors" disabled={isSharing}>
              Cancel
            </button>
            <button type="submit" disabled={isSharing} className="flex-1 py-3 bg-[#0077B6] text-white rounded-lg font-medium hover:bg-[#00B4D8] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
              {isSharing ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </form>
      </div>
    </div>;
};