const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

const CommentsController = require("../controllers/comments");

router.post("/:postId/comment", tokenChecker, CommentsController.createComment);
router.get("/:postId/comments", tokenChecker, CommentsController.getCommentsByPost);
router.put("/:commentId/like", tokenChecker, CommentsController.toggleLike);

module.exports = router;
