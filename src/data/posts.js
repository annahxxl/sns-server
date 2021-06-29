let posts = [
  {
    id: "2",
    content: "지현이의 게시글",
    createdAt: Date().toString(),
    username: "aji",
    name: "Jihyeon",
    url: "",
  },
  {
    id: "1",
    content: "한나의 게시글",
    createdAt: Date().toString(),
    username: "annahxxl",
    name: "Hanna",
    url: "",
  },
];

export function getAll() {
  return posts;
}

export function getAllByUsername(username) {
  return posts.filter((post) => post.username === username);
}

export function getById(id) {
  return posts.find((post) => post.id === id);
}

export function create(content, username, name) {
  const newPost = {
    id: Date.now().toString(),
    content,
    createdAt: Date().toString(),
    username,
    name,
  };
  posts.unshift(newPost);
  return posts;
}

export function update(id, content) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.content = content;
  }
  return posts;
}

export function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
