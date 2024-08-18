import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, fetchPost, updatePost } from '../services/api';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        try {
          const { data } = await fetchPost(id);
          setTitle(data.title);
          setContent(data.content);
        } catch (err) {
          console.error(err);
        }
      };

      getPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content };

    try {
      if (id) {
        await updatePost(id, post);
      } else {
        await createPost(post);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default PostForm;
