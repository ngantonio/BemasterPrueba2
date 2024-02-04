import express from "express";
import { userUpdateValidation } from "../validators/user.js";

import { authorizeJWT } from "../controllers/Auth.controller.js";

import {
  getUserByUsername,
  getUserById,
  modifyUser,
  deleteUser,
} from "../controllers/User.controller.js";

const userRouter = express.Router();

/************************** USER ROUTES ********************************/
userRouter.get("/:id", authorizeJWT, getUserById);
userRouter.get("/username/:username", authorizeJWT, getUserByUsername);
userRouter.patch("/", authorizeJWT, userUpdateValidation, modifyUser);
userRouter.delete("/", authorizeJWT, userUpdateValidation, deleteUser);

/************************** END USER ROUTES ********************************/

export default userRouter;
