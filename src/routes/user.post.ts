import { Router } from "express";
import { addUser, getUsers } from "../controller/user.controller";

export const UserRouter: Router = Router();

UserRouter.get("/", getUsers);
UserRouter.post("/", addUser);
