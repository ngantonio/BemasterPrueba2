import { body, validationResult } from "express-validator";

export const userRegisterValidation = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .exists()
    .notEmpty()
    .withMessage("Password is required and cannot be empty"),

  body("username")
    .exists()
    .notEmpty()
    .withMessage("username is required and cannot be empty"),

  body("name")
    .exists()
    .notEmpty()
    .withMessage("name is required and cannot be empty"),

  body("last_name")
    .exists()
    .notEmpty()
    .withMessage("last_name is required and cannot be empty"),

  body("country")
    .exists()
    .notEmpty()
    .withMessage("country is required and cannot be empty"),

  body("email")
    .exists()
    .notEmpty()
    .withMessage("email is required and cannot be empty")
    .isEmail(),

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

export const userUpdateValidation = [
  body("userId")
    .exists()
    .notEmpty()
    .withMessage("userId is required and cannot be empty"),
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

export const userLoginValidation = [
  body("email")
    .exists()
    .notEmpty()
    .withMessage("email is required and cannot be empty")
    .isEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("password must contain at least 8 characters")
    .exists()
    .notEmpty()
    .withMessage("Password is required and cannot be empty"),
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
