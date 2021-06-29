import express from "express";
import "express-async-errors";
import * as postCtrl from "../controller/postController.js";

const router = express.Router();

router.route("/").get(postCtrl.getPosts).post(postCtrl.createPost);
router
  .route("/:id")
  .get(postCtrl.getPost)
  .put(postCtrl.updatePost)
  .delete(postCtrl.deletePost);

export default router;
