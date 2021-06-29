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

export async function getAll() {
  return posts;
}

export async function getAllByUsername(username) {
  return posts.filter((post) => post.username === username);
}

export async function getById(id) {
  return posts.find((post) => post.id === id);
}

export async function create(content, username, name) {
  const newPost = {
    id: Date.now().toString(),
    content,
    createdAt: Date().toString(),
    username,
    name,
  };
  posts.unshift(newPost);
  return newPost;
}

export async function update(id, content) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.content = content;
  }
  return post;
}

export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
