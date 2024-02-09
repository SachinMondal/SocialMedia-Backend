const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/authMiddlewares.js");

const postController = require("../Controller/postController.js");


// crete post
router.post("/create-post", userAuth, postController.createPost);
// get posts
router.post("/", userAuth, postController.getPosts);
router.post("/:id", userAuth, postController.getPost);

router.post("/get-user-post/:id", userAuth, postController.getUserPost);

// get comments
router.get("/comments/:postId", postController.getComments);

//like and comment on posts
router.post("/like/:id", userAuth, postController.likePost);
router.post("/like-comment/:id/:rid?", userAuth, postController.likePostComment);
router.post("/comment/:id", userAuth, postController.commentPost);
router.post("/reply-comment/:id", userAuth, postController.replyPostComment);

//delete post
router.delete("/:id", userAuth, postController.deletePost);

module.exports = router;