import React, { useState, createContext, useContext } from 'react';
// Define the post type for better type checking
export interface PostUser {
  name: string;
  username: string;
  avatar: string;
}
export interface Comment {
  id: number;
  user: PostUser;
  text: string;
  timestamp: string;
}
export interface Post {
  id: number;
  user: PostUser;
  location: string;
  caption: string;
  media: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  shares?: number;
  isShared?: boolean;
  originalPost?: {
    id: number;
    user: PostUser;
    location: string;
    caption: string;
    media: string;
    timestamp: string;
  };
  sharedCaption?: string;
  sharedTimestamp?: string;
  title?: string;
  edited?: boolean;
  itemType?: 'post' | 'location';
  savedTimestamp?: string;
}
export interface SavedLocation {
  id: number;
  name: string;
  description: string;
  image: string;
  country: string;
  type: string;
  savedTimestamp: string;
  itemType: 'location';
}
interface PostContextType {
  userPosts: Post[];
  savedPosts: Post[];
  savedLocations: SavedLocation[];
  addSharedPost: (post: Post, caption: string) => void;
  incrementShareCount: (postId: number) => void;
  getAllPosts: () => Post[];
  savePost: (post: Post) => void;
  unsavePost: (postId: number) => void;
  isSaved: (postId: number) => boolean;
  saveLocation: (location: SavedLocation) => void;
  unsaveLocation: (locationId: number) => void;
  isLocationSaved: (locationId: number) => boolean;
}
const PostContext = createContext<PostContextType | undefined>(undefined);
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
interface PostProviderProps {
  children: ReactNode;
}
export const PostProvider = ({
  children
}: PostProviderProps) => {
  // All posts in the system (including feed posts)
  const [allPosts, setAllPosts] = useState<Post[]>([{
    id: 1,
    user: {
      name: 'Alex Johnson',
      username: 'alexjourneys',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Bali, Indonesia',
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
    shares: 3,
    timestamp: '3 hours ago'
  }, {
    id: 3,
    user: {
      name: 'Jamie Smith',
      username: 'wanderingjamie',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Santorini, Greece',
    caption: 'Sunset in Santorini never disappoints. The white buildings against the blue sea create the perfect backdrop for an evening stroll. Found this little café with the most amazing view and spent hours just taking it all in.',
    media: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    likes: 843,
    comments: [],
    shares: 12,
    timestamp: '2 days ago'
  }, {
    id: 101,
    user: {
      name: 'Morgan Rivera',
      username: 'morgantravels',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Kyoto, Japan',
    caption: 'Cherry blossom season in Kyoto is simply magical. Walking through these ancient streets while pink petals fall around you feels like being in another world.',
    media: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    likes: 624,
    comments: [],
    shares: 32,
    timestamp: '2 days ago'
  }]);
  // Initial posts for the user's profile
  const [userPosts, setUserPosts] = useState<Post[]>([{
    id: 101,
    user: {
      name: 'Jane Doe',
      username: 'janedoe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'New York, USA',
    caption: 'Exploring the city that never sleeps. Found this amazing rooftop view of the skyline at sunset. #NYC #CityViews',
    media: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    likes: 156,
    comments: [],
    shares: 5,
    timestamp: '1 week ago'
  }, {
    id: 102,
    user: {
      name: 'Jane Doe',
      username: 'janedoe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Central Park, New York',
    caption: 'Perfect day for a picnic in the park. The weather was amazing! #CentralPark #NYC',
    media: 'https://images.unsplash.com/photo-1507934683624-770dc6548af4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    likes: 98,
    comments: [],
    shares: 2,
    timestamp: '2 weeks ago'
  }]);
  // Add state for saved posts with itemType
  const [savedPosts, setSavedPosts] = useState<Post[]>([{
    id: 1,
    user: {
      name: 'Alex Johnson',
      username: 'alexjourneys',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Bali, Indonesia',
    caption: 'Found this hidden beach today! The water was crystal clear and the local cuisine was amazing. Definitely recommend visiting during the off-season to avoid crowds. #TravelBali #HiddenGems',
    media: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    likes: 248,
    comments: [],
    shares: 3,
    timestamp: '3 hours ago',
    itemType: 'post',
    savedTimestamp: '2 hours ago'
  }, {
    id: 3,
    user: {
      name: 'Jamie Smith',
      username: 'wanderingjamie',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
    },
    location: 'Santorini, Greece',
    caption: 'Sunset in Santorini never disappoints. The white buildings against the blue sea create the perfect backdrop for an evening stroll.',
    media: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    likes: 843,
    comments: [],
    shares: 12,
    timestamp: '2 days ago',
    itemType: 'post',
    savedTimestamp: 'Yesterday'
  }]);
  // Add state for saved locations
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([{
    id: 201,
    name: 'Bali, Indonesia',
    description: 'A paradise island known for its beautiful beaches, volcanic mountains, and unique cultural experiences.',
    image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    country: 'Indonesia',
    type: 'beach',
    savedTimestamp: '3 days ago',
    itemType: 'location'
  }, {
    id: 202,
    name: 'Kyoto, Japan',
    description: 'Former capital of Japan known for classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    country: 'Japan',
    type: 'culture',
    savedTimestamp: '1 week ago',
    itemType: 'location'
  }, {
    id: 203,
    name: 'Swiss Alps',
    description: 'Breathtaking mountain range with world-class skiing, hiking trails, and picturesque villages.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    country: 'Switzerland',
    type: 'mountain',
    savedTimestamp: '2 weeks ago',
    itemType: 'location'
  }]);
  // Function to add a shared post
  const addSharedPost = (post: Post, caption: string) => {
    const newSharedPost: Post = {
      id: Date.now(),
      user: {
        name: 'Jane Doe',
        username: 'janedoe',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
      },
      location: 'New York, USA',
      caption: '',
      media: '',
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: 'Just now',
      isShared: true,
      sharedCaption: caption,
      sharedTimestamp: 'Just now',
      originalPost: {
        id: post.id,
        user: post.user,
        location: post.location,
        caption: post.caption,
        media: post.media,
        timestamp: post.timestamp
      }
    };
    // Add the new shared post to the beginning of the user's posts
    setUserPosts(prevPosts => [newSharedPost, ...prevPosts]);
    // Increment the share count of the original post
    incrementShareCount(post.id);
  };
  // Function to increment share count
  const incrementShareCount = (postId: number) => {
    // Update in all posts
    setAllPosts(prevPosts => prevPosts.map(post => post.id === postId ? {
      ...post,
      shares: (post.shares || 0) + 1
    } : post));
    // Also update in user posts if the post exists there
    setUserPosts(prevPosts => prevPosts.map(post => post.id === postId ? {
      ...post,
      shares: (post.shares || 0) + 1
    } : post));
  };
  // Function to get all posts (for feed)
  const getAllPosts = () => {
    return allPosts;
  };
  // Function to save a post
  const savePost = (post: Post) => {
    // Check if post is already saved
    if (!isSaved(post.id)) {
      const savedPost = {
        ...post,
        itemType: 'post' as const,
        savedTimestamp: 'Just now'
      };
      setSavedPosts(prevSavedPosts => [savedPost, ...prevSavedPosts]);
      window.showToast('Post saved', 'success');
    }
  };
  // Function to unsave a post
  const unsavePost = (postId: number) => {
    setSavedPosts(prevSavedPosts => prevSavedPosts.filter(post => post.id !== postId));
  };
  // Function to check if a post is saved
  const isSaved = (postId: number) => {
    return savedPosts.some(post => post.id === postId);
  };
  // Function to save a location
  const saveLocation = (location: SavedLocation) => {
    // Check if location is already saved
    if (!isLocationSaved(location.id)) {
      setSavedLocations(prevLocations => [location, ...prevLocations]);
      window.showToast('Location saved', 'success');
    }
  };
  // Function to unsave a location
  const unsaveLocation = (locationId: number) => {
    setSavedLocations(prevLocations => prevLocations.filter(location => location.id !== locationId));
  };
  // Function to check if a location is saved
  const isLocationSaved = (locationId: number) => {
    return savedLocations.some(location => location.id === locationId);
  };
  return <PostContext.Provider value={{
    userPosts,
    savedPosts,
    savedLocations,
    addSharedPost,
    incrementShareCount,
    getAllPosts,
    savePost,
    unsavePost,
    isSaved,
    saveLocation,
    unsaveLocation,
    isLocationSaved
  }}>
      {children}
    </PostContext.Provider>;
};