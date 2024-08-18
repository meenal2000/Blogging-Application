import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPosts } from '../services/api';
import SearchBar from '../components/SearchBar';
import { navigate, useLocation } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    getPosts();
    // Reset search results when location changes, particularly when navigating to Home
    if (location.pathname === '/') {
      setSearchResults(null);
    }

  }, [location]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const displayedPosts = searchResults || posts;


  return (
    <div className="container">
      <SearchBar setPosts={handleSearch} /> {/* Add SearchBar component */}
      <div className="post-list">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div key={post._id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <a href={`/posts/${post._id}`}>Read more</a>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
