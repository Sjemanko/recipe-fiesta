import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { HTTP_CODES } from "../../common/httpCodes";
import { VALIDATION_CONFIG } from "../../common/validationConfig";

export const authValidationRules = [
  body("email").isEmail(),
  body("password").isLength({
    min: VALIDATION_CONFIG.PASSWORD_CONFIG.MIN_LENGTH,
  }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res
    .status(HTTP_CODES.FAILED.BAD_REQUEST)
    .send(
      `Validation failed - '${Object.keys(
        errors.mapped()
      )}' field has wrong input!`
    );
};
