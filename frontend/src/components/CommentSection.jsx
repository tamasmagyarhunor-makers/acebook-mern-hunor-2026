import { useState, useEffect } from "react";
import { getComments } from "../services/comments";
import CreateComment from "./CreateComment";
import LikeButton from "./LikeButton";
import { toggleCommentLike } from "../services/comments";

const CommentSection = ({ postId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);

  const currentUserId = localStorage.getItem("user_id");

  useEffect(() => {
    getComments(postId).then((data) => setComments(data.comments));
  }, [postId]);

  const handleLocalCommentUpdate = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
    
    if (onCommentAdded) onCommentAdded();
  };

  const handleLike = async (commentId) => {
    try {
      const data = await toggleCommentLike(commentId);

      setComments((prev) =>
        prev.map((comment) => comment._id === commentId ? data.comment : comment)
      );
    } catch(error) {
      console.error("Failed to toggle like ", error);
    }
  };

  return (
    <div className="comment-section" style={styles.container}>
      <CreateComment 
        postId={postId} 
        onCommentAdded={handleLocalCommentUpdate} 
      />

      <div style={styles.list}>
        {comments.map((comment) => (
          <div key={comment._id} style={{ ...styles.commentItem, borderBottom: '1px solid #f9f9f9', paddingBottom: '8px' }}>
            <p style={{ margin: '0 0 5px 0' }}>{comment.content}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <LikeButton 
                likes={comment.likes}
                currentUserId={currentUserId}
                onToggle={() => handleLike(comment._id)}
              />
              
              <span style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
                — {comment.author?.email || "user"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { marginLeft: '20px', borderLeft: '2px solid #eee', paddingLeft: '10px' },
  list: { marginTop: '15px' },
  commentItem: { fontSize: '0.9rem', marginTop: '10px', color: '#444' }
};

export default CommentSection;