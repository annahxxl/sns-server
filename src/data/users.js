// let users = [
//   {
//     id: "1",
//     username: "annahxxl",
//     password: "$2b$10$oeh4ZSJJkHJDXp56zlLHKOL/yVYilPBc2.zUcT5b5/2g.Ox5hqDem",
//     name: "Hanna",
//     email: "8annahxxl@gmail.com",
//     url: "",
//   },
// ];

import { db } from "../db.js";

export async function findByUsername(username) {
  return db
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute("SELECT * FROM users WHERE id=?", [id])
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
      [username, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}
