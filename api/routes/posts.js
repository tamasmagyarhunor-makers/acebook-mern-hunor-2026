const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", tokenChecker, PostsController.createPost);
router.get("/:id", PostsController.getPost);

module.exports = router;
