import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    getPosts(token)
      .then((data) => {
        setPosts(data.posts);
        if (data.token) localStorage.setItem("token", data.token);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) => 
      prevPosts.map((p) => (String(p._id) === String(updatedPost._id) ? updatedPost : p))
    );
    console.log(posts);
  };

  // Run on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <h2>Feed</h2>
      {/* we pass down the fetchPosts so that it can be called once a new post is added and so this 
      component can be re-rendered */}
      <CreatePost onPostCreated={fetchPosts} />
      
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} onPostUpdated={handlePostUpdate}/>
        ))}
      </div>
    </>
  );
}