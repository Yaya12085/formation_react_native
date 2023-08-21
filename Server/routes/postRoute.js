const express = require("express");
const {
  getPosts,
  addPost,
  updatePost,
  deletePost
} = require("../controllers/postController");
const { checkAuth } = require("../middleware");

const router = express.Router();

router.get("/", getPosts);
router.post("/add", checkAuth, addPost);
router.put("/:postId", checkAuth, updatePost);
router.delete("/:postId", checkAuth, deletePost);

module.exports = router;
