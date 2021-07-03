import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as postCtrl from "../controller/postController.js";
import * as commentCtrl from "../controller/commentController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validatePost = [
  body("content")
    .trim()
    .isLength({ min: 20 })
    .withMessage("20글자 이상 입력해 주세요."),
  validate,
];

const validateComment = [
  body("content").trim().notEmpty().withMessage("내용을 입력해 주세요."),
  validate,
];

router
  .route("/")
  .get(isAuth, postCtrl.getPosts)
  .post(isAuth, validatePost, postCtrl.createPost);

router
  .route("/:id") // To-do : 정규표현식 추가하기
  .get(isAuth, postCtrl.getPost)
  .patch(isAuth, validatePost, postCtrl.updatePost)
  .delete(isAuth, postCtrl.deletePost);

// 댓글
router.post(
  "/:id/comments",
  isAuth,
  validateComment,
  commentCtrl.createComment
);
router
  .route("/:id/comments/:commentId")
  .patch(isAuth, validateComment, commentCtrl.updateComment)
  .delete(isAuth, commentCtrl.deleteComment);

export default router;
