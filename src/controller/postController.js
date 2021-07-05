import * as postRepo from "../model/posts.js";

// To-do : GET요청 댓글 같이 불러오도록 수정하기

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
  const { content } = req.body;
  const newPost = await postRepo.create(content, req.userId);
  res.status(201).json(newPost);
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { content } = req.body;
  const post = await postRepo.getById(id);
  if (!post) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  if (post.userId !== req.userId) {
    return res.status(403).json({ msg: "권한이 없습니다." });
  }
  const updatedPost = await postRepo.update(id, content);
  res.status(200).json(updatedPost);
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const post = await postRepo.getById(id);
  if (!post) {
    return res.status(404).json({ msg: "존재하지 않는 게시글입니다." });
  }
  if (post.userId !== req.userId) {
    return res.status(403).json({ msg: "권한이 없습니다." });
  }
  await postRepo.remove(id);
  res.sendStatus(204);
}
