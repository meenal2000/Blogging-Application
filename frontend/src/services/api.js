import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
// Add a comment to a post
export const addComment = (postId, comment) => API.post(`/posts/${postId}/comments`, comment);

// Fetch all comments for a post
export const fetchComments = (postId) => API.get(`/posts/${postId}/comments`);