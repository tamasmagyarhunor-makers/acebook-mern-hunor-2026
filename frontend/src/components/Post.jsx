import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/posts/${post._id}`)} 
      style={styles.postCard}
    >
      <p style={styles.author}>@{post.author || 'user'}</p>
      <p>{post.message}</p>
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