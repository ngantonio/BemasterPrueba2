import express from "express";
import { getTopGoogleRepos, oddNumbers } from "./controllers/repositories.js";
import {
  userRegisterValidation,
  userUpdateValidation,
  userLoginValidation,
} from "./validators/user.js";
import {
  videoRegisterValidation,
  videoUpdateValidation,
  videoIdValidation,
  colaboratorVideoValidation,
} from "./validators/video.js";
import { commentRegisterValidation } from "./validators/comment.js";

import {
  register,
  login,
  authorizeJWT,
  authorizeVideosJWT,
} from "./controllers/Auth.controller.js";

import {
  getUserByUsername,
  getUserById,
  modifyUser,
  deleteUser,
} from "./controllers/User.controller.js";

import {
  createVideo,
  getVideoById,
  getTop10,
  getVideosByUserId,
  likeVideo,
  dislikeVideo,
  commentVideo,
  updateVideo,
  deleteVideo,
  addColaborator,
} from "./controllers/Video.controller.js";

const router = express.Router();

router.get("/top", getTopGoogleRepos);
router.get("/odds", oddNumbers);

/************************** AUTH ROUTES ********************************/
router.post("/auth/login", userLoginValidation, login);
router.post("/auth/register", userRegisterValidation, register);

/************************** END AUTH ROUTES ********************************/

/************************** USER ROUTES ********************************/
router.get("/user/:id", authorizeJWT, getUserById);
router.get("/user/username/:username", authorizeJWT, getUserByUsername);
router.patch("/user", authorizeJWT, userUpdateValidation, modifyUser);
router.delete("/user", authorizeJWT, userUpdateValidation, deleteUser);

/************************** END USER ROUTES ********************************/

/************************** VIDEO ROUTES ********************************/

router.get("/video/top", authorizeVideosJWT, getTop10);
router.get("/video/:id", authorizeVideosJWT, getVideoById);

router.get("/video/getVideosByUser/:id", authorizeJWT, getVideosByUserId);

router.post("/video", authorizeJWT, videoRegisterValidation, createVideo);
router.post("/video/addLike", videoIdValidation, likeVideo);
router.post("/video/addDislike", authorizeJWT, videoIdValidation, dislikeVideo);
router.post("/video/addComment", commentRegisterValidation, commentVideo);
router.post(
  "/video/addColaborator",
  authorizeJWT,
  colaboratorVideoValidation,
  addColaborator,
);

router.patch("/video", authorizeJWT, videoUpdateValidation, updateVideo);
router.delete("/video", authorizeJWT, videoIdValidation, deleteVideo);

/************************** END VIDEO ROUTES ********************************/

export default router;
