import express from "express";
import "express-async-errors";
import * as userCtrl from "../controller/userController.js";

const router = express.Router();

router.post("/join", userCtrl.join);

router.post("/login", userCtrl.login);

export default router;
