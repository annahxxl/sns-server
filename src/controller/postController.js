import * as postRepo from "../data/posts.js";

export async function getPosts(req, res) {
  const { username } = req.query;
  const posts = await (username
    ? postRepo.getAllByUsername(username)
    : postRepo.getAll());
  res.status(200).json(posts);
}

export async function getPost(req, res) {
  const { id } = req.params;
  const posts = await postRepo.getById(id);
  if (!posts) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  res.status(200).json(posts);
}

export async function createPost(req, res) {
  const { content, username, name } = req.body;
  const newPost = await postRepo.create(content, username, name);
  res.status(201).json(newPost);
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { content } = req.body;
  const post = await postRepo.update(id, content);
  if (!post) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  res.status(200).json(post);
}

export async function deletePost(req, res) {
  const { id } = req.params;
  await postRepo.remove(id);
  res.sendStatus(204);
}
