import express from "express";

import {
  videoRegisterValidation,
  videoUpdateValidation,
  videoIdValidation,
  colaboratorVideoValidation,
} from "../validators/video.js";

import { commentRegisterValidation } from "../validators/comment.js";

import {
  authorizeVideosJWT,
  authorizeJWT,
} from "../controllers/Auth.controller.js";

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
} from "../controllers/Video.controller.js";

const videoRouter = express.Router();

/************************** VIDEO ROUTES ********************************/

videoRouter.get("/top", authorizeVideosJWT, getTop10);
videoRouter.get("/:id", authorizeVideosJWT, getVideoById);

videoRouter.get("/getVideosByUser/:id", authorizeJWT, getVideosByUserId);

videoRouter.post("/", authorizeJWT, videoRegisterValidation, createVideo);
videoRouter.post("/addLike", videoIdValidation, likeVideo);
videoRouter.post("/addDislike", authorizeJWT, videoIdValidation, dislikeVideo);
videoRouter.post("/addComment", commentRegisterValidation, commentVideo);
videoRouter.post(
  "/addColaborator",
  authorizeJWT,
  colaboratorVideoValidation,
  addColaborator,
);

videoRouter.patch("/", authorizeJWT, videoUpdateValidation, updateVideo);
videoRouter.delete("/", authorizeJWT, videoIdValidation, deleteVideo);

/************************** END VIDEO ROUTES ********************************/

export default videoRouter;
