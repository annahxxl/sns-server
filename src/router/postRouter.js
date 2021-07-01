import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as postCtrl from "../controller/postController.js";

const router = express.Router();

const validatePost = [
  body("content")
    .trim()
    .isLength({ min: 20 })
    .withMessage("20글자 이상 입력해 주세요."),
  validate,
];

router
  .route("/")
  .get(postCtrl.getPosts)
  .post(validatePost, postCtrl.createPost);

router
  .route("/:id") // To-do : 정규표현식 추가하기
  .get(postCtrl.getPost)
  .patch(validatePost, postCtrl.updatePost)
  .delete(postCtrl.deletePost);

export default router;
