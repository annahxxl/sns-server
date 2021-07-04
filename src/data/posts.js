import * as userRepo from "./users.js";
import * as commentRepo from "./comments.js";
import { db } from "../db.js";

// let posts = [
//   {
//     id: "2",
//     content: "두번째 게시글",
//     createdAt: new Date().toString(),
//     userId: "1",
//   },
//   {
//     id: "1",
//     content: "한나의 첫번째 게시글",
//     createdAt: new Date().toString(),
//     userId: "1",
//   },
// ];

const SELECT_JOIN =
  "SELECT posts.id, posts.content, posts.createdAt, posts.userId, users.username, users.name, users.url FROM posts JOIN users ON posts.userId=users.id";
const ORDER_DESC = "ORDER BY posts.createdAt DESC";

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE posts.id=?`, [id]) //
    .then((result) => result[0][0]);
}

export async function create(content, userId) {
  return db
    .execute("INSERT INTO posts (content, createdAt, userId) VALUES(?,?,?)", [
      content,
      new Date(),
      userId,
    ]) //
    .then((result) => getById(result[0].insertId));
}

export async function update(id, content) {
  return db
    .execute("UPDATE posts SET content=? WHERE id=?", [content, id]) //
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute("DELETE FROM posts WHERE id=?", [id]);
}
