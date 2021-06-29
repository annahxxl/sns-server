import * as postRepo from "../data/posts.js";

export function getPosts(req, res) {
  const { username } = req.query;
  const posts = username
    ? postRepo.getAllByUsername(username)
    : postRepo.getAll();
  res.status(200).json(posts);
}

export function getPost(req, res) {
  const { id } = req.params;
  const posts = postRepo.getById(id);
  if (!posts) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  res.status(200).json(posts);
}

export function createPost(req, res) {
  const { content, username, name } = req.body;
  const newPost = postRepo.create(content, username, name);
  res.status(201).json(newPost);
}

export function updatePost(req, res) {
  const { id } = req.params;
  const { content } = req.body;
  const post = postRepo.update(id, content);
  if (!post) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  res.status(200).json(post);
}

export function deletePost(req, res) {
  const { id } = req.params;
  postRepo.remove(id);
  res.sendStatus(204);
}
