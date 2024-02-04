import { body, validationResult } from "express-validator";

export const videoRegisterValidation = [
  body("owner")
    .exists()
    .notEmpty()
    .withMessage("Owner is required and cannot be empty."),

  body("description")
    .exists()
    .notEmpty()
    .withMessage("description is required and cannot be empty."),

  body("video_name")
    .exists()
    .withMessage("video_name is required and cannot be empty."),

  body("privacy")
    .exists()
    .notEmpty()
    .withMessage("privacy is required")
    .isIn(["public", "private"])
    .withMessage("privacy must be only 'public' or 'private'"),

  body("file_url")
    .exists()
    .notEmpty()
    .withMessage("file_url is required")
    .matches(
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
    )
    .withMessage("file_url must be valid"),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];

export const videoUpdateValidation = [
  body("videoId")
    .exists()
    .notEmpty()
    .withMessage("VideoId is required and cannot be empty"),

  body("owner").exists().notEmpty().withMessage("Owner cannot be empty"),

  body("description")
    .exists()
    .notEmpty()
    .withMessage("description cannot be empty"),

  body("privacy")
    .exists()
    .notEmpty()
    .isIn(["public", "private"])
    .withMessage("privacy must be only 'public' or 'private'"),

  body("file_url")
    .exists()
    .notEmpty()
    .withMessage("file_url is required")
    .matches(
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
    )
    .withMessage("file_url must be valid"),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];

export const videoIdValidation = [
  body("videoId")
    .exists()
    .notEmpty()
    .withMessage("videoId is required and cannot be empty."),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];

export const colaboratorVideoValidation = [
  body("videoId")
    .exists()
    .notEmpty()
    .withMessage("videoId is required and cannot be empty."),

  body("userId")
    .exists()
    .notEmpty()
    .withMessage("userId is required and cannot be empty."),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];
