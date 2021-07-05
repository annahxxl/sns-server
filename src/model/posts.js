import { db } from "../db.js";
import { getAllByPostId } from "./comments.js";
import sequelize from "sequelize";
import { User } from "./users.js";

const DataTypes = sequelize.DataTypes;
const Sequelize = sequelize.Sequelize;

const Post = db.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// 관계 설정
Post.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    "id",
    "content",
    "createdAt",
    "userId",
    [Sequelize.col("user.username"), "username"],
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.url"), "url"],
  ],
  include: {
    model: User,
    attributes: [],
  },
};
const ORDER_DESC = { order: [["createdAt", "DESC"]] };

export async function getAll() {
  return Post.findAll({ ...INCLUDE_USER, ...ORDER_DESC });

  // return db
  //   .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
  //   .then((result) => {
  //     const posts = result[0];
  //     return Promise.all(
  //       posts.map(async (post) => {
  //         const comments = await getAllByPostId(post.id);
  //         return { ...post, comments };
  //       })
  //     );
  //   });
}

export async function getAllByUsername(username) {
  return Post.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });

  // return db
  //   .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
  //   .then((result) => {
  //     const posts = result[0];
  //     return Promise.all(
  //       posts.map(async (post) => {
  //         const comments = await getAllByPostId(post.id);
  //         return { ...post, comments };
  //       })
  //     );
  //   });
}

export async function getById(id) {
  return Post.findOne({
    where: { id },
    ...INCLUDE_USER,
  });

  // return db
  //   .execute(`${SELECT_JOIN} WHERE posts.id=?`, [id]) //
  //   .then(async (result) => {
  //     const comments = await getAllByPostId(id);
  //     return { ...result[0][0], comments };
  //   });
}

export async function create(content, userId) {
  return Post.create({ content, userId }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(id, content) {
  return Post.findByPk(id, INCLUDE_USER) //
    .then((post) => {
      post.content = content;
      return post.save();
    });
}

export async function remove(id) {
  return Post.findByPk(id, INCLUDE_USER) //
    .then((post) => {
      post.destroy();
    });
}
