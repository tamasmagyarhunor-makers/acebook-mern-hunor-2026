const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find()
    .populate("author", "email")
    .sort({ createdAt: -1});
  
  res.status(200).json({ posts: posts });
}

async function createPost(req, res) {
  const post = new Post({
    message: req.body.message,
    author: req.user_id
  });
  post.save();

  res.status(201).json({ message: "Post created" });
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "email");
  
    res.status(200).json({ post: post });
  } catch(error) {
    console.log(error);
  }
}

async function toggleLike(req, res) {
  const postId = req.params.postId;
  const userId = req.user_id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({message: "Post not found!"});
    }

    const isLiked = post.likes.includes(userId); // see if this is adding a like or unliking
    const update = isLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId }};

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    ).populate("author", "email");

    res.status(200).json({ post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getPost: getPost,
  toggleLike: toggleLike
};

module.exports = PostsController;
