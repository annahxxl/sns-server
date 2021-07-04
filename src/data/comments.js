import { db } from "../db.js";

// let comments = [
//   {
//     id: "3",
//     content: "첫번째 게시글의 댓글22222",
//     createdAt: new Date().toString(),
//     postId: "1",
//     userId: "1",
//   },
//   {
//     id: "2",
//     content: "댓글22222",
//     createdAt: new Date().toString(),
//     postId: "2",
//     userId: "1",
//   },
//   {
//     id: "1",
//     content: "댓글11111",
//     createdAt: new Date().toString(),
//     postId: "1",
//     userId: "1",
//   },
// ];

const SELECT_JOIN =
  "SELECT comments.id, comments.content, comments.createdAt, comments.postId, comments.userId, users.username, users.name, users.url FROM comments JOIN users ON comments.userId=users.id";

// 해당 게시글의 모든 댓글 가져오기
export async function getAllByPostId(postId) {
  return db
    .execute(`${SELECT_JOIN} WHERE postId=? ${ORDER_DESC}`, [postId]) //
    .then((result) => result[0]);
}

export async function getById(commentId) {
  return db
    .execute(
      `${SELECT_JOIN} WHERE comments.id=? ORDER BY comments.createdAt DESC`,
      [commentId]
    ) //
    .then((result) => result[0][0]);
}

export async function create(content, userId, postId) {
  return db
    .execute(
      "INSERT INTO comments (content, createdAt, postId, userId) VALUES(?,?,?,?)",
      [content, new Date(), postId, userId]
    ) //
    .then((result) => getById(result[0].insertId));
}

export async function update(commentId, content) {
  return db
    .execute("UPDATE comments SET content=? WHERE id=?", [content, commentId]) //
    .then(() => getById(commentId));
}

export async function remove(commentId) {
  return db.execute("DELETE FROM comments WHERE id=?", [commentId]);
}
