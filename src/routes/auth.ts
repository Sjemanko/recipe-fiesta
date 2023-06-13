import express from "express";
import { postLogin, postSignup } from "../controllers/auth";
import {
  validate,
  authValidationRules,
} from "../helper/validation/authValidation";
import { API_PATHS } from "../common/apiPaths";

const router = express();

router.post(API_PATHS.ACCOUNT.CREATE, authValidationRules, validate, postSignup);
router.post(API_PATHS.ACCOUNT.LOGIN, postLogin);

export default router;
