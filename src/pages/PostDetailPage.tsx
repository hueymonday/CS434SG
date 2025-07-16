import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HeartIcon, MessageCircleIcon, ShareIcon, BookmarkIcon, MapPinIcon, FlagIcon, TrashIcon, EditIcon, MoreVerticalIcon, ArchiveIcon } from 'lucide-react';
import { UserRole } from '../App';
import { ShareModal } from '../components/modals/ShareModal';
import { usePostContext } from '../components/context/PostContext';
interface PostDetailPageProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  onLoginClick: () => void;
}
export const PostDetailPage = ({
  isLoggedIn,
  userRole,
  onLoginClick
}: PostDetailPageProps) => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const {
    getAllPosts,
    incrementShareCount,
    savePost,
    unsavePost,
    isSaved
  } = usePostContext();
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  // Get post from context
  const allPosts = getAllPosts();
  const post = allPosts.find(p => p.id === Number(id)) || {
    id: Number(id),
    user: {
      name: 'Alex Johnson',
      username: 'alexjourneys',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Bali, Indonesia',
    title: 'Hidden Paradise in Bali',
    caption: 'Found this hidden beach today! The water was crystal clear and the local cuisine was amazing. Definitely recommend visiting during the off-season to avoid crowds. #TravelBali #HiddenGems',
    media: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    likes: 248,
    comments: [{
      id: 1,
      user: {
        name: 'Sarah Miller',
        username: 'sarahtravels',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
      },
      text: 'This looks amazing! What area of Bali is this?',
      timestamp: '2 hours ago'
    }, {
      id: 2,
      user: {
        name: 'Mike Chen',
        username: 'mikesadventures',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
      },
      text: 'The colors in this photo are incredible. What camera do you use?',
      timestamp: '1 hour ago'
    }],
    timestamp: '3 hours ago',
    edited: false,
    shares: 3
  };
  const [likeCount, setLikeCount] = useState(post.likes);
  const [shareCount, setShareCount] = useState(post.shares || 0);
  const [saved, setSaved] = useState(isSaved(post.id));
  // Update saved state when isSaved changes
  useEffect(() => {
    setSaved(isSaved(post.id));
  }, [isSaved, post.id]);
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    // In a real app, this would send the comment to an API
    window.showToast('Comment added successfully', 'success');
    setComment('');
  };
  const handleShare = (caption: string) => {
    setShareCount(prev => prev + 1);
  };
  const handleSaveToggle = () => {
    if (saved) {
      unsavePost(post.id);
      setSaved(false);
      window.showToast('Removed from saved items', 'success');
    } else {
      savePost(post);
      setSaved(true);
      window.showToast('Post saved', 'success');
    }
  };
  // For demo purposes, assume the current user is 'janedoe'
  const currentUsername = 'janedoe';
  const isOwnPost = post.user.username === currentUsername;
  if (!post) {
    return <div className="max-w-3xl mx-auto px-4 py-8">Post not found</div>;
  }
  return <div className="max-w-3xl mx-auto px-4 py-6">
      <article className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        {/* Post Header - User Info and Location */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`/profile/${post.user.username}`}>
              <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
            </Link>
            <div className="ml-3">
              <Link to={`/profile/${post.user.username}`}>
                <h3 className="font-medium text-gray-900">{post.user.name}</h3>
              </Link>
              <div className="flex items-center text-xs text-gray-500">
                <MapPinIcon className="w-3 h-3 mr-1" />
                <span>{post.location}</span>
              </div>
            </div>
          </div>
          {/* Three-dot menu */}
          {isLoggedIn && <div className="relative">
              <button className="text-gray-500 hover:text-gray-700 p-1" onClick={() => setShowMenu(!showMenu)}>
                <MoreVerticalIcon className="w-5 h-5" />
              </button>
              {/* Menu popup */}
              {showMenu && <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 z-10 w-36">
                  {isOwnPost || userRole === 'admin' ? <>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center">
                        <EditIcon className="w-4 h-4 mr-2" />
                        <span>Edit</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center">
                        <ArchiveIcon className="w-4 h-4 mr-2" />
                        <span>Archive</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 flex items-center">
                        <TrashIcon className="w-4 h-4 mr-2" />
                        <span>Delete</span>
                      </button>
                    </> : <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center">
                      <FlagIcon className="w-4 h-4 mr-2" />
                      <span>Report</span>
                    </button>}
                </div>}
            </div>}
        </div>
        {/* Title */}
        {post.title && <div className="px-4 pb-2">
            <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
          </div>}
        {/* Media */}
        <div className="relative">
          <img src={post.media} alt="Post content" className="w-full h-auto" />
        </div>
        {/* Caption */}
        <div className="p-4">
          <p className="text-gray-800 mb-2">{post.caption}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>{post.timestamp}</span>
            {post.edited && <span className="ml-2">(edited)</span>}
          </div>
        </div>
        {/* Interaction Bar */}
        <div className="px-4 pb-4 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <div className="flex space-x-4">
              <button className="flex items-center hover:text-[#0077B6]" onClick={handleLike}>
                <HeartIcon className={`w-6 h-6 mr-1 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
                <span>{likeCount}</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-[#0077B6]">
                <MessageCircleIcon className="w-6 h-6 mr-1" />
                <span>{post.comments.length}</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-[#0077B6]" onClick={() => setShowShareModal(true)}>
                <ShareIcon className="w-6 h-6 mr-1" />
                <span>{shareCount}</span>
              </button>
            </div>
            <button className="text-gray-700 hover:text-[#0077B6]" onClick={handleSaveToggle}>
              <BookmarkIcon className={`w-6 h-6 ${saved ? 'text-[#0077B6] fill-[#0077B6]' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>
        {/* Comments Section */}
        <div className="p-4">
          <h4 className="font-medium text-lg mb-4">Comments</h4>
          {/* Comment Input - only show if logged in */}
          {isLoggedIn ? <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#00B4D8] flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div className="flex-1">
                  <input type="text" placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" required />
                </div>
                <button type="submit" className="px-4 py-2 bg-[#0077B6] text-white rounded-lg font-medium hover:bg-[#00B4D8] transition-colors">
                  Post
                </button>
              </div>
            </form> : <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-2">Sign in to leave a comment</p>
              <button onClick={onLoginClick} className="px-4 py-2 bg-[#0077B6] text-white rounded-full text-sm font-medium hover:bg-[#00B4D8] transition-colors">
                Log in or Sign up
              </button>
            </div>}
          {/* Comments List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {post.comments.map(comment => <div key={comment.id} className="flex space-x-3">
                <Link to={`/profile/${comment.user.username}`}>
                  <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full object-cover" />
                </Link>
                <div className="flex-1">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <Link to={`/profile/${comment.user.username}`} className="font-medium text-gray-900">
                      {comment.user.name}
                    </Link>
                    <p className="text-gray-800">{comment.text}</p>
                  </div>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>{comment.timestamp}</span>
                    <button className="ml-2 hover:text-[#0077B6]">Reply</button>
                    {(userRole === 'admin' || comment.user.username === currentUsername) && <button className="ml-2 hover:text-red-500">
                        Delete
                      </button>}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </article>
      {/* Share Modal */}
      {showShareModal && <ShareModal post={post} onClose={() => setShowShareModal(false)} onShare={handleShare} />}
    </div>;
};