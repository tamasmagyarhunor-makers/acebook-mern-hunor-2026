import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { togglePostLike } from "../services/posts"

const Post = ({ post, onPostUpdated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showComments, setShowComments] = useState(false);

  const currentUserId = localStorage.getItem("user_id");

  const isDetailPage = location.pathname.includes(`/posts/${post._id}`);

  const handleLike = async () => {
    try {
      const data = await togglePostLike(post._id);

      if (onPostUpdated) onPostUpdated(data.post);
    } catch (error) {
      console.error("Failed to toggle like ", error);
    }
  }

  const handleNewCommentFlow = () => {
    const updatedPost = {
      ...post,
      comments: [...post.comments, "temp-id"]
    };

    onPostUpdated(updatedPost);
  }

  const handleCardClick = () => {
    if (!isDetailPage) {
      navigate(`/posts/${post._id}`);
    }
  }

  return (
    <div style={styles.postCard}>
      <div
        onClick={handleCardClick}
        style={{ cursor: isDetailPage ? 'default' : 'pointer', marginBottom: '15px' }}
      >
        <p style={{ fontSize: '1.1rem', margin: 0 }}>{post.message}</p>
      </div>

      <div style={styles.actionRow}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <LikeButton
            likes={post.likes}
            currentUserId={currentUserId}
            onToggle={handleLike}
          />
          <button
            style={styles.commentBtn}
            onClick={() => setShowComments(!showComments)}
          >
            <span>💬</span> {post.comments?.length || 0} Comments
          </button>
        </div>

        <p style={styles.author}>
          @{post.author?.email ? post.author.email.split('@')[0] : 'user'}
        </p>
      </div>

      {showComments && (
        <CommentSection
          postId={post._id}
          onCommentAdded={handleNewCommentFlow}
        />
      )}
    </div>
  );
};

const styles = {
  postCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '12px 15px',
    margin: '10px 0',
    backgroundColor: '#fff',
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px'
  },
  commentBtn: {
    backgroundColor: '#f0f2f5',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    height: '32px'
  },
  author: {
    fontWeight: 'bold',
    color: '#65676b',
    fontSize: '14px'
  }
};

export default Post;