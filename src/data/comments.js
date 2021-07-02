// To-do : 회원 데이터와 연결하기

let comments = [
  {
    id: "2",
    content: "댓글22222",
    createdAt: new Date().toString(),
    userId: "1",
    postId: "1",
  },
  {
    id: "1",
    content: "댓글11111",
    createdAt: new Date().toString(),
    userId: "1",
    postId: "1",
  },
];

export async function getById(commentId) {
  const comment = comments.find((comment) => comment.id === commentId);
  if (!comment) {
    return null;
  }
  return comment;
}

export async function create(content, userId, postId) {
  const newComment = {
    id: Date.now().toString(),
    content,
    createdAt: new Date().toString(),
    userId: "1",
    postId,
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
