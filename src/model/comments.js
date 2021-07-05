import { db } from "../db.js";
import sequelize from "sequelize";
import { User } from "./users.js";

const DataTypes = sequelize.DataTypes;
const Sequelize = sequelize.Sequelize;

const Comment = db.define("comment", {
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
Comment.belongsTo(User);

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

// 해당 게시글의 모든 댓글 가져오기
export async function getAllByPostId(postId) {
  return Comment.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { postId },
    },
  });
}

export async function getById(commentId) {
  return Comment.findOne({
    where: { id: commentId },
    ...INCLUDE_USER,
  });
}

export async function create(content, userId, postId) {
  return Comment.create({ content, userId, postId }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(commentId, content) {
  return Comment.findByPk(commentId, INCLUDE_USER) //
    .then((comment) => {
      comment.content = content;
      return comment.save();
    });
}

export async function remove(commentId) {
  return Comment.findByPk(commentId, INCLUDE_USER) //
    .then((comment) => {
      comment.destroy();
    });
}
