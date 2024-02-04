import { Router } from "express";
import express from "express";
import userRouter from "./User.routes.js";
import videoRouter from "./Video.routes.js";
import authRouter from "./Auth.routes.js";

const router = express.Router();

router.use("/video", videoRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
