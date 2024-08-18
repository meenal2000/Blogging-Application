import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, deletePost, addComment, fetchComments } from '../services/api'; // Ensure addComment and fetchComments are defined
import { useNavigate } from 'react-router-dom';
import Comments from '../components/Comments'; // Import the Comments component

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    };

    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment(id, { content: newComment });
      setNewComment(''); // Clear the comment input
      const { data } = await fetchPost(id); // Refresh post data to include new comment
      setPost(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <button className="button" onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
        <button className="button button-secondary" onClick={handleDelete}>Delete</button>

        {/* Comment form */}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            rows="4"
            required
          />
          <button type="submit" className="button">Submit Comment</button>
        </form>

        {/* Display comments */}
        <Comments postId={id} />
      </div>
    </div>
  );
};

export default PostDetail;
