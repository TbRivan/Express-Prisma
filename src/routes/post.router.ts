import { Router } from "express";
import {
  addPost,
  deletePostById,
  getPostById,
  getPosts,
  updatePostPublished,
} from "../controller/post.controller";

export const PostRouter: Router = Router();

PostRouter.get("/feed", getPosts);
PostRouter.get("/:id", getPostById);
PostRouter.post("/", addPost);
PostRouter.put("/publish/:id", updatePostPublished);
PostRouter.delete("/:id", deletePostById);
