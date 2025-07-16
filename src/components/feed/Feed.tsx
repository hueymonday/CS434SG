import React from 'react';
import { Post } from './Post';
import { usePostContext } from '../context/PostContext';
interface FeedProps {
  currentUsername?: string;
}
export const Feed = ({
  currentUsername = 'janedoe'
}: FeedProps) => {
  const {
    getAllPosts
  } = usePostContext();
  const posts = getAllPosts();
  return <div className="space-y-6">
      {posts.map(post => <Post key={post.id} post={post} currentUsername={currentUsername} />)}
    </div>;
};