import React, { useState, useEffect } from 'react';
import { fetchComments, addComment } from '../services/api';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetchComments(postId);
        const fetchedComments = Array.isArray(res.data) ? res.data : [res.data];
        setComments(fetchedComments);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    getComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    // Capture the comment before sending the request
    const commentContent = newComment;

    // Clear the input field immediately after capturing the current value
    setNewComment(''); 

    try {
      const res = await addComment(postId, { content: commentContent });

      // Ensure that the response data is an array and then update the comments state
      const updatedComments = Array.isArray(res.data) ? res.data : [res.data];
      setComments(updatedComments);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          rows="4"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))
        ) : (
          <li>No comments yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Comments;
