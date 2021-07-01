import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as userCtrl from "../controller/userController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateLogin = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("아이디는 3자 이상이어야 합니다."),
  body("password").trim().notEmpty().withMessage("비밀번호를 입력해 주세요."),
  validate,
];

const validateJoin = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("이름을 입력해 주세요."),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 형식이 올바르지 않습니다."),
  body("url")
    .isURL()
    .withMessage("유효하지 않은 URL입니다.")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post("/join", validateJoin, userCtrl.join);

router.post("/login", validateLogin, userCtrl.login);

router.get("/me", isAuth, userCtrl.me);

export default router;
