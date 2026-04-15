import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { togglePostLike } from "../services/posts"

const Post = ({ post, onPostUpdated }) => {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("user_id");

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await togglePostLike(post._id, token);

      if (data.token) localStorage.setItem("token", data.token);

      if (onPostUpdated) onPostUpdated(data.post);
    } catch (error) {
      console.error("Failed to toggle like ", error);
    }
  }

  return (
    <div 
      onClick={() => navigate(`/posts/${post._id}`)} 
      style={styles.postCard}
    >
      <p style={styles.author}>@{post.author.email || 'user'}</p>
      <p>{post.message}</p>
      
      <LikeButton 
        likes={post.likes}
        currentUserId={currentUserId}
        onToggle={handleLike}
      />
    </div>
  );
};

const styles = {
  postCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    cursor: 'pointer',
    backgroundColor: '#fff',
    transition: 'background 0.2s'
  },
  author: { fontWeight: 'bold', marginBottom: '5px', color: '#555' }
};

export default Post;