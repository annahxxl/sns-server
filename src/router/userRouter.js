import express from "express";
import "express-async-errors";
import * as userCtrl from "../controller/userController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/join", userCtrl.join);

router.post("/login", userCtrl.login);

router.get("/me", isAuth, userCtrl.me);

export default router;
