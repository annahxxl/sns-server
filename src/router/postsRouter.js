import express from "express";
import "express-async-errors";
import * as postRepo from "../data/posts.js";

const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get("/", (req, res, next) => {
  const { username } = req.query;
  const posts = username
    ? postRepo.getAllByUsername(username)
    : postRepo.getAll();
  res.status(200).json(posts);
});

// GET /posts/:id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const posts = postRepo.getById(id);
  if (!posts) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  res.status(200).json(posts);
});

// POST /posts
router.post("/", (req, res, next) => {
  const { content, username, name } = req.body;
  const newPost = postRepo.create(content, username, name);
  res.status(201).json(newPost);
});

// PUT /posts/:id
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = postRepo.update(id, content);
  if (!post) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  res.status(200).json(post);
});

// DELETE /posts/:id
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  postRepo.remove(id);
  res.sendStatus(204);
});

export default router;
