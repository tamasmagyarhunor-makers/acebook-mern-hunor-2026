import { useState } from "react";
import { createComment } from "../services/comments";

export default function CreateComment({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createComment(postId, content);
      setContent("");
      onCommentAdded(data.comment); // we send the new comment back to the list, 
      // so the CommentSection can quickly update the UI
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.commentForm}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>Send</button>
    </form>
  );
}

const styles = {
  commentForm: { display: 'flex', gap: '10px', marginTop: '10px' },
  input: { flex: 1, padding: '8px', borderRadius: '20px', border: '1px solid #ddd' },
  button: { padding: '5px 15px', borderRadius: '15px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }
};