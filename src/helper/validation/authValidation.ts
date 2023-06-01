import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import ProjectError from "../error";

export const signupValidationRules = () => {
  return [body("email").isEmail(), body("password").isLength({ min: 8 })];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = new ProjectError(`Validation failed - ${Object.keys(errors.mapped())} field has wrong input!`, 422);
  return next(error);
};
