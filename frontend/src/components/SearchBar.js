// src/components/SearchBar.js

import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setPosts }) => {
  const [query, setQuery] = useState('');
  
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get(`/posts/search?query=${query}`);
      setPosts(res.data);
    } catch (err) {
      console.error('Error searching posts:', err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
