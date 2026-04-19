import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = useCallback(() => {

    getPosts()
      .then((data) => {
        setPosts(data.posts);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) => 
      prevPosts.map((p) => (String(p._id) === String(updatedPost._id) ? updatedPost : p))
    );
  };

  const handleAddNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }

  // Run on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <h2>Feed</h2>
      {/* we pass down the handleAddNewPost so that it can be called once a new post is added,
      so the posts state can get the new, created post */}
      <CreatePost onPostCreated={handleAddNewPost} />
      
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} onPostUpdated={handlePostUpdate}/>
        ))}
      </div>
    </>
  );
}