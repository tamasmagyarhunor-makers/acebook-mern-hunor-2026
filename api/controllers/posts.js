const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}

async function createPost(req, res) {
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    const token = generateToken(req.user_id);
  
    res.status(200).json({post: post, token: token});
  } catch(error) {
    console.log(error);
  }
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getPost: getPost,
};

module.exports = PostsController;
