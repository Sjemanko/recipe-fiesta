import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import ProjectError from "../error";

// export const checkEmailValidation = () => {
//   console.log("huj");
//   return body("email").isEmail();
// };
// export const checkPasswordValidation = () => {
//   console.log("huj2");
//   return body("password").isLength({ min: 8 });
// };

export const signupValidationRules = () => {
  return [body("email").isEmail(), body("password").isLength({ min: 8 })];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = new ProjectError("Validation failed.", 422, errors.array());
  return res.status(422).json({
    message: error.message,
    errors: error.data,
  });
};
