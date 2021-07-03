import * as userRepo from "./users.js";

let comments = [
  {
    id: "3",
    content: "첫번째 게시글의 댓글22222",
    createdAt: new Date().toString(),
    postId: "1",
    userId: "1",
  },
  {
    id: "2",
    content: "댓글22222",
    createdAt: new Date().toString(),
    postId: "2",
    userId: "1",
  },
  {
    id: "1",
    content: "댓글11111",
    createdAt: new Date().toString(),
    postId: "1",
    userId: "1",
  },
];

export async function getById(commentId) {
  const comment = comments.find((comment) => comment.id === commentId);
  const { username, name, url } = await userRepo.findById(comment.userId);
  return {
    ...comment,
    username,
    name,
    url,
  };
}

// 해당 게시글의 모든 댓글 가져오기
export async function getAllByPostId(postId) {
  let foundComments = comments.filter((comment) => comment.postId === postId);
  return Promise.all(
    foundComments.map(async (comment) => await getById(comment.id))
  );
}

export async function create(content, userId, postId) {
  const newComment = {
    id: Date.now().toString(),
    content,
    createdAt: new Date().toString(),
    postId,
    userId,
  };
  comments.unshift(newComment);
  return getById(newComment.id);
}

export async function update(commentId, content) {
  const comment = comments.find((comment) => comment.id === commentId);
  if (comment) {
    comment.content = content;
  }
  return getById(comment.id);
}

export async function remove(commentId) {
  comments = comments.filter((comment) => comment.id !== commentId);
}
