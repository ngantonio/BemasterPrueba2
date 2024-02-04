import express from "express";
import {
  userRegisterValidation,
  userLoginValidation,
} from "../validators/user.js";

import { register, login } from "../controllers/Auth.controller.js";

const authRouter = express.Router();

/************************** AUTH ROUTES ********************************/
authRouter.post("/login", userLoginValidation, login);
authRouter.post("/register", userRegisterValidation, register);

/************************** END AUTH ROUTES ********************************/

export default authRouter;
