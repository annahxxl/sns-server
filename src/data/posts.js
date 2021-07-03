import * as userRepo from "./users.js";
import * as commentRepo from "./comments.js";

let posts = [
  {
    id: "2",
    content: "두번째 게시글",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "1",
    content: "한나의 첫번째 게시글",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

export async function getAll() {
  return Promise.all(
    posts.map(async (post) => {
      const { username, name, url } = await userRepo.findById(post.userId);
      const comments = await commentRepo.getAllByPostId(post.id);
      return { ...post, username, name, url, comments };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((posts) => {
    return posts.filter((post) => post.username === username);
  });
}

export async function getById(id) {
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return null;
  }
  const comments = await commentRepo.getAllByPostId(post.id);
  const { username, name, url } = await userRepo.findById(post.userId);
  return { ...post, username, name, url, comments };
}

export async function create(content, userId) {
  const newPost = {
    id: Date.now().toString(),
    content,
    createdAt: new Date().toString(),
    userId,
  };
  posts.unshift(newPost);
  return getById(newPost.id);
}

export async function update(id, content) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.content = content;
  }
  return getById(post.id);
}

export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
