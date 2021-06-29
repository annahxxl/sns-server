import express from "express";
import "express-async-errors";

const router = express.Router();

// dummy-data
let posts = [
  {
    id: "2",
    content: "지현이의 게시글",
    createdAt: Date().toString(),
    username: "aji",
    name: "Jihyeon",
    url: "",
  },
  {
    id: "1",
    content: "한나의 게시글",
    createdAt: Date().toString(),
    username: "annahxxl",
    name: "Hanna",
    url: "",
  },
];

// GET /posts
// GET /posts?username=:username
router.get("/", (req, res, next) => {
  const { username } = req.query;
  const data = username
    ? posts.filter((post) => post.username === username)
    : posts;
  res.status(200).json(data);
});

// GET /posts/:id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const data = posts.find((post) => post.id === id);
  if (!data) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  res.status(200).json(data);
});

// POST /posts
router.post("/", (req, res, next) => {
  const { content, username, name } = req.body;
  const newPost = {
    id: Date.now().toString(),
    content,
    createdAt: Date().toString(),
    username,
    name,
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  const currPost = posts.find((post) => post.id === id);
  if (!currPost) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  currPost.content = content;
  res.status(200).json(currPost);
});

// DELETE /posts/:id
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.sendStatus(204);
});

export default router;
