import * as commentRepo from "../model/comments.js";

export async function createComment(req, res) {
  const { id } = req.params;
  const { content } = req.body;
  const newComment = await commentRepo.create(content, req.userId, id);
  res.status(201).json(newComment);
}

export async function updateComment(req, res) {
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = await commentRepo.getById(commentId);
  if (!comment) {
    return res.status(404).json({ msg: "존재하지 않는 댓글입니다." });
  }
  if (comment.userId !== req.userId) {
    return res.status(403).json({ msg: "권한이 없습니다." });
  }
  const updatedComment = await commentRepo.update(commentId, content);
  res.status(200).json(updatedComment);
}

export async function deleteComment(req, res) {
  const { commentId } = req.params;
  const comment = await commentRepo.getById(commentId);
  if (!comment) {
    return res.status(404).json({ msg: "존재하지 않는 댓글입니다." });
  }
  if (comment.userId !== req.userId) {
    return res.status(403).json({ msg: "권한이 없습니다." });
  }
  await commentRepo.remove(commentId);
  res.sendStatus(204);
}
