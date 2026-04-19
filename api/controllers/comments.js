const Comment = require("../models/comment");
const Post = require("../models/post");

async function getCommentsByPost(req, res) {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
            .populate("author", "email")
            .sort({ createdAt: -1 });

        res.status(200).json({ comments: comments })
    } catch(error) {
        console.log(error);
    }
}

async function createComment(req, res) {
    try {
        const newComment = new Comment({
            content: req.body.content,
            author: req.user_id,
            postId: req.params.postId
        });

        await newComment.save();

        await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: newComment._id } });

        await newComment.populate("author", "email");

        res.status(201).json({message: "Comment created", comment: newComment });
    } catch(error) {
        console.log(error);
    }
}

async function toggleLike(req, res) {
    const commentId = req.params.commentId;
    const userId = req.user_id;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            res.status(404).json({message: "Comment not found!"});
        }

        const isLiked = comment.likes.includes(userId);
        const update = isLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } };

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            update,
            { new: true }
        ).populate("author", "email");

        res.status(200).json({ comment: updatedComment });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internet server error" });
    }
}

const CommentsController = {
    getCommentsByPost: getCommentsByPost,
    createComment: createComment,
    toggleLike: toggleLike
};

module.exports = CommentsController;