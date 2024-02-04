import { body, validationResult } from "express-validator";

export const commentRegisterValidation = [
  body("videoId")
    .exists()
    .notEmpty()
    .withMessage("videoId is required and cannot be empty."),
  body("text")
    .exists()
    .notEmpty()
    .withMessage("text is required and cannot be empty.")
    .not()
    .isEmpty(),

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
