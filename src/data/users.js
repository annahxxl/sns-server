let users = [
  {
    id: "1",
    username: "annahxxl",
    password: "$2b$10$oeh4ZSJJkHJDXp56zlLHKOL/yVYilPBc2.zUcT5b5/2g.Ox5hqDem",
    name: "Hanna",
    email: "8annahxxl@gmail.com",
    url: "",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const createdUser = {
    id: Date.now().toString(),
    ...user,
  };
  users.push(createdUser);
  return createdUser.id;
}
