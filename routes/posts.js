import { Router } from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js"
const router = Router();

//Get all posts
router.get("/", getPosts);

//Get single post
router.get("/:id", getPost);

//Create new post
router.post("/", createPost);

//Update Post
router.put("/:id", updatePost);

//Delete Post
router.delete("/:id", deletePost);

export default router;
