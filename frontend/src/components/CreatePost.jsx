// src/components/CreatePost.jsx
import { useState } from "react";
import { createPost } from "../services/posts";

export default function CreatePost({ onPostCreated }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const data = await createPost(message, token);
      if (data.token) localStorage.setItem("token", data.token);
      
      setMessage(""); // i need to clear the inputs state(form)
      onPostCreated(); // this is the fetchPosts function passed into this component from the Feed. 
      // so when we call it, it runs the fetchPosts on the Feed and rerenders the posts and see the post we just added
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        placeholder="What's on your mind?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>Post</button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '60px' },
  button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};