//initialising dependencies
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");

// @route: POST /Post
// @desc:add a post
// @acess:Protected
router.post(
  "/",
  [authenticate, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user).select("-password");
      const newPost = new Post({
        user: req.user,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

// @route: GET /post
// @desc:get all posts date wise
// @acess:Protected
router.get("/", authenticate, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route: GET /post/:pid
// @desc:get posts by id
// @acess:Protected
router.get("/:pid", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).json({ msg: "server error" });
  }
});

// @route: DELETE /post/:pid
// @desc:delete a post of current user
// @acess:Protected
router.delete("/:pid", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (String(post.user) !== req.user)
      return res.status(401).json({ msg: "unauthorized" });
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).json({ msg: "server error" });
  }
});

// @route: Put /likes/:pid
// @desc:liking a post
// @acess:Protected
router.put("/likes/:pid", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    //check if liked already
    if (post.likes.filter((like) => String(like.user) === req.user).length > 0)
      return res.status(400).json({ msg: "already liked" });
    post.likes.unshift({ user: req.user });
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).json({ msg: "server error" });
  }
});

// @route: Put /unlike/:pid
// @desc:unliking a post
// @acess:Protected
router.put("/unlike/:pid", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    //check if not liked
    if (
      post.likes.filter((like) => String(like.user) === req.user).length === 0
    )
      return res.status(400).json({ msg: "You didnt liked the post yet" });
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user)
    );
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).json({ msg: "server error" });
  }
});

// @route: POST /post/comment/:pid
// @desc:add a comment on a post
// @acess:Protected
router.put(
  "/comment/:pid",
  [authenticate, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user).select("-password");
      const post = await Post.findById(req.params.pid);
      const comment = {
        user: req.user,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(comment);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);
// @route: DELETE /post/comment/:pid/:cid
// @desc:delete a post of current user
// @acess:Protected
router.delete("/comment/:pid/:cid", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    const comment = post.comments.find(
      (comment) => comment.id === req.params.cid
    );
    //comment exist or not
    if (!comment) return res.status(404).json({ msg: "comment not found" });
    if (comment.user.toString() !== req.user)
      return res.status(401).json({ msg: "unauthorized" });
    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user)
    );
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post or comment not found" });
    res.status(500).json({ msg: "server error" });
  }
});
module.exports = router;
