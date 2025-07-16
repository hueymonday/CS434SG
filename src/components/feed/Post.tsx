import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon, MessageCircleIcon, ShareIcon, BookmarkIcon, MapPinIcon, MoreVerticalIcon, EditIcon, TrashIcon, ArchiveIcon, FlagIcon, XIcon, RepeatIcon } from 'lucide-react';
import { ShareModal } from '../modals/ShareModal';
import { usePostContext } from '../context/PostContext';
interface PostProps {
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
    likes: number;
    comments: number | any[];
    timestamp: string;
    shares?: number;
    // New fields for shared posts
    isShared?: boolean;
    originalPost?: {
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
    };
    sharedCaption?: string;
    sharedTimestamp?: string;
  };
  currentUsername?: string; // To determine if post belongs to current user
}
export const Post = ({
  post,
  currentUsername = 'janedoe' // Default value for demo purposes
}: PostProps) => {
  const navigate = useNavigate();
  const {
    incrementShareCount,
    savePost,
    unsavePost,
    isSaved
  } = usePostContext();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [shareCount, setShareCount] = useState(post.shares || 0);
  const [showMenu, setShowMenu] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [saved, setSaved] = useState(isSaved(post.id));
  // Mock comments for demo
  const [comments, setComments] = useState([{
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
  }]);
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  const handlePostClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    navigate(`/post/${post.id}`);
  };
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  const handleCommentToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCommentModal(!showCommentModal);
  };
  const handleShareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareModal(!showShareModal);
  };
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    // Add the new comment
    const newCommentObj = {
      id: comments.length + 1,
      user: {
        name: 'Jane Doe',
        username: 'janedoe',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
      },
      text: newComment,
      timestamp: 'Just now'
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  const handleShare = (caption: string) => {
    // Increment share count for the post
    setShareCount(prev => prev + 1);
  };
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
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
  const isOwnPost = post.user.username === currentUsername;
  // Determine if this is a shared post or a regular post
  const isSharedPost = post.isShared && post.originalPost;
  return <>
      <article className="bg-white rounded-lg border border-gray-100 overflow-hidden cursor-pointer" onClick={handlePostClick}>
        {/* Post Header - User Info and Location */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`/profile/${post.user.username}`} onClick={e => e.stopPropagation()} className="cursor-pointer">
              <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
            </Link>
            <div className="ml-3">
              <Link to={`/profile/${post.user.username}`} onClick={e => e.stopPropagation()} className="cursor-pointer">
                <h3 className="font-medium text-gray-900">{post.user.name}</h3>
              </Link>
              <div className="flex items-center text-xs text-gray-500">
                <MapPinIcon className="w-3 h-3 mr-1" />
                <span>{post.location}</span>
              </div>
            </div>
          </div>
          {/* Three-dot menu */}
          <div className="relative">
            <button className="text-gray-500 hover:text-gray-700 p-1" onClick={handleMenuToggle}>
              <MoreVerticalIcon className="w-5 h-5" />
            </button>
            {/* Menu popup */}
            {showMenu && <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 z-20 w-36">
                {isOwnPost ? <>
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
          </div>
        </div>

        {/* Shared Post Label - Only for shared posts */}
        {isSharedPost && <div className="px-4 pb-2">
            <div className="flex items-center text-sm text-gray-600">
              <RepeatIcon className="w-4 h-4 mr-1" />
              <span>Originally posted by </span>
              <Link to={`/profile/${post.originalPost.user.username}`} onClick={e => e.stopPropagation()} className="text-[#0077B6] hover:underline ml-1 font-medium">
                {post.originalPost.user.name}
              </Link>
            </div>
          </div>}

        {/* Sharer's Caption - Only for shared posts */}
        {isSharedPost && post.sharedCaption && <div className="px-4 pb-3">
            <p className="text-gray-800">{post.sharedCaption}</p>
          </div>}

        {/* Original Post - If this is a shared post, show the original in a nested card */}
        {isSharedPost ? <div className="mx-4 mb-4 border border-gray-200 rounded-lg overflow-hidden">
            {/* Original Post Header */}
            <div className="p-3 flex items-center">
              <Link to={`/profile/${post.originalPost.user.username}`} onClick={e => e.stopPropagation()} className="flex items-center">
                <img src={post.originalPost.user.avatar} alt={post.originalPost.user.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="ml-2">
                  <h3 className="font-medium text-sm text-gray-900">
                    {post.originalPost.user.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPinIcon className="w-3 h-3 mr-1" />
                    <span>{post.originalPost.location}</span>
                  </div>
                </div>
              </Link>
            </div>
            {/* Original Media */}
            <div className="relative">
              <img src={post.originalPost.media} alt="Original post content" className="w-full h-auto max-h-[400px] object-cover" />
            </div>
            {/* Original Caption */}
            <div className="p-3">
              <p className="text-gray-800 text-sm">
                {post.originalPost.caption}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Posted {post.originalPost.timestamp}
              </p>
            </div>
          </div> : <>
            {/* Caption - For regular posts */}
            <div className="px-4 pb-3">
              <p className="text-gray-800">{post.caption}</p>
            </div>
            {/* Media - For regular posts */}
            <div className="relative">
              <img src={post.media} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
            </div>
          </>}

        {/* Interaction Bar */}
        <div className="p-4">
          <div className="flex justify-between mb-3">
            <div className="flex space-x-4">
              <button className="flex items-center hover:text-[#0077B6]" onClick={e => {
              e.stopPropagation();
              handleLike();
            }}>
                <HeartIcon className={`w-6 h-6 mr-1 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
                <span>{likeCount}</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-[#0077B6]" onClick={handleCommentToggle}>
                <MessageCircleIcon className="w-6 h-6 mr-1" />
                <span>{Array.isArray(comments) ? comments.length : 0}</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-[#0077B6]" onClick={handleShareToggle}>
                <ShareIcon className="w-6 h-6 mr-1" />
                <span>{shareCount}</span>
              </button>
            </div>
            <button className="text-gray-700 hover:text-[#0077B6]" onClick={handleSaveToggle}>
              <BookmarkIcon className={`w-6 h-6 ${saved ? 'text-[#0077B6] fill-[#0077B6]' : 'text-gray-700'}`} />
            </button>
          </div>
          {/* Timestamp */}
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
      </article>

      {/* Comment Modal */}
      {showCommentModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowCommentModal(false)}>
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg">Comments</h2>
              <button onClick={() => setShowCommentModal(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Comment List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map(comment => <div key={comment.id} className="flex space-x-3">
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
                      <button className="ml-2 hover:text-[#0077B6]">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
            {/* Comment Input */}
            <div className="border-t border-gray-100 p-4">
              <form onSubmit={handleSubmitComment} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#00B4D8] flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <input type="text" placeholder="Add a comment..." className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-[#0077B6]" value={newComment} onChange={e => setNewComment(e.target.value)} />
                <button type="submit" className="bg-[#0077B6] text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-[#00B4D8] transition-colors">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>}

      {/* Share Modal */}
      {showShareModal && <ShareModal post={isSharedPost ? post.originalPost : post} onClose={() => setShowShareModal(false)} onShare={handleShare} />}
    </>;
};