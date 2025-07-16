import React, { useState } from 'react';
import { ImageIcon, MapPinIcon, HashIcon, GlobeIcon, LockIcon } from 'lucide-react';
export const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the post to an API
    alert('Post created successfully!');
  };
  return <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title (optional)
            </label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" placeholder="Add a title to your post" />
          </div>
          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" placeholder="Share your travel experience..." required />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Photo/Video
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              {imagePreview ? <div className="relative w-full">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                  <button type="button" className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md" onClick={() => setImagePreview(null)}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div> : <>
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-gray-400">
                    JPG, PNG, GIF up to 10MB
                  </p>
                  <input type="file" className="hidden" id="image-upload" accept="image/*" onChange={handleImageChange} />
                  <label htmlFor="image-upload" className="mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Select File
                  </label>
                </>}
            </div>
          </div>
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" placeholder="Where was this photo taken?" />
              <MapPinIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Tag your location to help others discover your post
            </p>
          </div>
          {/* Hashtags */}
          <div>
            <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 mb-1">
              Hashtags
            </label>
            <div className="relative">
              <input type="text" id="hashtags" value={hashtags} onChange={e => setHashtags(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent" placeholder="Add hashtags (e.g. #travel #beach #adventure)" />
              <HashIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="visibility" checked={visibility === 'public'} onChange={() => setVisibility('public')} className="h-4 w-4 text-[#0077B6] focus:ring-[#0077B6] border-gray-300" />
                <div className="ml-3 flex items-center">
                  <GlobeIcon className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Public</p>
                    <p className="text-xs text-gray-500">
                      Anyone can see this post
                    </p>
                  </div>
                </div>
              </label>
              <label className="flex items-center">
                <input type="radio" name="visibility" checked={visibility === 'private'} onChange={() => setVisibility('private')} className="h-4 w-4 text-[#0077B6] focus:ring-[#0077B6] border-gray-300" />
                <div className="ml-3 flex items-center">
                  <LockIcon className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Private</p>
                    <p className="text-xs text-gray-500">
                      Only you can see this post
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 py-3 bg-[#0077B6] text-white rounded-lg font-medium hover:bg-[#00B4D8] transition-colors">
              Publish Post
            </button>
            <button type="button" className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>;
};