import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../services/posts";
import { useState, useEffect } from "react";

export function PostDetailPage() {
  const { postId } = useParams(); // I need this to get "123" from the url
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    getPost(postId, token)
      .then((data) => {
        setPost(data.post);

        if(data.token) localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate, postId]);

  return (
    <div className="post-detail">
      <h2>Post Details</h2>
      <p>Now viewing post ID: <strong>{postId}</strong></p>
      <div style={{ border: '1px solid #ddd', padding: '15px', marginTop: '10px' }}>
        <p>{post.message}</p>
      </div>
      <hr />
      <h4>Replies</h4>
      <ul>
        <li>UserA: Totally agree!</li>
        <li>UserB: Have you tried TanStack Router?</li>
      </ul>
    </div>
  );
}